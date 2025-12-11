import { Response } from 'express';

import type { AuthRequest } from '@/core/middlewares/authMiddleware';
import {
  addToWishlistService,
  getUserWishlistService,
  removeFromWishlistService,
} from '@/admin/services/wishlist/wishlist';

export const addToWishlistController = async (req: AuthRequest, res: Response) => {
  const item = await addToWishlistService(req.user.id, req.body);

  return res.status(201).json({
    success: true,
    message: 'Added to wishlist',
    data: item,
  });
};

export const removeFromWishlistController = async (req: AuthRequest, res: Response) => {
  const result = await removeFromWishlistService(req.user.id, req.body);

  return res.status(200).json({
    success: true,
    message: 'Removed from wishlist',
    data: result,
  });
};

export const getUserWishlistController = async (req: AuthRequest, res: Response) => {
  const items = await getUserWishlistService(req.user.id);

  return res.status(200).json({
    success: true,
    data: items,
  });
};
