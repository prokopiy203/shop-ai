export const API = {
  auth: {
    login: {
      method: "POST",
      path: "/admin/auth/login",
      auth: false,
    },
    logout: {
      method: "POST",
      path: "/admin/auth/logout",
      auth: true,
    },
  },

  admin: {
    settings: {
      get: {
        method: "GET",
        path: "/admin/settings",
        auth: true,
      },
      update: {
        method: "PATCH",
        path: "/admin/settings",
        auth: true,
      },
    },
    products: {
      get: {
        method: "GET",
        path: "/admin/products",
        auth: true,
      },
      getById: {
        method: "GET",
        path: "/api/products/:id",
        auth: true,
      },
      update: {
        method: "PATCH",
        path: "/admin/products/:id",
        auth: true,
      },
    },
  },
} as const;
