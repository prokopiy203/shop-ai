"use client";

import { Button } from "@/components/ui/button";

export function ProductsErrorState() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
      <p className="text-sm text-muted-foreground">Failed to load products.</p>

      <Button onClick={() => window.location.reload()}>Try again</Button>
    </div>
  );
}
