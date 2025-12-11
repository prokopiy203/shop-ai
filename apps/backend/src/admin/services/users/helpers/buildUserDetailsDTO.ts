import { UserPreferences } from '@shopai/types';

export const buildUserDetailsDTO = (
  user: any,
  addresses: any[],
  notifications: any[],
  stats: any,
) => {
  const orders = stats?.ordersData;
  const items = stats?.itemsData;

  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    avatarUrl: user.avatarUrl,
    role: user.role,

    status: user.deleted ? 'deleted' : 'active',
    deletedAt: user.deletedAt ?? null,
    lastActiveAt: user.lastActiveAt ?? null,

    preferences: user.preferences as UserPreferences,
    addresses,
    notifications,

    stats: {
      ordersCount: orders?.ordersCount ?? 0,
      totalSpent: orders?.totalSpent ?? 0,
      averageOrderValue: orders?.averageOrderValue ?? 0,
      firstOrderAt: orders?.firstOrderAt ?? null,
      lastOrderAt: orders?.lastOrderAt ?? null,
      completedOrdersCount: orders?.completedOrdersCount ?? 0,
      cancelledOrdersCount: orders?.cancelledOrdersCount ?? 0,

      totalItemsBought: items?.totalItemsBought ?? 0,
      itemsPerOrderAvg: items?.itemsPerOrderAvg ?? 0,

      refundRate:
        orders?.ordersCount && orders.ordersCount > 0
          ? (orders.cancelledOrdersCount / orders.ordersCount) * 100
          : 0,
    },
  };
};
