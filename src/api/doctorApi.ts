
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Department {
  _id: string;
  name: string;
}

export interface Doctor {
  _id: string;
  name: string;
  email: string;
  specialization: string;
  departmentId?: string | Department;
  availableSlots: string[];
  createdAt?: string;
}

export interface CreateDoctorDto {
  name: string;
  email: string;
  password: string;
  specialization: string;
  departmentId?: string;
  availableSlots: string[];
}
// Use environment variable for base URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; 

const baseQuery = fetchBaseQuery({
   baseUrl: `${API_BASE_URL}/doctors`,
  // baseUrl: "http://localhost:5000/api/v1/doctors",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("accessToken"); // ✅ use token
    if (token) headers.set("Authorization", `Bearer ${token}`);
    return headers;
  },
});

// ✅ Safe normalize function
const normalizeDoctor = (d: any): Doctor => ({
  _id: d?._id || "",
  name: d?.name || "",
  email: d?.email || "",
  specialization: d?.specialization || "",
  departmentId: d?.departmentId || undefined,
  availableSlots: Array.isArray(d?.availableSlots) ? d.availableSlots : [],
  createdAt: d?.createdAt || undefined,
});

export const doctorApi = createApi({
  reducerPath: "doctorApi",
  baseQuery,
  tagTypes: ["Doctors"],
  endpoints: (builder) => ({
    getDoctors: builder.query<Doctor[], void>({
      query: () => "/",
      transformResponse: (res: any) =>
        (res?.data || []).map((doc: any) => normalizeDoctor(doc)),
      providesTags: ["Doctors"],
    }),
    getDoctorById: builder.query<Doctor, string>({
      query: (id) => `/${id}`,
      transformResponse: (res: any) => normalizeDoctor(res?.data),
      providesTags: (_result, _error, id) => [{ type: "Doctors", id }],
    }),
    createDoctor: builder.mutation<Doctor, CreateDoctorDto>({
      query: (body) => ({ url: "/", method: "POST", body }),
      transformResponse: (res: any) => normalizeDoctor(res?.data),
      invalidatesTags: ["Doctors"],
    }),
    updateDoctor: builder.mutation<Doctor, { id: string; data: Partial<CreateDoctorDto> }>({
      query: ({ id, data }) => ({ url: `/${id}`, method: "PUT", body: data }),
      transformResponse: (res: any) => normalizeDoctor(res?.data),
      invalidatesTags: ["Doctors"],
    }),
    deleteDoctor: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({ url: `/${id}`, method: "DELETE" }),
      invalidatesTags: ["Doctors"],
    }),
    updateAvailability: builder.mutation<Doctor, { id: string; slots: string[] }>({
      query: ({ id, slots }) => ({
        url: `/${id}/availability`,
        method: "PUT",
        body: { slots },
      }),
      transformResponse: (res: any) => normalizeDoctor(res?.data),
      invalidatesTags: ["Doctors"],
    }),
  }),
});

export const {
  useGetDoctorsQuery,
  useGetDoctorByIdQuery,
  useCreateDoctorMutation,
  useUpdateDoctorMutation,
  useDeleteDoctorMutation,
  useUpdateAvailabilityMutation,
} = doctorApi;
