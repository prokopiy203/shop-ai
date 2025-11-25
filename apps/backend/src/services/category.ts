import { Category } from '@/config/db/models';
import { AppError, ValidationError } from '@/errors';
import { generateSlug } from '@/utils/generateSlug';
import { Category as ICategory, CreateCategoryData, UpdateCategoryData } from '@shopai/types';

export const getAllCategoriesServices = async (filter: Record<string, any>) => {
  const categories = await Category.find(filter);

  return categories;
};

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

export const removeCategoryServices = async (id: string) => {
  const deletedCategory = await Category.findByIdAndDelete(id);

  if (!deletedCategory) {
    throw new AppError(404, 'Category not found', {
      code: 'CATEGORY_NOT_FOUND',
      details: [{ field: 'id', message: 'Category does not exist' }],
    });
  }

  return deletedCategory;
};

export const getCategoryByIdService = async (id: string) => {
  const category = await Category.findById(id);

  if (!category) {
    throw new AppError(404, 'Category not found', {
      code: 'CATEGORY_NOT_FOUND',
      details: [{ field: 'id', message: 'Category does not exist' }],
    });
  }

  return category;
};

export const updateCategoryService = async (id: string, data: UpdateCategoryData) => {
  const category = await Category.findById(id);

  if (!category) {
    throw new AppError(404, 'Category not found', {
      code: 'CATEGORY_NOT_FOUND',
      details: [{ field: 'id', message: 'Category does not exist' }],
    });
  }

  if (data.name && data.name !== category.name) {
    const newSlug = generateSlug(data.name);

    const existing = await Category.findOne({ slug: newSlug });

    if (existing && existing._id.toString() !== id) {
      throw new ValidationError('Category with this name already exists.', {
        code: 'CATEGORY_EXISTS',
        details: [{ field: 'name' }],
      });
    }
    data.slug = newSlug;
  }

  const updateCategory = await Category.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  return updateCategory;
};
