"use client";

import { useFormContext } from "react-hook-form";

export function ProductDescription() {
  const { register } = useFormContext();

  return (
    <div className="space-y-2">
      <h2 className="font-semibold">Description</h2>
      <div className="relative border rounded scroll-area h-[150px]">
        <textarea
          {...register("description")}
          className="
      w-full
      h-full
      resize
      overflow-hidden
      border-0
      p-2
      outline-none
      bg-transparent
      text-sm
    "
        />
      </div>
    </div>
  );
}
