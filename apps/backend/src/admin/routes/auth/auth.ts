import { adminLoginController, renewAdminSessionController } from '@/admin/controllers/auth/auth';
import { authMiddleware } from '@/core/middlewares/authMiddleware';
import { isAdmin } from '@/core/middlewares/isAdmin';
import { Router } from 'express';

const authRouter = Router();

authRouter.post('/login', adminLoginController);

authRouter.post('/renew', authMiddleware, isAdmin, renewAdminSessionController);

export default authRouter;
