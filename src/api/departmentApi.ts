
// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export interface Department {
//   _id: string;
//   name: string;
//   description?: string;
//   createdAt?: string;
// }

// export interface Doctor {
//   _id: string;
//   name: string;
//   specialization?: string;
//   departmentId: string;
//   availableSlots: string[]; 
// }

// const baseQuery = fetchBaseQuery({
//   baseUrl: "http://localhost:5000/api/v1",
//   prepareHeaders: (headers) => {
//     const token = localStorage.getItem("accessToken");
//     if (token) headers.set("Authorization", `Bearer ${token}`);
//     return headers;
//   },
// });

// export const departmentApi = createApi({
//   reducerPath: "departmentApi",
//   baseQuery,
//   tagTypes: ["Departments", "Doctors"],
//   endpoints: (builder) => ({
//     getDepartments: builder.query<Department[], void>({
//       query: () => "/departments",
//       transformResponse: (res: any) => res.data || [],
//       providesTags: ["Departments"],
//     }),
//     getDepartmentById: builder.query<Department, string>({
//       query: (id) => `/departments/${id}`,
//       providesTags: (_result, _error, id) => [{ type: "Departments", id }],
//     }),
//     createDepartment: builder.mutation<Department, { name: string; description?: string }>({
//       query: (body) => ({ url: "/departments", method: "POST", body }),
//       invalidatesTags: ["Departments"],
//     }),
//     updateDepartment: builder.mutation<Department, { id: string; data: Partial<Department> }>({
//       query: ({ id, data }) => ({ url: `/departments/${id}`, method: "PUT", body: data }),
//       invalidatesTags: ["Departments"],
//     }),
//     deleteDepartment: builder.mutation<{ success: boolean }, string>({
//       query: (id) => ({ url: `/departments/${id}`, method: "DELETE" }),
//       invalidatesTags: ["Departments"],
//     }),
//     getDoctorsByDepartment: builder.query<Doctor[], string>({
//       query: (departmentId) => `/departments/${departmentId}/doctors`,
//       transformResponse: (res: any) => res.data || [],
//       providesTags: (_result, _error, id) => [{ type: "Doctors", id }],
//     }),
//   }),
// });

// export const {
//   useGetDepartmentsQuery,
//   useGetDepartmentByIdQuery,
//   useCreateDepartmentMutation,
//   useUpdateDepartmentMutation,
//   useDeleteDepartmentMutation,
//   useGetDoctorsByDepartmentQuery,
// } = departmentApi;



















// src/services/departmentApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Types
export interface Department {
  _id: string;
  name: string;
  description?: string;
  createdAt?: string;
}

export interface Doctor {
  _id: string;
  name: string;
  specialization?: string;
  departmentId: string;
  availableSlots: string[];
}

// Use environment variable for base URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("accessToken");
    if (token) headers.set("Authorization", `Bearer ${token}`);
    return headers;
  },
});

export const departmentApi = createApi({
  reducerPath: "departmentApi",
  baseQuery,
  tagTypes: ["Departments", "Doctors"],
  endpoints: (builder) => ({
    getDepartments: builder.query<Department[], void>({
      query: () => "/departments",
      transformResponse: (res: any) => res.data || [],
      providesTags: ["Departments"],
    }),
    getDepartmentById: builder.query<Department, string>({
      query: (id) => `/departments/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Departments", id }],
    }),
    createDepartment: builder.mutation<Department, { name: string; description?: string }>({
      query: (body) => ({ url: "/departments", method: "POST", body }),
      invalidatesTags: ["Departments"],
    }),
    updateDepartment: builder.mutation<Department, { id: string; data: Partial<Department> }>({
      query: ({ id, data }) => ({ url: `/departments/${id}`, method: "PUT", body: data }),
      invalidatesTags: ["Departments"],
    }),
    deleteDepartment: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({ url: `/departments/${id}`, method: "DELETE" }),
      invalidatesTags: ["Departments"],
    }),
    getDoctorsByDepartment: builder.query<Doctor[], string>({
      query: (departmentId) => `/departments/${departmentId}/doctors`,
      transformResponse: (res: any) => res.data || [],
      providesTags: (_result, _error, id) => [{ type: "Doctors", id }],
    }),
  }),
});

export const {
  useGetDepartmentsQuery,
  useGetDepartmentByIdQuery,
  useCreateDepartmentMutation,
  useUpdateDepartmentMutation,
  useDeleteDepartmentMutation,
  useGetDoctorsByDepartmentQuery,
} = departmentApi;
