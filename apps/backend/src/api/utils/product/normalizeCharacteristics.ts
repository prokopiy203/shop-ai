import { ICharacteristic } from '@shop-ai/types';

export function normalizeCharacteristics(items?: ICharacteristic[]) {
  if (!Array.isArray(items)) return [];

  return items.map((c) => ({
    key: c.key?.trim().toLowerCase(),
    label: c.label?.trim() || undefined,
    value: String(c.value).trim(),
    type: c.type || 'string',
    unit: c.unit || null,
  }));
}
