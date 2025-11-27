import { AppError } from '@/errors';
import {
  createCategoryService,
  getAllCategoriesServices,
  getCategoryByIdService,
  removeCategoryServices,
  updateCategoryService,
} from '@/services/category';
import { Category, CreateCategoryData, UpdateCategoryData } from '@shopai/types';
import { Request, Response } from 'express';

export const getCategoriesController = async (req: Request<{}, {}, Category>, res: Response) => {
  const categories = await getAllCategoriesServices(req.query);

  return res.status(200).json({
    message: 'Successfully found categories!',
    data: categories,
  });
};

export const createCategoryController = async (
  req: Request<{}, {}, CreateCategoryData>,
  res: Response,
) => {
  const category = await createCategoryService(req.body);

  res.status(201).json({
    message: 'Successfully created category!',
    data: category,
  });
};

export const removeCategoriesController = async (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;

  if (!id) {
    throw new AppError(400, 'Category ID is required', {
      code: 'CATEGORY_ID_REQUIRED',
      details: [{ field: 'id' }],
    });
  }

  const deletedCategory = await removeCategoryServices(id);

  res.status(200).json({
    message: 'Category successfully deleted!',
    data: deletedCategory,
  });
};

export const getCategoryByIdController = async (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;

  if (!id) {
    throw new AppError(400, 'Category ID is required', {
      code: 'CATEGORY_ID_REQUIRED',
      details: [{ field: 'id' }],
    });
  }

  const category = await getCategoryByIdService(id);

  res.status(200).json({
    message: 'Category successfully found!',
    data: category,
  });
};

export const updateCategoryController = async (
  req: Request<{ id: string }, {}, UpdateCategoryData>,
  res: Response,
) => {
  const { id } = req.params;

  if (!id) {
    throw new AppError(400, 'Category ID is required', {
      code: 'CATEGORY_ID_REQUIRED',
      details: [{ field: 'id' }],
    });
  }

  const updateCategory = await updateCategoryService(id, req.body);

  res.status(200).json({
    message: 'Category successfully updated!',
    data: updateCategory,
  });
};
