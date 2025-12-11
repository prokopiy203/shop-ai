import { buildProductQuery } from '@/api/utils/product/buildProductQuery';
import { Product } from '@/api/models';
import { ValidationError } from '@/core/errors/AppError';
import type { PaginationParams, ProductResponse } from '@shopai/types';
import { HttpError } from 'http-errors-enhanced';

export const getAllProductsService = async (
  query: Record<string, any> = {},
  { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc' }: PaginationParams = {},
): Promise<{ products: ProductResponse[]; total: number; page: number; pages: number }> => {
  const skip = (page - 1) * limit;

  const sort: Record<string, 1 | -1> = {
    [sortBy]: sortOrder === 'asc' ? 1 : -1,
  };

  const mongoQuery = buildProductQuery(query);
  mongoQuery.deleted = false;

  const [products, total] = await Promise.all([
    Product.find(mongoQuery)
      .select('title slug price rating stock category images')
      .populate({
        path: 'category',
        select: 'name slug',
      })
      .populate({
        path: 'images',
        select: 'thumbnail thumbnail2x',
      })
      .skip(skip)
      .limit(limit)
      .sort(sort),
    Product.countDocuments(mongoQuery),
  ]);

  if (products.length === 0) {
    throw new HttpError(404, 'Not found products');
  }

  return {
    products,
    total,
    page,
    pages: Math.ceil(total / limit),
  };
};

export const getProductByIdService = async (id: string) => {
  const product = await Product.findById(id)
    .select('-createdAt -updatedAt')
    .populate('images')
    .populate('videos', 'publicId url poster duration width height alt title ratio')
    .populate('category', 'name slug')
    .exec();

  if (!product) {
    throw new ValidationError('Product not found');
  }

  return product;
};
