import { aiSearchProductsService } from '@/services/ai';
import { Request, Response } from 'express';

export const aiSearchProductsController = async (req: Request, res: Response) => {
  const query = req.query.query as string;

  const results = await aiSearchProductsService(query);

  res.status(200).json({
    message: 'AI search results',
    data: results,
  });
};
