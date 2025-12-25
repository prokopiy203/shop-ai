import { authMiddleware } from '@/core/middlewares/authMiddleware';
import { Router } from 'express';
import {
  getMeInfoController,
  updateAvatarController,
  updatePreferencesController,
} from '../controllers/user/me';
import { upload } from '@/core/middlewares/upload';

const userRouter = Router();

userRouter.get('/me', authMiddleware, getMeInfoController);

userRouter.patch('/me/preferences', authMiddleware, updatePreferencesController);

userRouter.post('/me/avatar', authMiddleware, upload.single('file'), updateAvatarController);

export default userRouter;
