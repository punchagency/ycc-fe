import axios from "axios";
import { API_CONFIG, API_ERROR_CODES } from "./config";
import Session from "../utils/Session";

const api = axios.create({
  ...API_CONFIG,
  timeout: 30000, // 30 seconds timeout
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

api.interceptors.request.use(
  async (config) => {
    try {
      config.headers["X-Request-Timestamp"] = new Date().toISOString();

      const token = await Session.getCookie("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      config.headers["X-App-Version"] = "1.0.0";

      if (!config.headers["x-retry-count"]) {
        config.headers["x-retry-count"] = 0;
      }

      // Handle FormData - remove Content-Type to let browser set it with boundary
      if (config.data instanceof FormData) {
        delete config.headers["Content-Type"];
      }

      return config;
    } catch (error) {
      console.error("Request interceptor error:", error);
      return Promise.reject(error);
    }
  },
  (error) => {
    console.error("Request failed:", error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Capture API errors in Sentry (production only)
    if (import.meta.env.PROD && error.response?.status >= 500) {
      const Sentry = await import('@sentry/react');
      Sentry.captureException(error, {
        contexts: {
          api: {
            url: originalRequest.url,
            method: originalRequest.method,
            status: error.response?.status,
            statusText: error.response?.statusText,
          },
        },
      });
    }

    if (error.response) {
      console.error(
        `API Error: ${originalRequest.url} - Status: ${error.response.status}`
      );
      
      // Enhanced logging for 429 errors
      if (error.response.status === 429) {
        console.error('🚨 [API Interceptor] Rate limit exceeded (429):', {
          url: originalRequest.url,
          method: originalRequest.method,
          status: error.response.status,
          statusText: error.response.statusText,
          data: error.response.data,
          headers: error.response.headers,
          retryAfter: error.response.headers["retry-after"],
          xRateLimitLimit: error.response.headers["x-ratelimit-limit"],
          xRateLimitRemaining: error.response.headers["x-ratelimit-remaining"],
          xRateLimitReset: error.response.headers["x-ratelimit-reset"],
          requestHeaders: originalRequest.headers,
          requestData: originalRequest.data
        });
        
        const retryAfter = error.response.headers["retry-after"];
        if (retryAfter) {
          console.log(`🔄 [API Interceptor] Retrying after ${retryAfter} seconds...`);
          await new Promise((resolve) =>
            setTimeout(resolve, parseInt(retryAfter) * 1000)
          );
          return api(originalRequest);
        }
      }
      
      if (error.response.status === API_ERROR_CODES.UNAUTHORIZED) {
        Session.clearAllCookies();
      }
    } else if (error.request) {
      console.log("No response received:", JSON.stringify(error, null, 2));
      if (originalRequest.headers["x-retry-count"] < 3) {
        originalRequest.headers["x-retry-count"] += 1;
        return api(originalRequest);
      }
    } else {
      console.error("Error setting up request:", error.message);
    }

    return Promise.reject({
      status: error.response?.status || 500,
      message: error.response?.data?.message || error.message,
      response: error.response,
      code: error.code,
      originalError: error,
    });
  }
);

export default api;
