import { ICharacteristic } from '@shopai/types';

import { Schema } from 'mongoose';

export const characteristicSchema = new Schema<ICharacteristic>(
  {
    key: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    label: {
      type: String,
      required: false,
      trim: true,
    },
    value: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['string', 'number', 'boolean'],
      default: 'string',
    },
    unit: {
      type: String,
      default: null,
    },
  },
  {
    _id: false,
  },
);
