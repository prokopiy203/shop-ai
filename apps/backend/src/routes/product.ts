import { Router } from 'express';
import {
  createProductController,
  deleteProductController,
  getDeletedProductsController,
  getProductController,
  restoreProductController,
  softDeleteProductController,
  updateProductController,
} from '../controllers/productController';
import { validate } from '../middlewares/validate';
import { createProductSchema, updateProductSchema } from '../validation/productValidation';

const productRouter = Router();

productRouter.post('/create', validate(createProductSchema), createProductController);

productRouter.get('/', getProductController);

productRouter.patch('/:id', validate(updateProductSchema), updateProductController);

productRouter.delete('/:id', deleteProductController);

productRouter.patch('/:id/deleted', softDeleteProductController);

productRouter.patch('/:id/restore', restoreProductController);

productRouter.get('/trash', getDeletedProductsController);

export default productRouter;
