"use client";

import {
  SidebarMenu,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useAuth } from "@/hooks/useAuth";
import { LogOut } from "lucide-react";

export default function AdminUserMenu() {
  const { user, logout } = useAuth();
  const { state } = useSidebar();

  const isCollapsed = state === "collapsed";
  return (
    <SidebarMenu>
      <SidebarMenuItem className="flex justify-between gap-5  items-center  ">
        <div className="h-10 w-10 rounded-md bg-muted overflow-hidden">
          {user?.avatar && (
            <img
              src={user.avatar.url}
              alt={user.name}
              className="h-10 w-10 rounded-md object-cover"
            />
          )}
        </div>

        {!isCollapsed && (
          <span className="text-sm text-muted-foreground">
            Welcome, <strong className="text-foreground">{user?.name}</strong>
          </span>
        )}

        {/* Logout показується лише коли expanded */}
        {!isCollapsed && (
          <button
            onClick={logout}
            className="ml-auto inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition"
            aria-label="Logout"
            title="Logout"
          >
            <LogOut className="h-4 w-4" />
          </button>
        )}
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
