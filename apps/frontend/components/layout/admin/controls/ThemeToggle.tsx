"use client";

import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAdminUIStore } from "@/store/admin-ui";
import { useCapabilityContext } from "@/modules/context/useCapabilityContext";
import { executeCapability } from "@/modules";

export default function ThemeToggle() {
  const theme = useAdminUIStore((s) => s.theme);
  const ctx = useCapabilityContext();

  const onToggle = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";

    executeCapability("changeTheme", { theme: nextTheme }, ctx);
  };

  return (
    <Button variant="ghost" size="icon" onClick={onToggle}>
      {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
    </Button>
  );
}
