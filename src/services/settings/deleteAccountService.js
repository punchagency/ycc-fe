import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}/crew-settings`;

/**
 * Get authentication headers
 */
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
};

/**
 * Request account deletion
 * @param {Object} data - Deletion request data
 * @param {string} data.reason - Reason for deletion
 * @param {string} data.contactEmail - Contact email
 * @returns {Promise} - API response
 */
export const requestAccountDeletion = async (data) => {
  try {
    const response = await axios.post(
      `${API_URL}/delete-account-request`,
      data,
      getAuthHeaders()
    );
    return {
      success: true,
      message: response.data.message,
      data: response.data,
    };
  } catch (error) {
    console.error("Error requesting account deletion:", error);
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "Failed to send deletion request. Please try again.",
      error: error.response?.data || error.message,
    };
  }
};
