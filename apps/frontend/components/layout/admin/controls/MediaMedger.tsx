"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

/* ───────────────── TYPES ───────────────── */

export type MediaSource = {
  mobile?: string; // 1x  (mobile / low-res)
  original: string; // 2x  (default / retina)
  retina?: string; // 3x  (high-density)
};

export type MediaItem = {
  id: string;
  src: MediaSource;
  alt?: string;
  type?: "image" | "video";
};

type Props = {
  mode?: "single" | "grid";
  value?: MediaItem;
  items?: MediaItem[];

  max?: number;
  accept?: string;
  aspect?: "square" | "video";

  onUpload: (
    file: File,
    onProgress?: (p: number) => void
  ) => Promise<MediaItem | void>;

  onRemove?: (id: string) => void;
};

/* ───────────────── COMPONENT ───────────────── */

export function MediaManager({
  mode = "single",
  value,
  items = [],

  max = 8,
  accept = "image/*",
  aspect = "square",

  onUpload,
  onRemove,
}: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [optimisticSrc, setOptimisticSrc] = useState<string | null>(null);

  const aspectClass =
    aspect === "square"
      ? "aspect-square"
      : aspect === "video"
        ? "aspect-video"
        : "";

  /* ───────────── UPLOAD HANDLER ───────────── */

  async function handleFile(file: File) {
    setIsUploading(true);
    setProgress(0);
    const tempUrl = URL.createObjectURL(file);
    setOptimisticSrc(tempUrl);

    try {
      await onUpload(file, setProgress);
    } finally {
      setIsUploading(false);
      URL.revokeObjectURL(tempUrl);
      setOptimisticSrc(null);
    }
  }

  /* ───────────── PREVIEW RENDER ───────────── */

  function renderPreview(
    src?: MediaSource,
    type?: "image" | "video",
    alt?: string
  ) {
    if (!src) {
      return <span className="text-xs text-muted-foreground">Drop file</span>;
    }

    if (type === "video") {
      return (
        <video
          src={src.original}
          className="h-full w-full object-cover"
          muted
          playsInline
        />
      );
    }

    return (
      <img
        src={src.mobile || src.original}
        srcSet={[
          src.mobile && `${src.mobile} 1x`,
          src.original && `${src.original} 2x`,
          src.retina && `${src.retina} 3x`,
        ]
          .filter(Boolean)
          .join(", ")}
        sizes="
          (max-width: 640px) 90vw,
          (max-width: 1024px) 50vw,
          25vw
        "
        alt={alt || ""}
        loading="lazy"
        decoding="async"
        className={cn(
          "h-full w-full object-cover transition-opacity",
          isUploading && "opacity-60"
        )}
      />
    );
  }

  /* ───────────── DROP ZONE ───────────── */

  function DropZone({ item }: { item?: MediaItem }) {
    return (
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          const file = e.dataTransfer.files?.[0];
          if (file) handleFile(file);
        }}
        className={cn(
          "relative rounded-lg border bg-muted overflow-hidden flex items-center justify-center",
          aspectClass
        )}
      >
        {renderPreview(
          optimisticSrc ? { original: optimisticSrc } : item?.src,
          item?.type,
          item?.alt
        )}

        {isUploading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-black/40 backdrop-blur-sm">
            <div className="h-7 w-7 animate-spin rounded-full border-2 border-white border-t-transparent" />
            <span className="text-xs text-white">{progress}%</span>
          </div>
        )}

        {item?.id && onRemove && !isUploading && (
          <button
            onClick={() => onRemove(item.id)}
            className="absolute top-1 right-1 rounded bg-black/60 px-2 py-0.5 text-xs text-white"
          >
            ✕
          </button>
        )}
      </div>
    );
  }

  /* ───────────── SINGLE MODE ───────────── */

  if (mode === "single") {
    return (
      <div className="space-y-3">
        <DropZone item={value} />

        <Button
          size="sm"
          variant="outline"
          disabled={isUploading}
          onClick={() => inputRef.current?.click()}
        >
          {isUploading ? "Uploading..." : "Change media"}
        </Button>

        <input
          ref={inputRef}
          type="file"
          hidden
          accept={accept}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
          }}
        />
      </div>
    );
  }

  /* ───────────── GRID MODE ───────────── */

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {items.map((item) => (
        <DropZone key={item.id} item={item} />
      ))}

      {items.length < max && (
        <div
          onClick={() => inputRef.current?.click()}
          className={cn(
            "cursor-pointer rounded-lg border border-dashed bg-muted flex items-center justify-center",
            aspectClass
          )}
        >
          +
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        hidden
        accept={accept}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />
    </div>
  );
}
