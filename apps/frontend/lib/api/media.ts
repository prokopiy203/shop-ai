import { apiClient } from "@/lib/api-client";

export const uploadAdminProductImage = async (
  productId: string,
  file: File
) => {
  const formData = new FormData();
  formData.append("file", file);

  const image = await apiClient(`/admin/products/media/${productId}/image`, {
    method: "POST",
    body: formData,
  });

  return image;
};
