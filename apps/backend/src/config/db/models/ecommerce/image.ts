import { IImage } from '@shopai/types';
import { Schema, model, models, Document, Model, Types } from 'mongoose';

const imageSchema = new Schema<IImage>(
  {
    publicId: { type: String, required: true },
    original: { type: String, required: true },
    preview: { type: String, required: true },
    thumbnail: { type: String, required: true },
    mobile: { type: String, required: true },
    retina: { type: String, required: true },
    alt: { type: String, default: '' },

    meta: {
      width: Number,
      height: Number,
      format: String,
      bytes: Number,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      transform(_doc, ret: any) {
        delete ret.__v;
        return ret;
      },
    },
  },
);

export const Image: Model<IImage> = models.Image || model<IImage>('Image', imageSchema);
