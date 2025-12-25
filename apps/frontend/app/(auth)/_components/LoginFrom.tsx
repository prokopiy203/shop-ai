"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z as zod } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAdminLogin } from "../_mutations/useAdminLogin";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import LiquidEther from "@/components/effects/LiquidEther";

const loginSchema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(6),
});

type LoginFormData = zod.infer<typeof loginSchema>;

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const loginMutation = useAdminLogin();

  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data);
  };

  return (
    <>
      {/* BACKGROUND */}
      <div className="absolute inset-0 -z-10">
        <LiquidEther className="bg-black" />
      </div>

      <div className="flex min-h-screen items-center justify-center bg-muted/0 backdrop-blur-sm">
        <Card className="w-full max-w-sm ">
          <CardHeader>
            <CardTitle className="text-center text-xl">Admin Login</CardTitle>
            <CardDescription className="text-center">
              Sign in to manage your store
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-6">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    autoFocus
                    id="email"
                    type="email"
                    className="pl-8"
                    required
                    placeholder="Email"
                    {...form.register("email")}
                  />
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="pl-8"
                    {...form.register("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
              <Button
                type="submit"
                className="w-full mt-4"
                disabled={loginMutation.isPending}
              >
                {loginMutation.isPending ? "Logging in..." : "Login"}
              </Button>

              {loginMutation.isError && (
                <p className="text-sm text-red-500 text-center">
                  Invalid email or password
                </p>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
