import { Product } from '@/api/models';
import { Image } from '@/api/models/media/image';
import { Video } from '@/api/models/media/video';
import { ValidationError } from '@/core/errors';
import { generateImageEmbedding } from '@/modules/ai/vector-engine/image/generateImageEmbedding';
import { mergeVectors } from '@/modules/ai/vector-engine/merge/mergeVector';
import { deleteFromCloudinary } from '@/admin/utils/upload/deleteFromCloudinary';
import { formatImage } from '@/admin/utils/upload/formatImage';
import { formatVideo } from '@/admin/utils/upload/formatVideo';
import { uploadToCloudinary } from '@/admin/utils/upload/uploadToCloudinary';

export const addProductImageService = async (id: string, file: Express.Multer.File) => {
  if (!file) {
    throw new ValidationError('Image file is required');
  }

  const product = await Product.findById(id).select('title textVector vector images');
  if (!product) {
    throw new ValidationError('Product not found');
  }

  const uploaded: any = await uploadToCloudinary({
    buffer: file.buffer,
    type: 'image',
  });

  const formatted = formatImage(uploaded);

  const { description: visionDescription, vector: imageVector } = await generateImageEmbedding(
    uploaded.secure_url,
  );

  const alt =
    visionDescription?.length > 0 ? visionDescription : `${product.title} - product Image`;

  const imageDoc = await Image.create({
    ...formatted,
    alt,
    visionDescription,
    imageVector,
    related: [{ ref: 'Product', id }],
  });

  await Product.findByIdAndUpdate(id, {
    $push: { images: imageDoc._id },
  });

  if (product.images.length === 0) {
    const finalVector = mergeVectors(product.textVector, imageVector);

    await Product.findByIdAndUpdate(id, {
      vector: finalVector,
    });
  }

  return imageDoc;
};

export const addProductVideoService = async (id: string, file: Express.Multer.File) => {
  if (!file) {
    throw new ValidationError('Video file is required');
  }

  const product = await Product.findById(id).select('title');
  if (!product) {
    throw new ValidationError('Product not found');
  }

  const uploaded: any = await uploadToCloudinary({
    buffer: file.buffer,
    type: 'video',
  });

  const formatted = formatVideo(uploaded);

  const alt = `${product.title} - Product Video`;

  const videoDoc = await Video.create({
    ...formatted,
    alt,
    title: product.title,
    product: id,
  });

  await Product.findByIdAndUpdate(id, {
    $push: { videos: videoDoc._id },
  });

  return videoDoc;
};

export const addProductGalleryMediaService = async (id: string, files: Express.Multer.File[]) => {
  if (!files || files.length === 0) {
    throw new ValidationError('At least one gallery image is required');
  }

  const product = await Product.findById(id);
  if (!product) throw new ValidationError('Product not found');

  for (const file of files) {
    if (!file.mimetype.startsWith('image')) {
      throw new ValidationError('Only images allowed in gallery');
    }
  }

  const uploadedResults = await Promise.all(
    files.map((file) =>
      uploadToCloudinary({
        buffer: file.buffer,
        type: 'image',
        preset: 'gallery_image',
      }),
    ),
  );

  const nextIndex = product.gallery.length + 1;

  const mediaItems = uploadedResults.map((uploaded: any, i: number) => ({
    publicId: uploaded.public_id,
    url: uploaded.secure_url,
    preview: uploaded.eager?.[0]?.secure_url ?? '',
    alt: `${product.title} - Gallery Image #${nextIndex + i}`,
  }));

  await Product.findByIdAndUpdate(id, {
    $push: { gallery: { $each: mediaItems } },
  });

  return mediaItems;
};

export const deleteProductGalleryImagesService = async (id: string, imageIds: string[]) => {
  if (!imageIds || !Array.isArray(imageIds) || imageIds.length === 0) {
    throw new ValidationError('imageIds must be a non-empty array');
  }

  const product = await Product.findById(id);
  if (!product) {
    throw new ValidationError('Product not found');
  }

  const imagesToDelete = product.gallery.filter((img: any) =>
    imageIds.includes(img._id.toString()),
  );

  if (imagesToDelete.length === 0) {
    throw new ValidationError('No matching images found in product gallery');
  }

  await Promise.all(imagesToDelete.map((img: any) => deleteFromCloudinary(img.publicId)));

  const updatedProduct = await Product.findByIdAndUpdate(
    id,
    {
      $pull: {
        gallery: {
          _id: { $in: imageIds },
        },
      },
    },
    { new: true },
  );

  return updatedProduct;
};

export const addProductVideoViewService = async (videoId: string) => {
  const video = await Video.findById(videoId).select('views');
  if (!video) {
    throw new ValidationError('Video not found');
  }

  video.views += 1;
  await video.save();

  return video.views;
};

export const deleteProductVideoService = async (Id: string) => {
  const video = await Video.findById(Id);

  if (!video) {
    throw new ValidationError('Video not found');
  }

  if (!video.publicId) {
    throw new ValidationError('Video has no publicId');
  }

  await deleteFromCloudinary(video.publicId);

  await Product.findByIdAndUpdate(video.product, {
    $pull: { videos: video._id },
  });

  await Video.findByIdAndDelete(video._id);

  return true;
};

export const deleteProductImageService = async (id: string) => {
  const image = await Image.findById(id);

  if (!image) {
    throw new ValidationError('Image not found');
  }

  await deleteFromCloudinary(image.publicId);

  await Product.updateMany({ images: image._id }, { $pull: { images: image._id } });

  await Image.findByIdAndDelete(image._id);

  return true;
};
