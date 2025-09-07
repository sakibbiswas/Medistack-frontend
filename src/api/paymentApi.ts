
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Payment {
  _id: string;
  appointmentId: string | { _id: string; date?: string };
  patientId: string | { _id: string; name?: string; email?: string };
  amount: number;
  method: "Cash" | "Online";
  status: "Pending" | "Completed" | "Failed";
  createdAt?: string;
}

export interface CreatePaymentDto {
  appointmentId: string;
  patientId: string;
  amount: number;
  method: "Cash" | "Online";
}

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api/v1/payments",
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
    createPayment: builder.mutation<Payment, CreatePaymentDto>({
      query: (body) => ({ url: "/", method: "POST", body }),
      invalidatesTags: ["Payments"],
    }),
    getPayments: builder.query<Payment[], void>({
      query: () => "/",
      transformResponse: (res: any) => res.data || [],
      providesTags: ["Payments"],
    }),
    getPaymentById: builder.query<Payment, string>({
      query: (id) => `/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Payments", id }],
    }),
    updatePayment: builder.mutation<Payment, { id: string; data: Partial<Payment> }>({
      query: ({ id, data }) => ({ url: `/${id}`, method: "PUT", body: data }),
      invalidatesTags: ["Payments"],
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
  useGetPaymentByIdQuery,
  useUpdatePaymentMutation,
  useDeletePaymentMutation,
} = paymentApi;
