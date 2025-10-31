import express from 'express';
import authRoutes from './auth';
import aiRoutes from './ai';
import categoryRoutes from './category';
import orderRoutes from './order';
import productRoutes from './product';
import reviewRoutes from './review';
import userRoutes from './user';
import cartRoutes from './cart';

const router = express();

router.use('/auth', authRoutes);
router.use('/ai', aiRoutes);
router.use('/categories', categoryRoutes);
router.use('/orders', orderRoutes);
router.use('/cart', cartRoutes);
router.use('/products', productRoutes);
router.use('/reviews', reviewRoutes);
router.use('/users', userRoutes);
