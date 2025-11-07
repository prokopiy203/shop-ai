import { Schema, models, model } from 'mongoose';

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      default: '',
    },
    imageUrl: {
      type: String,
      default: '',
    },
    parentCategory: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      default: null,
    },
    aiTags: {
      type: [String],
      default: [],
      index: true,
    },
    vector: {
      type: [Number],
      index: 'vectorSearch',
      default: [],
    },
  },
  { timestamps: true, versionKey: false },
);

export const Category = models.Category || model('Category', categorySchema);
