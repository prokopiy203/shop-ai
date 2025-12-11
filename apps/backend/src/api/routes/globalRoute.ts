import { Router } from 'express';
import authRoutes from './auth/auth';
import aiRoutes from './ai';
import orderRoutes from './order';
import productRoutes from './product/index';
import reviewRoutes from './review';
import userRoutes from './user';
import cartRoutes from './cart';

const router = Router();

router.use('/auth', authRoutes);
router.use('/ai', aiRoutes);
router.use('/orders', orderRoutes);
router.use('/cart', cartRoutes);
router.use('/products', productRoutes);
router.use('/reviews', reviewRoutes);
router.use('/user', userRoutes);

export default router;
