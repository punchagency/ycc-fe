import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type InternalAxiosRequestConfig,
} from 'axios';

const DEFAULT_HEADERS = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

const DEFAULT_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:7000/api/v2';

const withBaseConfig = (
  config?: AxiosRequestConfig
): AxiosRequestConfig<unknown> => ({
  baseURL: DEFAULT_BASE_URL,
  headers: {
    ...DEFAULT_HEADERS,
    ...(config?.headers ?? {}),
  },
  ...config,
});

const attachRequestLogger = (instance: AxiosInstance): void => {
  instance.interceptors.request.use((request) => request);
};

const enhanceAxiosError = (error: AxiosError): AxiosError => {
  if (error.code === 'ERR_NETWORK' || !error.response) {
    error.message = 'Network Error - Please check your internet connection';
    return error;
  }

  const status = error.response.status;
  if (status >= 500) {
    error.message = 'Internal Server Error - Please try again later';
    return error;
  }

  const data =
    (error.response.data as {
      message?: string;
      error?: string;
      msg?: string;
      errors?: Array<{ msg?: string }>;
    }) ?? {};

  const backendMessage =
    data.message || data.error || data.msg || data.errors?.[0]?.msg;

  if (backendMessage) {
    error.message = backendMessage;
  }

  return error;
};

const attachResponseInterceptor = (
  instance: AxiosInstance,
  options?: { requiresAuth?: boolean }
): void => {
  instance.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      const enhancedError = enhanceAxiosError(error);

      if (options?.requiresAuth && enhancedError.response?.status === 401) {
        const url: string = enhancedError.config?.url ?? '';
        const isAuthEndpoint = /auth\/(login|register|forgot-password|reset-password)/.test(
          url
        );

        if (!isAuthEndpoint) {
          localStorage.removeItem('access-token');
          window.location.reload();
        }
      }

      return Promise.reject(enhancedError);
    }
  );
};

const createAxiosInstance = (config?: AxiosRequestConfig): AxiosInstance => {
  const instance = axios.create(withBaseConfig(config));
  attachRequestLogger(instance);
  attachResponseInterceptor(instance);
  return instance;
};

export const unauthenticatedApi = createAxiosInstance();

export const getAuthenticatedApi = (): AxiosInstance => {
  const token = localStorage.getItem('access-token');
  const instance = axios.create(
    withBaseConfig({
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined,
      },
    })
  );

  attachRequestLogger(instance);
  attachResponseInterceptor(instance, { requiresAuth: true });

  return instance;
};

export type { AxiosInstance, InternalAxiosRequestConfig };

