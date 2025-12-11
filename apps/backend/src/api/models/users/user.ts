import { Schema, model, models, type Model, type Document } from 'mongoose';
import { User as UserCore, UserPreferences, UserRole } from '@shopai/types';
import bcrypt from 'bcrypt';

export interface IUserDoc extends Document, Omit<UserCore, '_id' | 'createdAt' | 'updatedAt'> {
  _id: any;
  password: string;
  comparePassword?(password: string): Promise<boolean>;
}

const preferencesSchema = new Schema<UserPreferences>(
  {
    theme: { type: String, enum: ['light', 'dark'], default: 'light' },
    language: { type: String, enum: ['uk', 'en'], default: 'uk' },
    aiVoice: { type: String, enum: ['female', 'male'], default: 'female' },
  },
  { _id: false },
);

const userSchema = new Schema<IUserDoc>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true, index: true },
    phone: { type: String, required: false, unique: true, sparse: true },
    password: {
      type: String,
      select: false,
    },
    avatarUrl: String,
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    preferences: { type: preferencesSchema, default: {} },
    lastActiveAt: { type: Date, default: null },
    notifications: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Notification',
      },
    ],
    addresses: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Address',
      },
    ],
    deleted: {
      type: Boolean,
      default: false,
      index: true,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },

  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      transform(doc, ret: any) {
        delete ret.password;
        delete ret.deleted;
        delete ret.deletedAt;
        return ret;
      },
    },
  },
);
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

userSchema.methods.comparePassword = async function (candidate: string): Promise<boolean> {
  return bcrypt.compare(candidate, this.password);
};

export const User: Model<IUserDoc> =
  (models.User as Model<IUserDoc>) || model<IUserDoc>('User', userSchema);
