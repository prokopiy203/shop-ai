import { useEffect, useRef } from "react";
import { useDebouncedCallback } from "use-debounce";
import { apiClient } from "@/lib/api-client";
import { UserPreferences } from "@shop-ai/types";

export function useDebouncedUserPreferences(
  preferences: Partial<UserPreferences>
) {
  const isFirstRender = useRef(true);

  const savePreferences = useDebouncedCallback(
    async (prefs: Partial<UserPreferences>) => {
      try {
        await apiClient("/api/user/me/preferences", {
          method: "PATCH",
          body: JSON.stringify(prefs),
        });
      } catch (e) {
        console.error("Failed to save user preferences", e);
      }
    },
    600 // ⏱ debounce
  );

  useEffect(() => {
    // ⛔ не стріляємо при hydrate / login
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    // 🧠 якщо нічого не передали — нічого не робимо
    if (!preferences || Object.keys(preferences).length === 0) {
      return;
    }

    savePreferences(preferences);
  }, [preferences, savePreferences]);
}
