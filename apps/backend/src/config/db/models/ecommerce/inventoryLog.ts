import { Schema, model, models } from 'mongoose';

const inventoryLogSchema = new Schema(
  {
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    change: { type: Number, required: true },
    reason: { type: String, enum: ['sale', 'restock', 'return', 'manual'], default: 'manual' },
  },
  { timestamps: true, versionKey: false },
);

export const InventoryLog = models.InventoryLog || model('InventoryLog', inventoryLogSchema);
