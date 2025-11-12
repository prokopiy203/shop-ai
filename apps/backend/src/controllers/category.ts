import { createCategoryService } from '@/services/category';
import { CreateCategoryData } from '@shopai/types';
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
