import { getAdminUserByIdService, getAdminUsersService } from '@/admin/services/users/users';
import { Request, Response } from 'express';

export const getAdminUsersController = async (req: Request, res: Response) => {
  const pagination = {
    page: Number(req.query.page) || 1,
    limit: Number(req.query.limit) || 20,
    sortBy: (req.query.sortOrder as string) || 'createdAt',
    sortOrder: (req.query.sortOrder as 'asc' | 'desc') || 'desc',
  };

  const filters = { ...req.query };

  const result = await getAdminUsersService(filters, pagination);

  return res.status(200).json({
    success: true,
    message: 'Users fetched successfully',
    data: result,
  });
};

export const getAdminUserByIdController = async (req: Request, res: Response) => {
  const id = req.params.id as string;

  const result = await getAdminUserByIdService(id);

  return res.status(200).json({
    success: true,
    message: 'User in fetched',
    data: result,
  });
};
