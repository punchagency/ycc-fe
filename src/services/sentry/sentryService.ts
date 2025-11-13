/**
 * Centralized Sentry Service
 * Provides enhanced error tracking, breadcrumbs, and context management
 */

import * as Sentry from "@sentry/react";
import { addSentryBreadcrumb, captureException, setSentryUser } from "../../config/sentry";

/**
 * Enhanced API error capture with context
 */
interface ApiErrorContext {
  endpoint?: string;
  method?: string;
  payload?: any;
  additional?: Record<string, any>;
}

export const captureApiError = (
  error: Error | any,
  context: ApiErrorContext = {},
  operation: string = "API Call"
): void => {
  // Add breadcrumb for the failed API call
  addSentryBreadcrumb(
    `${operation} failed: ${error.message || String(error)}`,
    "http",
    "error"
  );

  // Capture the exception with enhanced context
  captureException(error, {
    api: {
      operation,
      endpoint: context.endpoint || "unknown",
      method: context.method || "unknown",
      statusCode: error.response?.status,
      responseData: error.response?.data,
      requestPayload: context.payload,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
    },
    user: {
      authenticated: !!localStorage.getItem("token"),
      role: getUserRole(),
    },
    ...context.additional,
  });
};

/**
 * Capture user action with context
 */
interface UserActionContext {
  critical?: boolean;
  [key: string]: any;
}

export const captureUserAction = (
  action: string,
  context: UserActionContext = {},
  level: Sentry.SeverityLevel = "info"
): void => {
  addSentryBreadcrumb(`User action: ${action}`, "user", level);

  // For critical actions, also capture as an event
  if (level === "error" || context.critical) {
    Sentry.addBreadcrumb({
      message: `Critical user action: ${action}`,
      category: "user.critical",
      level: "warning" as Sentry.SeverityLevel,
      data: context,
    });
  }
};

/**
 * Capture service operation with performance tracking
 */
interface ServiceOperationContext {
  [key: string]: any;
}

export const captureServiceOperation = async <T>(
  operation: string,
  serviceFunction: () => Promise<T>,
  context: ServiceOperationContext = {}
): Promise<T> => {
  const startTime = performance.now();

  addSentryBreadcrumb(`Starting ${operation}`, "service", "info");

  try {
    const result = await serviceFunction();
    const duration = performance.now() - startTime;

    // Track successful operations
    addSentryBreadcrumb(
      `${operation} completed in ${duration.toFixed(2)}ms`,
      "service",
      duration > 3000 ? "warning" : "info"
    );

    // Capture slow operations as performance issues
    if (duration > 5000) {
      captureException(new Error(`Slow operation: ${operation}`), {
        performance: {
          operation,
          duration,
          threshold: 5000,
          ...context,
        },
      });
    }

    return result;
  } catch (error: any) {
    const duration = performance.now() - startTime;

    addSentryBreadcrumb(
      `${operation} failed after ${duration.toFixed(2)}ms`,
      "service",
      "error"
    );

    captureApiError(error, { ...context, duration }, operation);
    throw error;
  }
};

/**
 * Set user context from localStorage or user object
 */
interface UserData {
  id?: string;
  _id?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  role?: string | { name: string };
}

export const updateUserContext = (user: UserData | null = null): void => {
  try {
    let userData: UserData | null = user;

    if (!userData) {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        userData = JSON.parse(storedUser) as UserData;
      }
    }

    if (userData) {
      setSentryUser({
        id: userData.id || userData._id,
        email: userData.email,
        username:
          userData.firstName && userData.lastName
            ? `${userData.firstName} ${userData.lastName}`
            : userData.name,
        role:
          typeof userData.role === "string"
            ? userData.role
            : (userData.role as any)?.name,
      });

      addSentryBreadcrumb(
        `User context updated: ${userData.email}`,
        "auth",
        "info"
      );
    }
  } catch (error) {
    console.warn("Failed to update Sentry user context:", error);
  }
};

/**
 * Clear user context on logout
 */
export const clearUserContext = (): void => {
  Sentry.setUser(null);
  addSentryBreadcrumb("User logged out", "auth", "info");
};

/**
 * Capture form validation errors
 */
interface FormErrors {
  [field: string]: any;
}

export const captureFormErrors = (
  errors: FormErrors,
  formType: string,
  critical: boolean = false
): void => {
  const errorCount = Object.keys(errors).length;

  addSentryBreadcrumb(
    `Form validation errors in ${formType}: ${Object.keys(errors).join(", ")}`,
    "validation",
    "warning"
  );

  if (critical || errorCount > 5) {
    captureException(new Error(`Form validation failed: ${formType}`), {
      form: {
        type: formType,
        errors,
        errorCount,
        critical,
      },
    });
  }
};

/**
 * Capture navigation events
 */
interface NavigationContext {
  [key: string]: any;
}

export const captureNavigation = (
  from: string,
  to: string,
  context: NavigationContext = {}
): void => {
  addSentryBreadcrumb(`Navigation: ${from} to ${to}`, "navigation", "info");

  // Capture navigation context
  Sentry.setContext("navigation", {
    from,
    to,
    timestamp: new Date().toISOString(),
    ...context,
  });
};

/**
 * Helper function to get user role
 */
const getUserRole = (): string => {
  try {
    const userStr = localStorage.getItem("user");
    if (!userStr) return "unknown";

    const user: UserData = JSON.parse(userStr);
    return typeof user.role === "string"
      ? user.role
      : (user.role as any)?.name || "unknown";
  } catch {
    return "unknown";
  }
};

/**
 * Create axios interceptors for automatic error capture
 */
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

export const setupAxiosInterceptors = (axiosInstance: AxiosInstance): void => {
  // Request interceptor
  axiosInstance.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      addSentryBreadcrumb(
        `API Request: ${config.method?.toUpperCase()} ${config.url}`,
        "http",
        "info"
      );
      return config;
    },
    (error: any) => {
      captureApiError(error, { stage: "request" }, "API Request Setup");
      return Promise.reject(error);
    }
  );

  // Response interceptor
  axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
      addSentryBreadcrumb(
        `API Response: ${response.status} ${response.config.url}`,
        "http",
        "info"
      );
      return response;
    },
    (error: any) => {
      const context: ApiErrorContext = {
        endpoint: error.config?.url,
        method: error.config?.method?.toUpperCase(),
        payload: error.config?.data,
      };

      captureApiError(error, context, "API Response");
      return Promise.reject(error);
    }
  );
};