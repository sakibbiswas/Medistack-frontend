// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export interface Payment {
//   _id: string;
//   appointmentId: string | { _id: string; date: string; time: string };
//   patientId: string | { _id: string; name: string; email: string };
//   amount: number;
//   method: "Stripe" | "Cash" | "Other";
//   status: "Pending" | "Completed" | "Failed";
//   transactionId?: string;
// }

// export interface CreatePaymentDto {
//   appointmentId: string;
//   amount: number;
//   method: "Stripe" | "Cash" | "Other";
// }

// // Stripe response type
// export interface StripeSessionResponse {
//   url: string;
//   sessionId: string;
// }

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// const baseQuery = fetchBaseQuery({
//   baseUrl: `${API_BASE_URL}/payments`,
//   prepareHeaders: (headers) => {
//     const token = localStorage.getItem("accessToken");
//     if (token) headers.set("Authorization", `Bearer ${token}`);
//     return headers;
//   },
// });

// export const paymentApi = createApi({
//   reducerPath: "paymentApi",
//   baseQuery,
//   tagTypes: ["Payments"],
//   endpoints: (builder) => ({
//     // 👇 mutation response এখন union type
//     createPayment: builder.mutation<Payment | StripeSessionResponse, CreatePaymentDto>({
//       query: (body) => ({ url: "/", method: "POST", body }),
//       invalidatesTags: ["Payments"],
//     }),
//     getPayments: builder.query<Payment[], void>({
//       query: () => "/",
//       transformResponse: (res: any) => res?.data || [],
//       providesTags: ["Payments"],
//     }),
//   }),
// });

// export const { useCreatePaymentMutation, useGetPaymentsQuery } = paymentApi;










import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Payment {
  _id: string;
  appointmentId: string | { _id: string; date: string; time: string };
  patientId: string | { _id: string; name: string; email: string };
  amount: number;
  method: "Stripe" | "Cash" | "Other";
  status: "Pending" | "Completed" | "Failed";
  transactionId?: string;
}

export interface CreatePaymentDto {
  appointmentId: string;
  amount: number;
  method: "Stripe" | "Cash" | "Other";
}

export interface StripeSessionResponse {
  url: string;
  sessionId: string;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const baseQuery = fetchBaseQuery({
  baseUrl: `${API_BASE_URL}/payments`,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("accessToken");
    if (token) headers.set("Authorization", `Bearer ${token}`);
    return headers;
  },
});

export const paymentApi = createApi({
  reducerPath: "paymentApi",
  baseQuery,
  tagTypes: ["Payments"],
  endpoints: (builder) => ({
    createPayment: builder.mutation<Payment | StripeSessionResponse, CreatePaymentDto>({
      query: (body) => ({ url: "/", method: "POST", body }),
      invalidatesTags: ["Payments"],
    }),
    getPayments: builder.query<Payment[], void>({
      query: () => "/",
      transformResponse: (res: any) => res?.data || [],
      providesTags: ["Payments"],
    }),
    deletePayment: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({ url: `/${id}`, method: "DELETE" }),
      invalidatesTags: ["Payments"],
    }),
  }),
});

export const {
  useCreatePaymentMutation,
  useGetPaymentsQuery,
  useDeletePaymentMutation,
} = paymentApi;
