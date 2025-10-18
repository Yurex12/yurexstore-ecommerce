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
        id: productId,
      },
    });

    res.json({
      success: true,
      message: 'Successful.',
      data: { reviews },
    });
  }
);

//@desc create product reviews
//@route POST api/reviews/
//@access public
export const createReview = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { productId, userId, content, rating } = req.body as ReviewSchema;

    const userBoughtProduct = await prisma.product.findFirst({
      where: {
        id: productId,
        buyers: {
          some: {
            id: userId,
          },
        },
      },
    });

    if (!userBoughtProduct) {
      res.status(403);
      throw new Error('You must purchase this product before reviewing it');
    }

    const userAlreadyRated = await prisma.review.findUnique({
      where: {
        productId_userId: { productId, userId },
      },
    });

    if (userAlreadyRated) {
      res.status(403);
      throw new Error('You already rated this product');
    }

    const review = await prisma.review.create({
      data: {
        content,
        rating,
        productId,
        userId,
      },
    });

    res.status(201).json({
      success: true,
      message: 'Product reviewed Successfully.',
      data: { review },
    });
  }
);

//@desc delete product review
//@route DELETE api/reviews/:id
//@access private

export const deleteReview = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id: reviewId } = req.params;

    const review = await prisma.review.findUnique({
      where: {
        id: reviewId,
      },
    });

    if (!review) {
      res.status(404);
      throw new Error('Review not found');
    }

    if (req.user.userId !== review.userId && req.user.role !== 'ADMIN') {
      res.status(401);
      throw new Error('Unauthorized.');
    }

    await prisma.review.delete({
      where: {
        id: reviewId,
      },
    });

    res.json({
      success: true,
      message: 'Review deleted successfully',
    });
  }
);
