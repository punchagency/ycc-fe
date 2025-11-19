import { useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import AuthApi from '../api/services/auth';
import { useDispatch } from 'react-redux';
import Session from '@/utils/Session';
import { clearAuth, setAuth } from '@/store/slices/authSlice';
import { setUser, clearUser } from '@/store/slices/userSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  /* ------------------ LOGIN ------------------ */
  const loginMutation = useMutation({
    mutationFn: AuthApi.login,
    onSuccess: (response) => {
      const data = response.data.data;

      // Save tokens
      Session.setCookie('token', data.token);
      if (data.refreshToken) {
        Session.setCookie('refreshToken', data.refreshToken);
      }

      dispatch(setAuth({ token: data.token, refreshToken: data.refreshToken }));
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });

  /* ------------------ LOGOUT ------------------ */
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

  /* ------------------ PROFILE QUERY ------------------ */
  const profileQuery = useQuery({
    queryKey: ['profile'],
    queryFn: AuthApi.getProfile,
    enabled: !!Session.getCookie('token'),
    select: (response) => response.data.data,
    onSuccess: (profileData) => {
      // Profile response also returns token + refreshToken (as per your previous logic)
      const { token, refreshToken, user } = profileData;

      // Update token if backend rotated it
      if (token) Session.setCookie('token', token);
      if (refreshToken) Session.setCookie('refreshToken', refreshToken);

      dispatch(setAuth({ token, refreshToken }));
    },
  });

  /* Sync Redux + Session with profile data */
  useEffect(() => {
    if (profileQuery.data) {
      const { user } = profileQuery.data;

      dispatch(setUser(user));
      Session.set('user', user);

      const token = Session.getCookie('token');
      const refreshToken = Session.getCookie('refreshToken');

      if (token) {
        dispatch(setAuth({ token, refreshToken }));
      }
    }
  }, [profileQuery.data, dispatch]);

  /* ------------------ REGISTER ------------------ */
  const registerMutation = useMutation({
    mutationFn: AuthApi.register,
    onSuccess: () => {
      /**
       * IMPORTANT:
       * Registration DOES NOT return token or refreshToken.
       * So DO NOT store cookies.
       * User must activate account & login separately.
       */

      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });

  return {
    login: loginMutation,
    logout: logoutMutation,
    profile: profileQuery,
    register: registerMutation,
  };
};
