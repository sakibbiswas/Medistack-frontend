
// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export type AppointmentStatus = "Pending" | "Confirmed" | "Completed" | "Cancelled";

// export interface Appointment {
//   _id: string;
//   patientId: { _id: string; name: string; email: string } | string;
//   doctorId: { _id: string; name: string; specialization?: string } | string;
//   departmentId: { _id: string; name: string } | string;
//   date: string;
//   time: string;
//   status: AppointmentStatus;
//   createdAt?: string;
// }

// export interface CreateAppointmentDto {
//   doctorId: string;
//   departmentId: string;
//   date: string;
//   time: string;
// }

// const baseQuery = fetchBaseQuery({
//   baseUrl: "http://localhost:5000/api/v1/appointments",
//   prepareHeaders: (headers) => {
//     const token = localStorage.getItem("accessToken");
//     if (token) headers.set("Authorization", `Bearer ${token}`);
//     return headers;
//   },
// });

// export const appointmentApi = createApi({
//   reducerPath: "appointmentApi",
//   baseQuery,
//   tagTypes: ["Appointments"],
//   endpoints: (builder) => ({
//     createAppointment: builder.mutation<Appointment, CreateAppointmentDto>({
//       query: (body) => ({ url: "/", method: "POST", body }),
//       invalidatesTags: ["Appointments"],
//     }),
//     getAppointments: builder.query<Appointment[], void>({
//       query: () => "/",
//       transformResponse: (res: any) => res?.data || [],
//       providesTags: ["Appointments"],
//     }),
//     getAppointmentById: builder.query<Appointment, string>({
//       query: (id) => `/${id}`,
//       transformResponse: (res: any) => res?.data,
//       providesTags: (_result, _error, id) => [{ type: "Appointments", id }],
//     }),
//     updateAppointment: builder.mutation<Appointment, { id: string; data: Partial<Appointment> }>({
//       query: ({ id, data }) => ({ url: `/${id}`, method: "PUT", body: data }),
//       invalidatesTags: ["Appointments"],
//     }),
//     deleteAppointment: builder.mutation<{ success: boolean }, string>({
//       query: (id) => ({ url: `/${id}`, method: "DELETE" }),
//       invalidatesTags: ["Appointments"],
//     }),
//     getPatientAppointments: builder.query<Appointment[], void>({
//       query: () => "/patient",
//       transformResponse: (res: any) => res?.data || [],
//       providesTags: ["Appointments"],
//     }),
//     getDoctorAppointments: builder.query<Appointment[], void>({
//       query: () => "/doctor",
//       transformResponse: (res: any) => res?.data || [],
//       providesTags: ["Appointments"],
//     }),
//   }),
// });

// export const {
//   useCreateAppointmentMutation,
//   useGetAppointmentsQuery,
//   useGetAppointmentByIdQuery,
//   useUpdateAppointmentMutation,
//   useDeleteAppointmentMutation,
//   useGetPatientAppointmentsQuery,
//   useGetDoctorAppointmentsQuery,
// } = appointmentApi;
























// // src/services/appointmentApi.ts
// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export type AppointmentStatus = "Pending" | "Confirmed" | "Completed" | "Cancelled";

// export interface Appointment {
//   _id: string;
//   patientId: { _id: string; name: string; email: string } | string;
//   doctorId: { _id: string; name: string; specialization?: string } | string;
//   departmentId: { _id: string; name: string } | string;
//   date: string;
//   time: string;
//   status: AppointmentStatus;
//   createdAt?: string;
// }

// export interface CreateAppointmentDto {
//   doctorId: string;
//   departmentId: string;
//   date: string;
//   time: string;
// }

// // Use environment variable for base URL
// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// const baseQuery = fetchBaseQuery({
//   baseUrl: `${API_BASE_URL}/appointments`,
//   prepareHeaders: (headers) => {
//     const token = localStorage.getItem("accessToken");
//     if (token) headers.set("Authorization", `Bearer ${token}`);
//     return headers;
//   },
// });

