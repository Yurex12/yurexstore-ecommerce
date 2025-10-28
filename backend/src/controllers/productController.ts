import { NextFunction, Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';

import prisma from '../lib/prisma';
import { ProductSchema, ProductUpdateSchema } from '../schemas/productSchema';

//@desc fetch all products
//@route GET api/products/
//@access public
export const getProducts = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const products = await prisma.product.findMany({
      include: {
        images: {
          select: {
            id: true,
            url: true,
            fileId: true,
          },
        },
        category: {
          select: {
            name: true,
          },
        },
        reviews: {
          select: {
            rating: true,
          },
        },
        productVariants: true,
      },
    });

    res.json({
      success: true,
      message: 'Successful.',
      products,
    });
  }
);

//@desc fetch a product
//@route GET api/products/:id
//@access public
export const getProduct = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id: productId } = req.params;

    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
      include: {
        images: true,
        reviews: true,
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!product) {
      res.status(404);
      throw new Error('This product does not exist.');
    }

    res.json({
      success: true,
      message: 'Successful.',
      data: { product },
    });
  }
);

//@desc Create a product
//@route POST api/products
//@access private(ADMINS ONLY)
export const createProduct = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { categoryId, images, productVariants, ...productData } =
      req.body as ProductSchema;

    const category = await prisma.category.findUnique({
      where: {
        id: categoryId,
      },
    });

    if (!category) {
      res.status(400);
      throw new Error('The category does not exist.');
    }

    const newProduct = await prisma.product.create({
      data: {
        ...productData,
        categoryId,
        images: {
          createMany: {
            data: images,
          },
        },
        productVariants: {
          createMany: {
            data: productVariants || [],
          },
        },
      },
    });

    res.status(201).json({
      success: true,
      message: 'Product created Successfully.',
      data: { product: newProduct },
    });
  }
);

//@desc Update a product
//@route PATCH api/products/:id
//@access private(ADMINS ONLY)
export const updateProduct = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { images, categoryId, ...rest } = req.body as ProductUpdateSchema;
    const { id: productId } = req.params;

    const updateData: any = { ...rest };

    if (categoryId) {
      const category = await prisma.category.findUnique({
        where: {
          id: categoryId,
        },
      });

      if (!category) {
        res.status(400);
        throw new Error('This category does not exist.');
      }

      updateData.categoryId = categoryId;
    }

    if (images && images.length > 0) {
      updateData.images = {
        deleteMany: {},
        createMany: { data: images },
      };
    }

    const updatedProduct = await prisma.product.update({
      where: {
        id: productId,
      },
      data: updateData,
    });

    res.json({
      success: true,
      message: 'Product updated Successfully.',
      data: { product: updatedProduct },
    });
  }
);

//@desc delete a product
//@route DELETE api/products/:id
//@access private(ADMINS ONLY)
export const deleteProduct = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id: productId } = req.params;

    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) {
      res.status(404);
      throw new Error('Product not found.');
    }

    await prisma.product.delete({
      where: {
        id: productId,
      },
    });

    res.json({
      success: true,
      message: 'Product deleted successfully',
    });
  }
);
