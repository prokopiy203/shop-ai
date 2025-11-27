import { randomUUID } from 'crypto';

export function generatePublicID(folder: string) {
  return `${folder}/${randomUUID()}`;
}
