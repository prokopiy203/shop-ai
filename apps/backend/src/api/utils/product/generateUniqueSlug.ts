import type { Model } from 'mongoose';
import { generateSlug } from '@/api/utils/product/generateSlug';

export async function generateUniqueSlug(
  model: Model<any>,
  text: string,
  excludeId?: string,
): Promise<string> {
  const baseSlug = generateSlug(text);

  const slugRegex = new RegExp(`^${baseSlug}(-[0-9]+)?$`, 'i');

  const filter = excludeId ? { slug: slugRegex, _id: { $ne: excludeId } } : { slug: slugRegex };

  const items = await model.find(filter).select('slug');

  if (items.length === 0) {
    return baseSlug;
  }

  let maxIndex = 0;

  for (const item of items) {
    const match = item.slug.match(/-(\d+)$/);
    if (match) {
      const num = parseInt(match[1]);
      if (num > maxIndex) maxIndex = num;
    } else {
      if (maxIndex === 0) maxIndex = 1;
    }
  }

  return `${baseSlug}-${maxIndex + 1}`;
}
