import { getAdminSettings } from "@/lib/api/settings";
import { StoreSettings } from "@shop-ai/types";
import { useQuery } from "@tanstack/react-query";

export const useSettings = () => {
  return useQuery<StoreSettings>({
    queryKey: ["admin-settings"],
    queryFn: getAdminSettings,
    staleTime: 1000 * 60 * 5,
  });
};
