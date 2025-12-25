import { Request } from "express";

export interface MulterRequest extends Request {
  file?: Express.Multer.File;
  files?: Express.Multer.File[];
}

export interface IImageMeta {
  width: number;
  height: number;
  format: string;
  bytes: number;
}

export interface IImageRelated {
  ref: "Product" | "Category" | "User";
  id: any;
}

export interface IImage extends Document {
  publicId: string;
  original: string;
  preview: string;
  thumbnail: string;
  thumbnail2x: string;
  mobile: string;
  retina: string;
  alt: string;
  imageVector: number[];
  visionDescription: String;
  meta: IImageMeta;
  related?: IImageRelated[];
}

// shared/types/video.ts

export interface VideoCore {
  publicId: string;
  url: string;
  poster: string;
  duration?: number;
  width?: number;
  height?: number;
  format?: string;
  bytes?: number;
  type: "local" | "youtube";
  youtubeId?: string;
  alt: string;
  title: string;
  description?: string;
  product: string;
  views: number;
  uniqueViews: number;
  watchTime: number;
  lastViewedAt: string | null;
  aiSummary?: string;
  aiHighlights?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface IProductGalleryItem {
  _id: any;
  publicId: string;
  url: string;
  preview: string;
  alt: string;
}
