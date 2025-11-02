import { NextFunction, Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';

import prisma from '../lib/prisma';

import { CartSchema } from '../schemas/cartSchema';
import { Order } from '../schemas/orderSchema';

//@desc fetch user Cart
//@route GET api/cart/
//@access Private
// export const getOrder = expressAsyncHandler(
//   async (req: Request, res: Response, next: NextFunction) => {
//     const userId = req.user.userId;

//     res.json({
//       success: true,
//       message: 'Successful.',
//       cart: cartItems,
//     });
//   }
// );

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
            throw new Error(
              `Product variant ${orderItem.productVariantId} not found`
            );
          }

          // Check stock
          if (variant.quantity < orderItem.quantity) {
            throw new Error(
              `Insufficient stock for ${variant.product.name}. Available: ${variant.quantity}, Requested: ${orderItem.quantity}`
            );
          }

          return {
            productId: variant.productId,
            productVariantId: variant.id,
            productName: variant.product.name,
            productPrice: variant.price,
            productImage: variant.product.images[0].url || '',
            quantity: orderItem.quantity,
          };
        } else {
          // Item without variant - check main product
          const product = await prisma.product.findUnique({
            where: { id: orderItem.productId },
            include: { images: { select: { url: true }, take: 1 } },
          });

          if (!product) {
            throw new Error(`Product ${orderItem.productId} not found`);
          }

          // Check stock
          if (product.quantity < orderItem.quantity) {
            throw new Error(
              `Insufficient stock for ${product.name}. Available: ${product.quantity}, Requested: ${orderItem.quantity}`
            );
          }

          return {
            productId: product.id,
            productVariantId: null,
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

    const order = await prisma.$transaction(
      async (tx) => {
        const newOrder = await tx.order.create({
          data: {
            deliveryAddress: data.deliveryAddress,
            phone: data.phone,
            totalPrice,
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
              return tx.productVariant.update({
                where: { id: item.productVariantId },
                data: { quantity: { decrement: item.quantity } },
              });
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
      order,
    });
  }
);
