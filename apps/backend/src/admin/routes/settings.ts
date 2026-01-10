import { Router } from 'express';
import { getSettingsController, updateSettingsController } from '../controllers/settings/settings';
import { validate } from '@/core/middlewares/validate';
import { updateSettingsSchema } from '../validation/settings';

const settingsAdminRouter = Router();

settingsAdminRouter.get('/', getSettingsController);

settingsAdminRouter.patch('/', updateSettingsController, validate(updateSettingsSchema));

export default settingsAdminRouter;
