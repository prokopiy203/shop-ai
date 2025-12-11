import { Request, Response, NextFunction } from 'express';
import { HttpError } from 'http-errors-enhanced';
import { AppError } from './AppError';
import { ZodError } from 'zod';

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  const isDev = process.env.NODE_ENV !== 'production';

  console.error('🔥 ERROR:', {
    name: err.name,
    message: err.message,
    status: err.status || err.statusCode,
    stack: err.stack,
    path: req.originalUrl,
    method: req.method,
    body: req.body,
    params: req.params,
    query: req.query,
  });

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
      ...(isDev && { stack: err.stack }),
    });
  }

  // 2️⃣ Custom AppError or HttpError
  if (err instanceof AppError || err instanceof HttpError) {
    const status = err.statusCode || err.status || 400;

    return res.status(status).json({
      success: false,
      status,
      message: err.message,
      code: err.code || err.name,
      ...(err.details && { details: err.details }),
      ...(err.context && { context: err.context }),
      ...(isDev && { stack: err.stack }),
    });
  }

  // 3️⃣ Unexpected errors
  return res.status(500).json({
    success: false,
    status: 500,
    message: isDev ? err.message : 'Internal Server Error',
    ...(isDev && {
      name: err.name,
      stack: err.stack,
    }),
  });
}
