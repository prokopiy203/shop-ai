/**
 * Дані для створення категорії
 */
export interface CreateCategoryData {
  name: string;
  description?: string;
  imageUrl?: string;
  parentCategory?: string | null;
  aiTags?: string[];
}

/**
 * Дані для оновлення категорії
 */
export interface UpdateCategoryData {
  name?: string;
  description?: string;
  slug?: string;
  imageUrl?: string;
  parentCategory?: string | null;
  aiTags?: string[];
}

/**
 * Категорія (повна інформація)
 */
export interface Category {
  _id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  parentCategory: string | Category | null;
  aiTags: string[];
  vector?: number[];
  createdAt: string;
  updatedAt: string;
}

/**
 * Категорія (для API відповіді)
 */
export interface CategoryResponse {
  _id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  parentCategory: string | CategoryResponse | null;
  aiTags: string[];
  createdAt: string;
  updatedAt: string;
}
