export type ApiResponse<T = unknown> = {
  success: boolean;
  message: string;
  data?: T;
};

export type User = {
  id?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  role?: string;
  [key: string]: unknown;
};

export type AuthTokens = {
  token: string;
  refreshToken?: string;
};

export type AuthResponse = ApiResponse<AuthTokens & { user: User }>;

export type RegistrationResponse = ApiResponse<{
  user: User;
  token?: string;
  refreshToken?: string;
}>;

export type UserResponse = ApiResponse<{ user: User }>;
