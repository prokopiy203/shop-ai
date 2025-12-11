import { Order } from '@/api/models';
import { Types } from 'mongoose';

export const getUserStats = async (userId: string) => {
  const stats = await Order.aggregate([
    {
      $match: { userId: new Types.ObjectId(userId) },
    },
    {
      $facet: {
        ordersData: [
          {
            $group: {
              _id: null,
              ordersCount: { $sum: 1 },
              totalSpent: { $sum: '$totalAmount' },
              averageOrderValue: { $avg: '$totalAmount' },
              firstOrderAt: { $min: '$createdAt' },
              lastOrderAt: { $max: '$createdAt' },

              completedOrdersCount: {
                $sum: {
                  $cond: [{ $eq: ['$status', 'delivered'] }, 1, 0],
                },
              },

              cancelledOrdersCount: {
                $sum: {
                  $cond: [{ $eq: ['$status', 'cancelled'] }, 1, 0],
                },
              },
            },
          },
        ],

        itemsData: [
          { $unwind: '$items' },
          {
            $group: {
              _id: null,
              totalItemsBought: { $sum: '$items.quantity' },
              itemsPerOrderAvg: { $avg: '$items.quantity' },
            },
          },
        ],
      },
    },

    {
      $project: {
        ordersData: { $arrayElemAt: ['$ordersData', 0] },
        itemsData: { $arrayElemAt: ['$itemsData', 0] },
      },
    },
  ]);

  return stats[0] || null;
};
