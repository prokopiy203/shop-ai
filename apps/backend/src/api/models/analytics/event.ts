import { Schema, model, models } from 'mongoose';

const eventSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    eventType: {
      type: String,
      enum: ['view', 'click', 'search', 'add_to_cart', 'purchase', 'chat_message'],
      required: true,
    },
    productId: { type: Schema.Types.ObjectId, ref: 'Product' },

    query: { type: String, maxlength: 80 },
    source: { type: String, maxlength: 40 },
    count: { type: Number, default: 1 },
    createdAt: { type: Date, default: Date.now },
  },
  { versionKey: false },
);

export const Event = models.Event || model('Event', eventSchema);
