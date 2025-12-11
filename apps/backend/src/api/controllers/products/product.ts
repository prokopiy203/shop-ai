import { Request, Response } from 'express';
import { getAllProductsService, getProductByIdService } from '@/api/services/product/product';

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

export const getProductByIdController = async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };

  const product = await getProductByIdService(id);

  res.status(200).json({
    success: true,
    message: 'Product fetched successfully',
    data: product,
  });
};
