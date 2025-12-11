import { adminLoginService, renewAdminSessionService } from '@/admin/services/auth/auth';
import { Request, Response } from 'express';

export const adminLoginController = async (req: Request, res: Response) => {
  const data = req.body;

  const result = await adminLoginService(data);

  res.status(200).json({
    success: true,
    message: 'Login in Successfully',
    data: result,
  });
};

export const renewAdminSessionController = async (req: Request, res: Response) => {
  const user = req.user;

  const result = await renewAdminSessionService(user);

  return res.status(200).json({
    success: true,
    data: result,
  });
};
