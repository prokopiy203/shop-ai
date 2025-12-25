import { VideoCore } from '@shop-ai/types';
import { Schema, model, models, type Model, type Types, Document } from 'mongoose';

export interface IVideoDoc extends Document, Omit<VideoCore, 'product'> {
  _id: Types.ObjectId;
  product: Types.ObjectId;
}

const videoSchema = new Schema<IVideoDoc>(
  {
    // Cloudinary data
    publicId: { type: String, required: true },
    url: { type: String, required: true },
    poster: { type: String, required: true },

    duration: { type: Number },
    width: { type: Number },
    height: { type: Number },
    format: { type: String },
    bytes: { type: Number },

    // Relation to Product
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },

    // Text data
    alt: { type: String, default: '' },
    title: { type: String, default: '' },
    description: { type: String, default: '' },

    // Analytics
    views: { type: Number, default: 0 },
    uniqueViews: { type: Number, default: 0 },
    watchTime: { type: Number, default: 0 },
    lastViewedAt: { type: Date, default: null },

    // AI enrichments
    aiSummary: { type: String, default: null },
    aiHighlights: { type: [String], default: [] },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      transform(_doc, ret: any) {
        delete ret.__v;
        delete ret.createdAt;
        delete ret.updatedAt;
        return ret;
      },
    },
  },
);

export const Video: Model<IVideoDoc> = models.Video || model<IVideoDoc>('Video', videoSchema);
