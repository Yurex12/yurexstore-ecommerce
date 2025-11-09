import { NextFunction, Request, Response } from 'express';

import expressAsyncHandler from 'express-async-handler';
import prisma from '../lib/prisma';
import {
  CategorySchema,
  CategoryUpdateSchema,
} from '../schemas/categorySchema';
import { slugify } from '../utils/helpers';
import { client } from '../config/imagekit';

//@desc fetch categories
//@route GET api/category
//@access public
export const getCategories = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const categories = await prisma.category.findMany();

    res.json({
      success: true,
      message: 'Successful',
      categories,
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
      category,
    });
  }
);

//@desc Create a category
//@route POST api/category
//@access private(ADMIN ONLY)
export const createCategory = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, ...rest } = req.body as CategorySchema;

    const slug = slugify(name);

    const category = await prisma.category.findUnique({
      where: {
        slug,
      },
    });

    if (category) {
      res.status(400);
      throw new Error('This category already exist.');
    }

    const newCategory = await prisma.category.create({
      data: {
        name,
        slug,
        ...rest,
      },
    });

    res.json({
      success: true,
      message: 'Category created successfully',
      category: newCategory,
    });
  }
);

//@desc Update a category
//@route PATCH api/category/:id
//@access private(ADMIN ONLY)
export const updateCategory = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, ...rest } = req.body as CategoryUpdateSchema;
    const { id: categoryId } = req.params;

    const updateData: CategoryUpdateSchema & { slug?: string } = { ...rest };

    if (name) {
      const category = await prisma.category.findUnique({
        where: { name },
      });

      if (category && category.id !== categoryId) {
        res.status(409);
        throw new Error('This category name already exists.');
      }

      updateData.name = name.toLowerCase();
      updateData.slug = slugify(name);
    }

    const updatedCategory = await prisma.category.update({
      where: {
        id: categoryId,
      },
      data: updateData,
    });

    res.json({
      success: true,
      message: 'Category updated successfully',
      category: updatedCategory,
    });
  }
);

//@desc delete  category
//@route DELETE api/category/:id
//@access private(ADMIN ONLY)
export const deleteCategory = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { id: categoryId } = req.params;

    const { fileId } = await prisma.category.delete({
      where: { id: categoryId },
    });

    client.files.delete(fileId).catch(() => {});

    res.json({
      success: true,
      message: 'Category deleted successfully',
    });
  }
);
