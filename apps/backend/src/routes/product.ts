import { Router } from 'express';
import { createProduct, getProduct } from '../controllers/productController';
import { validate } from '../middlewares/validate';
import { createProductSchema } from '../validation/productValidation';

const productRouter = Router();

productRouter.post('/create', validate(createProductSchema), createProduct);

productRouter.get('/', getProduct);

export default productRouter;
