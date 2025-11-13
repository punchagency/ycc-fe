import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

// Helper to get auth header
const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};

// Create a new order

export const createOrder = async (orderData) => {
  try {
    // Validate required fields
    if (
      !orderData.supplierId ||
      !orderData.products ||
      !orderData.deliveryAddress ||
      !orderData.deliveryDate
    ) {
      return {
        status: false,
        error: "Missing required fields",
      };
    }

    // Validate products array
    if (!Array.isArray(orderData.products) || orderData.products.length === 0) {
      return {
        status: false,
        error: "Products must be a non-empty array",
      };
    }

    // Validate each product
    for (const product of orderData.products) {
      if (!product.id || !product.quantity || !product.price) {
        return {
          status: false,
          error: "Each product must have id, quantity, and price",
        };
      }
    }

    const response = await axios.post(`${API_URL}/orders/create`, orderData, {
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
      },
    });

    return {
      status: true,
      data: response.data,
    };
  } catch (error) {
    return {
      status: false,
      error: error.response?.data?.message || "Failed to create order",
    };
  }
};



// Get all orders
export const getOrders = async (params = {}) => {
  try {
    const response = await axios.get(`${API_URL}/orders`, {
      headers: getAuthHeader(),
      params, // For pagination, sorting, filtering
    });

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || "Failed to fetch orders",
    };
  }
};

// Get order by ID
export const getOrderById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/orders/${id}`, {
      headers: getAuthHeader(),
    });

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || "Failed to fetch order",
    };
  }
};

// Get orders by supplier ID
export const getOrdersBySupplierId = async (supplierId, params = {}) => {
  try {
    const response = await axios.get(
      `${API_URL}/orders/supplier/${supplierId}`,
      {
        headers: getAuthHeader(),
        params, // For pagination, sorting, filtering
      }
    );

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || "Failed to fetch supplier orders",
    };
  }
};

// Update order status
export const updateOrderStatus = async (orderId, status) => {
  try {
    const response = await axios.patch(
      `${API_URL}/orders/${orderId}/status`,
      { status },
      {
        headers: getAuthHeader(),
      }
    );

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || "Failed to update order status",
    };
  }
};

// Update order
export const updateOrder = async (orderId, orderData) => {
  try {
    const response = await axios.put(
      `${API_URL}/orders/${orderId}`,
      orderData,
      {
        headers: getAuthHeader(),
      }
    );

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || "Failed to update order",
    };
  }
};

// Cancel order
export const cancelOrder = async (orderId) => {
  try {
    const response = await axios.post(
      `${API_URL}/orders/${orderId}/cancel`,
      {},
      {
        headers: getAuthHeader(),
      }
    );

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {

    return {
      success: false,
      error: error.response?.data?.message || "Failed to cancel order",
    };
  }
};

// Delete order
export const deleteOrder = async (orderId) => {
  try {
    const response = await axios.delete(`${API_URL}/orders/${orderId}`, {
      headers: getAuthHeader(),
    });

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    
    return {
      success: false,
      error: error.response?.data?.message || "Failed to delete order",
    };
  }
};

// Get order summary
export const getOrderSummary = async (query = {}) => {
  try {
    const { page = 1, limit = 5, status, filter, search, sort } = query;
    
    const params = { page, limit };
    if (status) params.status = status;
    if (filter) params.filter = typeof filter === 'object' ? JSON.stringify(filter) : filter;
    if (search) params.search = search;
    if (sort) params.sort = typeof sort === 'object' ? JSON.stringify(sort) : sort;
    
    const response = await axios.get(`${API_URL}/orders`, {
      headers: getAuthHeader(),
      params
    });

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    
    return {
      success: false,
      error: error.response?.data?.message || "Failed to fetch order summary",
    };
  }
};

// Bulk delete orders
export const bulkDeleteOrders = async (orderIds) => {
  try {
    const response = await axios.post(
      `${API_URL}/orders/bulk-delete-orders`,
      { orderIds },
      {
        headers: getAuthHeader(),
      }
    );

    return {
      success: true,
      message: response.data.message || "Orders deleted successfully",
    };
  } catch (error) {
    
    return {
      success: false,
      error: error.response?.data?.message || "Failed to delete orders",
    };
  }
};

/**
 * Search products for order creation
 * @param {Object} params - Search parameters
 * @param {string} params.query - Search query
 * @param {string} params.category - Category filter
 * @param {string} params.supplier - Supplier filter
 * @param {number} params.limit - Items per page
 * @param {number} params.page - Page number
 * @returns {Promise<Object>} Search results
 */
export const searchProducts = async (params = {}) => {
  try {
    const queryParams = new URLSearchParams();
    if (params.query) queryParams.append('query', params.query);
    if (params.category) queryParams.append('category', params.category);
    if (params.supplier) queryParams.append('supplier', params.supplier);
    if (params.limit) queryParams.append('limit', params.limit.toString());
    if (params.page) queryParams.append('page', params.page.toString());
    const response = await axios.get(
      `${API_URL}/orders/search-products?${queryParams}`,
      { headers: getAuthHeader() }
    );
    return response.data;
  } catch (error) {
    
    throw error;
  }
};

/**
 * Get product categories for filter dropdown
 * @returns {Promise<Object>} Categories list
 */
export const getProductCategories = async () => {
  try {
    const response = await axios.get(
      `${API_URL}/orders/categories`,
      { headers: getAuthHeader() }
    );
    return response.data;
  } catch (error) {
    
    throw error;
  }
};

export const getSupplierOrders = async (status) => {
    try {
        const response = await axios.get(`${API_URL}/orders/supplier-orders?status=${status}`, {
            headers: getAuthHeader(),
        });
        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        return {
            success: false,
            error: error.response?.data?.message || "Failed to fetch supplier orders",
        };
    }
};

/**
 * Update order shipping address (public endpoint with token validation)
 * @param {string} orderId - The order ID
 * @param {string} token - The confirmation token from URL
 * @param {Object} shippingAddress - The shipping address object
 * @param {string} shippingAddress.name - Business/Supplier name
 * @param {string} shippingAddress.street - Street address
 * @param {string} shippingAddress.street2 - Street address line 2 (optional)
 * @param {string} shippingAddress.city - City
 * @param {string} shippingAddress.state - State
 * @param {string} shippingAddress.zip - ZIP code
 * @param {string} shippingAddress.country - Country
 * @param {string} shippingAddress.phone - Phone number
 * @param {string} shippingAddress.email - Email address
 * @returns {Promise<Object>} Response with updated shipping address
 */
export const updateOrderShippingAddress = async (orderId, token, shippingAddress) => {
  try {
    console.log('📦 Updating order shipping address:', {
      orderId,
      hasToken: !!token,
      hasAddress: !!shippingAddress,
    });

    // Validate required fields
    const requiredFields = ['name', 'street', 'city', 'state', 'zip', 'country', 'phone', 'email'];
    const missingFields = requiredFields.filter(field => !shippingAddress[field]);
    
    if (missingFields.length > 0) {
      throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
    }

    const baseUrl = API_URL || "http://localhost:7000/api";
    const cleanBaseUrl = baseUrl.endsWith("/api") ? baseUrl.slice(0, -4) : baseUrl;
    const apiUrl = `${cleanBaseUrl}/api/orders/${orderId}/${token}/shipping-address`;

    const response = await axios.put(apiUrl, { shippingAddress }, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log('✅ Shipping address updated successfully');

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error('❌ Error updating shipping address:', error);
    return {
      success: false,
      error: error.response?.data?.message || error.message || "Failed to update shipping address",
    };
  }
};