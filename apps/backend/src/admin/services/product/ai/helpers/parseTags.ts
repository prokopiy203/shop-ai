import { ValidationError } from '@/core/errors';
import { ProductTag } from '@shop-ai/types';

const TAG_REGEX = /\[[\s\S]*\]/;

export const parseProductTags = (raw: string): ProductTag[] => {
  const match = raw.match(TAG_REGEX);

  if (!match) {
    throw new ValidationError('AI response does not contain JSON array');
  }

  let parsed: unknown;

  try {
    parsed = JSON.parse(match[0]);
  } catch {
    throw new ValidationError('AI returned invalid JSON');
  }

  if (!Array.isArray(parsed)) {
    throw new ValidationError('AI returned non-array tags');
  }

  return parsed
    .filter((t): t is string => typeof t === 'string')
    .map((t) => t.trim().toLowerCase())
    .filter(Boolean)
    .filter((t) => t.length >= 2 && t.length <= 24)
    .filter((t) => /^[a-z-]+$/.test(t))
    .slice(0, 10);
};
