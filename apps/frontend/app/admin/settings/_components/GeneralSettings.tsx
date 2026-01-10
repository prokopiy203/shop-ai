"use client";

import { useSettings } from "../_queries/useSettings";
import { useUpdateSettings } from "../_mutations/useUpdateSettings";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LanguageCode } from "@shop-ai/types";

export function GeneralSettings() {
  const { data } = useSettings();
  const mutation = useUpdateSettings();

  if (!data) return null;

  const handleLanguageChange = (value: string) => {
    mutation.mutate({
      general: {
        defaultLanguage: value as LanguageCode,
      },
    });
  };

  return (
    <div className="flex justify-between border-t pt-3 space-y-2 ">
      <h3 className="font-medium">General</h3>

      <Select
        value={data.general.defaultLanguage}
        onValueChange={handleLanguageChange}
      >
        <SelectTrigger className="w-[200px] shadow-none">
          <SelectValue placeholder="Default language" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="uk">Ukrainian</SelectItem>
          <SelectItem value="en">English</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
