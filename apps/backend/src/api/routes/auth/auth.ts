import {
  loginController,
  refreshController,
  registerController,
} from '@/api/controllers/auth/auth';
import { loginLimiter } from '@/core/middlewares/rateLimiter';
import { validate } from '@/core/middlewares/validate';
import { loginSchema, registerSchema } from '@/api/validation/user/auth';
import { Router } from 'express';
import { logoutController } from '@/api/controllers/auth/auth';
import { authMiddleware } from '@/core/middlewares/authMiddleware';

const authRouter = Router();

authRouter.post('/register', validate(registerSchema), registerController);

authRouter.post('/login', loginLimiter, validate(loginSchema), loginController);

authRouter.post('/refresh', refreshController);

authRouter.post('/logout', authMiddleware, logoutController);

export default authRouter;
