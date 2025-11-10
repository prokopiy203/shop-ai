import { Product } from '../config/db/models';
import { ValidationError } from '../errors/AppError';

interface CreateProductData {
  title: string;
  description?: string;
  price: number;
  category: string;
  stock?: number;
  tags?: string[];
  images?: string[];
}

/**
 * Генерує slug з title
 */
const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Видаляємо спецсимволи
    .replace(/[\s_-]+/g, '-') // Замінюємо пробіли та підкреслення на дефіси
    .replace(/^-+|-+$/g, ''); // Видаляємо дефіси на початку та в кінці
};

/**
 * Створює новий продукт
 */
export const createProduct = async (data: CreateProductData) => {
  try {
    const slug = generateSlug(data.title);

    const product = new Product({
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
  } catch (error: any) {
    // Обробка помилки дублікату slug (MongoDB error code 11000)
    if (error.code === 11000) {
      throw new ValidationError(
        'Product with this title already exists. Please use a different title.',
        {
          code: 'DUPLICATE_SLUG',
          details: { field: 'title' },
        },
      );
    }

    // Перекидаємо інші помилки далі
    throw error;
  }
};
