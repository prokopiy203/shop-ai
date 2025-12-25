import { Schema, model, models, type Model, type Document } from 'mongoose';
import { ICharacteristic, Product as ProductCore } from '@shop-ai/types';
import { characteristicSchema } from '@/api/models/e-commerce/product/characteristic';

export interface IProductDoc extends Document, Omit<ProductCore, '_id'> {
  _id: any;
  characteristics: ICharacteristic[];
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
    sku: { type: String, required: true, unique: true, trim: true, uppercase: true },
    brand: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    images: [{ type: Schema.Types.ObjectId, ref: 'Image' }],
    gallery: {
      type: [
        {
          publicId: { type: String, required: true },
          url: { type: String, required: true },
          preview: { type: String, required: true },
          alt: { type: String, default: '' },
        },
      ],
      default: [],
    },
    videos: [{ type: Schema.Types.ObjectId, ref: 'Video' }],
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    stock: { type: Number, default: 0 },
    tags: { type: [String], default: [] },
    isActive: { type: Boolean, default: true },
    rating: {
      average: { type: Number, default: 0 },
      count: { type: Number, default: 0 },
    },
    characteristics: {
      type: [characteristicSchema],
      default: [],
    },
    vector: {
      type: [Number],
      default: [],
      select: false,
    },
    textVector: {
      type: [Number],
      default: [],
      select: false,
    },

    deleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
    versionKey: false,

    toJSON: {
      transform(doc, ret: any) {
        delete ret.vector;
        delete ret.textVector;
        delete ret.deleted;
        delete ret.deletedAt;

        return ret;
      },
    },
  },
);

export const Product: Model<IProductDoc> =
  (models.Product as Model<IProductDoc>) || model<IProductDoc>('Product', productSchema);
