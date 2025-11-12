import { title } from 'process';

type AnyQuery = Record<string, any>;

export const buildProductQuery = (query: AnyQuery) => {
  const mongoQuery: AnyQuery = {};

  if (query.search) {
    const searchValue = String(query.search).trim();
    mongoQuery.$or = [
      { title: { $regex: searchValue, $options: 'i' } },
      { description: { $regex: searchValue, $options: 'i' } },
    ];
  }

  if (query.tags) {
    const tags = Array.isArray(query.tags)
      ? query.tags
      : String(query.tags)
          .split(',')
          .map((t) => t.trim());
    mongoQuery.tags = { $in: tags };
  }

  if (query.category) {
    mongoQuery.category = query.category;
  }

  if (query.minPrice || query.maxPrice) {
    mongoQuery.price = {};
    if (query.minPrice) mongoQuery.price.$gte = Number(query.minPrice);
    if (query.maxPrice) mongoQuery.price.$lte = Number(query.maxPrice);
  }

  return mongoQuery;
};
