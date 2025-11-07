import { Schema, model, models } from 'mongoose';
import { unique } from 'next/dist/build/utils';

const cartItemSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: 'Product' },
  quantity: { type: Number, default: 1 },
});

const cartSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', unique: true },
    items: [cartItemSchema],
  },
  { timestamps: true, versionKey: false },
);

export const Cart = models.Cart || model('Cart', cartSchema);
