import { Router } from 'express';
import { upload } from '@/middlewares/upload';
import {
  addProductGalleryMediaController,
  addProductImageController,
  addProductVideoController,
  addProductVideoViewController,
} from '@/controllers/products/media';

const productMediaRouter = Router();

productMediaRouter.post('/:id/image', upload.single('file'), addProductImageController);

productMediaRouter.post('/:id/video', upload.single('file'), addProductVideoController);

productMediaRouter.post('/:id/gallery', upload.single('file'), addProductGalleryMediaController);

productMediaRouter.post('/video/:id/view', addProductVideoViewController);

export default productMediaRouter;
