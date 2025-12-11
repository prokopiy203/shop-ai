import { openRouter } from '@/core/config/openRouter';
import { getEnvVar } from '@/core/utils/getEnvVar';

export const describeImageGPT = async (imageUrl: string) => {
  try {
    const prompt = `
You are an AI vision system. Analyze the image and respond ONLY in valid JSON.

Follow these rules:

1) ALT — a short, clear, SEO-friendly description (8–16 words).
   - Describe only visible facts.
   - No brands unless explicitly shown.
   - No assumptions or guesses.
   - No marketing language.

2) VISION_DESCRIPTION — a factual description (1–3 sentences).
   - Mention materials, shapes, colors, layout, and visible features.
   - Identify product category only if clearly recognizable.
   - No marketing language.

Return ONLY this JSON:

{
  "alt": "...",
  "visionDescription": "..."
}
`;

    const resp = await openRouter.chat.completions.create({
      model: getEnvVar('VISION_AI') ?? 'openai/gpt-4o-mini-2024-07-18',
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image_url',
              image_url: { url: imageUrl },
            },
            {
              type: 'text',
              text: prompt,
            },
          ],
        },
      ],
      max_tokens: 200,
    });

    const raw = resp.choices?.[0]?.message?.content || '{}';
    return JSON.parse(raw);
  } catch (err) {
    console.log('VISION GPT FAILED', err);
    return { alt: '', visionDescription: '' };
  }
};
