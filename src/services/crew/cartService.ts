import axios from "axios";
import { buildApiUrl } from "../../utils/apiUtils";

// Generic API response type
export interface ApiResponse<T = any> {
  status: boolean;
  message?: string;
  data: T;
}

export interface CartItemParams {
  inventoryId: string;
  productId: string;
  quantity?: number;
}

export interface CheckoutParams {
  deliveryAddress: string;
  deliveryDate: string;
  additionalNotes?: string;
}

const getAuthHeaders = (): Record<string, string> => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

/** Add product to cart */
export const addToCart = async (
  params: CartItemParams
): Promise<ApiResponse> => {
  if (!params.inventoryId || !params.productId) {
    throw new Error("Both inventoryId and productId are required");
  }

  try {
    const response = await axios.post(buildApiUrl("carts/add"), params, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

/** Get user's full cart */
export const getCart = async (): Promise<ApiResponse> => {
  try {
    const response = await axios.get(buildApiUrl("carts"), {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

/** Get cart summary (e.g., total count) */
export const getCartSummary = async (): Promise<ApiResponse> => {
  try {
    const response = await axios.get(buildApiUrl("carts/summary"), {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

/** Update quantity of a product in cart */
export const updateCartQuantity = async (
  params: CartItemParams
): Promise<ApiResponse> => {
  if (!params.inventoryId || !params.productId) {
    throw new Error("Both inventoryId and productId are required");
  }

  try {
    const response = await axios.put(
      buildApiUrl("carts/update-quantity"),
      params,
      { headers: getAuthHeaders() }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

/** Remove a product from cart */
export const removeFromCart = async (
  params: Omit<CartItemParams, "quantity">
): Promise<ApiResponse> => {
  if (!params.inventoryId || !params.productId) {
    throw new Error("Both inventoryId and productId are required");
  }

  try {
    const response = await axios.delete(buildApiUrl("carts/remove"), {
      data: params,
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

/** Clear the entire cart */
export const clearCart = async (): Promise<ApiResponse> => {
  try {
    const response = await axios.delete(buildApiUrl("carts/clear"), {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

/** Checkout and create order */
export const checkout = async (
  params: CheckoutParams
): Promise<ApiResponse> => {
  try {
    const response = await axios.post(buildApiUrl("carts/checkout"), params, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
