import { buildProductQuery } from '../utils/buildProductQuery';
import { Category, Product } from '../config/db/models';
import { ValidationError } from '../errors/AppError';
import type { CreateProductData, PaginationParams, ProductResponse } from '@shopai/types';
import { HttpError } from 'http-errors-enhanced';
import { generateSlug } from '@/utils/generateSlug';

export const createProductService = async (data: CreateProductData) => {
  const slug = generateSlug(data.title);

  const existing = await Product.findOne({ slug });

  if (existing) {
    throw new ValidationError('Product with title already exists.Please use a different title.', {
      code: 'DUPLICATE_SLUG',
      details: [{ field: 'title', value: data.title }],
    });
  }

  const product = await new Product({
    title: data.title,
    slug,
    description: data.description || '',
    price: data.price,
    images: data.images || [],
    category: data.category,
    stock: data.stock ?? 0,
    tags: data.tags || [],
  });

  await product.save();

  return product;
};

export const getAllProducts = async (
  query: Record<string, any> = {},
  { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc' }: PaginationParams = {},
): Promise<{ products: ProductResponse[]; total: number; page: number; pages: number }> => {
  const skip = (page - 1) * limit;

  const sort: Record<string, 1 | -1> = {
    [sortBy]: sortOrder === 'asc' ? 1 : -1,
  };

  const mongoQuery = buildProductQuery(query);

  const [products, total] = await Promise.all([
    Product.find(mongoQuery).skip(skip).limit(limit).sort(sort),
    Product.countDocuments(mongoQuery),
  ]);

  if (products.length === 0) {
    throw new HttpError(401, 'Not found products');
  }

  return {
    products,
    total,
    page,
    pages: Math.ceil(total / limit),
  };
};
