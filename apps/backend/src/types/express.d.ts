import { JwtUserPayload } from '@shop-ai/types';

declare global {
  namespace Express {
    interface Request {
      user: JwtUserPayload;
    }
  }
}
