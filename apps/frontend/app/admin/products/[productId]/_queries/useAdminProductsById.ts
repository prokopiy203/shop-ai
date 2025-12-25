import { getAdminProductById } from "@/lib/api/products";
import { useQuery } from "@tanstack/react-query";

export const useAdminProductById = (id: string) => {
  return useQuery({
    queryKey: ["admin-product", id],
    queryFn: () => getAdminProductById(id),
    enabled: !!id,
  });
};
