import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { ValidationError } from '@/core/errors';
import { User } from '@/api/models';

interface TokenPayload {
  _id: string;
  role: string;
  iat: number;
  exp: number;
}

const lastActiveCache = new Map<string, number>();

export interface AuthRequest extends Request {
  user: TokenPayload;
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  // ✅ 1. Беремо токен з cookie
  const token = req.cookies?.accessToken;

  if (!token) {
    return res.status(401).json({ message: 'No token' });
  }

  const secret = process.env.JWT_ACCESS_SECRET;
  if (!secret) {
    throw new ValidationError('JWT_ACCESS_SECRET is not set');
  }

  try {
    // ✅ 2. Верифікація
    const decoded = jwt.verify(token, secret) as TokenPayload;
    req.user = decoded;

    // ✅ 3. lastActive (твоя логіка — ок)
    const now = Date.now();
    const last = lastActiveCache.get(decoded._id) || 0;

    if (now - last > 5 * 60 * 1000) {
      lastActiveCache.set(decoded._id, now);
      User.findByIdAndUpdate(decoded._id, {
        lastActiveAt: new Date(),
      }).catch(() => {});
    }

    next();
  } catch {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
