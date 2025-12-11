import {
  getAdminUserByIdController,
  getAdminUsersController,
} from '@/admin/controllers/users/users';
import { Router } from 'express';

const usersAdminRouter = Router();

usersAdminRouter.get('/', getAdminUsersController);

usersAdminRouter.get('/:id', getAdminUserByIdController);

export default usersAdminRouter;
