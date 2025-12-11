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

export const getEnvString = (name: string, defaultValue?: string): string => {
  const value = process.env[name];

  if (value && value.trim() !== '') return value;

  if (defaultValue !== undefined) return defaultValue;

  throw new Error(`Missing environment variable: process.env.${name}`);
};

export const getEnvNumber = (name: string, defaultValue?: number): number => {
  const value = process.env[name];

  if (value && !isNaN(Number(value))) return Number(value);

  if (defaultValue !== undefined) return defaultValue;

  throw new Error(`Missing numeric environment variable: process.env.${name}`);
};

export const getEnvBool = (name: string, defaultValue?: boolean): boolean => {
  const value = process.env[name]?.toLowerCase();

  if (value === 'true') return true;
  if (value === 'false') return false;

  if (defaultValue !== undefined) return defaultValue;

  throw new Error(`Missing boolean environment variable: process.env.${name}`);
};
