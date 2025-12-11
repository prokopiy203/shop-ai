import multer from 'multer';

const storage = multer.memoryStorage();

const ALLOWED_IMAGE_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/jpg'];
const ALLOWED_VIDEO_MIME_TYPES = ['video/mp4'];
const MAX_IMAGE_SIZE_BYTES = 10 * 1024 * 1024; // 10MB is plenty for product photos
const MAX_VIDEO_SIZE_BYTES = 50 * 1024 * 1024; // short product promo videos

export const upload = multer({
  storage,
  // Multer enforces the upper bound; per-type checks happen in fileFilter.
  limits: { fileSize: MAX_VIDEO_SIZE_BYTES },
  fileFilter(req, file, cb) {
    const { mimetype, fieldname } = file;
    const contentLength = Number(req.headers['content-length'] || 0);

    const isImage = ALLOWED_IMAGE_MIME_TYPES.includes(mimetype);
    const isVideo = ALLOWED_VIDEO_MIME_TYPES.includes(mimetype);

    if (!isImage && !isVideo) {
      return cb(new multer.MulterError('LIMIT_UNEXPECTED_FILE', fieldname));
    }

    // For single-file uploads content-length approximates file size.
    if (isImage && contentLength > MAX_IMAGE_SIZE_BYTES) {
      return cb(new multer.MulterError('LIMIT_FILE_SIZE', fieldname));
    }

    cb(null, true);
  },
});
