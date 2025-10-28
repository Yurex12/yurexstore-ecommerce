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

    const cartItems = await prisma.cartItem.findMany({
      where: {
        userId,
      },
      include: {
        product: {
          select: {
            id: true,
            images: true,
            name: true,
            price: true,
            quantity: true,
            variantTypeName: true,
            category: {
              select: {
                name: true,
              },
            },
          },
        },
        productVariant: true,
      },
    });

    res.json({
      success: true,
      message: 'Successful.',
      cart: cartItems,
    });
  }
);

//@desc Add item/increment in cart
//@route POST /api/cart/
//@access Private
// export const addItemToCart = expressAsyncHandler(
//   async (req: Request, res: Response, next: NextFunction) => {
//     const userId = req.user.userId;

//     let { productId, productVariantId } = req.body as CartSchema;

//     const product = await prisma.product.findUnique({
//       where: {
//         id: productId,
//       },
//       select: {
//         id: true,
//         quantity: true,
//         variantTypeName: true,
//       },
//     });

//     if (!product) {
//       res.status(404);
//       throw new Error('Product not found');
//     }

//     let productVariant = null;

//     if (productVariantId) {
//       productVariant = await prisma.productVariant.findUnique({
//         where: {
//           id: productVariantId,
//         },
//         select: {
//           quantity: true,
//           productId: true,
//         },
//       });

//       if (!productVariant) {
//         res.status(404);
//         throw new Error('Product variant not found');
//       }
//     }

//     if (productVariant && product.id !== productVariant.productId) {
//       res.status(404);
//       throw new Error('This variant does not exist for this product');
//     }

//     let cartItem = null;

//     const itemInCart = await prisma.cartItem.findFirst({
//       where: {
//         userId,
//         productId,
//         productVariantId: productVariantId || null,
//       },
//       select: {
//         id: true,
//         quantity: true,
//       },
//     });

//     if (!itemInCart) {
//       if (productVariant) {
//         if (productVariant.quantity < 1) {
//           res.status(409);
//           throw new Error('This variant is currently out of stock');
//         }
//         cartItem = await prisma.cartItem.create({
//           data: {
//             productId,
//             productVariantId,
//             userId,
//             quantity: 1,
//           },
//         });
//       } else {
//         if (product.quantity < 1) {
//           res.status(409);
//           throw new Error('This product is currently out of stock');
//         }
//         cartItem = await prisma.cartItem.create({
//           data: {
//             productId,
//             userId,
//             quantity: 1,
//           },
//         });
//       }
//     } else {
//       if (productVariant) {
//         if (productVariant.quantity < itemInCart.quantity + 1) {
//           res.status(409);
//           throw new Error('This variant is currently out of stock');
//         }
//         cartItem = await prisma.cartItem.update({
//           where: {
//             id: itemInCart.id,
//           },
//           data: {
//             quantity: { increment: 1 },
//           },
//         });
//       } else {
//         if (product.quantity < itemInCart.quantity + 1) {
//           res.status(409);
//           throw new Error('This product is currently out of stock');
//         }
//         cartItem = await prisma.cartItem.update({
//           where: {
//             id: itemInCart.id,
//           },
//           data: {
//             quantity: { increment: 1 },
//           },
//         });
//       }
//     }

//     res.status(201).json({
//       success: true,
//       message: 'Successful.',
//       cartItem,
//     });
//   }
// );

//@desc Add item/increment in cart
//@route POST /api/cart/
//@access Private
export const addItemToCart = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user.userId;

    let { productId, productVariantId } = req.body as CartSchema;

    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
      select: {
        id: true,
        quantity: true,
        variantTypeName: true,
      },
    });

    if (!product) {
      res.status(404);
      throw new Error('Product not found');
    }

    let productVariant = null;

    if (productVariantId) {
      productVariant = await prisma.productVariant.findUnique({
        where: {
          id: productVariantId,
        },
        select: {
          quantity: true,
          productId: true,
        },
      });

      if (!productVariant) {
        res.status(404);
        throw new Error('Product variant not found');
      }
    }

    if (productVariant && product.id !== productVariant.productId) {
      res.status(404);
      throw new Error('This variant does not exist for this product');
    }

    let cartItem = null;

    const itemInCart = await prisma.cartItem.findFirst({
      where: {
        userId,
        productId,
        productVariantId: productVariantId || null,
      },
      select: {
        id: true,
        quantity: true,
      },
    });

    if (itemInCart) {
      res.status(400);
      throw new Error('This product is already in cart');
    }

    const availableStock = productVariant?.quantity ?? product.quantity;

    if (availableStock < 1) {
      res.status(409);
      throw new Error('This product is currently out of stock');
    }

    const updatedCartItem = await prisma.cartItem.create({
      data: {
        productId,
        userId,
        quantity: 1,
        ...(productVariantId && { productVariantId }),
      },
    });

    res.status(201).json({
      success: true,
      message: 'Successful.',
      cartItem: updatedCartItem,
    });
  }
);

//@desc increment item in cart
//@route PATCH /api/cart/increment/:cartItemId
//@access Private
export const incrementCartItem = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user.userId;

    const { cartItemId } = req.params;

    const itemInCart = await prisma.cartItem.findFirst({
      where: {
        id: cartItemId,
        userId,
      },
      select: {
        id: true,
        quantity: true,
        productVariant: true,
        productVariantId: true,
        product: {
          select: {
            quantity: true,
          },
        },
      },
    });

    if (!itemInCart) {
      res.status(404);
      throw new Error('Product does not exist in cart');
    }

    const availableStock =
      itemInCart.productVariant?.quantity ?? itemInCart.product.quantity;

    if (availableStock < itemInCart.quantity + 1) {
      res.status(409);
      throw new Error('Currently out of stock');
    }

    const updatedCartItem = await prisma.cartItem.update({
      where: {
        id: itemInCart.id,
      },
      data: {
        quantity: { increment: 1 },
      },
    });

    res.status(201).json({
      success: true,
      message: 'Successful.',
      cartItem: updatedCartItem,
    });
  }
);

//@desc decrement item in cart
//@route PATCH /api/cart/decrement/:cartItemId
//@access Private
export const decrementCartItem = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user.userId;

    const { cartItemId } = req.params;

    const itemInCart = await prisma.cartItem.findFirst({
      where: {
        id: cartItemId,
        userId,
      },
      select: {
        id: true,
        quantity: true,
      },
    });

    if (!itemInCart) {
      res.status(404);
      throw new Error('This item is not in cart');
    }

    let cartItem;

    if (itemInCart.quantity === 1) {
      cartItem = await prisma.cartItem.delete({
        where: {
          id: itemInCart.id,
        },
      });
    } else {
      cartItem = await prisma.cartItem.update({
        where: {
          id: itemInCart.id,
        },
        data: {
          quantity: { decrement: 1 },
        },
      });
    }

    res.json({
      success: true,
      message: 'Successful.',
      cartItem,
    });
  }
);

//@desc Remove item from cart
//@route PATCH /api/cart/:cartItemId
//@access Private
export const removeCartItem = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { cartItemId } = req.params;

    const cartItem = await prisma.cartItem.findFirst({
      where: {
        id: cartItemId,
        userId: req.user.userId,
      },
    });

    if (!cartItem) {
      res.status(404);
      throw new Error('Product does not exist in cart');
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

    await prisma.cartItem.deleteMany({
      where: {
        userId,
      },
    });

    res.json({
      success: true,
      message: 'Cart cleared Successfully.',
    });
  }
);
