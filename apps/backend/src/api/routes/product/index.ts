import { Router } from 'express';

import productBaseRouter from '@/api/routes/product/product';
import productMediaRouter from '@/admin/routes/product/media';
import productSoftDeleteRouter from '@/admin/routes/product/softDelete';

const productRoutes = Router();

productRoutes.use('/', productBaseRouter);
productRoutes.use('/', productMediaRouter);
productRoutes.use('/', productSoftDeleteRouter);

export default productRoutes;
