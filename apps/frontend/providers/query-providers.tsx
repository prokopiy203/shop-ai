"use client";

import {
  QueryClient,
  QueryClientProvider,
  QueryCache,
  MutationCache,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: (error: any) => {
        if (error?.status === 401) {
          router.replace("/");
        }
      },
    }),
    mutationCache: new MutationCache({
      onError: (error: any) => {
        if (error?.status === 401) {
          router.replace("/");
        }
      },
    }),
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
