import { apiClient } from "@/lib/api-client";
import { User } from "@shop-ai/types";

export type AdminLoginPayload = {
  email: string;
  password: string;
};

export type AdminLoginResponse = {
  data: {
    tokens: {
      accessToken: string;
    };
    user: User;
  };
};

export const adminLogin = (payload: AdminLoginPayload) => {
  return apiClient<AdminLoginResponse>("/admin/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};
