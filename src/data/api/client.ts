import type { AxiosRequestConfig, Method } from 'axios';
import { getAuthenticatedApi, unauthenticatedApi } from '../../axiosConfig/axios';

type ApiCallOptions = {
  method: Method;
  url: string;
  data?: unknown;
  authenticated?: boolean;
  config?: AxiosRequestConfig;
};

export const handleApiError = (error: unknown): never => {
  if (
    error &&
    typeof error === 'object' &&
    'message' in error &&
    (error as { message?: string }).message === 'Network Error - Please check your internet connection'
  ) {
    throw new Error('Network Error - Please check your internet connection');
  }

  if (error && typeof error === 'object' && 'response' in error) {
    const response = (error as { response?: { data?: unknown } }).response;
    const data =
      (response?.data as {
        message?: string;
        error?: string;
        msg?: string;
        errors?: Array<{ msg?: string }>;
      }) ?? {};

    const backendMessage =
      data.message || data.error || data.msg || data.errors?.[0]?.msg;

    const fallback = (error as { message?: string }).message ?? 'An unknown error occurred';
    throw new Error(backendMessage || fallback);
  }

  if (error && typeof error === 'object' && 'message' in error) {
    throw new Error(
      (error as { message?: string }).message ?? 'An unknown error occurred'
    );
  }

  throw new Error('An unknown error occurred');
};

export const apiCall = async <T>({
  method,
  url,
  data,
  authenticated = false,
  config,
}: ApiCallOptions): Promise<T> => {
  try {
    const api = authenticated ? getAuthenticatedApi() : unauthenticatedApi;
    const response = await api.request<T>({
      method,
      url,
      data,
      ...config,
    });

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

