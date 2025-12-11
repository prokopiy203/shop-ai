import { Vector } from '../types';

export const mergeVectors = (textVector: Vector | null, imageVector: Vector | null): Vector => {
  if (!textVector?.length && !imageVector?.length) return [];
  if (!textVector?.length) return imageVector || [];
  if (!imageVector?.length) return textVector || [];

  const maxLen = Math.max(textVector.length, imageVector.length);

  return Array.from({ length: maxLen }, (_, i) => {
    const t = textVector[i] ?? 0;
    const im = imageVector[i] ?? 0;
    return (t + im) / 2;
  });
};
