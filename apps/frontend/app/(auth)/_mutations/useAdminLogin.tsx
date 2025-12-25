import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { adminLogin } from "@/lib/api/auth";
import { toast } from "sonner";

export const useAdminLogin = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: adminLogin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
      router.push("/admin");

      toast.success("You're welcome!", {
        description: "Successfully logged in",
      });
    },
    onError: (error: any) => {
      toast.error("Login failed", {
        description: error?.message ?? "Invalid email or password",
      });
    },
  });
};
