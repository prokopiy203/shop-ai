import {
  getMeService,
  updateUserAvatarService,
  updateUserPreferencesService,
} from '@/api/services/users/me';
import { Request, Response } from 'express';

export const getMeInfoController = async (req: Request, res: Response) => {
  const id = req.user._id as string;

  const me = await getMeService(id);

  res.status(200).json({
    success: true,
    message: 'User profile loaded successfully',
    data: me,
  });
};

export const updatePreferencesController = async (req: Request, res: Response) => {
  const id = req.user._id as string;

  const updatedPreferences = await updateUserPreferencesService(id, req.body);

  res.status(200).json({
    success: true,
    message: 'Preferences updated',
    data: updatedPreferences,
  });
};

export const updateAvatarController = async (req: Request, res: Response) => {
  const userId = req.user._id as string;
  const file = req.file as Express.Multer.File;

  const result = await updateUserAvatarService(userId, file);

  res.status(200).json(result);
};
