import { Schema, models, model } from 'mongoose';

const aiContextSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    sessionId: {
      type: Schema.Types.ObjectId,
      ref: 'ChatSession',
      required: true,
    },
    summary: {
      type: String,
      default: [],
    },
    topics: {
      type: [String],
      default: [],
    },
    memoryVector: {
      type: [Number],
      index: 'vectorSearch',
      default: [],
    },
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true, versionKey: false },
);

export const AIContext = models.AIContext || model('AIContext', aiContextSchema);
