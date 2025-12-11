import { getEnvVar } from '@/core/utils/getEnvVar';

export type NodeEnv = 'development' | 'production' | 'test';

export const NODE_ENV = getEnvVar('NODE_ENV', 'development') as NodeEnv;

export const isProd = NODE_ENV === 'production';
export const isDev = NODE_ENV === 'development';
