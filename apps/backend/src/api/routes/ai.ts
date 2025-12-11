import { aiSearchProductsController } from '@/api/controllers/ai';
import { chatWithGPT } from '@/modules/ai/chat/ai-chat';
import { Router } from 'express';

const aiRouter = Router();

aiRouter.get('/search', aiSearchProductsController);

aiRouter.post('/chat', chatWithGPT);

export default aiRouter;
