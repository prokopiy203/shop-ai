"use client";

import { Button } from "@/components/ui/button";

export function MobileSaveBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 md:hidden border-t bg-background p-2">
      <Button className="w-full">Save Changes</Button>
    </div>
  );
}
