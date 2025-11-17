import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import type { ReactNode, FC } from "react";
import {
  updateUserContext,
  clearUserContext,
} from "../services/sentry/sentryService";
import { getUserSettings } from "../services/crewSettings/crewsettings";

// === Types & Interfaces ===

interface User {
  id?: string;
  _id?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  role?: string | { name: string };
  [key: string]: any;
}

interface StripeAccount {
  id?: string;
  object?: string;
  [key: string]: any;
}

interface ApiResponse<T = any> {
  status: boolean;
  message?: string;
  data?: T;
  error?: string;
}

interface ParsedProduct {
  [key: string]: any;
}

interface ParsedService {
  [key: string]: any;
}

interface OnboardingStatus {
  inventoryUploaded?: boolean;
  servicesUploaded?: boolean;
  stripeConnected?: boolean;
  onboardingCompleted?: boolean;
  [key: string]: any;
}

// === Context Type ===
interface UserContextType {
  user: User | null;
  loginUser: (userData: User) => void;
  logoutUser: () => void;
  signupUser: (userData: User) => void;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  userProfile: any | null;
  setUserProfile: React.Dispatch<React.SetStateAction<any | null>>;
  stripeAccount: StripeAccount | null;
  getStripeAccount: (userId: string, role: string) => Promise<ApiResponse<StripeAccount>>;
  createStripeAccount: (userId: string, role: string) => Promise<ApiResponse<{ url: string }>>;
  refreshStripeAccountLink: (userId: string, role: string) => Promise<ApiResponse<{ url: string }>>;
  uploadInventoryData: (file: File, userId: string) => Promise<ApiResponse>;
  parseInventoryWithAI: (file: File) => Promise<ParsedProduct[]>;
  importParsedInventoryToNode: (params: {
    userId?: string;
    supplierId?: string;
    products: ParsedProduct[];
  }) => Promise<any>;
  parseServicesWithAI: (file: File) => Promise<ParsedService[]>;
  importParsedServicesToNode: (params: {
    userId: string;
    services: ParsedService[];
  }) => Promise<any>;
  uploadServicesData: (file: File, userId: string) => Promise<boolean>;
  verifyOnboardingStep1: (userId: string, role: string) => Promise<ApiResponse>;
  completeOnboarding: (userId: string, role: string) => Promise<boolean>;
  checkOnboardingStatus: (userId: string, role: string) => Promise<OnboardingStatus>;
  refreshUser: () => Promise<User | void>;
}

// === Create Context ===
export const UserContext = createContext<UserContextType | undefined>(undefined);

// === Custom Hook ===
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

