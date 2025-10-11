import { Request, Response, NextFunction } from 'express';
import expressAsyncHandler from 'express-async-handler';

import jwt from 'jsonwebtoken';

export const validateToken = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.accessToken;

    if (!token) {
      res.status(401);
      throw new Error('Token not found.');
    }

    try {
      const decodeToken = jwt.verify(
        token,
        process.env.JWT_TOKEN_SECRET as string
      ) as USER;

      req.user = decodeToken;

      next();
    } catch (error) {
      res.status(401);
      throw new Error('Invalid or expired token.');
    }
  }
);
