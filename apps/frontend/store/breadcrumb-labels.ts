import { create } from "zustand";

type BreadcrumbLabelsState = {
  labels: Record<string, string>;
  setLabel: (key: string, value: string) => void;
  clear: () => void;
};

export const useBreadcrumbLabels = create<BreadcrumbLabelsState>((set) => ({
  labels: {},
  setLabel: (key, value) =>
    set((state) => ({
      labels: { ...state.labels, [key]: value },
    })),
  clear: () => set({ labels: {} }),
}));
