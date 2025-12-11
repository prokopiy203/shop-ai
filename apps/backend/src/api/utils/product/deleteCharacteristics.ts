import { ICharacteristic } from '@shopai/types';

export const deleteCharacteristics = (
  existing: ICharacteristic[],
  keysToRemove: string[],
): ICharacteristic[] => {
  if (!Array.isArray(existing)) return [];

  const removeSet = new Set(keysToRemove.map((k) => k.toLowerCase()));

  return existing.filter((c) => !removeSet.has(c.key.toLowerCase()));
};
