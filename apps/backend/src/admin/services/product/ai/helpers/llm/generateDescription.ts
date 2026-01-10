import { ValidationError } from '@/core/errors';
import { openRouter } from '@/core/config/openRouter';
import { buildSystemLanguageMessage, LanguageCode } from '../mapLanguage';

type GenerateTextInput = {
  prompt: string;
  temperature?: number;
  language: LanguageCode;
  maxTokens?: number;
};

export const generateText = async ({
  language,
  prompt,
  temperature = 0.4,
  maxTokens = 400,
}: GenerateTextInput): Promise<string> => {
  if (!prompt) {
    throw new ValidationError('Prompt is required');
  }

  const systemMessage = buildSystemLanguageMessage(language);

  const completion = await openRouter.chat.completions.create({
    model: 'gpt-4o-mini',
    temperature,
    max_tokens: maxTokens, // 💰 cost guard
    messages: [
      {
        role: 'system',
        content: systemMessage, // 🔒 language constraint
      },
      {
        role: 'user',
        content: prompt, // 🧠 business task
      },
    ],
  });

  const raw = completion.choices?.[0]?.message?.content;

  if (!raw) {
    throw new ValidationError('AI returned empty response');
  }

  const text = raw.trim();

  if (text.length === 0) {
    throw new ValidationError('AI returned empty text');
  }

  return text;
};
