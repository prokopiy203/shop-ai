import { Request, Response } from 'express';
import {
  createProductService,
  deletedProductService,
  getAllProductsService,
  updateProductService,
} from '../../services/product/product';
import type { CreateProductData, ApiSuccessResponse, UpdateProductData } from '@shopai/types';
import { AppError } from '@/errors';

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

export const getProductController = async (req: Request, res: Response) => {
  const pagination = {
    page: Number(req.query.page) || 1,
    limit: Number(req.query.limit) || 10,
    sortBy: (req.query.sortBy as string) || 'createdAt',
    sortOrder: (req.query.sortOrder as 'asc' | 'desc') || 'desc',
  };

  const filters = { ...req.query };

  const product = await getAllProductsService(filters, pagination);

  console.log('Result from getAllProducts:', JSON.stringify(product, null, 2));

  res.status(201).json({
    message: 'Successfully get all Product',
    data: product,
  });
};

export const updateProductController = async (
  req: Request<{ id: string }, {}, UpdateProductData>,
  res: Response,
) => {
  const { id } = req.params;

  if (!id) {
    throw new AppError(400, 'Product ID is required', {
      code: 'PRODUCT_ID_REQUIRED',
      details: [{ field: 'id', message: 'Missing product ID in request params' }],
    });
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
