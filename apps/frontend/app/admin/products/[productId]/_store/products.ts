import { Product } from "@shop-ai/types";
import { create } from "zustand";

type ProductDraftState = {
  productId: string | null;
  draft: Partial<Product> | null;
  updatedAt: number | null;

  saveDraft: (productId: string, data: Partial<Product>) => void;
  clearDraft: () => void;
};

export const useProductsDraftStore = create<ProductDraftState>((set) => ({
  productId: null,
  draft: null,
  updatedAt: null,

  saveDraft: (productId, data) =>
    set({
      productId,
      draft: data,
      updatedAt: Date.now(),
    }),

  clearDraft: () =>
    set({
      productId: null,
      draft: null,
      updatedAt: null,
    }),
}));
