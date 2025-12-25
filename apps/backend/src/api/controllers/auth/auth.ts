import {
  loginService,
  logoutService,
  refreshService,
  registerService,
} from '@/api/services/auth/auth';
import { AppError } from '@/core/errors';
import { LoginData } from '@shop-ai/types';
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

  const { tokens, user } = await loginService(data);

  res.cookie('accessToken', tokens.accessToken, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
  });

  res.cookie('refreshToken', tokens.refreshToken, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
  });

  res.status(200).json({
    success: true,
    message: 'Login in successfully',
    data: user,
  });
};

export const refreshController = async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    throw new AppError(401, 'Refresh token not provided');
  }

  const result = await refreshService(refreshToken);

  res.cookie('accessToken', result.tokens.accessToken, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
  });

  res.cookie('refreshToken', result.tokens.refreshToken, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
  });

  res.status(200).json({
    success: true,
    message: 'Token refreshed successfully',
    data: {
      _id: result._id,
      role: result.role,
    },
  });
};

export const logoutController = (_req: Request, res: Response) => {
  logoutService(res);

  return res.status(200).json({
    success: true,
    message: 'Logged out successfully',
  });
};
