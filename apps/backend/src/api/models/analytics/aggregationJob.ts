import { Schema, model, models } from 'mongoose';

const aggregationJobSchema = new Schema(
  {
    jobType: {
      type: String,
      enum: ['daily', 'weekly', 'monthly'],
      default: 'daily',
    },
    targetCollection: {
      type: String,
      required: true,
    },
    executedAt: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ['pending', 'running', 'success', 'error'],
      default: 'pending',
    },
    summary: {
      type: String,
      default: '',
    },
    stats: {
      totalProcessed: { type: Number, default: 0 },
      totalReduced: { type: Number, default: 0 },
    },
    errorMessage: {
      type: String,
      default: null,
    },
  },
  { timestamps: true, versionKey: false },
);

export const AggregationJob =
  models.AggregationJob || model('AggregationJob', aggregationJobSchema);
