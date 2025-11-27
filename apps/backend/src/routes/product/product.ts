import { Router } from 'express';
import {
  createProductController,
  deleteProductController,
  getProductController,
  updateProductController,
} from '@/controllers/products/product';
import { validate } from '@/middlewares/validate';
import { createProductSchema, updateProductSchema } from '@/validation/productValidation';

const productBaseRouter = Router();

productBaseRouter.post('/create', validate(createProductSchema), createProductController);

productBaseRouter.get('/', getProductController);

productBaseRouter.patch('/:id', validate(updateProductSchema), updateProductController);

productBaseRouter.delete('/:id', deleteProductController);

export default productBaseRouter;
