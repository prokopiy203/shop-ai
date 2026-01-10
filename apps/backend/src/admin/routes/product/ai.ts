import {
  generateProductDescriptionController,
  generateProductTagsController,
} from '@/admin/controllers/products/ai';
import { Router } from 'express';

const productAdminAiGenerate = Router();

productAdminAiGenerate.post('/:id/tags', generateProductTagsController);

productAdminAiGenerate.post('/:id/description', generateProductDescriptionController);

export default productAdminAiGenerate;
