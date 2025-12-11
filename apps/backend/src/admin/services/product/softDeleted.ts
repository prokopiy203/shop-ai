import { Product } from '@/api/models';
import { AppError } from '@/core/errors';

export const softDeleteProductService = async (id: string) => {
  const product = await Product.findById(id);

  if (!product) {
    throw new AppError(404, 'Product not found', {
      code: 'PRODUCT_NOT_FOUND',
      details: [{ field: 'id' }],
    });
  }

  if (product.deleted) {
    return { deleted: true, id, alreadyDeleted: true };
  }

  product.deleted = true;
  product.deletedAt = new Date();
  await product.save();

  return { deleted: true, id };
};

export const restoreProductService = async (id: string) => {
  const product = await Product.findById(id);

  if (!product) {
    throw new AppError(404, 'Product not found', {
      code: 'PRODUCT_NOT_FOUND',
      details: [{ field: 'id' }],
    });
  }

  if (!product.deleted) {
    return { id, restored: false, message: 'Product is not deleted' };
  }

  product.deleted = false;
  product.deletedAt = null;
  await product.save();

  return { restored: true, id };
};

export const getDeletedProductService = async () => {
  return await Product.find({ deleted: true }).sort({ deletedAT: -1 });
};
