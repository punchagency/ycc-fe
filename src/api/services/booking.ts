/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "../client";
import API_ENDPOINTS from "../../constants/api_endpoints";

export const BookingApi = {
    createBooking: (data: any) => api.post(API_ENDPOINTS.booking.createBooking, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }),
    getBookings: (params: {
        status?: string;
        paymentStatus?: string;
        startDate?: string;
        endDate?: string;
        page?: number;
        limit?: number;
        sortBy?: string;
        sortOrder?: string;
    }) => api.get(API_ENDPOINTS.booking.getBookings, { params }),
    getBookingById: (id: string) => api.get(API_ENDPOINTS.booking.getBookingById.replace(':id', id)),
    updateBookingStatus: (id: string, data: any) => api.put(API_ENDPOINTS.booking.updateBookingStatus.replace(':id', id), data),
    confirmBooking: (token: string) => api.post(API_ENDPOINTS.booking.confirmBooking.replace(':token', token))
};

export default BookingApi;
