import { OrderStatus, OrderItem } from '@shop-ai/types';
import { Schema, model, models, type Document, type Model } from 'mongoose';

export interface IOrder extends Document {
  userId: any;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  addressId: any;
  createdAt: Date;
  updatedAt: Date;
}

const orderSchema = new Schema<IOrder>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    items: [
      {
        productId: { type: Schema.Types.ObjectId, ref: 'Product' },
        quantity: Number,
        price: Number,
      },
    ],
    totalAmount: Number,
    status: {
      type: String,
      enum: ['pending', 'paid', 'shipped', 'delivered', 'cancelled'],
      default: 'pending',
    },
    addressId: {
      type: Schema.Types.ObjectId,
      ref: 'Address',
      required: true,
    },
  },
  { timestamps: true, versionKey: false },
);

export const Order: Model<IOrder> = models.Order || model<IOrder>('Order', orderSchema);
