"use client";

import { useUploadProductImage } from "@/app/admin/products/[productId]/_queries/useUploadMediaImages";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

/**
 * Smart progress simulation
 */
function simulateProgress(
  onProgress: (p: number) => void,
  options?: {
    start?: number;
    cap?: number;
    interval?: number;
  }
) {
  let progress = options?.start ?? 0;
  const cap = options?.cap ?? 88;
  const interval = options?.interval ?? 300;

  const timer = setInterval(() => {
    if (progress >= cap) return;

    const inc = progress < 60 ? Math.random() * 10 : Math.random() * 3;
    progress = Math.min(progress + inc, cap);
    onProgress(Math.round(progress));
  }, interval);

  return {
    finish() {
      clearInterval(timer);
      onProgress(100);
    },
    stop() {
      clearInterval(timer);
    },
  };
}

export function useAdminProductMedia(productId: string) {
  const uploadImageMutation = useUploadProductImage(productId);

  const isMountedRef = useRef(true);
  const isUploadingRef = useRef(false);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const uploadImage = async (
    file: File,
    onProgress?: (percent: number) => void
  ) => {
    if (!file) return null;
    if (isUploadingRef.current) return null;

    let simulator: ReturnType<typeof simulateProgress> | null = null;

    try {
      isUploadingRef.current = true;

      if (onProgress) {
        simulator = simulateProgress(onProgress);
      }

      const image = await uploadImageMutation.mutateAsync(file);

      simulator?.finish();
      toast.success("Image uploaded successfully");

      return image;
    } catch (e: any) {
      simulator?.stop();

      toast.error("Failed to upload image", {
        description: e?.message ?? "Upload error",
      });

      throw e;
    } finally {
      isUploadingRef.current = false;
    }
  };

  return {
    uploadImage,
    isUploading: uploadImageMutation.isPending,
    error: uploadImageMutation.error,
  };
}
