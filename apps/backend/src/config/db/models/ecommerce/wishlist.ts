import { Schema, models, model } from 'mongoose';

const wishlistSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],
  },
  { timestamps: true, versionKey: false },
);

export const Wishlist = models.Wishlist || model('Wishlist', wishlistSchema);
