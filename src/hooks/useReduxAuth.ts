import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setAuth, clearAuth } from '../store/slices/authSlice';
import { setUser, clearUser } from '../store/slices/userSlice';
import Session from '../utils/Session';
import { setSentryUser } from '../config/sentry';
import type { IUser } from '@/types/auth.type';

export const useReduxAuth = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, token } = useAppSelector((state) => state.auth);
  const { user } = useAppSelector((state) => state.user);

  const login = useCallback((userData: IUser, authToken: string) => {
    dispatch(setAuth({ token: authToken }));
    dispatch(setUser(userData));
    Session.setCookie('token', authToken);
    Session.set('user', userData);
    if (import.meta.env.PROD && userData?._id && userData?.email) {
      setSentryUser({
        id: userData._id,
        email: userData.email,
        username: userData.firstName,
      });
    }
  }, [dispatch]);

  const logout = useCallback(() => {
    dispatch(clearAuth());
    dispatch(clearUser());
    Session.clearAllCookies();
    Session.removeAll();
  }, [dispatch]);

  return { isAuthenticated, token, user, login, logout };
};
