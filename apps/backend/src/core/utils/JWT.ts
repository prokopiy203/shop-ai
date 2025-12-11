import jwt, { SignOptions, Secret } from 'jsonwebtoken';
import { AppError } from '@/core/errors/AppError';
import { getEnvString } from './getEnvVar';

const ACCESS_TOKEN_SECRET = getEnvString('JWT_ACCESS_SECRET');
const REFRESH_TOKEN_SECRET = getEnvString('JWT_REFRESH_SECRET');

const ACCESS_TOKEN_EXPIRES_IN = getEnvString('JWT_ACCESS_EXPIRES_IN', '15m');
const REFRESH_TOKEN_EXPIRES_IN = getEnvString('JWT_REFRESH_EXPIRES_IN', '7d');

/**
 * Sign Access Token
 * Used for authorization on protected endpoints
 */
export const signAccessToken = (payload: object): string => {
  try {
    return jwt.sign(payload, ACCESS_TOKEN_SECRET, {
      expiresIn: ACCESS_TOKEN_EXPIRES_IN,
    } as SignOptions);
  } catch (error) {
    throw new AppError(500, 'Failed to sign access token');
  }
};

/**
 * Sign Refresh Token
 * Long-lived token to refresh access token
 */
export const signRefreshToken = (payload: object): string => {
  try {
    return jwt.sign(payload, REFRESH_TOKEN_SECRET, {
      expiresIn: REFRESH_TOKEN_EXPIRES_IN,
    } as SignOptions);
  } catch (error) {
    throw new AppError(500, 'Failed to sign refresh token');
  }
};

/**
 * Verify Access Token
 * Decode + verify access token signature & TTL
 */
export const verifyAccessToken = (token: string): any => {
  try {
    return jwt.verify(token, ACCESS_TOKEN_SECRET);
  } catch (error) {
    throw new AppError(401, 'Invalid or expired access token');
  }
};

/**
 * Verify Refresh Token
 * Decode + verify refresh token signature & TTL
 */
export const verifyRefreshToken = (token: string): any => {
  try {
    return jwt.verify(token, REFRESH_TOKEN_SECRET);
  } catch (error) {
    throw new AppError(401, 'Invalid or expired refresh token');
  }
};

export const generateAuthTokens = (payload: object) => ({
  accessToken: signAccessToken(payload),
  refreshToken: signRefreshToken(payload),
});
