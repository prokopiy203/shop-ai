import { NextFunction, Request, Response } from 'express';
import { z, ZodError } from 'zod';
import { ValidationError } from '../errors/AppError';

export const validate = (schema: z.Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed = schema.parse(req.body);
      req.body = parsed;
      next();
    } catch (err: any) {
      if (err instanceof ZodError) {
        return next(
          new ValidationError('Validation error', {
            code: 'VALIDATION_ERROR',
            details: err.issues.map((issue) => ({
              field: issue.path.join('.'),
              message: issue.message,
            })),
          }),
        );
      }

      return next(err);
    }
  };
};
