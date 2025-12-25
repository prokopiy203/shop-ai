"use client";

import { uploadAdminProductImage } from "@/lib/api/media";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

/**
 * Smart progress simulation:
 * - швидко доходить до ~60%
 * - повільно до ~88%
 * - 100% тільки після реального success
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

    const increment = progress < 60 ? Math.random() * 10 : Math.random() * 3;

    progress = Math.min(progress + increment, cap);
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
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<null | { code: string; message?: string }>(
    null
  );

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

    // ⛔️ захист від повторного upload
    if (isUploadingRef.current) {
      return null;
    }

    let simulator: ReturnType<typeof simulateProgress> | null = null;

    try {
      isUploadingRef.current = true;
      setError(null);

      if (isMountedRef.current) {
        setIsUploading(true);
      }

      // ▶️ старт імітації %
      if (onProgress) {
        simulator = simulateProgress(onProgress);
      }

      const image = await uploadAdminProductImage(productId, file);

      // ✅ реальний success → 100%
      simulator?.finish();

      if (isMountedRef.current) {
        toast.success("Image uploaded successfully");
      }

      return image;
    } catch (e: any) {
      simulator?.stop();

      if (isMountedRef.current) {
        toast.error("Failed to upload image", {
          description: e?.message ?? "Something went wrong while uploading",
        });

        setError({
          code: "UPLOAD_FAILED",
          message: e?.message,
        });
      }

      throw e;
    } finally {
      isUploadingRef.current = false;

      if (isMountedRef.current) {
        setIsUploading(false);
      }
    }
  };

  return {
    uploadImage,
    isUploading,
    error,
    resetError: () => setError(null),
  };
}
