import { z as zod } from 'zod';
import mongoose from 'mongoose';

export const createProductSchema = zod
  .object({
    title: zod
      .string()
      .trim()
      .min(1, 'Title must be at least 1 character long')
      .max(200, 'Title must not exceed 200 characters'),

    description: zod
      .string()
      .max(5000, 'Description must not exceed 5000 characters')
      .optional()
      .or(zod.literal('')),

    price: zod.number().positive('Price must be greater than 0'),

    category: zod.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
      message: 'Category must be a valid ObjectId',
    }),

    stock: zod.number().min(0, 'Stock must be >= 0').optional().default(0),

    tags: zod.array(zod.string().trim()).optional().default([]),

    images: zod.never().optional(),
    gallery: zod.never().optional(),
    videos: zod.never().optional(),
  })
  .strict();

export const updateProductSchema = zod
  .object({
    title: zod
      .string()
      .trim()
      .min(1, 'Title must be at least 1 character long')
      .max(200, 'Title must not exceed 200 characters')
      .optional(),

    description: zod.string().max(5000, 'Description must not exceed 5000 characters').optional(),

    price: zod.number().positive('Price must be greater than 0').optional(),

    category: zod
      .string()
      .refine((val) => mongoose.Types.ObjectId.isValid(val), {
        message: 'Category must be a valid ObjectId',
      })
      .optional(),

    stock: zod.number().min(0, 'Stock must be greater than or equal to 0').optional(),

    tags: zod.array(zod.string().trim()).optional(),

    images: zod.array(zod.string().trim().url('All images must be valid URLs')).optional(),
  })
  .strict();
