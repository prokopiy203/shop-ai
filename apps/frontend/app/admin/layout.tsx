"use client";

import { ReactNode } from "react";
import AdminShell from "@/components/layout/admin/shell/AdminShell";
import { AuthProvider } from "@/providers/AuthProvider";
import { useApplyTheme } from "@/hooks/useApplyTheme";
import { SonnerProvider } from "@/providers/SonnerProvider";

export default function AdminLayout({ children }: { children: ReactNode }) {
  useApplyTheme();

  return (
    <AuthProvider>
      <AdminShell>{children}</AdminShell>
      <SonnerProvider />
    </AuthProvider>
  );
}
