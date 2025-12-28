import { Request, Response, NextFunction } from 'express';
import expressAsyncHandler from 'express-async-handler';

import jwt from 'jsonwebtoken';

export const optionalAuth = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.accessToken;

    if (token) {
      try {
        const decodeToken = jwt.verify(
          token,
          process.env.JWT_TOKEN_SECRET as string
        ) as USER;

        req.user = decodeToken;
      } catch {}
    }

    next();
  }
);
