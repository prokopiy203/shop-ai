"use client";

import { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

export function EditableProductTitle() {
  const { register, watch, setFocus } = useFormContext();
  const [isEditing, setIsEditing] = useState(false);

  const title = watch("title");
  const price = watch("price");

  useEffect(() => {
    if (isEditing) {
      setFocus("title");
    }
  }, [isEditing, setFocus]);

  return (
    // ⬇️ ОДИН стабільний рядок
    <div className="flex items-center justify-between gap-5 h-10">
      {/* LEFT: TITLE */}
      <div className="flex items-center gap-2 flex-1 min-w-0">
        {!isEditing ? (
          <>
            <h1 className="text-2xl font-semibold leading-none">{title}</h1>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setIsEditing(true)}
            >
              <Pencil className="h-4 w-4 text-muted-foreground" />
            </Button>
          </>
        ) : (
          <Input
            {...register("title")}
            onBlur={() => setIsEditing(false)}
            className="
              h-10
              text-2xl
              flex-1
              font-semibold
              px-1
              py-2
             min-w-0
            "
          />
        )}
      </div>

      {/* RIGHT: PRICE (ЗАВЖДИ Є) */}
      <div>
        <span className="text-2xl font-semibold leading-none">${price}</span>
      </div>
    </div>
  );
}
