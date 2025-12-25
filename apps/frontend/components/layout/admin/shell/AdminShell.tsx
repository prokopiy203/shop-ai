"use client";

import { ReactNode } from "react";
import AdminBackground from "@/components/layout/admin/background/AdminBackground";
import AdminHeader from "@/components/layout/admin/header/AdminHeader";
import AdminSidebar from "@/components/layout/admin/sidebar/AdminSidebar";
import AdminContentContainer from "@/components/layout/admin/shell/AdminContentContainer";
import { useAdminUIStore } from "@/store/admin-ui";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function AdminShell({ children }: { children: ReactNode }) {
  const animationsEnabled = useAdminUIStore((s) => s.animationsEnabled);

  return (
    <SidebarProvider>
      <div className="relative min-h-screen w-full p-2  overflow-hidden bg-muted">
        {/* BACKGROUND */}
        {animationsEnabled && <AdminBackground />}

        {/* APP SHELL */}
        <div className="relative z-10 flex gap-4 min-h-screen">
          <AdminSidebar />

          <div className="flex flex-1 flex-col gap-5">
            <AdminHeader />
            <AdminContentContainer>
              <main>{children}</main>
            </AdminContentContainer>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
