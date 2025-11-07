import { Schema, model, models } from 'mongoose';

interface IUser {
  name: string;
  email: string;
  password: string;
  phone?: string;
  avatarUrl?: string;
  role: 'user' | 'admin';
  addresses: [];
  preferences?: Record<string, any>;
  toJSON(): Omit<IUser, 'password'>;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    phone: { type: String, required: false, unique: true, sparse: true },
    password: { type: String, required: true },
    avatarUrl: String,
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    addresses: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Address',
      },
    ],
    preferences: {
      theme: { type: String, enum: ['light', 'dark'], default: 'light' },
      language: { type: String, enum: ['uk', 'en'], default: 'uk' },
      aiVoice: { type: String, enum: ['female', 'male'], default: 'female' },
    },
  },
  { timestamps: true, versionKey: false },
);

userSchema.methods.toJSON = function (): Omit<IUser, 'password'> {
  const obj = this.toObject();
  delete (obj as any).password;
  return obj;
};

export const User = models.User || model('User', userSchema);
