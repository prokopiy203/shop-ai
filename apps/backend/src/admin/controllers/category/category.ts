import { AppError } from '@/core/errors';
import {
  createCategoryService,
  getCategoryByIdService,
  removeCategoryServices,
  updateCategoryService,
} from '@/admin/services/category/category';
import { CreateCategoryData, UpdateCategoryData } from '@shopai/types';
import { Request, Response } from 'express';

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
    throw new AppError(400, 'Category ID is required');
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
    throw new AppError(400, 'Category ID is required');
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
    throw new AppError(400, 'Category ID is required');
  }

  const updateCategory = await updateCategoryService(id, req.body);

  res.status(200).json({
    message: 'Category successfully updated!',
    data: updateCategory,
  });
};
