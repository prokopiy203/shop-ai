import { validate } from '@/core/middlewares/validate';
import {
  createCategoryController,
  getCategoryByIdController,
  removeCategoriesController,
  updateCategoryController,
} from '@/admin/controllers/category/category';
import { Router } from 'express';
import { updateCategorySchema } from '@/admin/validation/category';

const categoryRouter = Router();

categoryRouter.post('/create', createCategoryController);

categoryRouter.delete('/:id', removeCategoriesController);

categoryRouter.get('/:id', getCategoryByIdController);

categoryRouter.patch('/:id', validate(updateCategorySchema), updateCategoryController);

export default categoryRouter;
