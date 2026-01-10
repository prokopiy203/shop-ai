import { z as zod } from 'zod';

export const updateSettingsSchema = zod.object({
  general: zod
    .object({
      defaultLanguage: zod.enum(['uk', 'en']).optional(),
    })
    .optional(),

  ai: zod
    .object({
      enabled: zod.boolean().optional(),

      productDescription: zod
        .object({
          enabled: zod.boolean().optional(),
          language: zod.enum(['uk', 'en']).optional(),
          tone: zod.enum(['neutral', 'marketing', 'premium']).optional(),
          length: zod.enum(['short', 'medium', 'long']).optional(),
        })
        .optional(),
    })
    .optional(),
});
