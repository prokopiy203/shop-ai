import { Request, Response, NextFunction } from 'express';
import { Schema } from 'joi';
import { ValidationError } from '../errors/AppError';

/**
 * Middleware для валідації даних через Joi схему
 */
export const validate = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const errorMessages = error.details.map((detail) => detail.message).join(', ');
      return next(
        new ValidationError(errorMessages, {
          code: 'VALIDATION_ERROR',
          details: error.details.map((detail) => ({
            field: detail.path.join('.'),
            message: detail.message,
          })),
        }),
      );
    }

    // Замінюємо req.body на валідовані та очищені дані
    req.body = value;
    next();
  };
};

