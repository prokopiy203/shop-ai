/* =======================
   Settings (Shared)
======================= */

import { DeepPartial } from "./common";

export type LanguageCode = "uk" | "en";

export type ProductDescriptionTone = "neutral" | "marketing" | "premium";
export type ProductDescriptionLength = "short" | "medium" | "long";

/* =======================
   AI Settings
======================= */

export interface AiProductDescriptionSettings {
  enabled: boolean;
  language: LanguageCode;
  tone: ProductDescriptionTone;
  length: ProductDescriptionLength;
}

export interface AiImageAltTextSettings {
  enabled: boolean;
}

export interface AiChatAssistantSettings {
  enabled: boolean;
}

export interface AiSettings {
  enabled: boolean;

  productDescription: AiProductDescriptionSettings;
  imageAltText: AiImageAltTextSettings;
  chatAssistant: AiChatAssistantSettings;
}

/* =======================
   General Settings
======================= */

export interface GeneralSettings {
  defaultLanguage: LanguageCode;
}

/* =======================
   Store Settings (ROOT)
======================= */

export interface StoreSettings {
  general: GeneralSettings;
  ai: AiSettings;
}

export type UpdateStoreSettingsPayload = DeepPartial<StoreSettings>;
