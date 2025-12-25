export type ApiSuccessResponse<T> = {
  success: true;
  message?: string;
  data: T;
};

export type ApiOptions = RequestInit & {};

export async function apiClient<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const isFormData = options.body instanceof FormData;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
    ...options,
    credentials: "include",
    headers: {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...(options.headers || {}),
    },
  });

  const json = (await res
    .json()
    .catch(() => null)) as ApiSuccessResponse<T> | null;

  if (res.status === 401) {
    throw { status: 401 };
  }

  if (!res.ok) {
    throw json ?? new Error("API error");
  }

  if (!json || json.success !== true) {
    throw new Error("Invalid API response");
  }

  return json.data;
}
