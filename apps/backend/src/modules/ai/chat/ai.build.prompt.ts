import { ChatCompletionMessageParam } from 'openai/resources/index';
import { AIContextState, buildContextSummary } from './ai.context';
import { buildSystemPrompt } from './ai.system.promt';

const SYSTEM_MESSAGE: ChatCompletionMessageParam = {
  role: 'system',
  content: buildSystemPrompt(),
};

export function buildAIPrompt(
  userMessage: string,
  context: AIContextState = {},
): ChatCompletionMessageParam[] {
  const messages: ChatCompletionMessageParam[] = [];

  // 1️⃣ system prompt
  messages.push(SYSTEM_MESSAGE);

  // 2️⃣ context summary
  const contextSummary = buildContextSummary(context);

  if (contextSummary) {
    messages.push({
      role: 'system',
      content: `Context summary:\n${contextSummary}`,
    });
  }

  // 3️⃣ user message
  messages.push({
    role: 'user',
    content: userMessage,
  });

  return messages;
}
