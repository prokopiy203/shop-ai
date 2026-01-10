import { apiClient } from "@/lib/api-client";
import { ProductBase, UpdateProductData } from "@shop-ai/types";

export type ProductImage = {
  _id: string;
  thumbnail: string;
  thumbnail2x?: string;
};

export type AdminProduct = {
  _id: string;
  title: string;
  sku: string;
  price: number;
  image: ProductImage | null;
  category: {
    _id: string;
    name: string;
    slug: string;
  };
  stock: number;
  isActive: boolean;
  createdAt: string;
};

export type AdminProductsData = {
  items: AdminProduct[];
  total: number;
  page: number;
  limit: number;
};

type GetAdminProductsParams = {
  page?: number;
  limit?: number;
  search?: string;
};

export const getAdminProducts = (
  params?: GetAdminProductsParams
): Promise<AdminProductsData> => {
  const query = params
    ? "?" +
      new URLSearchParams(
        Object.entries(params)
          .filter(([, v]) => v !== undefined)
          .map(([k, v]) => [k, String(v)])
      ).toString()
    : "";

  return apiClient<AdminProductsData>(`/admin/products${query}`, {
    method: "GET",
  });
};

export const getAdminProductById = async (id: string): Promise<ProductBase> => {
  const product = await apiClient<ProductBase>(`/api/products/${id}`, {
    method: "GET",
  });

  return product;
};

export const updateAdminProduct = async (
  productId: string,
  payload: UpdateProductData
): Promise<ProductBase> => {
  const product = await apiClient<ProductBase>(`/admin/products/${productId}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });

  return product;
};
