import { UserResponse } from '@shop-ai/types';

export const sanitizeUser = (user: any, isAdmin: boolean = false): UserResponse | null => {
  if (!user) return null;
  const { password, deleted, deletedAt, __v, ...safe } = user;

  if (!isAdmin) delete safe.phone;

  return safe as UserResponse;
};
