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
        stripePaymentId: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    res.json({
      success: true,
      message: 'Successful.',
      orders,
    });
  }
);

//@desc fetch an order
//@route GET api/admin/orders/
//@access Private(ADMINS ONLY)
export const getAllOrders = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const orders = await prisma.order.findMany({
      select: {
        id: true,
        orderNumber: true,
        orderStatus: true,
        paymentStatus: true,
        createdAt: true,
        user: {
          select: {
            name: true,
          },
        },
      },

      orderBy: {
        createdAt: 'desc',
      },
    });

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

    const { id: orderId } = req.params;

    const order = await prisma.order.findUnique({
      where: {
        id: orderId,
        userId,
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

    res.json({
      success: true,
      message: 'Successful.',
      order,
    });
  }
);

//@desc fetch an order
//@route GET api/admin/orders/:id
//@access Private
export const getOrderById = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const order = await prisma.order.findUnique({
      where: {
        id,
      },
      include: {
        orderItems: true,
        user: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!order) {
      res.status(404);
      throw new Error('Order not found');
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

//@desc Mark order as completed
//@route PATCH api/admin/orders/:id/complete
//@access Private
export const completeOrder = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const order = await prisma.order.findUnique({
      where: {
        id,
      },
    });

    if (!order) {
      res.status(404);
      throw new Error('Order not found');
    }

    if (order.orderStatus === 'CANCELLED') {
      res.status(400);
      throw new Error('Cannot complete a cancelled order');
    }
    if (order.orderStatus === 'DELIVERED') {
      res.status(400);
      throw new Error('Order already marked as complete');
    }

    await prisma.$transaction(async (tx) => {
      await tx.order.update({
        where: {
          id,
        },
        data: {
          paymentStatus: 'CONFIRMED',
          orderStatus: 'DELIVERED',
        },
      });

      await tx.notification.create({
        data: {
          content: `Your order ORD-${order.orderNumber} has been delivered successfully `,
          orderId: order.id,
          userId: order.userId,
        },
      });
    });

    res.status(200).json({
      success: true,
      message: 'Order marked as completed',
      orderId: order.id,
    });
  }
);

//@desc Cancel order
//@route PATCH api/admin/orders/:id/cancel
//@access Private
export const cancelOrder = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id: orderId } = req.params;

    const order = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
      include: {
        orderItems: {
          select: {
            id: true,
            quantity: true,
            productId: true,
            productVariantId: true,
          },
        },
      },
    });

    if (!order) {
      res.status(404);
      throw new Error('Order not found');
    }

    await prisma.$transaction(
      async (tx) => {
        await tx.order.update({
          where: {
            id: orderId,
          },
          data: {
            orderStatus: 'CANCELLED',
          },
        });

        await tx.notification.create({
          data: {
            content: `Your order ORD-${order.orderNumber} has been canceled `,
            orderId: order.id,
            userId: order.userId,
          },
        });

        await Promise.all(
          order.orderItems.map(async (orderItem) => {
            if (orderItem.productVariantId) {
              return Promise.all([
                tx.product.update({
                  where: {
                    id: orderItem.productId,
                  },
                  data: {
                    quantity: { increment: orderItem.quantity },
                  },
                }),
                tx.productVariant.update({
                  where: {
                    id: orderItem.productVariantId,
                  },
                  data: {
                    quantity: { increment: orderItem.quantity },
                  },
                }),
              ]);
            } else {
              return tx.product.update({
                where: {
                  id: orderItem.productId,
                },
                data: {
                  quantity: { increment: orderItem.quantity },
                },
              });
            }
          })
        );
      },
      { timeout: 10000 }
    );

    res.status(200).json({
      success: true,
      message: 'Order cancelled',
      orderId: order.id,
    });
  }
);
