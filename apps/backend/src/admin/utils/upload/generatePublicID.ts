import { randomUUID } from 'crypto';

export function generatePublicID() {
  return randomUUID();
}
