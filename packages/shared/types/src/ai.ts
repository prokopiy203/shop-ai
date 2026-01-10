export interface GenerateProductTagsData {
  title: string;
  description?: string;
  category?: string;
  brand?: string;
  visionDescription?: string;
}

export type ProductTag = string;

export type LanguageCode = "uk" | "en";

export type DescriptionOverride = {
  language?: LanguageCode;
  tone?: "neutral" | "marketing" | "premium";
  length?: "short" | "medium" | "long";
};
export type GenerateProductDescriptionInput = {
  productId: string;
  override?: DescriptionOverride;
};

export type ResponseGenerateDescription = {
  description: string;
  override?: DescriptionOverride;
};

export type ResolvedDescriptionPolicy = {
  language: LanguageCode;
  tone: "neutral" | "marketing" | "premium";
  length: "short" | "medium" | "long";
};
