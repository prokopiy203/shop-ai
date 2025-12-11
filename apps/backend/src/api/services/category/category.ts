import { Category } from '@/api/models';
import { ValidationError } from '@/core/errors';
import { generateSlug } from '@/api/utils/product/generateSlug';
import { CreateCategoryData, UpdateCategoryData } from '@shopai/types';

export const getAllCategoriesServices = async (filter: Record<string, any>) => {
  const categories = await Category.find(filter);

  return categories;
};

export const createCategoryService = async (data: CreateCategoryData) => {
  const slug = generateSlug(data.name);

  const existing = await Category.findOne({ slug });

  if (existing) {
    throw new ValidationError('Category with this name already exists.');
  }

  const category = await Category.create({
    name: data.name,
    slug,
    description: data.description || '',
  });
  return category;
};
