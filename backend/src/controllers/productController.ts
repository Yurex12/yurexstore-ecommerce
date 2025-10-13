import { NextFunction, Request, Response } from 'express';

import expressAsyncHandler from 'express-async-handler';
import prisma from '../lib/prisma';
import { string } from 'zod';

//@desc fetch all products
//@route GET api/products/
//@access public
export const getProducts = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const products = await prisma.product.findMany();

    res.json({
      success: true,
      message: 'Successful.',
      data: { products },
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
    });

    if (!product) {
      res.status(400);
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
    const { name, categoryId, price, quantity, gender, description } = req.body;

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

    // UploadImages
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
        // Image: {
        //   createMany: {
        //     data: uploadedImages,
        //   },
        // },
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
    const newData = req.body;
    const { id: productId } = req.params;

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

    const updatedProduct = await prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        ...newData,
        Image: {
          createMany: {
            data: uploadedImages,
          },
        },
      },
    });

    res.status(201).json({
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
      res.status(400);
      throw new Error('This product does not exist.');
    }

    await prisma.product.delete({
      where: {
        id: productId,
      },
    });
  }
);
