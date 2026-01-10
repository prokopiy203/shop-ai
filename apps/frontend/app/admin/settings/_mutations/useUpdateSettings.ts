import { updateAdminSettings } from "@/lib/api/settings";
import { StoreSettings, UpdateStoreSettingsPayload } from "@shop-ai/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUpdateSettings = () => {
  const queryClient = useQueryClient();

  return useMutation<
    StoreSettings,
    Error,
    UpdateStoreSettingsPayload,
    { previous?: StoreSettings }
  >({
    mutationFn: updateAdminSettings,

    // 🚀 OPTIMISTIC UPDATE
    onMutate: async (patch) => {
      await queryClient.cancelQueries({ queryKey: ["admin-settings"] });

      const previous = queryClient.getQueryData<StoreSettings>([
        "admin-settings",
      ]);

      queryClient.setQueryData<StoreSettings>(["admin-settings"], (current) => {
        if (!current || !patch.ai) return current;

        return {
          ...current,
          ai: {
            ...current.ai,
            productDescription: {
              ...current.ai.productDescription,
              ...patch.ai.productDescription,
            },
            imageAltText: {
              ...current.ai.imageAltText,
              ...patch.ai.imageAltText,
            },
            chatAssistant: {
              ...current.ai.chatAssistant,
              ...patch.ai.chatAssistant,
            },
          },
        };
      });

      return { previous };
    },

    // ❌ ERROR → ROLLBACK + TOAST
    onError: (error, _patch, ctx) => {
      if (ctx?.previous) {
        queryClient.setQueryData(["admin-settings"], ctx.previous);
      }

      toast.error("Failed to update settings", {
        description: error.message,
      });
    },

    // ✅ SUCCESS
    onSuccess: (serverData) => {
      // гарантуємо ідеальний state з сервера
      queryClient.setQueryData(["admin-settings"], serverData);
      toast.success("Settings updated");
    },
  });
};
