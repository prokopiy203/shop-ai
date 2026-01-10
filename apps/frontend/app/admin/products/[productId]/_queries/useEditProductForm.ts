import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAdminProductById } from "./useAdminProductsById";
import { UpdateProductData } from "@shop-ai/types";
import { toast } from "sonner";
import { useProductsDraftStore } from "../_store/products";
import { updateAdminProduct } from "@/lib/api/product/products";

export const useEditProductForm = (productId: string) => {
  const queryClient = useQueryClient();
  const productQuery = useAdminProductById(productId);
  const clearDraft = useProductsDraftStore((s) => s.clearDraft);

  const updateProduct = useMutation({
    mutationFn: (payload: UpdateProductData) =>
      updateAdminProduct(productId, payload),

    onSuccess: () => {
      /**
       * ❗️КЛЮЧОВИЙ МОМЕНТ
       * Ми НЕ setQueryData(updated),
       * бо PATCH не повертає images.
       * Натомість — перевалідуємо продукт.
       */
      queryClient.invalidateQueries({
        queryKey: ["admin-product", productId],
      });

      queryClient.invalidateQueries({
        queryKey: ["admin-products"],
      });

      clearDraft();
      toast.success("Product saved");
    },

    onError: (error: unknown) => {
      let message = "Failed to save product";

      if (error instanceof Error) {
        message = error.message;
      }

      toast.error(message);
    },
  });

  return {
    product: productQuery.data,
    isLoading: productQuery.isLoading,
    isError: productQuery.isError,

    save: updateProduct.mutate,
    isSaving: updateProduct.isPending,
    saveError: updateProduct.error,
  };
};
