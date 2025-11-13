import { NextFunction, Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';

import prisma from '../lib/prisma';

import { Order } from '../schemas/orderSchema';

//@desc fetch an order
//@route GET api/orders/
//@access Private
export const getOrders = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user.userId;

    const orders = await prisma.order.findMany({
      where: {
        userId,
      },
      include: {
        orderItems: true,
      },
      omit: {
        paymentStatus: true,
        stripePaymentId: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (!orders) {
      res.status(404);
      throw new Error('Orders not found');
    }

    res.json({
      success: true,
      message: 'Successful.',
      orders,
    });
  }
);

//@desc fetch an order
//@route GET api/orders/:id
//@access Private
export const getOrder = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user.userId;

    const { id } = req.params;

    const order = await prisma.order.findUnique({
      where: {
        id,
      },
      omit: {
        stripePaymentId: true,
        paymentStatus: true,
      },
      include: {
        orderItems: true,
      },
    });

    if (!order) {
      res.status(404);
      throw new Error('Order not found');
    }

    if (userId !== order.userId && req.user.role !== 'ADMIN') {
      res.status(403);
      throw new Error('Forbidden');
    }

    res.json({
      success: true,
      message: 'Successful.',
      order,
    });
  }
);

//@desc create an order
//@route POST api/orders/
//@access Private
export const createOrder = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user.userId;

    const data = req.body as Order;

    const validatedItems = await Promise.all(
      data.orderItems.map(async (orderItem) => {
        if (orderItem.productVariantId) {
          const variant = await prisma.productVariant.findFirst({
            where: {
              id: orderItem.productVariantId,
              productId: orderItem.productId,
            },
            include: {
              product: {
                include: {
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
            include: { images: { select: { url: true }, take: 1 } },
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

    const order = await prisma.$transaction(
      async (tx) => {
        const newOrder = await tx.order.create({
          data: {
            deliveryAddress: data.deliveryAddress,
            phone: data.phone,
            totalPrice,
            deliveryFee,
            paymentMethod: data.paymentMethod,
            userId,
            orderItems: {
              createMany: {
                data: validatedItems,
              },
            },
          },
          include: {
            orderItems: true,
          },
        });

        await Promise.all(
          validatedItems.map((item) => {
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
          where: { userId },
        });

        await tx.notification.create({
          data: {
            userId,
            orderId: newOrder.id,
            content: 'Your order has been placed successfully',
          },
        });

        return newOrder;
      },
      { timeout: 10000 }
    );

    res.status(201).json({
      success: true,
      message: 'Successful.',
      orderId: order.id,
    });
  }
);
