/**
 * Роль користувача
 */
export type UserRole = 'user' | 'admin';

/**
 * Тема інтерфейсу
 */
export type Theme = 'light' | 'dark';

/**
 * Мова
 */
export type Language = 'uk' | 'en';

/**
 * Голос AI
 */
export type AIVoice = 'female' | 'male';

/**
 * Налаштування користувача
 */
export interface UserPreferences {
  theme: Theme;
  language: Language;
  aiVoice: AIVoice;
}

/**
 * Дані для реєстрації користувача
 */
export interface RegisterUserData {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

/**
 * Дані для оновлення користувача
 */
export interface UpdateUserData {
  name?: string;
  email?: string;
  phone?: string;
  avatarUrl?: string;
  preferences?: Partial<UserPreferences>;
}

/**
 * Користувач (без пароля)
 */
export interface User {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  avatarUrl?: string;
  role: UserRole;
  addresses: string[];
  preferences?: UserPreferences;
  createdAt: string;
  updatedAt: string;
}

/**
 * Користувач (для API відповіді)
 */
export interface UserResponse {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  avatarUrl?: string;
  role: UserRole;
  addresses: string[];
  preferences?: UserPreferences;
  createdAt: string;
  updatedAt: string;
}

/**
 * Дані для авторизації
 */
export interface LoginData {
  email: string;
  password: string;
}

/**
 * Дані для зміни пароля
 */
export interface ChangePasswordData {
  oldPassword: string;
  newPassword: string;
}

