import { Router } from 'express';

import productBaseRouter from '@/routes/product/product';
import productMediaRouter from '@/routes/product/media';
import productSoftDeleteRouter from '@/routes/product/softDelete';

const productRoutes = Router();

productRoutes.use('/', productBaseRouter);
productRoutes.use('/', productMediaRouter);
productRoutes.use('/', productSoftDeleteRouter);

export default productRoutes;
