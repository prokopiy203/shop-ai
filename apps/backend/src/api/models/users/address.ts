import { Schema, models, model, type Document, type Model } from 'mongoose';

export interface IAddressDoc extends Document {
  userId: any; // ObjectId
  fullName: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;

  createdAt: Date;
  updatedAt: Date;
}

const addressSchema = new Schema<IAddressDoc>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    fullName: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
  },
  { timestamps: true, versionKey: false },
);

export const Address: Model<IAddressDoc> =
  models.Address || model<IAddressDoc>('Address', addressSchema);
