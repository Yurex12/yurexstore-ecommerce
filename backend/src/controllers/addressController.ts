import { NextFunction, Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';

import prisma from '../lib/prisma';
import { AddressSchema } from '../schemas/addressSchema';

//@desc fetch user Address
//@route GET api/addresses/
//@access Private
export const getAddresses = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user.userId;

    const addresses = await prisma.address.findMany({
      where: {
        userId,
      },
    });

    res.json({
      success: true,
      message: 'Successful.',
      addresses: addresses,
    });
  }
);

//@desc create an Address
//@route POST api/addresses/
//@access Private
export const createAddress = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user.userId;

    const { default: isDefault, ...rest } = req.body as AddressSchema;

    const hasAddress = await prisma.address.count({ where: { userId } });
    const makeDefault = hasAddress === 0 || isDefault;

    if (makeDefault) {
      const prevDefault = await prisma.address.findFirst({
        where: { userId, default: true },
      });

      if (prevDefault) {
        await prisma.address.update({
          where: { id: prevDefault.id },
          data: { default: false },
        });
      }
    }

    const newAddress = await prisma.address.create({
      data: { ...rest, default: makeDefault, userId },
    });

    res.status(201).json({
      success: true,
      message: 'Successful.',
      address: newAddress,
    });
  }
);
