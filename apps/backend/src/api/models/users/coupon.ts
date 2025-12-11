import { Schema, models, model } from 'mongoose';

const couponSchema = new Schema(
  {
    code: { type: String, required: true, unique: true },
    description: { type: String },
    discountPercent: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    expiresAt: { type: Date, required: true },
    active: { type: Boolean, default: true },
  },
  { timestamps: true, versionKey: false },
);

export const Coupon = models.Coupon || model('Coupon', couponSchema);
