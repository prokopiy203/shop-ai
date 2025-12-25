import { Response } from 'express';

import type { AuthRequest } from '@/core/middlewares/authMiddleware';
import {
  addToWishlistService,
  getUserWishlistService,
  removeFromWishlistService,
} from '@/api/services/wishlist/wishlist';

export const addToWishlistController = async (req: AuthRequest, res: Response) => {
  const productId = req.params.id as string;
  const userId = req.user._id as string;

  const item = await addToWishlistService(userId, productId);

  return res.status(201).json({
    success: true,
    message: 'Added to wishlist',
    data: item,
  });
};

export const removeFromWishlistController = async (req: AuthRequest, res: Response) => {
  const productId = req.params.id as string;
  const userId = req.user._id as string;

  const result = await removeFromWishlistService(userId, productId);

  return res.status(200).json({
    success: true,
    message: 'Removed from wishlist',
    data: result,
  });
};

export const getUserWishlistController = async (req: AuthRequest, res: Response) => {
  const items = await getUserWishlistService(req.user._id);

  return res.status(200).json({
    success: true,
    data: items,
  });
};
