import { Router } from 'express';

import productBaseRouter from '@/api/routes/product/product';

const productRoutes = Router();

productRoutes.use('/', productBaseRouter);

export default productRoutes;
