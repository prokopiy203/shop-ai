import {
  addProductGalleryMediaService,
  addProductImageService,
  addProductVideoService,
  addProductVideoViewService,
} from '@/services/product/media';
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
  const { file } = req as { file: Express.Multer.File };

  const media = await addProductGalleryMediaService(id, file);

  res.status(200).json({
    success: true,
    data: media,
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
