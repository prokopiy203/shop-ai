import { IImage } from '@shopai/types';
import { Schema, model, models, Model } from 'mongoose';

const imageSchema = new Schema<IImage>(
  {
    publicId: { type: String, required: true },
    original: { type: String, required: true },
    preview: { type: String, required: true },
    thumbnail: { type: String, required: true },
    thumbnail2x: { type: String, required: false },
    mobile: { type: String, required: true },
    retina: { type: String, required: true },
    alt: { type: String, default: '' },
    imageVector: {
      type: [Number],
      default: [],
      select: false,
    },
    visionDescription: {
      type: String,
      default: '',
    },
    related: {
      type: Array,
      select: false,
      default: [],
    },

    meta: {
      width: Number,
      height: Number,
      ratio: Number,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      transform(_doc, ret: any) {
        delete ret.__v;
        delete ret.createdAt;
        delete ret.updatedAt;
        delete ret.imageVector;
        return ret;
      },
    },
  },
);

export const Image: Model<IImage> = models.Image || model<IImage>('Image', imageSchema);