// export const appointmentApi = createApi({
//   reducerPath: "appointmentApi",
//   baseQuery,
//   tagTypes: ["Appointments"],
//   endpoints: (builder) => ({
//     createAppointment: builder.mutation<Appointment, CreateAppointmentDto>({
//       query: (body) => ({ url: "/", method: "POST", body }),
//       invalidatesTags: ["Appointments"],
//     }),
//     getAppointments: builder.query<Appointment[], void>({
//       query: () => "/",
//       transformResponse: (res: any) => res?.data || [],
//       providesTags: ["Appointments"],
//     }),
//     getAppointmentById: builder.query<Appointment, string>({
//       query: (id) => `/${id}`,
//       transformResponse: (res: any) => res?.data,
//       providesTags: (_result, _error, id) => [{ type: "Appointments", id }],
//     }),
//     updateAppointment: builder.mutation<
//       Appointment,
//       { id: string; data: Partial<Appointment> }
//     >({
//       query: ({ id, data }) => ({ url: `/${id}`, method: "PUT", body: data }),
//       invalidatesTags: ["Appointments"],
//     }),
//     deleteAppointment: builder.mutation<{ success: boolean }, string>({
//       query: (id) => ({ url: `/${id}`, method: "DELETE" }),
//       invalidatesTags: ["Appointments"],
//     }),
//     getPatientAppointments: builder.query<Appointment[], void>({
//       query: () => "/patient",
//       transformResponse: (res: any) => res?.data || [],
//       providesTags: ["Appointments"],
//     }),
//     getDoctorAppointments: builder.query<Appointment[], void>({
//       query: () => "/doctor",
//       transformResponse: (res: any) => res?.data || [],
//       providesTags: ["Appointments"],
//     }),
//   }),
// });

// // Export hooks
// export const {
//   useCreateAppointmentMutation,
//   useGetAppointmentsQuery,
//   useGetAppointmentByIdQuery,
//   useUpdateAppointmentMutation,
//   useDeleteAppointmentMutation,
//   useGetPatientAppointmentsQuery,
//   useGetDoctorAppointmentsQuery,
// } = appointmentApi;









//payment type soho

// src/services/appointmentApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type AppointmentStatus = "Pending" | "Confirmed" | "Completed" | "Cancelled";
export type PaymentStatus = "Pending" | "Completed" | "Failed";

export interface Appointment {
  _id: string;
  patientId: { _id: string; name: string; email: string } | string;
  doctorId: { _id: string; name: string; specialization?: string } | string;
  departmentId: { _id: string; name: string } | string;
  date: string;
  time: string;
  status: AppointmentStatus;
  paymentStatus?: PaymentStatus;   // ✅ Added
  fee?: number;                    // ✅ Added (used in PaymentForm)
  paymentMethod?: string;          // (optional, if backend sends it)
  createdAt?: string;
}

export interface CreateAppointmentDto {
  doctorId: string;
  departmentId: string;
  date: string;
  time: string;
}

// Use environment variable for base URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const baseQuery = fetchBaseQuery({
  baseUrl: `${API_BASE_URL}/appointments`,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("accessToken");
    if (token) headers.set("Authorization", `Bearer ${token}`);
    return headers;
  },
});

export const appointmentApi = createApi({
  reducerPath: "appointmentApi",
  baseQuery,
  tagTypes: ["Appointments"],
  endpoints: (builder) => ({
    createAppointment: builder.mutation<Appointment, CreateAppointmentDto>({
      query: (body) => ({ url: "/", method: "POST", body }),
      invalidatesTags: ["Appointments"],
    }),
    getAppointments: builder.query<Appointment[], void>({
      query: () => "/",
      transformResponse: (res: any) => res?.data || [],
      providesTags: ["Appointments"],
    }),
    getAppointmentById: builder.query<Appointment, string>({
      query: (id) => `/${id}`,
      transformResponse: (res: any) => res?.data,
      providesTags: (_result, _error, id) => [{ type: "Appointments", id }],
    }),
    updateAppointment: builder.mutation<
      Appointment,
      { id: string; data: Partial<Appointment> }
    >({
      query: ({ id, data }) => ({ url: `/${id}`, method: "PUT", body: data }),
      invalidatesTags: ["Appointments"],
    }),
    deleteAppointment: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({ url: `/${id}`, method: "DELETE" }),
      invalidatesTags: ["Appointments"],
    }),
    getPatientAppointments: builder.query<Appointment[], void>({
      query: () => "/patient",
      transformResponse: (res: any) => res?.data || [],
      providesTags: ["Appointments"],
    }),
    getDoctorAppointments: builder.query<Appointment[], void>({
      query: () => "/doctor",
      transformResponse: (res: any) => res?.data || [],
      providesTags: ["Appointments"],
    }),
  }),
});

// Export hooks
export const {
  useCreateAppointmentMutation,
  useGetAppointmentsQuery,
  useGetAppointmentByIdQuery,
  useUpdateAppointmentMutation,
  useDeleteAppointmentMutation,
  useGetPatientAppointmentsQuery,
  useGetDoctorAppointmentsQuery,
} = appointmentApi;
