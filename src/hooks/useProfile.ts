import { useMutation, useQueryClient } from '@tanstack/react-query';
import AuthApi from '../api/services/auth';
import { useReduxUser } from './useReduxUser';
import Session from '@/utils/Session';

interface UpdateProfileData {
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  nationality?: string;
  address?: string;
}

interface ChangePasswordData {
  oldPassword: string;
  newPassword: string;
}

export const useProfile = () => {
  const queryClient = useQueryClient();
  const { patchUser } = useReduxUser();

  const updateProfileMutation = useMutation({
    mutationFn: (data: UpdateProfileData) => AuthApi.updateProfile(data),
    onSuccess: (response) => {
      const updatedUser = response.data.data.user;
      
      // Update Redux store with new user data
      patchUser(updatedUser);
      
      // Update session storage
      Session.set('user', updatedUser);
      
      // Invalidate profile query to refetch
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });

  const updateDistributorProfileMutation = useMutation({
    mutationFn: AuthApi.updateDistributorProfile,
    onSuccess: (response) => {
      const updatedUser = response.data.data.user;
      const updatedBusiness = response.data.data.business;
      
      // Update Redux store
      patchUser(updatedUser);
      
      // Update session storage
      Session.set('user', updatedUser);
      
      // Store business information
      if (updatedBusiness) {
        Session.set('business', updatedBusiness);
      }
      
      // Invalidate profile query to refetch
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });

  const changePasswordMutation = useMutation({
    mutationFn: (data: ChangePasswordData) => AuthApi.changePassword(data),
  });

  return {
    updateProfile: updateProfileMutation,
    updateDistributorProfile: updateDistributorProfileMutation,
    changePassword: changePasswordMutation,
  };
};
