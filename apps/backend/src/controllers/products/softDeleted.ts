import { Request, Response } from 'express';
import {
  getDeletedProductService,
  restoreProductService,
  softDeleteProductService,
} from '@/services/product/softDeleted';

export const softDeleteProductController = async (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;

  const result = await softDeleteProductService(id);

  res.status(200).json({
    message: result.alreadyDeleted ? 'Product already deleted' : 'Product successfully deleted',
    data: result,
  });
};

export const restoreProductController = async (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;

  const result = await restoreProductService(id);

  res.status(200).json({
    message: result.restored ? 'Product successfully restored' : 'Product is not deleted',
    data: result,
  });
};

export const getDeletedProductsController = async (req: Request, res: Response) => {
  const products = await getDeletedProductService();

  res.status(200).json({
    message: 'Deleted product list',
    data: products,
  });
};
