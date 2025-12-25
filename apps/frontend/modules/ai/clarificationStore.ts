import { create } from "zustand";

type ClarificationState = {
  active?: {
    capabilityId: string;
    question: string;
    options?: string[];
  };
  ask: (req: {
    capabilityId: string;
    question: string;
    options?: string[];
  }) => void;
  clear: () => void;
};

export const useClarificationStore = create<ClarificationState>((set) => ({
  active: undefined,
  ask: (req) => set({ active: req }),
  clear: () => set({ active: undefined }),
}));
