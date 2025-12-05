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

//@desc delete address
//@route DELETE api/addresses/:id
//@access PRIVATE
export const deleteAddress = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const userId = req.user.userId;

    const address = await prisma.address.findUnique({
      where: {
        id,
      },
      select: {
        default: true,
      },
    });

    if (!address) {
      res.status(404);
      throw new Error('Address not found');
    }

    await prisma.$transaction(async (tx) => {
      if (address.default) {
        const userAddresses = await tx.address.findMany({
          where: {
            userId,
            id: { not: id },
          },
          orderBy: { createdAt: 'asc' },
          select: {
            id: true,
          },
        });

        if (userAddresses.length >= 1) {
          await tx.address.update({
            where: {
              id: userAddresses[0].id,
            },
            data: {
              default: true,
            },
          });
        }
      }

      await tx.address.delete({
        where: {
          id,
        },
      });
    });

    res.json({
      success: true,
      message: 'Successful.',
    });
  }
);
