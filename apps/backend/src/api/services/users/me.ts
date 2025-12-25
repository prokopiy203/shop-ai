import { deleteFromCloudinary } from '@/admin/utils/upload/deleteFromCloudinary';
import { uploadToCloudinary } from '@/admin/utils/upload/uploadToCloudinary';
import { User } from '@/api/models';
import { sanitizeUser } from '@/api/utils/user/sanitizeUser';
import { AppError, ValidationError } from '@/core/errors';
import { UserPreferences } from '@shop-ai/types';

export const getMeService = async (id: string) => {
  if (!id) {
    throw new AppError(401, 'Unauthorized');
  }

  const user = await User.findById(id)
    .populate({
      path: 'addresses',
      select: '-__v -deleted -deletedAt',
    })
    .lean();

  if (!user) {
    throw new AppError(404, 'User not found');
  }

  return sanitizeUser(user);
};

export const updateUserPreferencesService = async (
  id: string,
  updates: Partial<UserPreferences>,
) => {
  if (!id) {
    throw new AppError(401, 'Unauthorized');
  }

  const allowedFields: (keyof UserPreferences)[] = [
    'theme',
    'language',
    'aiVoice',
    'animationsEnabled',
  ];

  const safeUpdates = Object.fromEntries(
    Object.entries(updates).filter(([key]) => allowedFields.includes(key as keyof UserPreferences)),
  );

  if (Object.keys(safeUpdates).length === 0) {
    throw new AppError(400, 'No valid preferences to update');
  }

  const user = await User.findByIdAndUpdate(
    id,
    {
      $set: Object.fromEntries(
        Object.entries(safeUpdates).map(([k, v]) => [`preferences.${k}`, v]),
      ),
    },
    { new: true },
  ).lean();

  if (!user) {
    throw new AppError(404, 'User not found');
  }

  return user.preferences;
};

export const updateUserAvatarService = async (userId: string, file: Express.Multer.File) => {
  if (!file) {
    throw new ValidationError('Avatar file is required');
  }

  if (!file.mimetype.startsWith('image')) {
    throw new ValidationError('Only image files are allowed');
  }

  const user = await User.findById(userId).select('+password'); // password не обовʼязково, але ок
  if (!user) {
    throw new ValidationError('User not found');
  }

  // 1️⃣ Upload new avatar
  const uploaded: any = await uploadToCloudinary({
    buffer: file.buffer,
    type: 'image',
    preset: 'avatar_image',
  });

  // 2️⃣ Delete old avatar (if exists)
  if (user.avatar?.publicId) {
    await deleteFromCloudinary(user.avatar.publicId);
  }

  // 3️⃣ Save new avatar
  user.avatar = {
    url: uploaded.secure_url,
    publicId: uploaded.public_id,
  };

  await user.save();

  return {
    avatar: user.avatar,
  };
};
