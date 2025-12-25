"use client";

import { useEffect } from "react";
import { useAdminUIStore } from "@/store/admin-ui";

export function useApplyTheme() {
  const theme = useAdminUIStore((s) => s.theme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);
}
