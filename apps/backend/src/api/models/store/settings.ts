import { Schema, model, models, type Model, type Document } from 'mongoose';
import { StoreSettings } from '@shop-ai/types';

export interface ISettingsDoc extends Document, StoreSettings {
  createdAt: Date;
  updatedAt: Date;
}

/* =======================
   Sub Schemas
======================= */

const aiProductDescriptionSchema = new Schema<StoreSettings['ai']['productDescription']>(
  {
    enabled: { type: Boolean, default: true },

    language: {
      type: String,
      enum: ['uk', 'en'],
      default: 'uk',
    },

    tone: {
      type: String,
      enum: ['neutral', 'marketing', 'premium'],
      default: 'neutral',
    },

    length: {
      type: String,
      enum: ['short', 'medium', 'long'],
      default: 'medium',
    },
  },
  { _id: false },
);

const aiSettingsSchema = new Schema<StoreSettings['ai']>(
  {
    enabled: { type: Boolean, default: true },

    productDescription: {
      type: aiProductDescriptionSchema,
      default: () => ({}),
    },

    imageAltText: {
      enabled: { type: Boolean, default: false },
    },

    chatAssistant: {
      enabled: { type: Boolean, default: true },
    },
  },
  { _id: false },
);

const generalSettingsSchema = new Schema<StoreSettings['general']>(
  {
    defaultLanguage: {
      type: String,
      enum: ['uk', 'en'],
      default: 'uk',
    },
  },
  { _id: false },
);

/* =======================
   Main Schema
======================= */

const settingsSchema = new Schema<ISettingsDoc>(
  {
    general: {
      type: generalSettingsSchema,
      default: () => ({}),
    },

    ai: {
      type: aiSettingsSchema,
      default: () => ({}),
    },
  },
  {
    strict: 'throw',
    timestamps: true,
    versionKey: false,
  },
);

/* =======================
   Model
======================= */

export const Settings: Model<ISettingsDoc> =
  (models.Settings as Model<ISettingsDoc>) || model<ISettingsDoc>('Settings', settingsSchema);
