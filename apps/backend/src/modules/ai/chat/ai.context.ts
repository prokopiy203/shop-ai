import { Request } from 'express';

export type AIContextState = {
  lastIntent?: string;
  theme?: 'light' | 'dark';
  lastPage?: string;
  pendingClarification?: string;
};

/**
 * Build short human-readable context for AI prompt
 */
export function buildContextSummary(ctx: AIContextState): string | null {
  const lines: string[] = [];

  if (ctx.lastIntent) lines.push(`Last intent: ${ctx.lastIntent}`);
  if (ctx.theme) lines.push(`Current theme: ${ctx.theme}`);
  if (ctx.lastPage) lines.push(`Current page: ${ctx.lastPage}`);
  if (ctx.pendingClarification) lines.push(`Awaiting clarification: ${ctx.pendingClarification}`);

  return lines.length > 0 ? lines.join('\n') : null;
}

/**
 * Load AI context for current request / user
 * (stub for now)
 */
export function loadAIContext(_req: Request): AIContextState {
  // 🔥 Поки що порожній контекст
  // Далі: session / Redis / DB
  return {};
}
