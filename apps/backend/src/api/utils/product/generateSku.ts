import { Product } from '@/api/models';
/**
 * Generates an SKU based on the category and brand.
 * Format: CAT-BRN-1234
 */
const createSKU = (categoryName: string, brandName: string) => {
  const cat = categoryName.slice(0, 3).toUpperCase();
  const br = brandName.slice(0, 3).toUpperCase();
  const random = Math.floor(1000 + Math.random() * 9000); // 4 digits

  return `${cat}-${br}-${random}`;
};

export const generateUniqueSKU = async (categoryName: string, brandName: string) => {
  let sku: string;
  let exists = true;

  while (exists) {
    sku = createSKU(categoryName, brandName);
    exists = Boolean(await Product.exists({ sku }));
  }

  return sku!;
};
