import { Router } from 'express';
import {
  createProductController,
  deleteProductController,
  getAdminProductsController,
  updateProductController,
} from '@/admin/controllers/products/product';
import { validate } from '@/core/middlewares/validate';
import { createProductSchema, updateProductSchema } from '@/admin/validation/product';

const productAdminRouter = Router();

productAdminRouter.get('/', getAdminProductsController);

productAdminRouter.post('/create', validate(createProductSchema), createProductController);

productAdminRouter.patch('/:id', validate(updateProductSchema), updateProductController);

productAdminRouter.delete('/:id', deleteProductController);

export default productAdminRouter;
