import { NextFunction, Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import prisma from '../lib/prisma';

import { Order } from '../schemas/orderSchema';
import stripe from '../config/stripe';

import Stripe from 'stripe';

type OrderItem = {
  productId: string;
  productVariantId: string | null;
  productVariantValue: string | null;
  productName: string;
  productPrice: number;
  productImage: string;
  quantity: number;
};

type OrderItems = OrderItem[];

//@desc create payment Intent
//@route GET api/payment/create-payment-intent
//@access PRIVATE
export const createPaymentIntent = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user.userId;

    const { orderItems, deliveryAddress, phone } = req.body as Order;

    const validatedItems = await Promise.all(
      orderItems.map(async (orderItem) => {
        if (orderItem.productVariantId) {
          const variant = await prisma.productVariant.findFirst({
            where: {
              id: orderItem.productVariantId,
              productId: orderItem.productId,
            },
            select: {
              id: true,
              price: true,
              productId: true,
              quantity: true,
              value: true,
              product: {
                select: {
                  id: true,
                  name: true,
                  images: {
                    select: {
                      url: true,
                    },
                    take: 1,
                  },
                },
              },
            },
          });

          if (!variant) {
            res.status(404);
            throw new Error('Some items in your cart are no longer available.');
          }

          // Check stock
          if (variant.quantity < orderItem.quantity) {
            res.status(409);
            throw new Error(
              'Some items are out of stock. Your cart has been updated.'
            );
          }

          return {
            productId: variant.productId,
            productVariantId: variant.id,
            productName: variant.product.name,
            productVariantValue: variant.value,
            productPrice: variant.price,
            productImage: variant.product.images[0].url || '',
            quantity: orderItem.quantity,
          };
        } else {
          const product = await prisma.product.findUnique({
            where: { id: orderItem.productId },
            select: {
              id: true,
              name: true,
              price: true,
              quantity: true,
              images: {
                select: {
                  url: true,
                },
                take: 1,
              },
            },
          });

          if (!product) {
            res.status(404);
            throw new Error('Some items in your cart are no longer available.');
          }

          if (product.quantity < orderItem.quantity) {
            res.status(409);
            throw new Error(
              'Some items are out of stock. Your cart has been updated.'
            );
          }

          return {
            productId: product.id,
            productVariantId: null,
            productVariantValue: null,
            productName: product.name,
            productPrice: product.price,
            productImage: product.images[0].url || '',
            quantity: orderItem.quantity,
          };
        }
      })
    );

    const totalPrice = validatedItems.reduce(
      (sum, item) => sum + item.productPrice * item.quantity,
      0
    );

    // 1% of total price
    const deliveryFee = +((1 / 100) * totalPrice).toFixed(2);

    const subtotal = totalPrice + deliveryFee;

    const amountInCents = Math.round(subtotal * 100);

    const MINUTE = 60 * 1000;
    const CHECKOUT_EXPIRY_MINUTES = 30;

    const checkout = await prisma.checkout.create({
      data: {
        userId,
        expiresAt: new Date(Date.now() + CHECKOUT_EXPIRY_MINUTES * MINUTE),
        data: {
          items: validatedItems,
          deliveryAddress,
          phone,
          totalPrice,
          deliveryFee,
        },
      },
    });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        userId,
        // orderId: 'N/A',
        checkoutId: checkout.id,
      },
    });

    res.json({
      success: true,
      message: 'Payment intent generated successfully',
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  }
);

//@desc
//@route GET api/payment/create-payment-intent
//@access PRIVATE

export const stripeWebhook = async (req: Request, res: Response) => {
  const sig = req.headers['stripe-signature']!;
  // TODO: set up in .env

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (error) {
    res.status(400).send('Invalid signature');
    return;
  }

  try {
    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      const checkoutId = paymentIntent.metadata?.checkoutId;
      const paymentIntentId = paymentIntent.id;

      const existing = await prisma.order.findUnique({
        where: { paymentIntentId },
      });

      if (existing) {
        res.sendStatus(200);
        return;
      }

      if (!checkoutId) {
        res.status(400).send('Missing checkout Id');
        return;
      }

      const checkout = await prisma.checkout.findUnique({
        where: { id: checkoutId },
      });

      if (!checkout) {
        res.status(400).send('Checkout not found');
        return;
      }

      if (new Date() > checkout.expiresAt) {
        res.sendStatus(200);
        return;
      }

      const checkoutData = checkout.data as {
        items: OrderItem[];
        deliveryFee: number;
        totalPrice: number;
        deliveryAddress: string;
        phone: string;
      };

      await prisma.$transaction(async (tx) => {
        const newOrder = await tx.order.create({
          data: {
            userId: checkout.userId,
            totalPrice: checkoutData.totalPrice,
            deliveryFee: checkoutData.deliveryFee,
            paymentMethod: 'STRIPE',
            paymentStatus: 'CONFIRMED',
            paymentIntentId,
            deliveryAddress: checkoutData.deliveryAddress,
            phone: checkoutData.phone,

            orderItems: {
              createMany: {
                data: checkoutData.items.map((item) => ({
                  productId: item.productId,
                  productVariantId: item.productVariantId,
                  productPrice: item.productPrice,
                  productImage: item.productImage,
                  productName: item.productName,
                  quantity: item.quantity,
                })),
              },
            },

            notifications: {
              create: {
                userId: checkout.userId,
                content: 'Your order has been placed successfully',
              },
            },
          },
        });

        //  clean up
        await Promise.all(
          checkoutData.items.map((item) => {
            if (item.productVariantId) {
              return Promise.all([
                tx.productVariant.update({
                  where: { id: item.productVariantId },
                  data: { quantity: { decrement: item.quantity } },
                }),
                tx.product.update({
                  where: { id: item.productId },
                  data: { quantity: { decrement: item.quantity } },
                }),
              ]);
            } else {
              return tx.product.update({
                where: { id: item.productId },
                data: { quantity: { decrement: item.quantity } },
              });
            }
          })
        );

        await tx.cartItem.deleteMany({
          where: { userId: checkout.userId },
        });

        await tx.checkout.delete({
          where: { id: checkout.id },
        });
      });
    }

    if (event.type === 'payment_intent.payment_failed') {
      res.sendStatus(200);
      return;
    }
  } catch {
    res.status(500).send('Webhook failure');
    return;
  }

  res.sendStatus(200);
};
