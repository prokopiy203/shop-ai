import { getAdminProducts } from "@/lib/api/products";
import { useQuery } from "@tanstack/react-query";

export const useAdminProducts = (params: {
  page: number;
  limit: number;
  search?: string;
}) => {
  return useQuery({
    queryKey: ["admin-products", params],
    queryFn: () => getAdminProducts(params),
  });
};
