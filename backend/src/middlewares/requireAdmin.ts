import { Request, Response, NextFunction } from 'express';
import prisma from '../lib/prisma';
import expressAsyncHandler from 'express-async-handler';

export const requireAdmin = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.userId,
      },
      select: {
        role: true,
      },
    });

    if (!user) {
      res.status(401);
      throw new Error('User not found');
    }

    if (user.role !== 'ADMIN') {
      res.status(403);
      throw new Error('Admin access required');
    }

    next();
  }
);
