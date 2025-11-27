import { Product } from '@/config/db/models';
import { Image } from '@/config/db/models/ecommerce/image';
import { Video } from '@/config/db/models/ecommerce/video';
import { ValidationError } from '@/errors';
import { formatImage } from '@/utils/upload/formatImage';
import { formatVideo } from '@/utils/upload/formatVideo';
import { uploadToCloudinary } from '@/utils/upload/uploadToCloudinary';

export const addProductImageService = async (id: string, file: Express.Multer.File) => {
  if (!file) {
    throw new ValidationError('Image file is required');
  }

  const product = await Product.findById(id).select('title');
  if (!product) {
    throw new ValidationError('Product not found');
  }

  const uploaded: any = await uploadToCloudinary({
    buffer: file.buffer,
    type: 'image',
  });

  const formatted = formatImage(uploaded);

  const alt = `${product.title} - product Image`;

  const imageDoc = await Image.create({
    ...formatted,
    alt,
    related: [{ ref: 'Product', id }],
  });

  await Product.findByIdAndUpdate(id, {
    $push: { images: imageDoc._id },
  });

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

export const addProductGalleryMediaService = async (id: string, file: Express.Multer.File) => {
  if (!file) {
    throw new ValidationError('Gallery media file is required');
  }

  const isVideo = file.mimetype.startsWith('video');

  const uploaded: any = await uploadToCloudinary({
    buffer: file.buffer,
    type: isVideo ? 'video' : 'image',
  });

  const media = {
    publicId: uploaded.public_id,
    url: uploaded.secure_url,
    alt: '',
    type: isVideo ? 'video' : 'image',
  };

  await Product.findByIdAndUpdate(id, {
    $push: { gallery: media },
  });

  return media;
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
