export const buildProductDescriptionPrompt = ({
  product,
  tone,
  length,
  includeVision,
}: {
  product: any;
  tone: 'neutral' | 'marketing' | 'premium';
  length: 'short' | 'medium' | 'long';
  includeVision: boolean;
}) => {
  const visionBlock = includeVision
    ? `
Image description (visual reference only, do NOT invent details):
${product.image.visionDescription}
`
    : '';
  return `
You are an e-commerce copywriter.

Tone: ${tone}.
Length: ${length}.

STRICT RULES:
- Do NOT use emojis
- Do NOT mention prices, discounts, or delivery
- You MAY use the image description only to improve visual clarity
- Do NOT infer or invent specifications from the image description
- Do NOT assume materials, performance, or technical features from the image
- Do NOT invent specifications, features, or technologies
- Do NOT repeat the product title verbatim more than once
- Do NOT use generic filler phrases (e.g. "perfect choice", "high quality", "best on the market")
- Use ONLY the data provided below
- Do NOT reference previous descriptions
- Write in ONE language only
- The text must sound natural and human-written

STRUCTURE RULES:
- Use clear paragraphs
- Start with a short introductory paragraph
- Focus on benefits, but only if they logically follow from the provided data
- Avoid excessive repetition of the same words
- Do NOT include bullet lists in the final output

Product data:
Title: ${product.title}
Category: ${product.category?.name ?? ''}
Characteristics:
${product.characteristics?.map((c: any) => `- ${c.key}: ${c.value}`).join('\n')}
${visionBlock}

Return only the description text.
`.trim();
};
