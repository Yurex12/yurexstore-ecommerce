import { Request, Response, NextFunction } from 'express';

export const requireAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user.role !== 'ADMIN') {
    res.status(403);
    throw new Error('Admin access required');
  }
  next();
};
