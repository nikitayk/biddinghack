// store/authSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  id: string;
  username: string;
  email: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    startLoading(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action: PayloadAction<{ user: User; token: string }>) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.loading = false;
      state.error = null;
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.loading = false;
      state.error = null;
    },
    setUser(state, action: PayloadAction<User | null>) {
      state.user = action.payload;
    },
    setToken(state, action: PayloadAction<string | null>) {
      state.token = action.payload;
    },
  },
});

export const {
  startLoading,
  loginSuccess,
  loginFailure,
  logout,
  setUser,
  setToken,
} = authSlice.actions;

export default authSlice.reducer;
