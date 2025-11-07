import { NextFunction, Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import prisma from '../lib/prisma';
import { ColorSchema, UpdateColorSchema } from '../schemas/colorSchema';

//@desc fetch colors
//@route GET api/colors/
//@access PUBLIC
export const getColors = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const colors = await prisma.color.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    res.json({
      success: true,
      message: 'Successful.',
      colors,
    });
  }
);

//@desc create a color
//@route POST api/colors/
//@access PRIVATE(ADMINS ONLY)
export const createColor = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body as ColorSchema;

    const color = await prisma.color.create({
      data,
    });

    res.status(201).json({
      success: true,
      message: 'Successful.',
      color,
    });
  }
);

//@desc update a color
//@route PATCH api/colors/:id
//@access PRIVATE(ADMINS ONLY)
export const updateColor = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const data = req.body as UpdateColorSchema;

    const color = await prisma.color.update({
      where: {
        id,
      },
      data,
    });

    res.json({
      success: true,
      message: 'Successful.',
      color,
    });
  }
);

//@desc delete a color
//@route DELETE api/colors/:id
//@access PRIVATE(ADMINS ONLY)
export const deleteColor = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    await prisma.color.delete({
      where: {
        id,
      },
    });

    res.json({
      success: true,
      message: 'Successful.',
    });
  }
);
