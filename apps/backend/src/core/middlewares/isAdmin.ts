import { Response, NextFunction } from 'express';
import { AuthRequest } from './authMiddleware';

export const isAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
  const user = req.user;

  if (!user) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized',
    });
  }

  if (user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Forbidden: Admin only',
    });
  }

  console.log('ADMIN OK');
  next();
};
