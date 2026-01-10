import { getSettingsService, updateSettingsService } from '@/admin/services/settings/settings';
import { Request, Response } from 'express';

export const getSettingsController = async (req: Request, res: Response) => {
  const settings = await getSettingsService();

  res.status(200).json({
    success: true,
    message: 'Successfully fetched settings Store!',
    data: settings,
  });
};

export const updateSettingsController = async (req: Request, res: Response) => {
  const updated = await updateSettingsService(req.body);

  res.status(200).json({
    success: true,
    message: 'Successfully updated store settings',
    data: updated,
  });
};
