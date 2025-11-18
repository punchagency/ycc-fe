import axios, { AxiosResponse } from "axios";

// Configure axios defaults
const api = axios.create({
  baseURL: import.meta.env.REACT_APP_API_URL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

// --- Types ---
export interface Service {
  _id: string;
  name: string;
  description: string;
  image?: string;
  categories?: string[];
  category?: string | string[];
  location?: string;
  email?: string;
  supplier?: {
    location?: string;
    email?: string;
  };
  vendor?: {
    email?: string;
  };
  [key: string]: any;
}

export type ServiceType = 'service' | 'product';

export interface ApiResponse<T> {
  data: T;
}

// --- Public routes ---
export const getServiceById = async (id: string): Promise<Service> => {
  try {
    const response: AxiosResponse<Service> = await axios.get(`${import.meta.env.REACT_APP_API_URL}/services/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllServices = async (type: ServiceType): Promise<Service[]> => {
  try {
    const url = `/public/services?type=${type}`;
    const response: AxiosResponse<Service[]> = await api.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getServiceByName = async (name: string): Promise<Service> => {
  try {
    const response: AxiosResponse<Service> = await axios.get(`${import.meta.env.REACT_APP_API_URL}/public/services/${name}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// --- Protected routes ---
const getAuthHeaders = (): { Authorization: string } => {
  const token = localStorage.getItem("token") || '';
  return { Authorization: `Bearer ${token}` };
};

export const createService = async (serviceData: Partial<Service>): Promise<Service> => {
  try {
    const response: AxiosResponse<Service> = await axios.post(
      `${import.meta.env.REACT_APP_API_URL}/services/create`,
      serviceData,
      { headers: getAuthHeaders() }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateService = async (id: string, serviceData: Partial<Service>): Promise<Service> => {
  try {
    const response: AxiosResponse<Service> = await axios.put(
      `${import.meta.env.REACT_APP_API_URL}/services/update/${id}`,
      serviceData,
      { headers: getAuthHeaders() }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteService = async (id: string): Promise<{ message: string }> => {
  try {
    const response: AxiosResponse<{ message: string }> = await axios.delete(
      `${import.meta.env.REACT_APP_API_URL}/services/${id}`,
      { headers: getAuthHeaders() }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllVendorServices = async (): Promise<Service[]> => {
  try {
    const response: AxiosResponse<Service[]> = await axios.get(
      `${import.meta.env.REACT_APP_API_URL}/services/vendor`,
      { headers: getAuthHeaders() }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const uploadServices = async (file: File): Promise<{ message: string }> => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response: AxiosResponse<{ message: string }> = await axios.post(
      `${import.meta.env.REACT_APP_API_URL}/services/upload`,
      formData,
      {
        headers: {
          ...getAuthHeaders(),
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};