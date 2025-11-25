import { getEnvVar } from '@/utils/getEnvVar';
import OpenAI from 'openai';

export const openRouter = new OpenAI({
  apiKey: getEnvVar<string>('OPENROUTER_API_KEY'),
  baseURL: 'https://openrouter.ai/api/v1',
});
