import { Router } from 'express';
import { getProductByIdController, getProductController } from '@/api/controllers/products/product';

const productBaseRouter = Router();

productBaseRouter.get('/', getProductController);

productBaseRouter.get('/:id', getProductByIdController);

export default productBaseRouter;
