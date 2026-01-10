import { ProductFormValues } from "../types/product-form";

export function mapProductToForm(product: any): ProductFormValues {
  return {
    title: product.title ?? "",
    description:
      typeof product.description === "string"
        ? product.description
        : (product.description?.description ?? ""),
    sku: product.sku ?? "",
    price: product.price ?? 0,
    brand: product.brand ?? "",
    categoryId:
      typeof product.category === "string"
        ? product.category
        : (product.category?._id ?? ""),
    stock: product.stock ?? undefined,
    tags: product.tags ?? [],
    isActive: product.isActive ?? false,
  };
}
