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
    <SidebarMenu className="p-0">
      <SidebarMenuItem
        className="
          relative
          h-10
          px-2
          flex
          items-center
        "
      >
        {/* AVATAR — завжди на місці */}
        <div className="absolute left-0 h-10 w-10 rounded-md bg-muted overflow-hidden">
          {user?.avatar && (
            <img
              src={user.avatar.url}
              alt={user.name}
              className="h-10 w-10 object-cover"
            />
          )}
        </div>

        {!isCollapsed && (
          <div className="ml-12 flex w-full items-center gap-2">
            <span className="text-sm text-muted-foreground truncate">
              Welcome, <strong className="text-foreground">{user?.name}</strong>
            </span>

            <button
              onClick={logout}
              className="
                ml-auto
                inline-flex
                h-8
                w-8
                items-center
                justify-center
                rounded-md
                text-muted-foreground
                hover:bg-muted
                hover:text-foreground
                transition
              "
              aria-label="Logout"
              title="Logout"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        )}
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
