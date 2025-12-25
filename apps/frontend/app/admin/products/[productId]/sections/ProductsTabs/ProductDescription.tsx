"use client";

import { useFormContext } from "react-hook-form";

export function ProductDescription() {
  const { register } = useFormContext();

  return (
    <div className="space-y-2">
      <h2 className="font-semibold">Description</h2>
      <textarea
        {...register("description")}
        rows={6}
        className="w-full border rounded p-2"
      />
    </div>
  );
}
