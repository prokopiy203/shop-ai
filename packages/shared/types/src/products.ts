import type { Category } from "./categories.js";
import { ICharacteristic } from "./characteristics.js";
import { IImage } from "./upload.js";

export interface ProductBase {
  title: string;
  description?: string;
  sku: string;
  slug?: string;
  price: number;
  brand: string;
  category: string | Category;
  stock?: number;
  tags?: string[];
  isActive: boolean;
  image: IImage | null;
  gallery?: any[];
  videos?: string[];
  characteristics?: ICharacteristic[];
  vector: number[];
  textVector: number[];
  deleted?: boolean;
  deletedAt?: Date | null;
}

export type CreateProductData = Required<
  Pick<ProductBase, "title" | "price" | "category">
> &
  Omit<ProductBase, "title | 'price" | "category">;

export interface UpdateProductData extends Partial<ProductBase> {
  removeCharacteristics?: string[];
}

export interface Product extends Required<ProductBase> {
  _id: string;
  slug: string;
  rating: number;
  vector: number[];
  createdAt: string;
  updatedAt: string;
}

export type ProductResponse = Omit<Product, "vector">;
