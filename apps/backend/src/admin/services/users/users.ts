import { Address, Notification, User } from '@/api/models';
import { AppError } from '@/core/errors';
import { PaginationParams } from '@shop-ai/types';
import { Types } from 'mongoose';
import { getUserStats } from './helpers/getUserStats';
import { buildUserDetailsDTO } from './helpers/buildUserDetailsDTO';

export const getAdminUsersService = async (
  query: Record<string, any> = {},
  { page = 1, limit = 20, sortBy = 'createdAt', sortOrder = 'desc' }: PaginationParams = {},
) => {
  const skip = (page - 1) * limit;

  const sort: Record<string, 1 | -1> = {
    [sortBy]: sortOrder === 'asc' ? 1 : -1,
  };

  const mongoQuery: any = {};
  mongoQuery.deleted = false;

  if (query.role) {
    mongoQuery.role = query.role;
  }

  if (query.email) {
    mongoQuery.email = new RegExp(query.email, 'i');
  }

  const [users, total] = await Promise.all([
    User.find(mongoQuery)
      .select('name email phone role createdAt avatarUrl preferences')
      .skip(skip)
      .limit(limit)
      .sort(sort)
      .lean(),

    User.countDocuments(mongoQuery),
  ]);

  return {
    items: users,
    total,
    page,
    pages: Math.ceil(total / limit),
  };
};

export const getAdminUserByIdService = async (id: string) => {
  const user = await User.findById(id).lean();

  if (!user) {
    throw new AppError(401, 'User not found');
  }

  const addressesPromise = Address.find({ userId: id }).lean();

  const notificationsPromise = Notification.find({ userId: id })
    .sort({ createdAt: -1 })
    .limit(20)
    .lean();

  const StatsPromise = getUserStats(id);

  const [addresses, notifications, stats] = await Promise.all([
    addressesPromise,
    notificationsPromise,
    StatsPromise,
  ]);

  return buildUserDetailsDTO(user, addresses, notifications, stats);
};
