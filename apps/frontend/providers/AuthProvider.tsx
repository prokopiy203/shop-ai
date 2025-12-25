"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useAdminUIStore } from "@/store/admin-ui";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isFetched, user } = useAuth();

  const setTheme = useAdminUIStore((s) => s.setTheme);
  const setAnimationsEnabled = useAdminUIStore((s) => s.setAnimationsEnabled);

  useEffect(() => {
    if (!isFetched) return;

    if (!user) {
      router.replace("/");
      return;
    }

    setTheme(user.preferences.theme);
    setAnimationsEnabled(!!user.preferences.animationsEnabled);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetched, user]);

  if (!isFetched) {
    return null;
  }

  return children;
}
