import { Request, Response, NextFunction } from 'express';
import z, { ZodError } from 'zod';

export function validateData(schema: z.ZodType) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedData = schema.parse(req.body);
      req.body = validatedData;
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const formattedErrors: Record<string, string[]> = {};
        error.issues.forEach((issue) => {
          const field = issue.path.join('.') || 'general';
          if (!formattedErrors[field]) formattedErrors[field] = [];
          formattedErrors[field].push(issue.message);
        });

        res.status(400).json({
          error: 'Invalid data',
          details: formattedErrors,
        });
      } else {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  };
}
