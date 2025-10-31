import dotenv from 'dotenv';

dotenv.config();

export function getEnvVar<T extends string | number | boolean>(
  name: string,
  defaultValue?: T,
): T | undefined {
  const value = process.env[name];

  if (value && value.trim() !== '') return value as T;

  if (defaultValue !== undefined) return defaultValue as T;

  throw new Error(`Missing environment variable: process.env.${name}`);
}
