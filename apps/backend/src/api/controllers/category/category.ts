import { getAllCategoriesServices } from '@/api/services/category/category';
import { Category } from '@shop-ai/types';
import { Request, Response } from 'express';

export const getCategoriesController = async (req: Request<{}, {}, Category>, res: Response) => {
  const categories = await getAllCategoriesServices(req.query);

  return res.status(200).json({
    message: 'Successfully found categories!',
    data: categories,
  });
};
