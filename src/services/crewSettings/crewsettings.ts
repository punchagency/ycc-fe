import axios, { AxiosError } from "axios";

const API_URL = import.meta.env.VITE_API_URL || import.meta.env.REACT_APP_API_URL;

// ✅ Define a general API response interface
interface ApiResponse<T = any> {
  status: boolean;
  message: string;
  data?: T;
  error?: string;
}

// ✅ Define possible settings/profile data shapes
interface UserSettings {
  theme?: string;
  notifications?: boolean;
  [key: string]: any;
}

interface CrewProfile {
  name?: string;
  role?: string;
  bio?: string;
  [key: string]: any;
}

// ✅ Helper to get auth headers
const getAuthHeader = (): Record<string, string> => {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};

// ✅ Get user settings
export const getUserSettings = async (): Promise<ApiResponse<UserSettings>> => {
  try {
    const token = localStorage.getItem("token");
    if (!token)
      return { status: false, message: "Authentication required" };

    const response = await axios.get<ApiResponse<UserSettings>>(
      `${API_URL}/settings`,
      { headers: getAuthHeader() }
    );

    return response.data;
  } catch (error) {
    const err = error as AxiosError<{ message?: string }>;
    console.error("Error fetching user settings:", err);
    return {
      status: false,
      message: err.response?.data?.message || "Error retrieving settings",
      error: err.message,
    };
  }
};

// ✅ Update user settings
export const updateUserSettings = async (
  settingsData: UserSettings
): Promise<ApiResponse> => {
  try {
    const token = localStorage.getItem("token");
    if (!token)
      return { status: false, message: "Authentication required" };

    const response = await axios.put<ApiResponse>(
      `${API_URL}/settings`,
      settingsData,
      { headers: getAuthHeader() }
    );

    return response.data;
  } catch (error) {
    const err = error as AxiosError<{ message?: string }>;
    console.error("Error updating user settings:", err);
    return {
      status: false,
      message: err.response?.data?.message || "Error updating settings",
      error: err.message,
    };
  }
};

// ✅ Upload profile picture
export const uploadProfilePicture = async (
  file: File
): Promise<ApiResponse> => {
  try {
    const token = localStorage.getItem("token");
    if (!token)
      return { status: false, message: "Authentication required" };

    const formData = new FormData();
    formData.append("profilePicture", file);

    const response = await axios.post<ApiResponse>(
      `${API_URL}/settings/profile-picture`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    const err = error as AxiosError<{ message?: string }>;
    console.error("Error uploading profile picture:", err);
    return {
      status: false,
      message:
        err.response?.data?.message || "Error uploading profile picture",
      error: err.message,
    };
  }
};

// ✅ Remove profile picture
export const removeProfilePicture = async (): Promise<ApiResponse> => {
  try {
    const token = localStorage.getItem("token");
    if (!token)
      return { status: false, message: "Authentication required" };

    const response = await axios.delete<ApiResponse>(
      `${API_URL}/settings/profile-picture`,
      { headers: getAuthHeader() }
    );

    return response.data;
  } catch (error) {
    const err = error as AxiosError<{ message?: string }>;
    console.error("Error removing profile picture:", err);
    return {
      status: false,
      message:
        err.response?.data?.message || "Error removing profile picture",
      error: err.message,
    };
  }
};

// ✅ Update crew profile
export const updateCrewProfile = async (
  profileData: CrewProfile
): Promise<ApiResponse> => {
  try {
    const token = localStorage.getItem("token");
    if (!token)
      return { status: false, message: "Authentication required" };

    const response = await axios.put<ApiResponse>(
      `${API_URL}/crew/profile`,
      profileData,
      { headers: getAuthHeader() }
    );

    return response.data;
  } catch (error) {
    const err = error as AxiosError<{ message?: string }>;
    console.error("Error updating crew profile:", err);
    return {
      status: false,
      message: err.response?.data?.message || "Error updating crew profile",
      error: err.message,
    };
  }
};
