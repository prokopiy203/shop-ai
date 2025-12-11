import { Router } from 'express';
import { upload } from '@/core/middlewares/upload';
import {
  addProductGalleryMediaController,
  addProductImageController,
  addProductVideoController,
  addProductVideoViewController,
  deleteProductGalleryImagesController,
  deleteProductImageController,
  deleteProductVideoController,
} from '@/admin/controllers/products/media';

const productMediaRouter = Router();

productMediaRouter.post('/:id/image', upload.single('file'), addProductImageController);

productMediaRouter.delete('/image/:id', deleteProductImageController);

productMediaRouter.post(
  '/:id/gallery',
  upload.array('files', 10),
  addProductGalleryMediaController,
);

productMediaRouter.delete('/:id/gallery', deleteProductGalleryImagesController);

productMediaRouter.post('/:id/video', upload.single('file'), addProductVideoController);

productMediaRouter.post('/video/:id/view', addProductVideoViewController);

productMediaRouter.delete('/video/:id', deleteProductVideoController);

export default productMediaRouter;
