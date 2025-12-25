import { Request, Response } from 'express';
import {
  createProductService,
  deletedProductService,
  getAdminProductsService,
  updateProductService,
} from '@/admin/services/product/product';
import type { CreateProductData, ApiSuccessResponse, UpdateProductData } from '@shop-ai/types';
import { AppError } from '@/core/errors';

export const getAdminProductsController = async (req: Request, res: Response) => {
  const pagination = {
    page: Number(req.query.page) || 1,
    limit: Number(req.query.limit) || 20,
    sortBy: (req.query.sortBy as string) || 'createdAt',
    sortOrder: (req.query.sortOrder as 'asc' | 'desc') || 'desc',
  };

  const filters = { ...req.query };

  const products = await getAdminProductsService(filters, pagination);

  res.status(200).json({
    success: true,
    message: 'Product loaded successfully',
    data: products,
  });
};

export const createProductController = async (
  req: Request<{}, ApiSuccessResponse, CreateProductData>,
  res: Response<ApiSuccessResponse>,
) => {
  const product = await createProductService(req.body);

  res.status(201).json({
    success: true,
    message: 'Product successfully created!',
    data: product,
  });
};

export const updateProductController = async (
  req: Request<{ id: string }, {}, UpdateProductData>,
  res: Response,
) => {
  const { id } = req.params;

  if (!id) {
    throw new AppError(400, 'Product ID is required');
  }

  const updateProduct = await updateProductService(id, req.body);

  res.status(200).json({
    message: 'Product update successfully!',
    data: updateProduct,
  });
};

export const deleteProductController = async (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;

  if (!id) {
    throw new AppError(400, 'Product ID is required', {
      code: 'PRODUCT_ID_REQUIRED',
      details: [{ field: 'id' }],
    });
  }

  const result = await deletedProductService(id);

  res.status(200).json({
    message: 'Product successfully deleted!',
    data: result,
  });
};
