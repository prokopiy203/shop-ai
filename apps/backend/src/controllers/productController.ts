import { Request, Response, NextFunction } from 'express';
import { createProduct as createProductService } from '../services/productService';

/**
 * Контролер для створення продукту
 */
export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await createProductService(req.body);

    res.status(201).json({
      success: true,
      data: product,
    });
  } catch (error) {
    next(error);
  }
};
