"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import { useSettings } from "../_queries/useSettings";
import { useUpdateSettings } from "../_mutations/useUpdateSettings";
import { LanguageCode } from "@shop-ai/types";
import { DescriptionOverride } from "@shop-ai/types";

const isLanguageCode = (value: string): value is LanguageCode =>
  value === "uk" || value === "en";

export function ProductDescriptionSettings() {
  const { data } = useSettings();
  const mutation = useUpdateSettings();

  if (!data) return null;

  const settings = data.ai.productDescription;
  const isEnabled = settings.enabled;

  const updateProductDescription = (patch: Partial<DescriptionOverride>) => {
    mutation.mutate({
      ai: {
        productDescription: patch,
      },
    });
  };

  const toggleProductDescription = (enabled: boolean) => {
    mutation.mutate({
      ai: {
        productDescription: { enabled },
      },
    });
  };

  return (
    <div className="border-t pt-4 space-y-4">
      {/* HEADER */}
      <div className="flex items-center justify-between gap-2">
        <div>
          <h3 className="text-sm font-medium">AI product description</h3>
          <p className="text-sm text-muted-foreground">
            Automatically generate product descriptions using AI
          </p>
        </div>

        <Switch
          checked={isEnabled}
          onCheckedChange={toggleProductDescription}
        />
      </div>

      {/* SETTINGS */}
      <div
        className={`pl-3 space-y-4 transition-opacity ${
          isEnabled ? "opacity-100" : "opacity-50 pointer-events-none"
        }`}
      >
        {/* LANGUAGE */}
        <div className="flex items-center justify-between gap-2">
          <div>
            <p className="text-sm font-medium">Description language</p>
            <p className="text-sm text-muted-foreground">
              Language used for AI-generated descriptions
            </p>
          </div>

          <Select
            value={settings.language}
            onValueChange={(value) => {
              if (!isLanguageCode(value)) return;
              updateProductDescription({ language: value });
            }}
          >
            <SelectTrigger className="w-[200px] shadow-none">
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="uk">Ukrainian</SelectItem>
              <SelectItem value="en">English</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* TONE */}
        <div className="space-y-2 flex items-center justify-between gap-2">
          <div>
            <p className="text-sm font-medium">Tone</p>
            <p className="text-sm text-muted-foreground">
              Writing style and emotional tone of the AI-generated description
            </p>
          </div>

          <ToggleGroup
            type="single"
            value={settings.tone}
            onValueChange={(value) => {
              if (!value) return;
              updateProductDescription({
                tone: value as DescriptionOverride["tone"],
              });
            }}
            className="justify-start"
          >
            <ToggleGroupItem value="neutral">Neutral</ToggleGroupItem>
            <ToggleGroupItem value="marketing">Marketing</ToggleGroupItem>
            <ToggleGroupItem value="premium">Premium</ToggleGroupItem>
          </ToggleGroup>
        </div>

        {/* LENGTH */}
        <div className="space-y-2 flex items-center justify-between gap-2">
          <div>
            <p className="text-sm font-medium">Length</p>
            <p className="text-sm text-muted-foreground">
              Overall length and level of detail in the generated description
            </p>
          </div>

          <ToggleGroup
            type="single"
            value={settings.length}
            onValueChange={(value) => {
              if (!value) return;
              updateProductDescription({
                length: value as DescriptionOverride["length"],
              });
            }}
            className="justify-start"
          >
            <ToggleGroupItem value="short">Short</ToggleGroupItem>
            <ToggleGroupItem value="medium">Medium</ToggleGroupItem>
            <ToggleGroupItem value="long">Long</ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>
    </div>
  );
}
