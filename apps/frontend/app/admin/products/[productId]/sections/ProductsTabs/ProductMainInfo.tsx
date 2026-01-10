"use client";

import { useFormContext, Controller } from "react-hook-form";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useParams } from "next/navigation";
import { useAdminProductMedia } from "@/hooks/media/useAdminProductMedia";
import { MediaManager } from "@/components/layout/admin/controls/MediaMedger";
import { useAdminProductById } from "../../_queries/useAdminProductsById";
import { Loader2, Sparkles } from "lucide-react";
import { GenerateDescriptionButton } from "../../edit/_components/GenerateDescription";

export function ProductMainInfo() {
  const { control } = useFormContext();
  const { productId } = useParams<{ productId: string }>();

  const { data: product } = useAdminProductById(productId);
  const { uploadImage } = useAdminProductMedia(productId);

  // ✅ source of truth — product
  const images = product?.image ?? null;
  const mainImage = images;

  async function handleUpload(
    file: File,
    onProgress?: (percent: number) => void
  ) {
    await uploadImage(file, onProgress);
    // 🔥 UI оновиться через query cache
  }

  const mediaValue = mainImage
    ? {
        id: mainImage.publicId,
        src: {
          mobile: mainImage.mobile,
          original: mainImage.original,
          retina: mainImage.preview,
        },
        alt: mainImage.alt || mainImage.visionDescription || "Product image",
        type: "image" as const,
      }
    : undefined;

  return (
    <Card className="p-2 md:p-4 lg:p-2 space-y-2 md:space-y-4 shadow-none">
      <h2 className="text-lg font-semibold">Main Info</h2>

      <div className="grid grid-cols-1 lg:grid-cols-[40%_1fr] gap-3">
        <MediaManager
          mode="single"
          aspect="square"
          value={mediaValue}
          onUpload={handleUpload}
        />

        <div className="flex flex-col gap-2">
          <Label>Description</Label>

          <Controller
            name="description"
            control={control}
            render={({ field }) => {
              const isLoading = false; // 🔜 replace with mutation.isPending

              return (
                <div className="relative">
                  <Textarea
                    {...field}
                    rows={10}
                    placeholder="Product description..."
                    className="
      scroll-area
      bg-muted
      border-border
      shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)]
      focus-visible:ring-1
      focus-visible:ring-ring
      pr-12
    "
                  />

                  <GenerateDescriptionButton />
                </div>
              );
            }}
          />
        </div>
      </div>
    </Card>
  );
}
