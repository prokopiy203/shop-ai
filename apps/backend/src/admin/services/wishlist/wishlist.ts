import { Wishlist } from '@/api/models';
import type { WishlistCreateData, WishlistRemoveData } from '@shopai/types';
import { AppError } from '@/core/errors/AppError';

export const addToWishlistService = async (userId: string, data: WishlistCreateData) => {
  const existing = await Wishlist.findOne({ userId, productId: data.productId });

  if (existing) {
    throw new AppError(400, 'Product already in wishlist');
  }

  const item = await Wishlist.create({
    userId,
    productId: data.productId,
  });

  return item.toObject();
};

export const removeFromWishlistService = async (userId: string, data: WishlistRemoveData) => {
  const deleted = await Wishlist.findOneAndDelete({
    userId,
    productId: data.productId,
  });

  if (!deleted) {
    throw new AppError(404, 'Product not found in wishlist');
  }

  return { removed: true };
};

export const getUserWishlistService = async (userId: string) => {
  const items = await Wishlist.find({ userId })
    .populate({
      path: 'productId',
      select: 'title price images slug',
      options: { lean: true },
    })
    .lean();

  return items;
};
