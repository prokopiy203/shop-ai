"use client";

import { Controller, useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ProductPrice() {
  const { control } = useFormContext();

  return (
    <Controller
      name="price"
      control={control}
      render={({ field }) => {
        const price = Number(field.value) || 0;

        return (
          <div className="space-y-3">
            {/* HEADER */}
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Product Price</h3>
            </div>

            {/* CONTROL */}
            <div className="flex items-center justify-between gap-2.5">
              <Label htmlFor="price">Price :</Label>

              <Input
                id="price"
                type="number"
                placeholder="price product"
                min={0}
                step="0.01"
                value={price}
                onChange={(e) => field.onChange(Number(e.target.value))}
                className="w-[90px] h-[35px] shadow-none"
              />
            </div>
          </div>
        );
      }}
    />
  );
}
