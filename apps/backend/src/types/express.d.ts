import { JwtUserPayload } from '@shopai/types';

declare global {
  namespace Express {
    interface Request {
      user?: JwtUserPayload;
    }
  }
}
