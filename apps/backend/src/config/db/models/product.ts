import { Schema, model } from 'mongoose';

const productSchema = new Schema(
  {
    title: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    images: [String],
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    stock: { type: Number, default: 0 },
    tags: [String],
    rating: { type: Number, default: 0 },
  },
  { timestamps: true, versionKey: false },
);

export const ProductCollection = model('Product', productSchema);
