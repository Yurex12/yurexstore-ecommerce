import { NextFunction, Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';

import prisma from '../lib/prisma';

import { ReviewSchema } from '../schemas/reviewSchema';

//@desc fetch product reviews
//@route GET api/reviews/:productId
//@access public
export const getReviews = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { productId } = req.params;

    const reviews = await prisma.review.findMany({
      where: {
        productId,
      },
      include: {
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
      reviews,
    });
  }
);

//@desc fetch user pending reviews
//@route GET api/reviews/pending-reviews/
//@access PRIVATE
export const getUserPendingReviews = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user.userId;

    const productToOrderDateMap = new Map();

    const deliveredOrders = await prisma.order.findMany({
      where: {
        userId,
        orderStatus: 'DELIVERED',
      },
      select: {
        id: true,
        orderItems: {
          select: {
            productId: true,
            createdAt: true,
          },
        },
      },
    });

    if (deliveredOrders.length < 1) {
      res.json({
        success: true,
        message: 'Successful',
        pendingReviews: [],
      });

      return;
    }

    deliveredOrders.forEach((order) => {
      order.orderItems.forEach((orderItem) => {
        if (!productToOrderDateMap.has(orderItem.productId)) {
          productToOrderDateMap.set(orderItem.productId, orderItem.createdAt);
        }
      });
    });

    const purchasedProductIds = [...productToOrderDateMap.keys()];

    const existingReviews = await prisma.review.findMany({
      where: { userId },
      select: { productId: true },
    });

    const reviewedProductIds = new Set(
      existingReviews.map((review) => review.productId)
    );

    const unReviewedProductIds = purchasedProductIds.filter(
      (productId) => !reviewedProductIds.has(productId)
    );

    const unReviewedProducts = await prisma.product.findMany({
      where: {
        id: { in: unReviewedProductIds },
      },
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
    });

    const pendingReviews = unReviewedProducts.map((product) => ({
      id: product.id,
      name: product.name,
      imageUrl: product.images[0]?.url || null,
      purchasedAt: productToOrderDateMap.get(product.id),
    }));

    res.json({
      success: true,
      message: 'Successfully retrieved pending reviews.',
      pendingReviews,
    });
  }
);

// //@desc create product reviews
// //@route POST api/reviews/
// //@access PRIVATE
export const createReview = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { productId, content, rating } = req.body as ReviewSchema;
    const { userId } = req.user;

    const existingReview = await prisma.review.findUnique({
      where: {
        productId_userId: { productId, userId },
      },
    });

    if (existingReview) {
      res.status(403);
      throw new Error('You have already reviewed this product');
    }

    const hasPurchased = await prisma.orderItem.findFirst({
      where: {
        productId: productId,
        order: {
          userId: userId,
          orderStatus: 'DELIVERED',
        },
      },
    });

    if (!hasPurchased) {
      res.status(403);
      throw new Error('You must purchase this product before reviewing it');
    }

    await prisma.$transaction(async (tx) => {
      await tx.review.create({
        data: {
          content,
          rating,
          productId,
          userId,
        },
      });

      const stats = await tx.review.aggregate({
        where: { productId },
        _avg: { rating: true },
        _count: true,
      });

      await tx.product.update({
        where: {
          id: productId,
        },
        data: {
          avgRating: stats._avg.rating,
          reviewCount: stats._count,
        },
      });
    });

    res.status(201).json({
      success: true,
      message: 'Product reviewed Successfully.',
    });
  }
);
