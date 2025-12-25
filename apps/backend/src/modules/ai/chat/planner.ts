import { AIContextState } from './ai.context';
import { AIPlan } from './ai.types';
import { buildSystemPrompt } from './ai.system.promt';
import type { ChatCompletionMessageParam } from 'openai/resources/chat';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY!,
  baseURL: 'https://openrouter.ai/api/v1',
});

export async function planFromAI(message: string, context: AIContextState): Promise<AIPlan> {
  const messages: ChatCompletionMessageParam[] = [
    {
      role: 'system',
      content: buildSystemPrompt(),
    },
  ];

  // ➕ context summary (якщо є)
  if (context && Object.keys(context).length > 0) {
    messages.push({
      role: 'system',
      content: `Context summary:\n${JSON.stringify(context)}`,
    });
  }

  messages.push({
    role: 'user',
    content: message,
  });

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    temperature: 0,
    messages,
  });

  const content = completion.choices[0]?.message?.content;

  if (!content) {
    return { steps: [] };
  }

  try {
    const parsed = JSON.parse(content);

    if (!Array.isArray(parsed.steps)) {
      return { steps: [] };
    }

    return parsed as AIPlan;
  } catch {
    // ❗ AI зламав формат — safe fallback
    return { steps: [] };
  }
}
