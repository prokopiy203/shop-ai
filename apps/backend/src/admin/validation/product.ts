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
    brand: zod
      .string()
      .trim()
      .min(1, 'Brand must be at least 1 character long')
      .max(100, 'Brand must not exceed 100 characters'),
    isActive: zod.boolean().default(true),
    sku: zod.string().trim().min(2).max(50).optional(),
    price: zod.number().positive('Price must be greater than 0'),
    category: zod.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
      message: 'Category must be a valid ObjectId',
    }),
    stock: zod.number().min(0, 'Stock must be >= 0').optional().default(0),
    tags: zod.array(zod.string().trim()).optional().default([]),
    characteristics: zod.array(
      zod.object({
        key: zod.string().trim().min(1, 'Characteristic key cannot be empty'),
        label: zod.string().trim().optional(),
        value: zod.string().trim().min(1, 'Characteristic value cannot be empty'),
        type: zod.enum(['string', 'number', 'boolean']).optional(),
        unit: zod.string().trim().optional().nullable(),
      }),
    ),
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
    brand: zod
      .string()
      .trim()
      .min(1, 'Brand must be at least 1 character long')
      .max(100, 'Brand must not exceed 100 characters')
      .optional(),
    isActive: zod.boolean().optional(),
    sku: zod.string().trim().min(2).max(50).optional(),
    price: zod.number().positive('Price must be greater than 0').optional(),
    category: zod
      .string()
      .refine((val) => mongoose.Types.ObjectId.isValid(val), {
        message: 'Category must be a valid ObjectId',
      })
      .optional(),
    stock: zod.number().min(0, 'Stock must be greater than or equal to 0').optional(),
    tags: zod.array(zod.string().trim()).optional(),
    removeCharacteristics: zod.array(zod.string().trim()).optional(),
    characteristics: zod
      .array(
        zod.object({
          key: zod.string().trim().min(1),
          label: zod.string().trim().optional(),
          value: zod.string().trim().min(1),
          type: zod.enum(['string', 'number', 'boolean']).optional(),
          unit: zod.string().trim().optional().nullable(),
        }),
      )
      .optional()
      .nullable(),
  })
  .strict();
