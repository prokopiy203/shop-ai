import { loginService, refreshService, registerService } from '@/api/services/auth/auth';
import { LoginData } from '@shopai/types';
import { Request, Response } from 'express';
import { success } from 'zod';

export const registerController = async (req: Request, res: Response) => {
  const data = req.body;

  const results = await registerService(data);

  res.status(200).json({
    success: true,
    message: 'User registered successfully',
    ...results,
  });
};

export const loginController = async (req: Request, res: Response) => {
  const data = req.body;

  const result = await loginService(data);

  res.status(200).json({
    success: true,
    message: 'Login in successfully',
    ...result,
  });
};

export const refreshController = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  const result = await refreshService(refreshToken);

  res.status(200).json({
    success: true,
    message: 'Token refreshed successfully',
    data: result,
  });
};
