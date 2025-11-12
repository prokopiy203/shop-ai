import { Category as CategoryCore } from '@shopai/types';
import { Schema, models, model, type Document, type Model } from 'mongoose';

export interface ICategoryDoc extends Document, Omit<CategoryCore, 'id'> {
  _id: any;
}

const categorySchema = new Schema<ICategoryDoc>(
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

export const Category: Model<ICategoryDoc> =
  (models.Category as Model<ICategoryDoc>) || model<ICategoryDoc>('Category', categorySchema);
