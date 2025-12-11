import { User } from '@/api/models';
import { sanitizeUser } from '@/api/utils/user/sanitizeUser';
import { AppError } from '@/core/errors';

export const getMeService = async (id: string) => {
  if (!id) {
    throw new AppError(401, 'Unauthorized');
  }

  const user = await User.findById(id)
    .populate({
      path: 'addresses',
      select: '-__v -deleted -deletedAt',
    })
    .lean();

  if (!user) {
    throw new AppError(404, 'User not found');
  }

  return sanitizeUser(user);
};
