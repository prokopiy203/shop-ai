import { Product } from '@/api/models/e-commerce/product/product';
import { Image } from '@/api/models/media/image';
import { generateTextEmbedding } from '../text/generateTextEmbedding';
import { mergeVectors } from '../merge/mergeVector';
import type { UpdateProductVectorOptions, Vector } from '../types';

export const updateProductVector = async (options: UpdateProductVectorOptions) => {
  const { productId, textChanged, skipTextUpdate, textContent } = options;

  const product = await Product.findById(productId)
    .select('+textVector title description tags images')
    .lean();

  if (!product) return;

  /** ---------- TEXT VECTOR ---------- */
  let textVector: Vector = product.textVector ?? [];

  const needTextUpdate = !skipTextUpdate && (textChanged || !textVector.length);

  if (needTextUpdate) {
    textVector = await generateTextEmbedding({
      title: textContent?.title ?? product.title,
      description: textContent?.description ?? product.description,
      tags: textContent?.tags ?? product.tags ?? [],
      brand: textContent?.brand ?? product.brand,
    });
  }

  /** ---------- IMAGE VECTOR ---------- */
  let imageVector: Vector = [];

  if (product.images?.length > 0) {
    const mainImage = await Image.findById(product.images[0]).select('+imageVector');

    if (mainImage?.imageVector?.length) {
      imageVector = mainImage.imageVector;
    }
  }

  /** ---------- MERGE ---------- */
  const final = mergeVectors(textVector, imageVector);

  /** ---------- SAVE RESULT ---------- */
  await Product.findByIdAndUpdate(productId, {
    textVector,
    vector: final,
  });
};
