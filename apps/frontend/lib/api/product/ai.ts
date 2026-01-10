import { apiClient } from "@/lib/api-client";
import {
  DescriptionOverride,
  ResponseGenerateDescription,
} from "@shop-ai/types";

export const generateAdminProductTags = async (
  productId: string
): Promise<string[]> => {
  return apiClient<string[]>(`/admin/products/ai/${productId}/tags`, {
    method: "POST",
  });
};

export const generateAdminProductDescription = async (
  productId: string,
  override?: DescriptionOverride
) => {
  return apiClient(`/admin/products/ai/${productId}/description`, {
    method: "POST",
    body: JSON.stringify(override),
  });
};
