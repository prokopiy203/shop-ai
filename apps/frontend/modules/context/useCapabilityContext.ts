"use client";

import { useRouter } from "next/navigation";
import { useAdminUIStore } from "@/store/admin-ui";
import { useTheme } from "next-themes";
import { useClarificationStore } from "../ai/clarificationStore";
import { browserVoice } from "../core/voice/browserVoice";

export function useCapabilityContext() {
  const router = useRouter();
  const { setTheme } = useTheme();
  const adminUI = useAdminUIStore();
  const clarification = useClarificationStore();

  return {
    router: {
      push: router.push,
    },
    preferences: {
      setTheme: adminUI.setTheme,
      setAnimationsEnabled: adminUI.setAnimationsEnabled,
      getTheme: () => adminUI.theme,
    },
    ui: {
      applyTheme: setTheme,
    },
    ai: {
      requestClarification: clarification.ask,
    },
    voice: browserVoice,
  };
}
