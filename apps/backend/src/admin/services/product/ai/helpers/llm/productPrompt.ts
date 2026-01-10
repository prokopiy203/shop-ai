import { GenerateProductTagsData } from '@shop-ai/types';

export const buildProductTagsPrompt = ({
  title,
  description,
  category,
  brand,
  visionDescription,
}: GenerateProductTagsData) => `
You are an e-commerce search assistant.

Generate 5–10 product tags.

Rules:
- lowercase
- single words only
- no numbers
- no units
- no emojis
- no marketing words
- no duplicates
- max length: 24 chars

Product:
Title: ${title}
Brand: ${brand || ''}
Category: ${category || ''}
Description: ${description || ''}

Image description:
${visionDescription || 'N/A'}

Return ONLY a JSON array of strings.
`;