// === Helper: Auth Header ===
const getAuthHeader = (): Record<string, string> => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// === Provider Component ===
interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("user");
    try {
      return savedUser ? (JSON.parse(savedUser) as User) : null;
    } catch {
      return null;
    }
  });

  const [userProfile, setUserProfile] = useState<any | null>(null);
  const [stripeAccount, setStripeAccount] = useState<StripeAccount | null>(null);

  // === Load user on mount ===
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
          try {
            const parsedUser = JSON.parse(savedUser) as User;
            setUser(parsedUser);
          } catch {
            localStorage.removeItem("user");
          }
        }
        return;
      }

      try {
        const response = await getUserSettings();
        if (response.status && response.data?.user) {
          const userData = response.data.user;
          setUser(userData);
          localStorage.setItem("user", JSON.stringify(userData));
          updateUserContext(userData);
        }
      } catch (e) {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
          try {
            const parsedUser = JSON.parse(savedUser) as User;
            setUser(parsedUser);
          } catch {
            localStorage.removeItem("user");
          }
        }
      }
    };

    fetchUser();
  }, []);

  // === Login / Signup / Logout ===
  const loginUser = (userData: User) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    updateUserContext(userData);
  };

  const signupUser = (userData: User) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    updateUserContext(userData);
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    clearUserContext();
  };

  // === Refresh User ===
  const refreshUser = async (): Promise<User | void> => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await getUserSettings();
      if (response.status && response.data?.user) {
        const userData = response.data.user;
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        return userData;
      }
    } catch (e) {
      // Silent fail
    }
  };

  // === Stripe Functions ===
  const getStripeAccount = async (userId: string, role: string): Promise<ApiResponse<StripeAccount>> => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_API_URL}/stripe/get-stripe-account`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...getAuthHeader(),
          },
          body: JSON.stringify({ userId, role }),
        }
      );
      const data = await response.json();

      if (!data.status && response.status === 404) {
        setStripeAccount(null);
      } else if (data.status) {
        setStripeAccount(data.data);
      }
      return data;
    } catch (error: any) {
      return { status: false, message: error.message };
    }
  };

  const createStripeAccount = async (userId: string, role: string): Promise<ApiResponse<{ url: string }>> => {
    const response = await fetch(
      `${import.meta.env.VITE_REACT_APP_API_URL}/stripe/create-stripe-account`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeader(),
        },
        body: JSON.stringify({ userId, role }),
      }
    );
    const data = await response.json();
    if (data.status) {
      window.location.href = data.data.url;
    }
    return data;
  };

  const refreshStripeAccountLink = async (userId: string, role: string): Promise<ApiResponse<{ url: string }>> => {
    const response = await fetch(
      `${import.meta.env.VITE_REACT_APP_API_URL}/stripe/refresh-stripe-account-link`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeader(),
        },
        body: JSON.stringify({ userId, role }),
      }
    );
    const data = await response.json();
    if (data.status) {
      window.location.href = data.data.url;
    }
    return data;
  };

  // === Inventory Upload & AI Parsing ===
  const uploadInventoryData = async (selectedFile: File, userId: string): Promise<ApiResponse> => {
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("userId", userId);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_API_URL}/inventory/upload`,
        {
          method: "POST",
          body: formData,
          headers: {
            ...getAuthHeader(),
          },
        }
      );
      const data = await response.json();

      if (!data.status) {
        let errorMessage = data.message || "Upload failed";
        if (data.error) errorMessage += `: ${data.error}`;
        throw new Error(errorMessage);
      }

      return {
        status: data.status,
        message: data.message,
        data: data.data,
      };
    } catch (err: any) {
      throw err;
    }
  };

  const parseInventoryWithAI = async (file: File): Promise<ParsedProduct[]> => {
    const aiBase = import.meta.env.VITE_REACT_APP_AI_PARSER_URL;
    if (!aiBase) throw new Error("AI parser URL not configured");

    const formData = new FormData();
    formData.append("file", file);

    const resp = await fetch(`${aiBase}/parse-inventory`, {
      method: "POST",
      body: formData,
    });
    const json = await resp.json().catch(() => ({}));

    if (!resp.ok) {
      const error = new Error(
        json?.message || (resp.status === 422 ? "Validation error" : "AI parsing failed")
      );
      (error as any).response = { status: resp.status, data: json };
      (error as any).data = json;
      throw error;
    }

    if (!json?.products || !Array.isArray(json.products)) {
      throw new Error("AI parser returned an invalid response");
    }

    return json.products;
  };

  const importParsedInventoryToNode = async ({
    userId,
    supplierId,
    products,
  }: {
    userId?: string;
    supplierId?: string;
    products: ParsedProduct[];
  }): Promise<any> => {
    const body = supplierId ? { supplierId, products } : { userId, products };
    const resp = await fetch(
      `${import.meta.env.VITE_REACT_APP_API_URL}/inventory/import`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeader(),
        },
        body: JSON.stringify(body),
      }
    );
    const json = await resp.json().catch(() => ({}));
    if (!resp.ok || json?.status === false) {
      throw new Error(json?.message || "Import failed");
    }
    return json;
  };

  // === Services ===
  const parseServicesWithAI = async (file: File): Promise<ParsedService[]> => {
    const aiBase = import.meta.env.VITE_REACT_APP_AI_PARSER_URL;
    if (!aiBase) throw new Error("AI parser URL not configured");

    const formData = new FormData();
    formData.append("file", file);

    const resp = await fetch(`${aiBase}/parse-services`, {
      method: "POST",
      body: formData,
    });
    const json = await resp.json().catch(() => ({}));

    if (!resp.ok) {
      const error = new Error(
        json?.message || (resp.status === 422 ? "Validation error" : "AI parsing failed")
      );
      (error as any).response = { status: resp.status, data: json };
      (error as any).data = json;
      throw error;
    }

    if (!json?.services || !Array.isArray(json.services)) {
      throw new Error("AI parser returned an invalid response");
    }

    return json.services;
  };

  const importParsedServicesToNode = async ({
    userId,
    services,
  }: {
    userId: string;
    services: ParsedService[];
  }): Promise<any> => {
    const resp = await fetch(
      `${import.meta.env.VITE_REACT_APP_API_URL}/services/import`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeader(),
        },
        body: JSON.stringify({ userId, services }),
      }
    );
    const json = await resp.json().catch(() => ({}));
    if (!resp.ok || json?.status === false) {
      throw new Error(json?.message || "Import failed");
    }
    return json;
  };

  const uploadServicesData = async (selectedFile: File, userId: string): Promise<boolean> => {
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("userId", userId);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_API_URL}/services/upload`,
        {
          method: "POST",
          body: formData,
          headers: {
            ...getAuthHeader(),
          },
        }
      );
      const data = await response.json();

      if (!data.status) {
        throw new Error(data.message);
      }
      return data.status;
    } catch (err: any) {
      throw err;
    }
  };

  // === Onboarding ===
  const verifyOnboardingStep1 = async (userId: string, role: string): Promise<ApiResponse> => {
    try {
      const endpoint =
        role === "supplier"
          ? `${import.meta.env.VITE_REACT_APP_API_URL}/suppliers/verify/inventory-upload`
          : `${import.meta.env.VITE_REACT_APP_API_URL}/vendors/verify/services-upload`;

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeader(),
        },
        body: JSON.stringify({ userId }),
      });
      return await response.json();
    } catch (error: any) {
      throw error;
    }
  };

  const completeOnboarding = async (userId: string, role: string): Promise<boolean> => {
    try {
      const endpoint =
        role === "supplier"
          ? `${import.meta.env.VITE_REACT_APP_API_URL}/suppliers/complete/onboarding`
          : `${import.meta.env.VITE_REACT_APP_API_URL}/vendors/complete/onboarding`;

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeader(),
        },
        body: JSON.stringify({ userId }),
      });
      const data = await response.json();
      return data.status;
    } catch (error: any) {
      throw error;
    }
  };

  const checkOnboardingStatus = async (userId: string, role: string): Promise<OnboardingStatus> => {
    try {
      const endpoint =
        role === "supplier"
          ? `${import.meta.env.VITE_REACT_APP_API_URL}/suppliers/onboarding/status`
          : `${import.meta.env.VITE_REACT_APP_API_URL}/vendors/onboarding/status`;

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeader(),
        },
        body: JSON.stringify({ userId }),
      });
      const data = await response.json();
      return data.data;
    } catch (error: any) {
      throw error;
    }
  };

  // === Provider Value ===
  const value: UserContextType = {
    user,
    loginUser,
    logoutUser,
    signupUser,
    setUser,
    userProfile,
    setUserProfile,
    stripeAccount,
    getStripeAccount,
    createStripeAccount,
    refreshStripeAccountLink,
    uploadInventoryData,
    parseInventoryWithAI,
    importParsedInventoryToNode,
    parseServicesWithAI,
    importParsedServicesToNode,
    uploadServicesData,
    verifyOnboardingStep1,
    completeOnboarding,
    checkOnboardingStatus,
    refreshUser,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};