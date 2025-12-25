/**
 * Елемент кошика
 */
export interface CartItem {
  productId: string;
  quantity: number;
}

/**
 * Дані для оновлення кошика
 */
export interface UpdateCartData {
  items: CartItem[];
}

/**
 * Дані для додавання продукту до кошика
 */
export interface AddToCartData {
  productId: string;
  quantity?: number;
}

/**
 * Кошик (повна інформація)
 */
export interface Cart {
  _id: string;
  userId: string;
  items: CartItem[];
  createdAt: string;
  updatedAt: string;
}

/**
 * Кошик (для API відповіді)
 */
export interface CartResponse {
  _id: string;
  userId: string;
  items: CartItem[];
  createdAt: string;
  updatedAt: string;
}

