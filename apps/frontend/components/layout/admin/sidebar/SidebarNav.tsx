"use client";

import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  Sparkles,
  Settings,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { useCapabilityContext } from "@/modules/context/useCapabilityContext";
import { executeCapability } from "@/modules";
import {
  SidebarMenu,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";

const NAV_ITEMS = [
  {
    id: "openDashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/admin/dashboard",
  },
  {
    id: "openProducts",
    label: "Products",
    icon: Package,
    href: "/admin/products",
  },
  {
    id: "openOrders",
    label: "Orders",
    icon: ShoppingCart,
    href: "/admin/orders",
  },
  { id: "openUsers", label: "Users", icon: Users, href: "/admin/users" },
  {
    id: "openAnalytics",
    label: "Analytics",
    icon: BarChart3,
    href: "/admin/analytics",
  },
  { id: "openAI", label: "AI Tools", icon: Sparkles, href: "/admin/ai" },
  {
    id: "openSettings",
    label: "Settings",
    icon: Settings,
    href: "/admin/settings",
  },
] as const;

export default function SidebarNav() {
  const pathname = usePathname();
  const ctx = useCapabilityContext();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <>
      <SidebarMenu className="space-y-1.5  ">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname.startsWith(item.href);
          const Icon = item.icon;

          return (
            <SidebarMenuButton
              key={item.id}
              onClick={() => executeCapability(item.id, null, ctx)}
              className={cn(
                "flex w-full items-center gap-3 rounded-md text-sm transition-colors text-left",
                "md:justify-start lg:justify-start",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/70"
              )}
            >
              <Icon
                className={cn(
                  "flex items-center",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}
              />
              <span className={isCollapsed ? "hidden" : ""}>{item.label}</span>
            </SidebarMenuButton>
          );
        })}
      </SidebarMenu>
    </>
  );
}
