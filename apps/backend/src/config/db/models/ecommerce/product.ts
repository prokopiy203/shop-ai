import { Schema, model, models, type Model, type Document } from 'mongoose';
import { Product as ProductCore } from '@shopai/types';

export interface IProductDoc extends Document, Omit<ProductCore, '_id'> {
  _id: any;
}

const productSchema = new Schema<IProductDoc>(
  {
    title: { type: String, required: true },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: { type: String, default: '' },
    price: { type: Number, required: true },
    images: {
      type: [String],
      default: [],
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    stock: { type: Number, default: 0 },
    tags: { type: [String], default: [] },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    vector: {
      type: [Number],
      default: [],
      select: false,
    },
    deleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true, versionKey: false },
);

export const Product: Model<IProductDoc> =
  (models.Product as Model<IProductDoc>) || model<IProductDoc>('Product', productSchema);
