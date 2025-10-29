import { HttpError } from 'http-errors-enhanced';

export interface ErrorMeta {
  code?: string;
  details?: Record<string, any>;
  context?: string;
}

export class AppError extends HttpError {
  constructor(statusCode: number, message: string, meta?: ErrorMeta) {
    super(statusCode, message, meta);
    this.name = 'AppError';
  }
}

export class NotFoundError extends AppError {
  constructor(message = 'Resource not found', meta?: ErrorMeta) {
    super(404, message, meta);
  }
}

export class AuthError extends AppError {
  constructor(message = 'Unauthorized', meta?: ErrorMeta) {
    super(401, message, meta);
  }
}

export class ValidationError extends AppError {
  constructor(message = 'Validation error', meta?: ErrorMeta) {
    super(400, message, meta);
  }
}
