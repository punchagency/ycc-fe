import type {
  AuthResponse,
  RegistrationResponse,
  UserResponse,
} from '../../types/api';
import { apiCall } from './client';

export type RegisterPayload = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  phone?: string;
  nationality?: string;
  profilePicture?: File | null;
  businessName?: string;
  businessType?: string;
  businessEmail?: string;
  businessPhone?: string;
  website?: string;
  taxId?: string;
  license?: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

const toFormData = (payload: RegisterPayload): FormData => {
  const formData = new FormData();

  (
    Object.entries(payload) as Array<
      [keyof RegisterPayload, RegisterPayload[keyof RegisterPayload]]
    >
  ).forEach(([key, value]) => {
    if (value === undefined || value === null) return;
    if (value instanceof File) {
      formData.append(key, value);
    } else {
      formData.append(key, value as string);
    }
  });

  return formData;
};

export const registerApi = (payload: RegisterPayload) =>
  apiCall<RegistrationResponse>({
    method: 'post',
    url: 'auth/register',
    data: toFormData(payload),
    config: {
      headers: { 'Content-Type': 'multipart/form-data' },
    },
  });

export const loginApi = (payload: LoginPayload) =>
  apiCall<AuthResponse>({
    method: 'post',
    url: 'auth/login',
    data: payload,
  });

export const getProfileApi = () =>
  apiCall<UserResponse>({
    method: 'get',
    url: 'auth/profile',
    authenticated: true,
  });
