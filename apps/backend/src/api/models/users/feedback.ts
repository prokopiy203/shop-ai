import { Schema, models, model } from 'mongoose';

const feedbackSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, red: 'User' },
    rating: Number,
    comment: String,
    source: { type: String, enum: ['chat', 'purchase'] },
    attachments: [
      {
        url: { type: String, required: true },
        type: { type: String, enum: ['image', 'video', 'file'], default: 'image' },
      },
    ],
  },
  { timestamps: true, versionKey: false },
);

export const Feedback = models.Feedback || model('Feedback', feedbackSchema);
