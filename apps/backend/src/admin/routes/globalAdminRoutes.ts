import { Router } from 'express';
import aiRoutes from './ai';
import categoryRoutes from './category/category';
import orderRoutes from './order';
import productAdminRoutes from './product/index';
import reviewRoutes from './review';
import usersAdminRouter from './users/users';
import cartRoutes from './cart';
import authRoutes from './auth/auth';
import settingRouter from './settings';
import { authMiddleware } from '@/core/middlewares/authMiddleware';
import { isAdmin } from '@/core/middlewares/isAdmin';

const router = Router();

router.use('/auth', authRoutes);

router.use(authMiddleware, isAdmin);

router.use('/ai', aiRoutes);
router.use('/categories', categoryRoutes);
router.use('/orders', orderRoutes);
router.use('/cart', cartRoutes);
router.use('/products', productAdminRoutes);
router.use('/reviews', reviewRoutes);
router.use('/users', usersAdminRouter);
router.use('/settings', settingRouter);

export default router;
