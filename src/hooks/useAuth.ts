import { useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import AuthApi from '../api/services/auth';
import { useDispatch } from 'react-redux';
import Session from '@/utils/Session';
import { clearAuth, setAuth } from '@/store/slices/authSlice';
import { setUser, clearUser } from '@/store/slices/userSlice';
import { toast } from 'sonner';

export const useAuth = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: AuthApi.login,
    onSuccess: (response) => {
      const data = response.data;

      Session.setCookie('token', data.data.token);
      if (data.data.refreshToken) Session.setCookie('refreshToken', data.data.refreshToken);
      dispatch(setAuth({ token: data.data.token, refreshToken: data.data.refreshToken }));
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: AuthApi.logout,
    onSettled: () => {
      Session.clearAllCookies();
      Session.removeAll();
      dispatch(clearAuth());
      dispatch(clearUser());
      queryClient.clear();
    },
  });

  const profileQuery = useQuery({
    queryKey: ['profile'],
    queryFn: AuthApi.getProfile,
    enabled: !!Session.getCookie('token'),
    select: (response) => response.data.data,
  });

  useEffect(() => {
    if (profileQuery.data) {
      dispatch(setUser(profileQuery.data.user));
      Session.set('user', profileQuery.data.user);

      // Ensure auth state is set when profile is loaded
      const token = Session.getCookie('token');
      const refreshToken = Session.getCookie('refreshToken');
      if (token) {
        dispatch(setAuth({ token, refreshToken }));
      }
    }
  }, [profileQuery.data, dispatch]);

  const registerMutation = useMutation({
    mutationFn: AuthApi.register,
    onSuccess: (response) => {
      const data = response.data;

      Session.setCookie('token', data.data.token);
      if (data.data.refreshToken) Session.setCookie('refreshToken', data.data.refreshToken);
      dispatch(setAuth({ token: data.data.token, refreshToken: data.data.refreshToken }));
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });

  const updateProfileMutation = useMutation({
    mutationFn: AuthApi.updateProfile,
    onSuccess: (response) => {
      toast.success("Profile updated successfully!");
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      // Optional: update cache immediately for instant UI feedback
      queryClient.setQueryData(['profile'], (old: any) => ({
        ...old,
        data: {
          ...old.data,
          user: response.data.data.user, // adjust based on your API response shape
        },
      }));
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to update profile");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });

  return {
    login: loginMutation,
    logout: logoutMutation,
    profile: profileQuery,
    register: registerMutation,
    updateProfile: updateProfileMutation
  };
};