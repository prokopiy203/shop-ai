import { Request, Response, NextFunction } from 'express';
import { HttpError } from 'http-errors-enhanced';
import { AppError } from './AppError';

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  if (err instanceof AppError || err instanceof HttpError) {
    const status = err.statusCode || 500;

    return res.status(status).json({
      success: false,
      status,
      message: err.message,
      code: err.code || err.name,
      ...(err.details && { details: err.details }),
      ...(err.context && { context: err.context }),
    });
  }

  return res.status(500).json({
    success: false,
    status: 500,
    message: 'Internal Server Error',
  });
}
