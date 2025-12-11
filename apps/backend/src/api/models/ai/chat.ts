import { Schema, model, models } from 'mongoose';

const messageSchema = new Schema({
  role: { type: String, enum: ['user', 'assistant'], required: true },
  content: { type: String, required: true },
  embedding: { type: [Number], index: 'vectorSearch' },
  createdAt: { type: Date, default: Date.now },
});

const chatSessionSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    title: { type: String, default: 'New Chat' },
    messages: [messageSchema],
    lastUsedAt: { type: Date, default: Date.now },
  },
  { timestamps: true, versionKey: false },
);

export const ChatSession = models.ChatSession || model('ChatSession', chatSessionSchema);
