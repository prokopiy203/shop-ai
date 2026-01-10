"use client";

import { Controller, useFormContext } from "react-hook-form";
import { useState, useMemo } from "react";
import { useParams } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { X, Sparkles, Loader2, Trash2 } from "lucide-react";

import { useGenerateProductTags } from "../../_queries/useGenerateProductTags";
import { getTagClassesMap } from "@/utils/tag-color";

export function ProductTags() {
  const { control } = useFormContext();
  const { productId } = useParams<{ productId: string }>();

  const [value, setValue] = useState("");

  const { mutateAsync, isPending } = useGenerateProductTags();

  return (
    <Controller
      name="tags"
      control={control}
      render={({ field }) => {
        const tags: string[] = field.value ?? [];

        const tagClassMap = useMemo(() => getTagClassesMap(tags), [tags]);

        const addTag = () => {
          const tag = value.trim().toLowerCase();
          if (!tag || tags.includes(tag)) return;
          field.onChange([...tags, tag]);
          setValue("");
        };

        const removeTag = (tag: string) => {
          field.onChange(tags.filter((t) => t !== tag));
        };

        const clearTags = () => {
          field.onChange([]);
        };

        const handleGenerate = async () => {
          if (!productId) return;

          const generated = await mutateAsync(productId);
          const merged = Array.from(new Set([...tags, ...generated]));

          field.onChange(merged);
        };

        return (
          <div className="space-y-3">
            {/* HEADER */}
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Tags</h3>
              <Badge variant="outline">
                {tags.length} tag{tags.length !== 1 && "s"}
              </Badge>
            </div>

            {/* INPUT */}
            <div className="flex gap-3">
              <Input
                className="h-[35px] shadow-none"
                placeholder="Add tag"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addTag();
                  }
                }}
              />
              <Button type="button" onClick={addTag} className="h-[35px]">
                Add
              </Button>
            </div>

            {/* TAGS LIST */}
            <div className="border rounded-md p-2 max-h-[96px] overflow-y-auto scroll-area">
              {tags.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  No tags added yet
                </p>
              )}

              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Badge
                    key={tag}
                    className={`flex items-center gap-1 ${tagClassMap[tag]}`}
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="group ml-0.5 opacity-70 hover:opacity-100 transition-opacity"
                    >
                      <X
                        className="
                          h-4 w-4
                          transition-transform duration-150 ease-out
                          group-hover:scale-110
                        "
                      />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>

            {/* ACTIONS */}
            <div className="flex items-center justify-between flex-row-reverse ">
              {/* CLEAR ALL (with confirmation) */}
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={tags.length === 0}
                    className="text-muted-foreground hover:text-destructive shadow-none gap-2"
                  >
                    <Trash2 className="h-4 w-4" />
                    Clear all
                  </Button>
                </AlertDialogTrigger>

                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Remove all tags?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action will permanently remove all tags from the
                      product. You can’t undo this action.
                    </AlertDialogDescription>
                  </AlertDialogHeader>

                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={clearTags}
                      className="bg-red-500 hover:bg-red-700 outline-accent"
                    >
                      Remove all
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              {/* GENERATE */}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleGenerate}
                disabled={isPending || !productId}
                className="gap-2 shadow-none"
              >
                {isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Generating…
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    Generate tags
                  </>
                )}
              </Button>
            </div>
          </div>
        );
      }}
    />
  );
}
