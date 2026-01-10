import { generateAdminProductTags } from "@/lib/api/product/ai";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

export const useGenerateProductTags = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId: string) => generateAdminProductTags(productId),

    onSuccess: (generatedTags, productId) => {
      queryClient.setQueryData(["admin-product", productId], (old: any) =>
        old
          ? {
              ...old,
              tags: Array.from(new Set([...old.tags, ...generatedTags])),
            }
          : old
      );

      toast.success(`Generated ${generatedTags.length} tags`);
    },

    onError: () => {
      toast.error("Failed to generate tags");
    },
  });
};
