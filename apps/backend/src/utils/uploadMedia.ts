import cloudinary from '@/config/cloudinary';
import { UploadApiResponse, UploadApiErrorResponse, UploadApiOptions } from 'cloudinary';

export type UploadFolder = 'product' | 'category' | 'user' | 'banner' | 'ai' | 'custom';

interface UploadOptions {
  folder?: UploadFolder;
  customPath?: string;
  mimeType: string;
}

export const uploadMedia = async (
  buffer: Buffer,
  { folder = 'custom', customPath, mimeType }: UploadOptions,
): Promise<UploadApiResponse> => {
  const cloudinaryFolder = customPath ? customPath : `shopai/${folder}`;

  const resourceType = mimeType.startsWith('video')
    ? 'video'
    : mimeType.startsWith('image')
      ? 'image'
      : 'raw';
  const isImage = resourceType === 'image';

  return new Promise((resolve, reject) => {
    const uploadOptions: UploadApiOptions = {
      folder: cloudinaryFolder,
      resource_type: resourceType,
      overwrite: true,
      ...(isImage
        ? {
            format: 'webp',
            transformation: [
              {
                width: 2000,
                height: 2000,
                crop: 'limit',
                quality: 'auto:good',
                fetch_format: 'auto',
              },
            ],
          }
        : resourceType === 'video'
          ? {
              eager: [
                {
                  width: 1920,
                  height: 1080,
                  crop: 'limit',
                  quality: 'auto',
                  format: 'mp4',
                },
              ],
            }
          : {}),
    };

    const stream = cloudinary.uploader.upload_stream(
      uploadOptions,
      (err: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
        if (err) return reject(err);
        if (!result) return reject(new Error('Cloudinary upload failed without result.'));

        return resolve(result);
      },
    );

    stream.end(buffer);
  });
};
