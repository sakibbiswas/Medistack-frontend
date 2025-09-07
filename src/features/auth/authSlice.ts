
import { createSlice } from "@reduxjs/toolkit";
import type {  PayloadAction } from "@reduxjs/toolkit";
interface User {
  _id: string;
  name: string;
  email: string;
  role: "Admin" | "Doctor" | "Patient";
}

interface AuthState {
  token: string | null;
  refreshToken: string | null;
  user: User | null;
}

const initialState: AuthState = {
  token: localStorage.getItem("accessToken"),
  refreshToken: localStorage.getItem("refreshToken"),
  user: JSON.parse(localStorage.getItem("user") || "null"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{
        token: string;
        refreshToken?: string | null;
        user: User;
      }>
    ) => {
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken || null;
      state.user = action.payload.user;

      localStorage.setItem("accessToken", action.payload.token);
      if (action.payload.refreshToken) {
        localStorage.setItem("refreshToken", action.payload.refreshToken);
      }
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    logout: (state) => {
      state.token = null;
      state.refreshToken = null;
      state.user = null;

      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
