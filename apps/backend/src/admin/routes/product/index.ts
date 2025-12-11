import { Router } from 'express';

import productAdminRouter from '@/admin/routes/product/product';
import productMediaRouter from '@/admin/routes/product/media';
import productSoftDeleteRouter from '@/admin/routes/product/softDelete';

const productAdminRoutes = Router();

productAdminRoutes.use('/', productAdminRouter);
productAdminRoutes.use('/media', productMediaRouter);
productAdminRoutes.use('/soft-delete', productSoftDeleteRouter);

export default productAdminRoutes;
