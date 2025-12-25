"use client";

import { sendAICommand } from "@/lib/api/api-ai";
import { executeAIPlan } from "@/modules/ai/executePlan";
import { useCapabilityContext } from "@/modules/context/useCapabilityContext";

export function useAICommand() {
  const ctx = useCapabilityContext();

  const runCommand = async (message: string) => {
    if (!message.trim()) return;

    const plan = await sendAICommand(message);

    if (!plan?.steps?.length) {
      console.info("[AI] empty plan");
      return;
    }

    await executeAIPlan(plan, ctx);
  };

  return { runCommand };
}
