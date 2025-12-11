export const buildProductQuery = (query: Record<string, any>) => {
  const mongoQuery: Record<string, any> = {};

  // 🔍 Text search (title, description)
  if (query.search) {
    mongoQuery.$or = [
      { title: { $regex: query.search, $options: 'i' } },
      { description: { $regex: query.search, $options: 'i' } },
      { tags: { $elemMatch: { $regex: query.search, $options: 'i' } } },
    ];
  }

  // 🎯 Category
  if (query.category) {
    mongoQuery.category = query.category;
  }

  // 🎯 Multiple categories
  if (query.categories) {
    mongoQuery.category = { $in: query.categories.split(',') };
  }

  // 🏷 Tags array
  if (query.tags) {
    mongoQuery.tags = { $in: query.tags.split(',') };
  }

  // 💰 Price filter
  if (query.minPrice || query.maxPrice) {
    mongoQuery.price = {};
    if (query.minPrice) mongoQuery.price.$gte = Number(query.minPrice);
    if (query.maxPrice) mongoQuery.price.$lte = Number(query.maxPrice);
  }

  // 📦 In stock
  if (query.inStock === 'true') {
    mongoQuery.stock = { $gt: 0 };
  }

  // 📅 Date range
  if (query.from || query.to) {
    mongoQuery.createdAt = {};
    if (query.from) mongoQuery.createdAt.$gte = new Date(query.from);
    if (query.to) mongoQuery.createdAt.$lte = new Date(query.to);
  }

  // ⚡ AI semantic tags (category.smart filters)
  if (query.aiTag) {
    mongoQuery.tags = { $regex: query.aiTag, $options: 'i' };
  }

  // 🧠 AI vector search (if embedding provided)
  if (query.vector) {
    const vectorArray = query.vector.split(',').map(Number);
    mongoQuery.vector = {
      $vector: vectorArray, // 🔥 MongoDB 7.0+
      $metric: 'cosine',
      $topK: 50,
    };
  }

  return mongoQuery;
};
