// app/lib/ai.api.ts
import { apiClient } from "@/lib/api-client";
import { AIPlan } from "@/modules/ai/types";

export function sendAICommand(message: string) {
  return apiClient<AIPlan>("/ai/command", {
    method: "POST",
    body: JSON.stringify({ message }),
  });
}
