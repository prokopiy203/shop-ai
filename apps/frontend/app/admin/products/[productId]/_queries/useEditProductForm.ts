import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAdminProductById } from "./useAdminProductsById";
import { UpdateProductData } from "@shop-ai/types";
import { updateAdminProduct } from "@/lib/api/products";

export const useEditProductForm = (productId: string) => {
  const queryClient = useQueryClient();
  const productQuery = useAdminProductById(productId);
  const updateProduct = useMutation({
    mutationFn: (payload: UpdateProductData) =>
      updateAdminProduct(productId, payload),

    onSuccess: (updated) => {
      queryClient.setQueryData(["admin-product", productId], updated);

      queryClient.invalidateQueries({
        queryKey: ["admin-products"],
      });
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
