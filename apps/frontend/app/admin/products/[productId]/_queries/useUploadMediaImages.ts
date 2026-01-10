import { uploadAdminProductImage } from "@/lib/api/product/media";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUploadProductImage(productId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (file: File) => {
      return uploadAdminProductImage(productId, file);
    },

    onSuccess: (image) => {
      // 1️⃣ Оновлюємо кеш конкретного продукту (миттєвий UI)
      queryClient.setQueryData(["admin-product", productId], (old: any) => {
        if (!old) return old;
        return {
          ...old,
          image,
        };
      });

      // 2️⃣ ПРОГРІВАЄМО список продуктів
      queryClient.invalidateQueries({
        queryKey: ["admin-products"],
        exact: false,
      });
    },
  });
}
