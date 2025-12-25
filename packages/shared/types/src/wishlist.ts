export interface WishlistItem {
  _id: string;
  userId: string;
  productId: string;
  createdAt: string;
  updatedAt: string;
}

export interface WishlistCreateData {
  productId: string;
}

export interface WishlistRemoveData {
  productId: string;
}
