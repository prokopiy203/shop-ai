import { Vector } from '../types';
import { describeImageGPT } from '../../vision/describeImage';
import { generateTextEmbedding } from '../text/generateTextEmbedding';

/**
 * Генерує опис картинки + вектор на основі детального опису
 */
export const generateImageEmbedding = async (
  imageUrl: string,
): Promise<{ description: string; vector: Vector }> => {
  try {
    // 1️⃣ Отримуємо ALT та детальний опис
    const { alt, visionDescription } = await describeImageGPT(imageUrl);

    const finalDescription = visionDescription || alt || '';

    if (!finalDescription) {
      return { description: '', vector: [] };
    }

    // 2️⃣ Генеруємо вектор на основі детального опису
    const vector = await generateTextEmbedding({
      title: finalDescription,
      description: '',
      tags: [],
      brand: '',
    });

    return { description: finalDescription, vector };
  } catch (err) {
    console.error('IMAGE EMBEDDING FAILED:', err);
    return { description: '', vector: [] };
  }
};
