
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface User {
  _id: string;
  name: string;
  email: string;
  role: "Admin" | "Patient";
  createdAt?: string;
}

export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
  role?: "Admin" | "Patient";
}
// Use environment variable for base URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const baseQuery = fetchBaseQuery({
   baseUrl: `${API_BASE_URL}/users`,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("accessToken");
    if (token) headers.set("Authorization", `Bearer ${token}`);
    return headers;
  },
});

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery,
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => "/",
      transformResponse: (res: any) => res.data || res,
      providesTags: ["Users"],
    }),
    getUserById: builder.query<User, string>({
      query: (id) => `/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Users", id }],
    }),
    createUser: builder.mutation<User, CreateUserDto>({
      query: (body) => ({ url: "/", method: "POST", body }),
      invalidatesTags: ["Users"],
    }),
    updateUser: builder.mutation<User, { id: string; data: Partial<CreateUserDto> }>({
      query: ({ id, data }) => ({ url: `/${id}`, method: "PUT", body: data }),
      invalidatesTags: ["Users"],
    }),
    deleteUser: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({ url: `/${id}`, method: "DELETE" }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;
