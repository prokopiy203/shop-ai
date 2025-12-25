"use client";

import { Toaster } from "@/components/ui/sonner";
import { useAdminUIStore } from "@/store/admin-ui";

export function SonnerProvider() {
  const { theme } = useAdminUIStore();
  return <Toaster theme={theme === "dark" ? "dark" : "light"} closeButton />;
}
