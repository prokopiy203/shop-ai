import { Capability } from "@/modules/core/types";
import { NavigationCapabilityId } from "./ids";

export const navigationCapabilities = {
  openDashboard: {
    perform: (_: unknown, ctx) => {
      ctx.router.push("/admin/dashboard");
    },
  },

  openProducts: {
    perform: (_: unknown, ctx) => {
      ctx.router.push("/admin/products");
    },
  },

  openOrders: {
    perform: (_: unknown, ctx) => {
      ctx.router.push("/admin/orders");
    },
  },

  openUsers: {
    perform: (_: unknown, ctx) => {
      ctx.router.push("/admin/users");
    },
  },

  openAnalytics: {
    perform: (_: unknown, ctx) => {
      ctx.router.push("/admin/analytics");
    },
  },

  openAI: {
    perform: (_: unknown, ctx) => {
      ctx.router.push("/admin/ai");
    },
  },

  openSettings: {
    perform: (_: unknown, ctx) => {
      ctx.router.push("/admin/settings");
    },
  },
} as const satisfies Record<
  NavigationCapabilityId,
  Capability<any, NavigationCapabilityId>
>;
