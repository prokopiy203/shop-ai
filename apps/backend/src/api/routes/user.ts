import { authMiddleware } from '@/core/middlewares/authMiddleware';
import { Router } from 'express';
import { getMeInfoController } from '../controllers/user/user';

const userRouter = Router();

userRouter.get('/me', authMiddleware, getMeInfoController);

export default userRouter;
