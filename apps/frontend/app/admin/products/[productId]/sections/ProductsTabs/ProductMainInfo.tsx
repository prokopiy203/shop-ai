"use client";

import { useFormContext, Controller, useWatch } from "react-hook-form";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useParams } from "next/navigation";
import { useAdminProductMedia } from "@/hooks/media/useAdminProductMedia";
import { MediaManager } from "@/components/layout/admin/controls/MediaMedger";

export function ProductMainInfo() {
  const { control, setValue } = useFormContext();
  const params = useParams<{ productId: string }>();
  const productId = params.productId;

  const { uploadImage } = useAdminProductMedia(productId);

  const images = useWatch({ name: "images" });
  const mainImage = images?.[0];

  /**
   * Upload handler для MediaManager
   * MediaManager сам керує loader / progress
   */
  async function handleUpload(
    file: File,
    onProgress?: (percent: number) => void
  ) {
    const uploadedImage = await uploadImage(file, onProgress);
    if (!uploadedImage) return;

    setValue("images", [uploadedImage, ...(images || [])], {
      shouldDirty: true,
      shouldTouch: true,
    });
  }

  /**
   * 🔐 SAFE value для MediaManager
   * або валідний MediaItem, або undefined
   */
  const mediaValue = mainImage
    ? {
        id: mainImage._id,
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
    <Card className="p-4 space-y-6">
      <h2 className="text-lg font-semibold">Main Info</h2>

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
        {/* MAIN IMAGE */}
        <MediaManager
          mode="single"
          aspect="square"
          value={mediaValue}
          onUpload={handleUpload}
        />

        {/* DESCRIPTION */}
        <div className="space-y-2">
          <Label>Description</Label>

          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <Textarea
                {...field}
                rows={8}
                placeholder="Product description..."
                className="
                  bg-muted
                  border-border
                  shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)]
                  focus-visible:ring-1
                  focus-visible:ring-ring
                  resize-y
                "
              />
            )}
          />
        </div>
      </div>
    </Card>
  );
}
