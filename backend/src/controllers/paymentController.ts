import { NextFunction, Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import prisma from '../lib/prisma';

import { Order } from '../schemas/orderSchema';
import stripe from '../config/stripe';

import Stripe from 'stripe';
import { paymentQueue } from '../queue/paymentQueue';

//@desc create payment Intent
//@route GET api/payment/create-payment-intent
//@access PRIVATE
export const createPaymentIntent = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user.userId;

    const { deliveryAddress, phone } = req.body as Order;
    const cart = await prisma.cartItem.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
        quantity: true,
        productVariantId: true,
        product: {
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
        },
        productVariant: {
          select: {
            id: true,
            price: true,
            productId: true,
            quantity: true,
            value: true,
          },
        },
      },
    });

    const validatedItems = cart.map((cartItem) => {
      if (cartItem.productVariantId && !cartItem.productVariant) {
        res.status(404);
        throw new Error('Some items in your cart are no longer available.');
      }

      if (!cartItem.product) {
        res.status(404);
        throw new Error('Some items in your cart are no longer available.');
      }

      // Check stock
      if (
        cartItem.productVariant &&
        cartItem.productVariant?.quantity < cartItem.quantity
      ) {
        res.status(409);
        throw new Error(
          'Some items are out of stock. Your cart has been updated.'
        );
      }

      if (cartItem.product.quantity < cartItem.quantity) {
        res.status(409);
        throw new Error(
          'Some items are out of stock. Your cart has been updated.'
        );
      }

      return {
        productId: cartItem.product.id,
        productVariantId: cartItem.productVariantId || null,
        productName: cartItem.product.name,
        productVariantValue: cartItem.productVariant?.value || null,
        productPrice: cartItem.productVariant?.price || cartItem.product.price,
        productImage: cartItem.product.images[0].url || '',
        quantity: cartItem.quantity,
      };
    });

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

      await paymentQueue.add(
        'process-payment',
        {
          paymentIntentId: paymentIntent.id,
          checkoutId: paymentIntent.metadata?.checkoutId,
        },
        {
          attempts: 5,
          jobId: `payment-${paymentIntent.id}`,
          backoff: {
            type: 'exponential',
            delay: 3000,
          },
        }
      );
    }

    if (event.type === 'payment_intent.payment_failed') {
    }

    res.status(200).send('ok');
  } catch {
    res.status(500).send('Webhook failure');
  }
};
