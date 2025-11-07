import { Schema, model, models } from 'mongoose';

const productSchema = new Schema(
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
      index: 'vectorSearch',
      default: [],
    },
  },
  { timestamps: true, versionKey: false },
);

export const Product = models.Product || model('Product', productSchema);
