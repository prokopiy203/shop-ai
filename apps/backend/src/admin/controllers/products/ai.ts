import {
  generateAdminProductDescriptionService,
  generateAdminProductTagsService,
} from '@/admin/services/product/ai/ai';
import { Product } from '@/api/models';
import { ValidationError } from '@/core/errors';
import { ApiSuccessResponse } from '@shop-ai/types';
import { Request, Response } from 'express';

export const generateProductTagsController = async (
  req: Request<{ id: string }, ApiSuccessResponse>,
  res: Response<ApiSuccessResponse>,
) => {
  const product = await Product.findById(req.params.id).populate('image').lean();

  if (!product) {
    throw new ValidationError('Product not found');
  }

  const categoryName = typeof product.category === 'string' ? undefined : product.category?.name;

  const mainImage = typeof product.image === 'string' ? undefined : product.image;

  const tags = await generateAdminProductTagsService({
    title: product.title,
    description: product.description,
    category: categoryName,
    brand: product.brand,
    visionDescription: mainImage?.visionDescription,
  });

  res.json({
    success: true,
    message: 'Tags generated successfully',
    data: tags,
  });
};

export const generateProductDescriptionController = async (req: Request, res: Response) => {
  const productId = req.params.id as string;

  const result = await generateAdminProductDescriptionService(productId, req.body);

  res.status(200).json({
    success: true,
    message: 'Description generated successfully',
    data: result,
  });
};
