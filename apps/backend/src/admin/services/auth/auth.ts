import { User } from '@/api/models';
import { sanitizeUser } from '@/api/utils/user/sanitizeUser';
import { AppError } from '@/core/errors';
import { signAccessToken } from '@/core/utils/JWT';
import { LoginData } from '@shop-ai/types';
import bcrypt from 'bcrypt';

export const adminLoginService = async (data: LoginData) => {
  const { email, password } = data;

  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    throw new AppError(400, 'invalid email or password');
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new AppError(400, 'Invalid email pr password');
  }

  const accessToken = signAccessToken({
    _id: user._id,
    role: user.role,
  });

  return {
    user: sanitizeUser(user.toObject()),
    accessToken,
  };
};

export const renewAdminSessionService = async (user: any) => {
  if (!user || !user._id || !user.role) {
    throw new AppError(401, 'Invalid user payload');
  }

  const token = signAccessToken({
    _id: user._id,
    role: user.role,
  });

  return { token };
};
