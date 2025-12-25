"use client";

import { useEffect } from "react";
import { Control, useWatch, FieldValues } from "react-hook-form";
import { useDebounce } from "use-debounce";

type UseAutoSaveDraftParams<T extends FieldValues> = {
  productId: string;
  product: T | null | undefined;
  control: Control<T>;
  isDirty: boolean;
  saveDraft: (id: string, data: T) => void;
  delay?: number;
};

export function useAutoSaveDraft<T extends FieldValues>({
  productId,
  product,
  control,
  isDirty,
  saveDraft,
  delay = 600,
}: UseAutoSaveDraftParams<T>) {
  const values = useWatch({ control });

  const [debouncedValues] = useDebounce(values, delay);

  useEffect(() => {
    if (!product) return;
    if (!isDirty) return;

    saveDraft(productId, debouncedValues as T);
  }, [debouncedValues, productId, product, isDirty, saveDraft]);
}
