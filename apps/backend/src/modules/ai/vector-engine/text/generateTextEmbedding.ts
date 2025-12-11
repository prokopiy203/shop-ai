import { generateEmbedding } from '@/core/utils/generateEmbedding';
import { ProductTextContent, Vector } from '../types';

export const generateTextEmbedding = async (content: ProductTextContent): Promise<Vector> => {
  const title = content.title ?? '';
  const description = content.description ?? '';
  const tags = Array.isArray(content.tags) ? content.tags : [];
  const brand = content.brand ?? '';

  const clean = [title, description, brand, ...tags]
    .filter(Boolean)
    .map((s) => s.trim())
    .join(' ');

  if (!clean.length) return [];

  const vector = await generateEmbedding(clean);

  return vector || [];
};
