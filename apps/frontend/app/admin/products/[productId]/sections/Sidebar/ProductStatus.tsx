"use client";

import { useFormContext, Controller } from "react-hook-form";
import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export function ProductStatus() {
  const { control } = useFormContext();

  return (
    <Card className="p-4 space-y-3">
      <h3 className="font-medium">Product Status</h3>

      <Controller
        name="isActive"
        control={control}
        render={({ field }) => (
          <div className="flex items-center justify-between">
            <Label>Active</Label>
            <Switch checked={field.value} onCheckedChange={field.onChange} />
          </div>
        )}
      />
    </Card>
  );
}
