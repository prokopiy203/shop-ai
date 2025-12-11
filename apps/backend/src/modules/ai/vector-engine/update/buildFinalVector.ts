import { ProductVectorParts, Vector } from '../types';
import { mergeVectors } from '../merge/mergeVector';

export const buildFinalVector = (parts: ProductVectorParts): Vector => {
  return mergeVectors(parts.textVector, parts.imageVector);
};
