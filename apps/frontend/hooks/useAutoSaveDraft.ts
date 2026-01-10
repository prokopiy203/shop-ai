"use client";

import { useEffect } from "react";
import { Control, FieldValues, useWatch } from "react-hook-form";
import { useDebounce } from "use-debounce";

type UseAutoSaveDraftParams<T extends FieldValues> = {
  productId: string;
  control: Control<T>;
  isDirty: boolean;
  saveDraft: (id: string, data: Partial<T>) => void;
  delay?: number;
};

export function useAutoSaveDraft<T extends FieldValues>({
  productId,
  control,
  isDirty,
  saveDraft,
  delay = 600,
}: UseAutoSaveDraftParams<T>) {
  // 👀 слідкуємо ТІЛЬКИ за значеннями форми
  const values = useWatch({ control });

  // ⏳ debounce для стабільності
  const [debouncedValues] = useDebounce(values, delay);

  useEffect(() => {
    if (!isDirty) return;

    // 💾 зберігаємо ТІЛЬКИ form state
    saveDraft(productId, debouncedValues);
  }, [debouncedValues, productId, isDirty, saveDraft]);
}
