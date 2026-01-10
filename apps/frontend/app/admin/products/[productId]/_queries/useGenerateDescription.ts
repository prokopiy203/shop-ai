import { generateAdminProductDescription } from "@/lib/api/product/ai";
import { GenerateProductDescriptionInput } from "@shop-ai/types";
import { useMutation } from "@tanstack/react-query";

export const useGenerateProductDescription = () => {
  return useMutation({
    mutationFn: ({ productId, override }: GenerateProductDescriptionInput) =>
      generateAdminProductDescription(productId, override),
  });
};
