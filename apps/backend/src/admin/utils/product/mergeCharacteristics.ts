import { ICharacteristic } from '@shop-ai/types';

export const mergeCharacteristics = (
  existing: ICharacteristic[],
  incoming: ICharacteristic[],
): ICharacteristic[] => {
  const map = new Map<string, ICharacteristic>();

  for (const c of existing) {
    map.set(c.key, c);
  }

  for (const c of incoming) {
    map.set(c.key, c);
  }

  return Array.from(map.values());
};
