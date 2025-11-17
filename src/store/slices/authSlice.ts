import { isLoggedIn } from '@/utils/IsLoggedIn';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<{ token: string }>) => {
      state.isAuthenticated = isLoggedIn();
      state.token = action.payload.token;
    },
    clearAuth: (state) => {
      state.isAuthenticated = false;
      state.token = null;
    },
  },
});

export const { setAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;
