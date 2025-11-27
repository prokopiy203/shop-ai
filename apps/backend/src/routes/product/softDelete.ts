import {
  getDeletedProductsController,
  restoreProductController,
  softDeleteProductController,
} from '@/controllers/products/softDeleted';
import { Router } from 'express';

const productSoftDeleteRouter = Router();

productSoftDeleteRouter.patch('/:id/deleted', softDeleteProductController);

productSoftDeleteRouter.patch('/:id/restore', restoreProductController);

productSoftDeleteRouter.get('/trash', getDeletedProductsController);

export default productSoftDeleteRouter;
