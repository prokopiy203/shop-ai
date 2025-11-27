import { validate } from '@/middlewares/validate';
import {
  createCategoryController,
  getCategoriesController,
  getCategoryByIdController,
  removeCategoriesController,
  updateCategoryController,
} from '@/controllers/category/category';
import { Router } from 'express';
import { updateCategorySchema } from '@/validation/category';

const categoryRouter = Router();

categoryRouter.post('/create', createCategoryController);

categoryRouter.get('/', getCategoriesController);

categoryRouter.delete('/:id', removeCategoriesController);

categoryRouter.get('/:id', getCategoryByIdController);

categoryRouter.patch('/:id', validate(updateCategorySchema), updateCategoryController);

export default categoryRouter;
