import cloudinary from '@/core/config/cloudinary';
import { generatePublicID } from '@/admin/utils/upload/generatePublicID';

interface UploadOptions {
  buffer: Buffer;
  type: 'image' | 'video';
  preset?: string;
}

export function uploadToCloudinary({ buffer, type, preset }: UploadOptions) {
  return new Promise((resolve, reject) => {
    const uploadPreset = preset ?? (type === 'image' ? 'product_image' : 'product_video');

    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: type,
        upload_preset: uploadPreset,
        public_id: generatePublicID(),
        overwrite: false,
        unique_filename: false,
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
