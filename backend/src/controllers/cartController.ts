import { NextFunction, Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';

import prisma from '../lib/prisma';

import { CartSchema } from '../schemas/cartSchema';

//@desc fetch user Cart
//@route GET api/cart/
//@access Private
export const getCart = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user.userId;

    const cart = await prisma.cart.findUnique({
      where: {
        userId,
      },
      include: {
        cartItem: {
          include: {
            product: true,
          },
        },
      },
    });

    res.json({
      success: true,
      message: 'Successful.',
      data: { cart },
    });
  }
);

//@desc Add/update item in cart
//@route PATCH /api/cart/increment
//@access Private
export const incrementCartItem = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user.userId;

    const { productId } = req.body as CartSchema;

    const cart = await prisma.cart.findUnique({
      where: {
        userId,
      },
      select: { id: true },
    });

    if (!cart) {
      res.status(404);
      throw new Error('Cart does not exist');
    }

    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
      select: {
        quantity: true,
      },
    });

    if (!product) {
      res.status(404);
      throw new Error('Product not found');
    }

    const cartItem = await prisma.cartItem.findUnique({
      where: {
        productId_cartId: { productId, cartId: cart.id },
      },
    });

    let updatedCartItem;

    if (product.quantity < 1) {
      res.status(403);
      throw new Error('This product is currently out of stock');
    }

    if (!cartItem) {
      updatedCartItem = await prisma.cartItem.create({
        data: { quantity: 1, cartId: cart.id, productId },
      });
    } else {
      if (cartItem.quantity + 1 > product.quantity) {
        res.status(403);
        throw new Error(`Only ${product.quantity} items available`);
      }
      updatedCartItem = await prisma.cartItem.update({
        where: {
          id: cartItem.id,
        },
        data: {
          quantity: cartItem.quantity + 1,
        },
      });
    }

    res.json({
      success: true,
      message: 'Successful.',
      data: { cartItem: updatedCartItem },
    });
  }
);

//@desc Add/update item in cart
//@route PATCH /api/cart/decrement
//@access Private
export const decrementCartItem = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user.userId;

    const { productId } = req.body as CartSchema;

    const cart = await prisma.cart.findUnique({
      where: {
        userId,
      },
      select: {
        id: true,
      },
    });

    if (!cart) {
      res.status(404);
      throw new Error('Cart does not exist');
    }

    const cartItem = await prisma.cartItem.findUnique({
      where: {
        productId_cartId: { productId, cartId: cart.id },
      },
    });

    let updatedCartItem;

    if (!cartItem) {
      res.status(404);
      throw new Error('This product is not in cart');
    }

    if (cartItem.quantity === 1) {
      updatedCartItem = await prisma.cartItem.delete({
        where: { productId_cartId: { productId, cartId: cart.id } },
      });
    } else {
      updatedCartItem = await prisma.cartItem.update({
        where: { productId_cartId: { productId, cartId: cart.id } },
        data: { quantity: cartItem.quantity - 1 },
      });
    }

    res.json({
      success: true,
      message: 'Successful.',
      data: { cartItem: updatedCartItem },
    });
  }
);

//@desc Remove item from cart
//@route PATCH /api/cart/:cartItemId
//@access Private
export const removeCartItem = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id: cartItemId } = req.params;

    const cartItem = await prisma.cartItem.findUnique({
      where: { id: cartItemId },
      include: { cart: true },
    });

    if (!cartItem) {
      res.status(404);
      throw new Error('Product does not exist in cart');
    }

    if (cartItem.cart.userId !== req.user.userId) {
      res.status(403);
      throw new Error('unauthorized');
    }

    await prisma.cartItem.delete({
      where: {
        id: cartItemId,
      },
    });

    res.json({
      success: true,
      message: 'Product removed from cart Successfully.',
    });
  }
);

//@desc Clear Cart
//@route Delete api/cart/
//@access Private
export const clearCart = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user.userId;

    const cart = await prisma.cart.findUnique({
      where: {
        userId,
      },
    });

    if (!cart) {
      res.status(404);
      throw new Error('Cart does not exist');
    }

    await prisma.cartItem.deleteMany({
      where: {
        cartId: cart.id,
      },
    });

    res.json({
      success: true,
      message: 'Cart cleared Successfully.',
    });
  }
);
