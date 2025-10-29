import { NextFunction, Request, Response } from 'express';

function errorHandler(
  error: Error & { code?: number | string },
  req: Request,
  res: Response,
  next: NextFunction
) {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = res.statusCode === 500 ? error.message : 'Something went wrong';

  if (error?.code === 'P2025') {
    statusCode = 404;
    message = 'Resource not found';
  }

  res.status(statusCode).json({
    success: false,
    message: process.env.NODE_ENV === 'development' ? error.message : message,
    stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
  });
}

function notFoundHandler(req: Request, res: Response, next: NextFunction) {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
}

export { errorHandler, notFoundHandler };
