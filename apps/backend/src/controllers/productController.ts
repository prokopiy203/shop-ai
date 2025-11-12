import { Request, Response } from 'express';
import { createProductService, getAllProducts } from '../services/productService';
import type { CreateProductData, ApiSuccessResponse } from '@shopai/types';
import { limiter } from '@/config/rateLimit';

/**
 * Контролер для створення продукту
 */
export const createProduct = async (
  req: Request<{}, ApiSuccessResponse, CreateProductData>,
  res: Response<ApiSuccessResponse>,
) => {
  const product = await createProductService(req.body);

  res.status(201).json({
    success: true,
    data: product,
  });
};

export const getProduct = async (req: Request, res: Response) => {
  const pagination = {
    page: Number(req.query.page) || 1,
    limit: Number(req.query.limit) || 10,
    sortBy: (req.query.sortBy as string) || 'createdAt',
    sortOrder: (req.query.sortOrder as 'asc' | 'desc') || 'desc',
  };

  const filters = { ...req.query };

  const product = await getAllProducts(filters, pagination);

  console.log('Result from getAllProducts:', JSON.stringify(product, null, 2));

  res.status(201).json({
    message: 'Successfully get all Product',
    data: product,
  });
};
