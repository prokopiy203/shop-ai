import { TypeNotification } from '@shopai/types';
import { Schema, models, model, type Document, type Model } from 'mongoose';

export interface INotificationDoc extends Document {
  userId: any; // ObjectId
  type: TypeNotification;
  title: string;
  message: string;
  read: boolean;

  createdAt: Date;
  updatedAt: Date;
}

const notificationSchema = new Schema<INotificationDoc>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      enum: ['order', 'promo', 'ai', 'system'],
      default: 'system',
    },
    title: { type: String, required: true },
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
  },
  { timestamps: true, versionKey: false },
);

export const Notification: Model<INotificationDoc> =
  models.Notification || model<INotificationDoc>('Notification', notificationSchema);
