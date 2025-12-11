import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { ValidationError } from '@/core/errors';
import { User } from '@/api/models';

interface TokenPayload {
  id: string;
  role: string;
  iat: number;
  exp: number;
}

const lastActiveCache = new Map();

export interface AuthRequest extends Request {
  user?: any;
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  const header = req.headers.authorization;

  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token' });
  }

  const token = header.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'No token' });
  }

  const secret = process.env.JWT_ACCESS_SECRET;
  if (!secret) {
    throw new ValidationError('JWT_SECRET is no set');
  }

  try {
    const decoded = jwt.verify(token, secret) as TokenPayload;
    req.user = decoded;

    const now = Date.now();
    const last = lastActiveCache.get(decoded.id) || 0;

    if (now - last > 5 * 60 * 1000) {
      lastActiveCache.set(decoded.id, now);
      User.findByIdAndUpdate(decoded.id, {
        lastActiveAt: new Date(),
      }).catch(() => {});
    }

    next();
  } catch (err: any) {
    return res.status(401).json({ message: 'invalid token' });
  }
};
