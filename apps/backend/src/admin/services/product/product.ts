import { Category, Product } from '@/api/models';
import { AppError, ValidationError } from '@/core/errors/AppError';
import type { CreateProductData, UpdateProductData } from '@shop-ai/types';
import { generateSlug } from '@/api/utils/product/generateSlug';
import { generateTextEmbedding } from '@/modules/ai/vector-engine/text/generateTextEmbedding';
import { updateProductVector } from '@/modules/ai/vector-engine';
import { normalizeCharacteristics } from '@/api/utils/product/normalizeCharacteristics';
import { mergeCharacteristics } from '@/api/utils/product/mergeCharacteristics';
import { deleteCharacteristics } from '@/api/utils/product/deleteCharacteristics';
import { generateUniqueSKU } from '@/api/utils/product/generateSku';
import { buildAdminProductQuery } from '@/admin/utils/product/buildAdminProductQuery';

export const getAdminProductsService = async (
  query: Record<string, any> = {},
  { page = 1, limit = 20, sortBy = 'createdAt', sortOrder = 'desc' } = {},
) => {
  const skip = (page - 1) * limit;

  const sort: Record<string, 1 | -1> = {
    [sortBy]: sortOrder === 'asc' ? 1 : -1,
  };

  const mongoQuery = buildAdminProductQuery(query);
  mongoQuery.deleted = false;

  const [products, total] = await Promise.all([
    Product.find(mongoQuery)
      .select('title sku price stock images category isActive createdAt')
      .populate({
        path: 'images',
        select: 'thumbnail thumbnail2x',
        options: { limit: 1 },
      })
      .populate({
        path: 'category',
        select: 'name slug',
      })
      .skip(skip)
      .limit(limit)
      .sort(sort),

    Product.countDocuments(mongoQuery),
  ]);

  return {
    items: products,
    total,
    page,
    pages: Math.ceil(total / limit),
  };
};

export const createProductService = async (data: CreateProductData) => {
  const {
    title,
    description,
    price,
    category,
    stock = 0,
    tags = [],
    characteristics = [],
    brand,
  } = data;

  const categoryDoc = await Category.findById(category).lean();
  if (!categoryDoc) throw new ValidationError('Category not found');

  const sku = await generateUniqueSKU(categoryDoc.name, brand);

  const slug = await generateSlug(title);

  if (await Product.findOne({ slug })) {
    throw new ValidationError(
      'Product with this title already exists. Please use a different title.',
    );
  }

  const textVector = await generateTextEmbedding({
    title,
    description,
    tags,
    brand,
  });

  const normalizedCharacteristic = await normalizeCharacteristics(characteristics);

  const createdProduct = await Product.create({
    title,
    slug,
    sku,
    brand,
    description,
    price,
    category,
    stock,
    tags,
    characteristics: normalizedCharacteristic,
    textVector,
    vector: [],
    images: [],
    gallery: [],
    videos: [],
  });

  return createdProduct;
};

export const updateProductService = async (id: string, data: UpdateProductData) => {
  const existing = await Product.findById(id).select(
    'title description tags textVector vector images _id brand characteristics',
  );

  if (!existing) {
    throw new AppError(404, 'Product not found');
  }

  delete data.slug;

  /** --------------------------
   *  DETECT TEXT CHANGES
   * -------------------------- */
  const titleChanged = data.title && data.title.trim() !== existing.title.trim();

  const descriptionChanged =
    data.description && data.description.trim() !== existing.description.trim();

  const tagsChanged =
    Array.isArray(data.tags) && JSON.stringify(data.tags) !== JSON.stringify(existing.tags);

  const brandChanged =
    typeof data.brand === 'string' && data.brand.trim() !== existing.brand?.trim();

  const textChanged = titleChanged || descriptionChanged || tagsChanged || brandChanged;

  /** --------------------------
   *  DETECT CHARACTERISTICS CHANGED
   * -------------------------- */
  let characteristicsChanged = false;

  // 1) MERGE characteristics
  if (Array.isArray(data.characteristics)) {
    const normalized = normalizeCharacteristics(data.characteristics);

    const merged = mergeCharacteristics(existing.characteristics || [], normalized);

    if (JSON.stringify(merged) !== JSON.stringify(existing.characteristics)) {
      data.characteristics = merged;
      characteristicsChanged = true;
    } else {
      delete data.characteristics;
    }
  }

  // 2) DELETE characteristics
  if (Array.isArray(data.removeCharacteristics) && data.removeCharacteristics.length > 0) {
    const filtered = deleteCharacteristics(
      data.characteristics ?? existing.characteristics,
      data.removeCharacteristics,
    );

    if (JSON.stringify(filtered) !== JSON.stringify(existing.characteristics)) {
      data.characteristics = filtered;
      characteristicsChanged = true;
    }

    delete data.removeCharacteristics;
  }

  /** --------------------------
   *  SLUG UPDATE IF NEEDED
   * -------------------------- */
  if (titleChanged || tagsChanged) {
    const newSlug = generateSlug(
      `${data.title ?? existing.title} ${(data.tags ?? existing.tags).join(' ')}`,
    );

    const slugExists = await Product.findOne({
      slug: newSlug,
      _id: { $ne: id },
    });

    if (slugExists) {
      throw new AppError(400, 'Product with this title already exists');
    }

    data.slug = newSlug;
  }

  /** --------------------------
   *  UPDATE MAIN PRODUCT FIELDS
   * -------------------------- */
  const updated = await Product.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  if (!updated) {
    throw new AppError(404, 'Product update failed');
  }

  /** --------------------------
   *  VECTOR ENGINE UPDATE
   * -------------------------- */
  await updateProductVector({
    productId: id,
    textChanged,
    skipTextUpdate: !textChanged,
    textContent: {
      title: data.title ?? existing.title,
      description: data.description ?? existing.description,
      tags: data.tags ?? existing.tags,
      brand: data.brand ?? existing.brand,
    },
  });

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
