import {
  addProductGalleryMediaService,
  addProductImageService,
  addProductVideoService,
  addProductVideoViewService,
  deleteProductGalleryImagesService,
  deleteProductImageService,
  deleteProductVideoService,
} from '@/admin/services/product/media';
import { Request, Response } from 'express';

export const addProductImageController = async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };
  const { file } = req as { file: Express.Multer.File };

  const image = await addProductImageService(id, file);

  res.status(200).json({
    success: true,
    data: image,
  });
};

export const addProductVideoController = async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };
  const { file } = req as { file: Express.Multer.File };

  const video = await addProductVideoService(id, file);

  res.status(200).json({
    success: true,
    data: video,
  });
};

export const addProductGalleryMediaController = async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };
  const files = req.files as Express.Multer.File[];

  const media = await addProductGalleryMediaService(id, files);

  res.status(200).json({
    success: true,
    data: media,
  });
};

export const deleteProductGalleryImagesController = async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };
  const { imageIds } = req.body as { imageIds: string[] };

  const updated = await deleteProductGalleryImagesService(id, imageIds);

  res.status(200).json({
    success: true,
    message: 'Gallery images deleted',
    data: updated,
  });
};

export const addProductVideoViewController = async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };

  const updateViews = await addProductVideoViewService(id);

  res.status(200).json({
    success: true,
    data: updateViews,
  });
};

export const deleteProductVideoController = async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };

  const result = await deleteProductVideoService(id);

  res.status(200).json({
    success: true,
    message: 'Product video deleted',
    data: result,
  });
};

export const deleteProductImageController = async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };

  const result = await deleteProductImageService(id);

  res.status(200).json({
    success: true,
    message: 'Product image deleted',
    data: result,
  });
};
