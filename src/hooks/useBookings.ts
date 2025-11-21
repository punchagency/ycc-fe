import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ServiceApi } from '../api/services/service';
import { BookingApi } from '../api/services/booking';

// Services Hook
export const useCrewServices = (params: {
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  limit?: number;
  sortBy?: string;
}) => {
  return useQuery({
    queryKey: ['crew-services', params],
    queryFn: async () => {
      const response = await ServiceApi.getCrewServices(params);
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Bookings Hook
export const useBookings = (params: {
  status?: string;
  paymentStatus?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: string;
}) => {
  return useQuery({
    queryKey: ['bookings', params],
    queryFn: async () => {
      const response = await BookingApi.getBookings(params);
      return response.data;
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

// Create Booking Mutation
export const useCreateBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => BookingApi.createBooking(data),
    onSuccess: () => {
      // Invalidate bookings query to refetch
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
  });
};

// Update Booking Status Mutation
export const useUpdateBookingStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => 
      BookingApi.updateBookingStatus(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
  });
};

// Get Booking By ID
export const useBookingById = (id?: string) => {
  return useQuery({
    queryKey: ['booking', id],
    queryFn: async () => {
      if (!id) throw new Error('Booking ID is required');
      const response = await BookingApi.getBookingById(id);
      return response.data;
    },
    enabled: !!id,
  });
};
