import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Theme } from "@shop-ai/types";

interface AdminUIState {
  theme: Theme;
  animationsEnabled: boolean;

  setTheme: (theme: Theme) => void;
  setAnimationsEnabled: (value: boolean) => void;
}

export const useAdminUIStore = create<AdminUIState>()(
  persist(
    (set) => ({
      theme: "light",
      animationsEnabled: true,

      setTheme: (theme) => set({ theme }),
      setAnimationsEnabled: (value) => set({ animationsEnabled: value }),
    }),
    { name: "admin-ui-settings" }
  )
);
