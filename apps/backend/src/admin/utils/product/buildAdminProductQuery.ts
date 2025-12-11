export const buildAdminProductQuery = (query: Record<string, any>) => {
  const mongoQuery: any = {};

  // Пошук за title і sku
  if (query.search) {
    mongoQuery.$or = [
      { title: { $regex: query.search, $options: 'i' } },
      { sku: { $regex: query.search, $options: 'i' } },
    ];
  }

  // Фільтр за категорією
  if (query.category) {
    mongoQuery.category = query.category;
  }

  // Фільтр за активністю
  if (query.isActive !== undefined) {
    mongoQuery.isActive = query.isActive === 'true';
  }

  // Фільтр за ціною
  if (query.minPrice || query.maxPrice) {
    mongoQuery.price = {};
    if (query.minPrice) mongoQuery.price.$gte = Number(query.minPrice);
    if (query.maxPrice) mongoQuery.price.$lte = Number(query.maxPrice);
  }

  // Фільтр за наявністю
  if (query.minStock || query.maxStock) {
    mongoQuery.stock = {};
    if (query.minStock) mongoQuery.stock.$gte = Number(query.minStock);
    if (query.maxStock) mongoQuery.stock.$lte = Number(query.maxStock);
  }

  return mongoQuery;
};
