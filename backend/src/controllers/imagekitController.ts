import { NextFunction, Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { client } from '../config/imagekit';

export const getAuth = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { token, expire, signature } =
      client.helper.getAuthenticationParameters();
    res.json({
      token,
      expire,
      signature,
      publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    });
  }
);
