import { Router } from 'express';
import { aiController } from './ai.controller';

const router = Router();

router.post('/command', aiController);

export default router;
