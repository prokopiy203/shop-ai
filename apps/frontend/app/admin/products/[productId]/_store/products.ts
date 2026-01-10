import { create } from "zustand";
import { ProductFormValues } from "../types/product-form";

type ProductDraftState = {
  productId: string | null;
  draft: Partial<ProductFormValues> | null;
  updatedAt: number | null;

  saveDraft: (productId: string, data: Partial<ProductFormValues>) => void;
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
