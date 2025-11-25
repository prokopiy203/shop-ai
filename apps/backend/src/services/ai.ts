import { Product } from '@/config/db/models/ecommerce/product';
import { AppError } from '@/errors';
import { generateEmbedding } from '@/utils/generateEmbedding';

export const aiSearchProductsService = async (query: string) => {
  if (!query || query.trim().length === 0) {
    throw new AppError(400, 'Query is required', {
      code: 'QUERY_REQUIRED',
    });
  }

  const queryVector = await generateEmbedding(query);

  const results = await Product.aggregate([
    {
      $vectorSearch: {
        index: 'vector_index',
        path: 'vector',
        queryVector,
        numCandidates: 15,
        limit: 8,
      },
    },
    {
      $addFields: {
        score: { $meta: 'vectorSearchScore' },
      },
    },
    {
      $match: {
        score: { $gte: 0.55 },
      },
    },
    {
      $addFields: {
        exactMatch: {
          $cond: [{ $regexMatch: { input: '$title', regex: query, options: 'i' } }, 1, 0],
        },
      },
    },
    {
      $sort: { exactMatch: -1, score: -1 },
    },
    {
      $limit: 1,
    },
    {
      $lookup: {
        from: 'categories',
        localField: 'category',
        foreignField: '_id',
        as: 'category',
      },
    },
    {
      $unwind: {
        path: '$category',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $project: {
        vector: 0,
        'category.vector': 0,
      },
    },
  ]);

  return {
    item: results[0] ?? null,
  };
};
