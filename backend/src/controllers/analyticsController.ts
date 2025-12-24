import { NextFunction, Request, Response } from 'express';

import { format, subDays } from 'date-fns';

import expressAsyncHandler from 'express-async-handler';
import prisma from '../lib/prisma';

type DailyData = { date: string; revenue: number; orders: number };

interface TopProductGroup {
  productId: string;
  productName: string;
  _sum: {
    quantity: number | null;
    productPrice: number | null;
  };
}

//@desc fetch metrics
//@route GET api/admin/overview/metrics
//@access Private
export const getMetrics = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const now = new Date();

    const sevenDaysAgo = subDays(now, 6);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    const fourteenDaysAgo = subDays(now, 13);
    fourteenDaysAgo.setHours(0, 0, 0, 0);

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

//@desc fetch chart data
//@route GET api/admin/analytics/chart
//@access Private
export const getChartData = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const now = new Date();

    const sevenDaysAgo = subDays(now, 6);
    sevenDaysAgo.setHours(0, 0, 0, 0);
    const dailyDataMap: Record<string, DailyData> = {};

    for (let i = 6; i >= 0; i--) {
      const date = subDays(now, i);

      const dateString = format(date, 'MMM d');

      dailyDataMap[dateString] = {
        date: dateString,
        revenue: 0,
        orders: 0,
      };
    }

    const last7DaysPaidOrders = await prisma.order.findMany({
      where: {
        createdAt: { gte: sevenDaysAgo, lte: now },
        paymentStatus: 'CONFIRMED',
      },
      select: { createdAt: true, deliveryFee: true, totalPrice: true },
    });

    last7DaysPaidOrders.forEach((order) => {
      const dateString = format(order.createdAt, 'MMM d');

      if (dailyDataMap[dateString]) {
        dailyDataMap[dateString].revenue +=
          order.totalPrice + order.deliveryFee;

        dailyDataMap[dateString].orders += 1;
      }
    });
    const chartData = Object.values(dailyDataMap);

    res.json({
      message: 'Successful',
      success: true,
      chartData,
    });
  }
);

//@desc fetch user Addresses
//@route GET api/admin/analytics/top-products
//@access Private
export const getTopProducts = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const now = new Date();
    const sevenDaysAgo = subDays(now, 6);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    const topProductsData = await prisma.orderItem.groupBy({
      by: ['productId', 'productName'],
      _sum: { quantity: true, productPrice: true },
      where: {
        order: {
          createdAt: { gte: sevenDaysAgo, lte: now },
          paymentStatus: 'CONFIRMED',
        },
      },
      orderBy: {
        _sum: { productPrice: 'desc' },
      },
      take: 5,
    });

    const formattedData = (topProductsData as TopProductGroup[]).map(
      (item) => ({
        name: item.productName,
        revenue: item._sum.productPrice || 0,
        sales: item._sum.quantity || 0,
      })
    );

    res.json({
      success: true,
      message: 'Successful',
      topProducts: formattedData,
    });
  }
);
