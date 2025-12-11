import { z as zod } from 'zod';

export const registerSchema = zod.object({
  name: zod.string().min(1),
  email: zod.string().email(),
  password: zod.string().min(6),
  phone: zod.string().optional(),
});

export const loginSchema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(1),
});
