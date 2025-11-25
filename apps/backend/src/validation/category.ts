import { z as zod } from 'zod';

export const updateCategorySchema = zod
  .object({
    name: zod
      .string()
      .min(2, 'Name must be at least 2 characters long')
      .max(50, 'Name must be less than 50 characters')
      .optional(),
    description: zod.string().max(500).optional(),
    imageUrl: zod.string().url('Invalid image URL').optional().or(zod.literal('')),
    parentCategory: zod
      .string()
      .length(24, 'Parent category must be a valid MongoDB ObjectId')
      .optional()
      .nullable(),
    aiTags: zod.array(zod.string()).optional(),
  })
  .strict();

export const createCategorySchema = zod
  .object({
    name: zod
      .string()
      .min(2, 'Name must be at least 2 characters long')
      .max(50, 'Name must be less than 50 characters'),

    description: zod.string().max(500).optional(),

    imageUrl: zod.string().url('Image URL must be a valid URL').optional().or(zod.literal('')),

    parentCategory: zod
      .string()
      .length(24, 'Parent category must be a valid MongoDB ObjectId')
      .optional()
      .nullable(),

    aiTags: zod.array(zod.string()).optional(),
  })
  .strict();
