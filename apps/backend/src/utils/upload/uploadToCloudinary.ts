import cloudinary from '@/config/cloudinary';
import { generatePublicID } from '@/utils/upload/generatePublicID';

interface UploadOptions {
  buffer: Buffer;
  type: 'image' | 'video';
  preset?: string;
}

export function uploadToCloudinary({ buffer, type, preset }: UploadOptions) {
  return new Promise((resolve, reject) => {
    const folder = type === 'image' ? 'products/image' : 'products/videos';

    const uploadPreset = preset ?? (type === 'image' ? 'product_image' : 'product_video');

    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: type,
        upload_preset: uploadPreset,
        public_id: generatePublicID(folder),
        overwrite: false,
        unique_filename: true,
        eager_async: false,
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      },
    );
    stream.end(buffer);
  });
}
