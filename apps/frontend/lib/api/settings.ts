import { StoreSettings, UpdateStoreSettingsPayload } from "@shop-ai/types";
import { apiClient } from "../api-client";

export const getAdminSettings = async (): Promise<StoreSettings> => {
  return await apiClient("/admin/settings", {
    method: "GET",
  });
};

export const updateAdminSettings = async (
  payload: UpdateStoreSettingsPayload
): Promise<StoreSettings> => {
  const settings = await apiClient<StoreSettings>("/admin/settings", {
    method: "PATCH",
    body: JSON.stringify(payload),
  });

  return settings;
};
