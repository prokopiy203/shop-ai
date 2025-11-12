import { createCategoryController } from '../controllers/category';
import { Router } from 'express';

const categoryRouter = Router();

categoryRouter.post('/create', createCategoryController);

export default categoryRouter;
