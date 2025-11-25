import type { Category } from "./categories.js";

export interface ProductBase {
  title: string;
  description?: string;
  slug?: string;
  price: number;
  category: string | Category;
  stock?: number;
  tags?: string[];
  images?: string[];
  vector: number[];
  deleted?: boolean;
  deletedAt?: Date | null;
}

export type CreateProductData = Required<
  Pick<ProductBase, "title" | "price" | "category">
> &
  Omit<ProductBase, "title | 'price" | "category">;

export type UpdateProductData = Partial<ProductBase>;

export interface Product extends Required<ProductBase> {
  _id: string;
  slug: string;
  rating: number;
  vector: number[];
  createdAt: string;
  updatedAt: string;
}

export type ProductResponse = Omit<Product, "vector">;
