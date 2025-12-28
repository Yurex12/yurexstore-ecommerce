import { Worker } from 'bullmq';

import { connection } from '../config/redisConnection';
import prisma from '../lib/prisma';
import stripe from '../config/stripe';

type OrderItem = {
  productId: string;
  productVariantId: string | null;
  productVariantValue: string | null;
  productName: string;
  productPrice: number;
  productImage: string;
  quantity: number;
};

const worker = new Worker(
  'payments',
  async (job) => {
    const { paymentIntentId, checkoutId } = job.data;

    const existing = await prisma.order.findUnique({
      where: { paymentIntentId },
    });

    if (existing) return;

    if (!checkoutId) return;

    const checkout = await prisma.checkout.findUnique({
      where: { id: checkoutId },
    });

    if (!checkout) throw new Error('Checkout not found');

    if (new Date() > checkout.expiresAt) {
      await stripe.refunds.create({
        payment_intent: paymentIntentId,
        reason: 'requested_by_customer',
      });

      return;
    }

    const checkoutData = checkout.data as {
      items: OrderItem[];
      deliveryFee: number;
      totalPrice: number;
      deliveryAddress: string;
      phone: string;
    };

    await prisma.$transaction(
      async (tx) => {
        await tx.order.create({
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

        for (const item of checkoutData.items) {
          if (item.productVariantId) {
            await tx.productVariant.update({
              where: { id: item.productVariantId },
              data: { quantity: { decrement: item.quantity } },
            });
          }
          await tx.product.update({
            where: { id: item.productId },
            data: { quantity: { decrement: item.quantity } },
          });
        }

        await prisma.cartItem.deleteMany({
          where: { userId: checkout.userId },
        });
      },

      { timeout: 15_000 }
    );

    await prisma.checkout.delete({
      where: { id: checkout.id },
    });

    return;
  },
  { connection }
);

worker.on('completed', (job, res) =>
  console.log(`Job ${job?.id} completed successfully`)
);

worker.on('failed', (job, err) => {
  console.log(`Job ${job?.id} failed:`, err.message);
});
