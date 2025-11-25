import { Request, Response, NextFunction } from 'express';
import { HttpError } from 'http-errors-enhanced';
import { AppError } from './AppError';
import { ZodError } from 'zod';

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  console.error('🔥 ERROR:', err);

  // 1️⃣ Zod validation errors
  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      status: 400,
      message: 'Validation error',
      code: 'VALIDATION_ERROR',
      details: err.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
      })),
    });
  }

  // 2️⃣ Custom AppError
  if (err instanceof AppError || err instanceof HttpError) {
    const status = err.statusCode || err.status || 400;

    return res.status(status).json({
      success: false,
      status,
      message: err.message,
      code: err.code || err.name,
      ...(err.details && { details: err.details }),
      ...(err.context && { context: err.context }),
    });
  }

  // 3️⃣ Other unexpected errors
  return res.status(500).json({
    success: false,
    status: 500,
    message: 'Internal Server Error',
  });
}
