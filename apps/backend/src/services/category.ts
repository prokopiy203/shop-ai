import { Category } from '@/config/db/models';
import { ValidationError } from '@/errors';
import { generateSlug } from '@/utils/generateSlug';
import { Category as ICategory, CreateCategoryData } from '@shopai/types';

export const createCategoryService = async (data: CreateCategoryData) => {
  const slug = generateSlug(data.name);

  const existing = await Category.findOne({ slug });

  if (existing) {
    throw new ValidationError('Category with this name already exists.', {
      code: 'CATEGORY_EXISTS',
      details: [{ field: 'name' }],
    });
  }

  const category = await Category.create({
    name: data.name,
    slug,
    description: data.description || '',
  });
  return category;
};
