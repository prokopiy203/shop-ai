import { UpdateProductVectorOptions, ProductTextContent, Vector } from '../types';
import { Product } from '@/api/models';
import { generateTextEmbedding } from '../text/generateTextEmbedding';
import { buildFinalVector } from '../update/buildFinalVector';
import { Image } from '@/api/models/media/image';

export const updateProductVector = async (options: UpdateProductVectorOptions) => {
  const { productId, textChanged, skipTextUpdate, textContent } = options;

  const product = await Product.findById(productId).select('+textVector title description tags');

  if (!product) return;

  const image = await Image.findById(productId).select('visionDescription imageVector');

  if (!image) return;

  let textVector: Vector | null = product.textVector ?? [];
  const imageVector: Vector | null = image.imageVector ?? [];

  const needTextUpdate = !skipTextUpdate && (textChanged || !textVector?.length);

  if (needTextUpdate) {
    const content: ProductTextContent = {
      title: textContent?.title ?? product.title,
      description: textContent?.description ?? product.description,
      tags: textContent?.tags ?? product.tags ?? [],
      brand: textContent?.brand ?? product.brand,
    };

    textVector = await generateTextEmbedding(content);
  }

  const final = buildFinalVector({
    textVector,
    imageVector,
  });

  product.textVector = textVector ?? [];
  product.vector = final ?? [];

  await product.save();
};
