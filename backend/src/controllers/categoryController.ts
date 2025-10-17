import { NextFunction, Request, Response } from 'express';

import expressAsyncHandler from 'express-async-handler';
import prisma from '../lib/prisma';
import { CategorySchema } from '../schemas/categorySchema';

//@desc fetch categories
//@route GET api/category
//@access public
export const getCategories = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const categories = await prisma.category.findMany();

    res.json({
      success: true,
      message: 'Successful',
      data: { categories },
    });
  }
);

//@desc fetch category
//@route GET api/category
//@access public
export const getCategory = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id: categoryId } = req.params;

    const category = await prisma.category.findUnique({
      where: {
        id: categoryId,
      },
    });

    if (!category) {
      res.status(400);
      throw new Error('The category does not exist.');
    }

    res.json({
      success: true,
      message: 'Successful',
      data: { category },
    });
  }
);

//@desc Create a category
//@route POST api/category
//@access private(ADMIN ONLY)
export const createCategory = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.body as CategorySchema;

    const nameLowercase = name.toLowerCase();

    const isAdmin = req.user.role === 'ADMIN';

    if (!isAdmin) {
      res.status(401);
      throw new Error('You are not allowed to create a category.');
    }

    const category = await prisma.category.findUnique({
      where: {
        name: nameLowercase,
      },
    });

    if (category) {
      res.status(400);
      throw new Error('This category already exist.');
    }

    const newCategory = await prisma.category.create({
      data: {
        name: nameLowercase,
      },
    });

    res.json({
      success: true,
      message: 'Category created successfully',
      data: { category: newCategory },
    });
  }
);

//@desc Update a category
//@route PUT api/category/:id
//@access private(ADMIN ONLY)
export const updateCategory = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.body as CategorySchema;
    const { id: categoryId } = req.params;

    const nameLowercase = name.toLowerCase();

    const isAdmin = req.user.role === 'ADMIN';

    if (!isAdmin) {
      res.status(401);
      throw new Error('You are not allowed to update this category.');
    }

    const categoryName = await prisma.category.findUnique({
      where: { name: nameLowercase },
    });

    if (categoryName && categoryName.id !== categoryId) {
      res.status(400);
      throw new Error('This category name already exists.');
    }

    const updatedCategory = await prisma.category.update({
      where: {
        id: categoryId,
      },
      data: {
        name: nameLowercase,
      },
    });

    res.json({
      success: true,
      message: 'Category updated successfully',
      data: { category: updatedCategory },
    });
  }
);

//@desc delete  category
//@route DELETE api/category/:id
//@access private(ADMIN ONLY)
export const deleteCategory = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id: categoryId } = req.params;

    const isAdmin = req.user.role === 'ADMIN';

    if (!isAdmin) {
      res.status(401);
      throw new Error('You are not allowed to delete a category.');
    }

    await prisma.category.delete({
      where: {
        id: categoryId,
      },
    });

    res.json({
      success: true,
      message: 'Category deleted successfully',
    });
  }
);
