import { getCategoriesController } from '@/api/controllers/category/category';
import { Router } from 'express';

const categoryRouter = Router();

categoryRouter.get('/', getCategoriesController);

export default categoryRouter;
