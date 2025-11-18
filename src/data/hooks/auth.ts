import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getProfileApi,
  loginApi,
  registerApi,
  type LoginPayload,
  type RegisterPayload,
} from '../api/auth';
import type {
  AuthResponse,
  RegistrationResponse,
  UserResponse,
} from '../../types/api';

const PROFILE_QUERY_KEY = ['profile'];

const persistTokens = (tokens?: { token?: string; refreshToken?: string }) => {
  if (tokens?.token) {
    localStorage.setItem('access-token', tokens.token);
  }

  if (tokens?.refreshToken) {
    localStorage.setItem('refresh-token', tokens.refreshToken);
  }
};

export const useRegister = () => {
  const queryClient = useQueryClient();

  return useMutation<RegistrationResponse, Error, RegisterPayload>({
    mutationFn: registerApi,
    onSuccess: (response) => {
      persistTokens(response.data);
      void queryClient.invalidateQueries({ queryKey: PROFILE_QUERY_KEY });
    },
  });
};

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation<AuthResponse, Error, LoginPayload>({
    mutationFn: loginApi,
    onSuccess: (response) => {
      persistTokens(response.data);
      void queryClient.invalidateQueries({ queryKey: PROFILE_QUERY_KEY });
    },
  });
};

export const useProfile = () =>
  useQuery<UserResponse>({
    queryKey: PROFILE_QUERY_KEY,
    queryFn: getProfileApi,
    enabled: Boolean(localStorage.getItem('access-token')),
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

