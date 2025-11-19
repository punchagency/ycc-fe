/**
 * Utility function to construct API URLs consistently
 * Handles the case where API_URL might already include /api
 */
export const buildApiUrl = (endpoint: string): string => {
  const API_URL = import.meta.env.REACT_APP_API_URL;

  if (!API_URL) {
    throw new Error("REACT_APP_API_URL is not defined in environment variables");
  }

  // Remove leading slash from endpoint if present
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint.slice(1) : endpoint;

  // Check if API_URL already includes /api
  if (API_URL.includes("/api")) {
    return `${API_URL}/${cleanEndpoint}`;
  } else {
    return `${API_URL}/api/${cleanEndpoint}`;
  }
};
