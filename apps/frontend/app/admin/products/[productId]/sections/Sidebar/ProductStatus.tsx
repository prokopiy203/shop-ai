"use client";

import { useFormContext, Controller } from "react-hook-form";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

export function ProductStatus() {
  const { control } = useFormContext();

  return (
    <Controller
      name="isActive"
      control={control}
      render={({ field }) => {
        const isActive = Boolean(field.value);

        return (
          <div className="space-y-3">
            {/* HEADER */}
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Product Status</h3>

              <Badge variant={isActive ? "default" : "secondary"}>
                {isActive ? "Active" : "Inactive"}
              </Badge>
            </div>

            {/* CONTROL */}
            <div className="flex items-center justify-between">
              <Label>Active</Label>

              <Switch checked={isActive} onCheckedChange={field.onChange} />
            </div>
          </div>
        );
      }}
    />
  );
}
