import { User } from '@/api/models';
import { AppError, ValidationError } from '@/core/errors';
import { generateAuthTokens, verifyRefreshToken } from '@/core/utils/JWT';
import { sanitizeUser } from '@/api/utils/user/sanitizeUser';
import { LoginData, RegisterUserData } from '@shopai/types';

export const registerService = async (data: RegisterUserData) => {
  const exists = await User.findOne({ email: data.email }).lean();

  if (exists) {
    throw new ValidationError('User with this email already exists');
  }

  const user = await User.create(data);

  // generate token
  const tokens = generateAuthTokens({
    _id: user._id,
    role: user.role,
  });

  const safeUSer = sanitizeUser(user.toObject());

  return {
    tokens,
    user: safeUSer,
  };
};

export const loginService = async (data: LoginData) => {
  const user = await User.findOne({ email: data.email }).select('+password');

  if (!user) {
    throw new ValidationError('Invalid email or password');
  }

  const isMatch = await user.comparePassword!(data.password);

  if (!isMatch) {
    throw new ValidationError('Invalid email or password');
  }

  // rotation strategy
  const tokens = generateAuthTokens({
    _id: user._id,
    role: user.role,
  });

  const safeUser = sanitizeUser(user.toObject());

  return {
    tokens,
    user: safeUser,
  };
};

export const refreshService = async (token: string) => {
  const payload = verifyRefreshToken(token);

  if (!payload?._id) {
    throw new AppError(401, 'Invalid refresh token');
  }

  const tokens = generateAuthTokens({
    _id: payload._id,
    role: payload.role,
  });

  return {
    _id: payload._id,
    role: payload.role,
    tokens,
  };
};
