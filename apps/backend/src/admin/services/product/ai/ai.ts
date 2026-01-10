import { ValidationError } from '@/core/errors';
import { openRouter } from '@/core/config/openRouter';
import {
  DescriptionOverride,
  GenerateProductTagsData,
  ProductTag,
  ResolvedDescriptionPolicy,
} from '@shop-ai/types';
import { buildProductTagsPrompt } from './helpers/llm/productPrompt';
import { parseProductTags } from './helpers/parseTags';
import { Product } from '@/api/models';
import { getSettingsService } from '../../settings/settings';
import { generateText } from './helpers/llm/generateDescription';
import { buildProductDescriptionPrompt } from './helpers/promt/productDescriptionPromt';

export const generateAdminProductTagsService = async (
  data: GenerateProductTagsData,
): Promise<ProductTag[]> => {
  if (!data.title) {
    throw new ValidationError('Title is required for tag generation');
  }

  const prompt = buildProductTagsPrompt(data);

  const completion = await openRouter.chat.completions.create({
    model: 'gpt-4o-mini',
    temperature: 0.3,
    max_tokens: 150, // 💰 cost guard
    messages: [{ role: 'user', content: prompt }],
  });

  const raw = completion.choices?.[0]?.message?.content;

  if (!raw) {
    throw new ValidationError('AI returned empty response');
  }

  const tags = parseProductTags(raw);

  if (tags.length === 0) {
    throw new ValidationError('AI returned no valid tags');
  }

  return tags;
};

export const generateAdminProductDescriptionService = async (
  productId: string,
  override?: DescriptionOverride,
) => {
  const product = await Product.findById(productId);

  if (!product) {
    throw new ValidationError('Product not found');
  }

  const settings = await getSettingsService();

  if (!settings.ai.enabled) {
    throw new ValidationError('AI is disabled');
  }

  if (!settings.ai.productDescription.enabled) {
    throw new ValidationError('Product description generation is disabled');
  }

  const policy = settings.ai.productDescription;

  const resolvedPolicy: ResolvedDescriptionPolicy = {
    language: override?.language ?? policy.language ?? settings.general.defaultLanguage,

    tone: override?.tone ?? policy.tone,
    length: override?.length ?? policy.length,
  };

  const hasVision = Boolean(product.image?.visionDescription);

  const prompt = buildProductDescriptionPrompt({
    product,
    tone: resolvedPolicy.tone,
    length: resolvedPolicy.length,
    includeVision: hasVision,
  });

  const description = await generateText({
    prompt,
    language: resolvedPolicy.language,
    temperature: resolvedPolicy.tone === 'marketing' ? 0.7 : 0.4,
    maxTokens: 400,
  });

  if (!description || description.length < 20) {
    throw new ValidationError('AI returned invalid description');
  }

  return {
    description,
    language: resolvedPolicy.language,
    tone: resolvedPolicy.tone,
    length: resolvedPolicy.length,
  };
};
