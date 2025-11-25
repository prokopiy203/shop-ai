import { aiSearchProductsController } from '@/controllers/ai';
import { Router } from 'express';

const aiRouter = Router();

aiRouter.get('/search', aiSearchProductsController);

export default aiRouter;
