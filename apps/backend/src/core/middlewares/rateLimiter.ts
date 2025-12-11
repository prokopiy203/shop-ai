import rateLimit from 'express-rate-limit';
import { Request, Response } from 'express';

export const loginLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 min
  max: 8,
  standardHeaders: true,
  legacyHeaders: false,

  message: {
    success: false,
    message: 'Too many login attempts. Try again later.',
  },

  handler: (req: Request, res: Response) => {
    return res.status(429).json({
      success: false,
      message: 'Too many login attempts.Try again later.',
    });
  },
});
