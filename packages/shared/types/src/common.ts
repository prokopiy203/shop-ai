/**
 * Метадані помилки
 */
export interface ErrorMeta {
  code?: string;
  details?: Record<string, any>;
  context?: string;
}

/**
 * Стандартна API відповідь з успіхом
 */
export interface ApiSuccessResponse<T = any> {
  success: true;
  data: T;
  message?: string;
}

/**
 * Стандартна API відповідь з помилкою
 */
export interface ApiErrorResponse {
  success: false;
  error: {
    message: string;
    code?: string;
    details?: Record<string, any>;
  };
}

/**
 * Стандартна API відповідь
 */
export type ApiResponse<T = any> = ApiSuccessResponse<T> | ApiErrorResponse;

/**
 * Пагінація
 */
export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

/**
 * Відповідь з пагінацією
 */
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

/**
 * ID (ObjectId або string)
 */
export type ID = string;

/**
 * Timestamps
 */
export interface Timestamps {
  createdAt: string;
  updatedAt: string;
}

export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};
