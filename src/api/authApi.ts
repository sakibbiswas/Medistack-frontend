
// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { setCredentials } from "../features/auth/authSlice";

// // Types
// export interface AuthRequest {
//   email: string;
//   password: string;
// }

// export interface RegisterRequest {
//   name: string;
//   email: string;
//   password: string;
//   role?: "Admin" | "Doctor" | "Patient";
// }

// export interface User {
//   _id: string;
//   name: string;
//   email: string;
//   role: "Admin" | "Doctor" | "Patient";
// }

// export interface AuthData {
//   token: string;
//   refreshToken?: string;
//   user: User;
// }

// export interface ApiResponse<T> {
//   success: boolean;
//   message: string;
//   data: T;
// }

// // API
// export const authApi = createApi({
//   reducerPath: "authApi",
//   baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/v1/auth" }),
//   endpoints: (builder) => ({
//     login: builder.mutation<ApiResponse<AuthData>, AuthRequest>({
//       query: (credentials) => ({
//         url: "/login",
//         method: "POST",
//         body: credentials,
//       }),
//       async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
//         try {
//           const { data } = await queryFulfilled;
//           // ✅ Ensure backend returned user._id
//           if (data?.data?.token && data?.data?.user?._id) {
//             dispatch(setCredentials(data.data));
//           } else {
//             console.error("❌ Backend login response missing user._id");
//           }
//         } catch (err) {
//           console.error("Login mutation failed:", err);
//         }
//       },
//     }),
//     register: builder.mutation<ApiResponse<AuthData>, RegisterRequest>({
//       query: (body) => ({
//         url: "/register",
//         method: "POST",
//         body,
//       }),
//       async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
//         try {
//           const { data } = await queryFulfilled;
//           if (data?.data?.token && data?.data?.user?._id) {
//             // Optional: auto-login after registration
//             dispatch(setCredentials(data.data));
//           } else {
//             console.warn("⚠️ Backend register response missing user._id");
//           }
//         } catch (err) {
//           console.error("Register mutation failed:", err);
//         }
//       },
//     }),
//   }),
// });

// export const { useLoginMutation, useRegisterMutation } = authApi;











// src/services/authApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials } from "../features/auth/authSlice";

// Types
export interface AuthRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  role?: "Admin" | "Doctor" | "Patient";
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role: "Admin" | "Doctor" | "Patient";
}

export interface AuthData {
  token: string;
  refreshToken?: string;
  user: User;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

// Use environment variable for base URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_BASE_URL}/auth`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("accessToken");
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<ApiResponse<AuthData>, AuthRequest>({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          if (data?.data?.token && data?.data?.user?._id) {
            dispatch(setCredentials(data.data));
          } else {
            console.error("❌ Backend login response missing user._id");
          }
        } catch (err) {
          console.error("Login mutation failed:", err);
        }
      },
    }),
    register: builder.mutation<ApiResponse<AuthData>, RegisterRequest>({
      query: (body) => ({
        url: "/register",
        method: "POST",
        body,
      }),
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          if (data?.data?.token && data?.data?.user?._id) {
            dispatch(setCredentials(data.data));
          } else {
            console.warn("⚠️ Backend register response missing user._id");
          }
        } catch (err) {
          console.error("Register mutation failed:", err);
        }
      },
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
