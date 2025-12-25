import { useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { Avatar } from "@shop-ai/types";
import { useRouter } from "next/navigation";

export interface AuthUser {
  _id: string;
  name: string;
  email: string;
  avatar: Avatar;
  role: "user" | "admin";
  preferences: {
    theme: "light" | "dark";
    language: "uk" | "en";
    aiVoice: "female" | "male";
    animationsEnabled?: boolean;
  };
}

const fetchMe = async (): Promise<AuthUser> => {
  return apiClient<AuthUser>("/api/user/me");
};

export function useAuth() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const query = useQuery({
    queryKey: ["me"],
    queryFn: fetchMe,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

  const logout = async () => {
    try {
      await apiClient("/api/auth/logout", {
        method: "POST",
      });
    } catch {
    } finally {
      queryClient.removeQueries({ queryKey: ["me"] });

      router.replace("/");
    }
  };

  return {
    user: query.data,
    isAuthenticated: !!query.data,
    isLoading: query.isLoading,
    isFetched: query.isFetched,
    logout,
  };
}
