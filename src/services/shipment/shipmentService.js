/**
 * Shipment Service
 * Handles all shipment-related API calls
 * 
 * NOTE: Shipping address management has been moved to Order level.
 * See: orderService.js - updateOrderShippingAddress()
 */

import { apiMethods } from "../api/axiosConfig";

/**
 * Buy shipping label(s) for shipment(s)
 * @param {Array} selections - Array of {shipmentId, rateId} objects
 * @returns {Promise} Label purchase results
 */
export const buyShippingLabels = async (selections) => {
  try {
    const response = await apiMethods.post('/shipments/buy-label', {
      selections,
    });
    return response;
  } catch (error) {
    console.error("Error buying shipping labels:", error);
    throw error;
  }
};
