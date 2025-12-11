import { getMeService } from '@/api/services/users/me';
import { AuthRequest } from '@/core/middlewares/authMiddleware';
import { Request, Response } from 'express';

export const getMeInfoController = async (req: AuthRequest, res: Response) => {
  const id = req.user._id as string;

  const me = await getMeService(id);

  res.status(200).json({
    success: true,
    message: 'User profile loaded successfully',
    data: me,
  });
};
