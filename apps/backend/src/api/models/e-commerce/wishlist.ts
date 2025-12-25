import { Schema, model, models, type Document, type Model } from 'mongoose';
import type { WishlistItem } from '@shop-ai/types';

export interface IWishlistDoc extends Document, Omit<WishlistItem, '_id'> {
  userId: any;
  productId: any;
}

const wishlistSchema = new Schema<IWishlistDoc>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

wishlistSchema.index({ userId: 1, productId: 1 }, { unique: true });

export const Wishlist: Model<IWishlistDoc> =
  models.Wishlist || model<IWishlistDoc>('Wishlist', wishlistSchema);
