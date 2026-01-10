"use client";

import { Sparkles, Loader2 } from "lucide-react";
import { useParams } from "next/navigation";
import { useFormContext } from "react-hook-form";
import { useGenerateProductDescription } from "../../_queries/useGenerateDescription";

export function GenerateDescriptionButton() {
  const { productId } = useParams<{ productId: string }>();
  const { setValue } = useFormContext();
  const { mutateAsync, isPending } = useGenerateProductDescription();

  const handleGenerate = async () => {
    const response: any = await mutateAsync({ productId });
    console.log("RES ", response);
    console.log("DATA ", response.data);

    // ⬇️ ВАЖЛИВО: беремо ТІЛЬКИ текст
    const text = response.description ?? "";
    console.log("TEXT Gener", text);

    setValue("description", text, {
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  return (
    <button
      type="button"
      onClick={handleGenerate}
      disabled={isPending}
      title="Generate description with AI"
      className="
        absolute bottom-2 right-2
        h-8 w-8 rounded-full
        bg-secondary border border-border
        flex items-center justify-center
        shadow-sm hover:bg-secondary/80
        disabled:opacity-50
      "
    >
      {isPending ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Sparkles className="h-4 w-4" />
      )}
    </button>
  );
}
