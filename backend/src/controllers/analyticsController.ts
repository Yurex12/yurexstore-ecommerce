import { NextFunction, Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import prisma from '../lib/prisma';

//@desc fetch user Addresses
//@route GET api/admin/overview/metrics
//@access Private
export const getMetrics = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const now = new Date();

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(now.getDate() - 7);

    const fourteenDaysAgo = new Date();
    fourteenDaysAgo.setDate(now.getDate() - 14);

    const [
      last7DaysOrders,
      last14DaysOrders,

      last7DaysPaidOrders,
      last14DaysPaidOrders,

      Last7DaysRevenueAgg,
      last14DaysRevenueAgg,
    ] = await Promise.all([
      prisma.order.count({
        where: { createdAt: { gte: sevenDaysAgo, lte: now } },
      }),
      prisma.order.count({
        where: { createdAt: { gte: fourteenDaysAgo, lt: sevenDaysAgo } },
      }),

      prisma.order.count({
        where: {
          createdAt: { gte: sevenDaysAgo, lte: now },
          paymentStatus: 'CONFIRMED',
        },
      }),
      prisma.order.count({
        where: {
          createdAt: { gte: fourteenDaysAgo, lt: sevenDaysAgo },
          paymentStatus: 'CONFIRMED',
        },
      }),

      prisma.order.aggregate({
        where: {
          createdAt: { gte: sevenDaysAgo, lte: now },
          paymentStatus: 'CONFIRMED',
        },
        _sum: { totalPrice: true, deliveryFee: true },
      }),
      prisma.order.aggregate({
        where: {
          createdAt: { gte: fourteenDaysAgo, lt: sevenDaysAgo },
          paymentStatus: 'CONFIRMED',
        },
        _sum: { totalPrice: true, deliveryFee: true },
      }),
    ]);

    const Last7DaysRevenue =
      (Last7DaysRevenueAgg._sum.totalPrice ?? 0) +
      (Last7DaysRevenueAgg._sum.deliveryFee ?? 0);

    const last14DaysRevenue =
      (last14DaysRevenueAgg._sum.totalPrice ?? 0) +
      (last14DaysRevenueAgg._sum.deliveryFee ?? 0);

    // AOV (Average order value)
    const last7DaysAOV =
      last7DaysPaidOrders > 0 ? Last7DaysRevenue / last7DaysPaidOrders : 0;

    const last14DaysAOV =
      last14DaysPaidOrders > 0 ? last14DaysRevenue / last14DaysPaidOrders : 0;

    res.json({
      message: 'Successful',
      success: true,
      metrics: {
        orders: {
          last7Days: last7DaysOrders,
          last14Days: last14DaysOrders,
        },
        revenue: {
          last7Days: Last7DaysRevenue,
          last14Days: last14DaysRevenue,
        },
        averageOrderValue: {
          last7Days: last7DaysAOV,
          last14Days: last14DaysAOV,
        },
      },
    });
  }
);
