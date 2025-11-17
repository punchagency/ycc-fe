import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setUser, updateUser } from '../store/slices/userSlice';

export const useReduxUser = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);

  const updateUserData = useCallback((userData: any) => {
    dispatch(setUser(userData));
  }, [dispatch]);

  const patchUser = useCallback((partialData: any) => {
    dispatch(updateUser(partialData));
  }, [dispatch]);


  return { user, updateUserData, patchUser };
};
