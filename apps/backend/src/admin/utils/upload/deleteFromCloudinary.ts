import cloudinary from '@/core/config/cloudinary';

export const deleteFromCloudinary = async (publicId: string) => {
  try {
    const res = await cloudinary.uploader.destroy(publicId, {
      resource_type: 'image',
      invalidate: true,
    });

    console.log('DELETE RESULT 1:', res);

    if (res.result === 'not found') {
      const res2 = await cloudinary.uploader.destroy(publicId, {
        resource_type: 'auto',
        invalidate: true,
      });

      console.log('DELETE RESULT 2:', res2);
      return res2;
    }

    return res;
  } catch (e) {
    console.error('DELETE ERROR:', e);
    throw e;
  }
};
