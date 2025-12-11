import { openRouter } from '@/core/config/openRouter';

export const generateEmbedding = async (text: string): Promise<number[]> => {
  const response = await openRouter.embeddings.create({
    model: 'text-embedding-3-small',
    input: text,
  });

  const embedding = response.data[0]?.embedding;

  if (!embedding) {
    throw new Error('Failed to generate embedding');
  }

  return embedding;
};
