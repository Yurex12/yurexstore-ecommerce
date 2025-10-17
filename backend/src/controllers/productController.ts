import { NextFunction, Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';

import prisma from '../lib/prisma';
import { ProductSchema, UpdateProductSchema } from '../schemas/productSchema';

//@desc fetch all products
//@route GET api/products/
//@access public
export const getProducts = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const products = await prisma.product.findMany({
      include: {
        Image: true,
        Review: true,
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    const totalProduct = await prisma.product.count();

    res.json({
      success: true,
      message: 'Successful.',
      data: { products, length: totalProduct },
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
        Image: true,
        Review: true,
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
    const { name, categoryId, price, quantity, gender, description } =
      req.body as ProductSchema;

    const isAdmin = req.user.role === 'ADMIN';

    if (!isAdmin) {
      res.status(401);
      throw new Error('You are not allowed to create a product');
    }

    const category = await prisma.category.findUnique({
      where: {
        id: categoryId,
      },
    });

    if (!category) {
      res.status(400);
      throw new Error('The category does not exist.');
    }

    //TODO: UploadImages to a storage bucket and store their urls
    const uploadedImages = [
      { fileId: '2021', url: 'https://www.yurex/dog' },
      { fileId: '2022', url: 'https://www.yurex/dog' },
      { fileId: '2022', url: 'https://www.yurex/dog' },
    ];

    const newProduct = await prisma.product.create({
      data: {
        name,
        description,
        price,
        quantity,
        categoryId,
        gender,
        Image: {
          createMany: {
            data: uploadedImages,
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
//@route POST api/products/:id
//@access private(ADMINS ONLY)
export const updateProduct = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const newData = req.body as UpdateProductSchema;
    const { id: productId } = req.params;

    const { imageUrls, ...productData } = newData;

    const isAdmin = req.user.role === 'ADMIN';

    if (!isAdmin) {
      res.status(401);
      throw new Error('You are not allowed to create a product');
    }

    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) {
      res.status(400);
      throw new Error('This product does not exist.');
    }

    const category = await prisma.category.findUnique({
      where: {
        id: newData.categoryId,
      },
    });

    if (!category) {
      res.status(400);
      throw new Error('This category does not exist.');
    }

    // UploadImages or delete if theres a new one
    const uploadedImages = [
      { fileId: '2021', url: 'https://www.yurex/dog' },
      { fileId: '2022', url: 'https://www.yurex/dog' },
      { fileId: '2022', url: 'https://www.yurex/dog' },
    ];

    //TODO: Delete products image if they are not used again and add new ones
    const updatedProduct = await prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        ...productData,
        Image: {
          createMany: {
            data: uploadedImages,
          },
        },
      },
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

    const isAdmin = req.user.role === 'ADMIN';

    if (!isAdmin) {
      res.status(401);
      throw new Error('You are not allowed to delete this product');
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
