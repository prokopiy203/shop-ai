import { buildProductQuery } from '../utils/buildProductQuery';
import { Product } from '../config/db/models';
import { AppError, ValidationError } from '../errors/AppError';
import type {
  CreateProductData,
  PaginationParams,
  ProductResponse,
  UpdateProductData,
} from '@shopai/types';
import { HttpError } from 'http-errors-enhanced';
import { generateSlug } from '@/utils/generateSlug';
import { generateEmbedding } from '@/utils/generateEmbedding';
import { da } from 'zod/v4/locales';

export const createProductService = async (data: CreateProductData) => {
  const slug = generateSlug(data.title);

  const existing = await Product.findOne({ slug });
  if (existing) {
    throw new ValidationError('Product with title already exists.Please use a different title.', {
      code: 'DUPLICATE_SLUG',
      details: [{ field: 'title', value: data.title }],
    });
  }

  const cleanText = [data.title, data.description, ...(data.tags || [])].filter(Boolean).join(' ');

  let vector: number[] = [];
  try {
    vector = await generateEmbedding(cleanText);
  } catch (err) {
    console.error('Embedding generation failed:', err);
    vector = [];
  }

  const product = await Product.create({
    ...data,
    slug,
    vector,
  });

  return product;
};

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
      .populate({ path: 'category', select: 'name slug description imageUrl' })
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

export const updateProductService = async (id: string, data: UpdateProductData) => {
  const existing = await Product.findById(id);

  if (!existing) {
    throw new AppError(404, 'Product not found', {
      code: 'PRODUCT_NOT_FOUND',
      details: [{ field: 'id', message: 'Product with this ID does not exist' }],
    });
  }

  delete data.slug;

  let titleChanged = false;
  if (typeof data.title === 'string') {
    const incoming = data.title.trim();
    if (incoming !== existing.title.trim()) {
      titleChanged = true;
    }
  }

  const descriptionChanged =
    typeof data.description === 'string' && data.description.trim() !== existing.description.trim();

  const tagsChanged =
    Array.isArray(data.tags) &&
    (data.tags.length !== existing.tags.length ||
      data.tags.some((tag, i) => tag !== existing.tags[i]));

  if (titleChanged || tagsChanged) {
    const newSlug = generateSlug(
      `${data.title ?? existing.title} ${(data.tags ?? existing.tags).join(' ')}`,
    );

    const slugExists = await Product.findOne({ slug: newSlug, _id: { $ne: id } });
    if (slugExists) {
      throw new AppError(400, 'Product with this title already exists', {
        code: 'SLUG_EXISTS',
        details: [{ field: 'title', message: 'Title must be unique' }],
      });
    }

    data.slug = newSlug;
  }

  const missingVector = !existing.vector || existing.vector.length === 0;

  const shouldUpdateVector = titleChanged || descriptionChanged || tagsChanged || missingVector;

  if (shouldUpdateVector) {
    const title = data.title ?? existing.title;
    const description = data.description ?? existing.description;
    const tags = data.tags ?? existing.tags;

    const clean = [title, description, ...tags].filter(Boolean).join(' ');

    try {
      data.vector = await generateEmbedding(clean);
    } catch (err) {
      console.error('VECTOR UPDATE FAILED:', err);
      data.vector = existing.vector;
    }
  }

  const updated = await Product.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  if (!updated) {
    throw new AppError(404, 'Product update failed', {
      code: 'PRODUCT_UPDATED_FAILED',
    });
  }

  return updated;
};

export const deletedProductService = async (id: string) => {
  const product = await Product.findById(id);

  if (!product) {
    throw new AppError(404, 'Product not found', {
      code: 'PRODUCT_NOT_FOUND',
      details: [{ field: 'id', message: 'Product with this ID does not exist' }],
    });
  }

  await Product.findByIdAndDelete(id);

  return { deleted: true, id };
};

export const softDeleteProductService = async (id: string) => {
  const product = await Product.findById(id);

  if (!product) {
    throw new AppError(404, 'Product not found', {
      code: 'PRODUCT_NOT_FOUND',
      details: [{ field: 'id' }],
    });
  }

  if (product.deleted) {
    return { deleted: true, id, alreadyDeleted: true };
  }

  product.deleted = true;
  product.deletedAt = new Date();
  await product.save();

  return { deleted: true, id };
};

export const restoreProductService = async (id: string) => {
  const product = await Product.findById(id);

  if (!product) {
    throw new AppError(404, 'Product not found', {
      code: 'PRODUCT_NOT_FOUND',
      details: [{ field: 'id' }],
    });
  }

  if (!product.deleted) {
    return { id, restored: false, message: 'Product is not deleted' };
  }

  product.deleted = false;
  product.deletedAt = null;
  await product.save();

  return { restored: true, id };
};

export const getDeletedProductService = async () => {
  return await Product.find({ deleted: true }).sort({ deletedAT: -1 });
};
