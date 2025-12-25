/**
 * Роль користувача
 */
export type UserRole = "user" | "admin";

/**
 * Тема інтерфейсу
 */
export type Theme = "light" | "dark";

export type TypeNotification = "order" | "promo" | "ai" | "system";

/**
 * Мова
 */
export type Language = "uk" | "en";

/**
 * Голос AI
 */
export type AIVoice = "female" | "male";

export interface Avatar {
  url: string;
  publicId: string;
}

/**
 * Налаштування користувача
 */
export interface UserPreferences {
  theme: Theme;
  language: Language;
  aiVoice: AIVoice;
  animationsEnabled: boolean;
}

export interface Notification {
  userId: string;
  type: TypeNotification;
  title: string;
  message: string;
  read: boolean;
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
  avatar?: Avatar;
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
  avatar?: Avatar;
  role: UserRole;
  addresses: string[];
  preferences?: UserPreferences;
  notifications: Notification[];
  lastActiveAt: Date | null;
  deleted: Boolean;
  deletedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Користувач (для API відповіді)
 */
export interface UserResponse {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: Avatar;
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

export interface JwtUserPayload {
  _id: string;
  role: string;
}
