import { NextFunction, Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';

import prisma from '../lib/prisma';
import { WishlistSchema } from '../schemas/wishlistSchema';

//@desc fetch wishlists
//@route GET api/reviews/
//@access private
export const getWishlists = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user.userId;

    const wishlist = await prisma.wishListItem.findMany({
      where: {
        userId,
      },
      include: {
        product: {
          select: {
            id: true,
            name: true,
            price: true,
            quantity: true,
            images: {
              select: {
                fileId: true,
                url: true,
              },
              take: 1,
            },
          },
        },
      },
    });

    res.json({
      success: true,
      message: 'Successful.',
      wishlist,
    });
  }
);

//@desc create a wishlist Item
//@route POST api/wishlist/
//@access private
export const createWishlistItem = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user.userId;

    const { productId } = req.body as WishlistSchema;

    const reviews = await prisma.wishListItem.create({
      data: {
        userId,
        productId,
      },
    });

    res.status(201).json({
      success: true,
      message: 'Successful.',
      reviews,
    });
  }
);

//@desc delete wishlist Item
//@route DELETE api/wishlist/:id
//@access private
export const removeWishlistItem = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user.userId;

    const { id } = req.params;

    const reviews = await prisma.wishListItem.delete({
      where: {
        userId,
        id,
      },
    });

    res.json({
      success: true,
      message: 'Successful.',
      reviews,
    });
  }
);
