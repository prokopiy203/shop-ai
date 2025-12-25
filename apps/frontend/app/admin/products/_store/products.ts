import { create } from "zustand";

type ProductsUIState = {
  page: number;
  limit: number;
  search: string;
  selectedIds: string[];
  nextPage: () => void;
  prevPage: () => void;
  setPage: (page: number) => void;
  setSearch: (value: string) => void;
  toggleSelect: (id: string) => void;
  toggleSelectAll: (ids: string[]) => void;
  clearSelection: () => void;
};

export const useProductsStore = create<ProductsUIState>((set) => ({
  page: 1,
  limit: 8,
  search: "",
  selectedIds: [],
  setPage: (page) => set({ page }),
  nextPage: () => set((state) => ({ page: state.page + 1 })),
  prevPage: () => set((state) => ({ page: Math.max(1, state.page - 1) })),
  setSearch: (search) => set({ search, page: 1 }),
  toggleSelect: (id) =>
    set((s) => ({
      selectedIds: s.selectedIds.includes(id)
        ? s.selectedIds.filter((x) => x !== id)
        : [...s.selectedIds, id],
    })),
  toggleSelectAll: (ids) =>
    set((s) => ({
      selectedIds: s.selectedIds.length === ids.length ? [] : ids,
    })),
  clearSelection: () => set({ selectedIds: [] }),
}));
