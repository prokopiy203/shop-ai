"use client";

import { Controller, useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

export function ProductStock() {
  const { control } = useFormContext();

  return (
    <Controller
      name="stock"
      control={control}
      render={({ field }) => {
        const stock = Number(field.value) || 0;
        const inStock = stock > 0;

        return (
          <div className="space-y-3">
            {/* HEADER */}
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Stock</h3>

              <Badge
                variant={inStock ? undefined : "secondary"}
                className={
                  inStock
                    ? `
        bg-green-600 hover:bg-green-700 shadow-none
      `
                    : undefined
                }
              >
                {inStock ? "In stock" : "Out of stock"}
              </Badge>
            </div>

            {/* CONTROL */}
            <div className="flex items-center justify-between ">
              <Label htmlFor="stock">Quantity:</Label>

              <Input
                id="stock"
                type="number"
                min={0}
                step={1}
                value={stock}
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
