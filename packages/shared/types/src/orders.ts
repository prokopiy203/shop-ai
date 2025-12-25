/**
 * Елемент замовлення
 */
export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
}

/**
 * Статус замовлення
 */
export type OrderStatus =
  | "pending"
  | "paid"
  | "shipped"
  | "delivered"
  | "cancelled";

/**
 * Дані для створення замовлення
 */
export interface CreateOrderData {
  userId?: string;
  items: OrderItem[];
  totalAmount: number;
  addressId: string;
  status?: OrderStatus;
}

/**
 * Дані для оновлення замовлення
 */
export interface UpdateOrderData {
  status?: OrderStatus;
  addressId?: string;
}

/**
 * Замовлення (повна інформація)
 */
export interface Order {
  _id: string;
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  addressId: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Замовлення (для API відповіді)
 */
export interface OrderResponse {
  _id: string;
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  addressId: string;
  createdAt: string;
  updatedAt: string;
}
