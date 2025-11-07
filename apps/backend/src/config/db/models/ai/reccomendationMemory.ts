import { Schema, model, models } from 'mongoose';

const recommendationSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    shownAt: { type: Date, default: Date.now },
    clicked: { type: Boolean, default: false },
  },
  { timestamps: true, versionKey: false },
);

export const RecommendationMemory =
  models.RecommendationMemory || model('RecommendationMemory', recommendationSchema);
