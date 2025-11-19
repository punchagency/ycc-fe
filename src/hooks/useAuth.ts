import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import AuthApi from '../api/services/auth';
import { useDispatch } from 'react-redux';
import Session from '@/utils/Session';
import { clearAuth, setAuth } from '@/store/slices/authSlice';

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
      queryClient.clear();
    },
  });

  const profileQuery = useQuery({
    queryKey: ['profile'],
    queryFn: AuthApi.getProfile,
    enabled: !!Session.getCookie('token'),
  });

  const registerMutation = useMutation({
    mutationFn: AuthApi.register,
    onSuccess: () => {
      // Registration does not return tokens; activation/login will set auth.
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });

  return {
    login: loginMutation,
    logout: logoutMutation,
    profile: profileQuery,
    register: registerMutation
  };
};