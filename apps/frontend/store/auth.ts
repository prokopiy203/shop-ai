import { create } from "zustand";

type AuthState = {
  logout: () => void;
};

export const useAuthStore = create<AuthState>(() => ({
  logout: () => {
    document.cookie = "accessToken=; Max-Age=0; path=/";
  },
}));
