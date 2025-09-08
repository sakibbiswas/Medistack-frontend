// src/pages/admin/PaymentsDashboard.tsx
import React, { useState, useEffect } from "react";
import {
  useGetPaymentsQuery,
  useDeletePaymentMutation,
} from "../../api/paymentApi";
import Sidebar from "../../components/Sidebar";
import Loader from "../../components/Loader";
import toast, { Toaster } from "react-hot-toast";
import { FaBars, FaTimes, FaTrash } from "react-icons/fa";

const PaymentsDashboard: React.FC = () => {
  const { data: payments = [], isLoading, error } = useGetPaymentsQuery();
  const [deletePayment] = useDeletePaymentMutation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile toggle
  const [localPayments, setLocalPayments] = useState<any[]>([]);

  // Initialize local state when payments load
  useEffect(() => {
    if (payments.length > 0) {
      setLocalPayments(payments);
    }
  }, [payments]);

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? "hidden" : "auto";
  }, [isSidebarOpen]);

  useEffect(() => {
    if (error) {
      toast.error("Failed to load payments");
    }
  }, [error]);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this payment?")) return;
    try {
      await deletePayment(id).unwrap();
      // Remove from local state instantly
      setLocalPayments((prev) => prev.filter((p) => p._id !== id));
      toast.success("✅ Payment deleted successfully");
    } catch (err) {
      toast.error("❌ Failed to delete payment");
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 relative overflow-hidden">
      {/* Toast Notification */}
      <Toaster
        position="top-right"
        toastOptions={{
          success: {
            style: {
              background: "#d1fae5",
              color: "#065f46",
              fontWeight: "600",
            },
          },
          error: {
            style: {
              background: "#fee2e2",
              color: "#991b1b",
              fontWeight: "600",
            },
          },
        }}
      />

      {/* Mobile Hamburger */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="text-2xl text-blue-600 p-2 rounded-md bg-white shadow-md"
        >
          {isSidebarOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
        </button>
      </div>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-30 z-40 transition-opacity md:hidden ${
          isSidebarOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsSidebarOpen(false)}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 w-64 h-full z-50 transform transition-transform duration-300 ease-in-out md:translate-x-0
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <Sidebar />
      </div>

      {/* Floating background shapes */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float1"></div>
      <div className="absolute top-1/4 -right-32 w-80 h-80 bg-teal-300 rounded-full mix-blend-multiply filter blur-2xl opacity-25 animate-float2"></div>
      <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float3"></div>

      {/* Main Content */}
      <main
        className={`flex-1 p-4 md:p-6 pt-20 relative z-10 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "md:ml-64" : "md:ml-64"
        }`}
      >
        <h1 className="text-2xl mt-8 md:text-3xl font-extrabold text-gray-800 mb-4 md:mb-6">
          Payments
        </h1>

        {isLoading ? (
          <Loader />
        ) : localPayments.length === 0 ? (
          <div className="text-gray-400 italic py-12 text-center text-base md:text-lg">
            No payments found
          </div>
        ) : (
          <>
            {/* Table on PC */}
            <div className="hidden md:block overflow-x-auto max-h-[80vh] overflow-y-auto scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-gray-200">
              <table className="w-full border border-gray-200 rounded-xl shadow-lg bg-white/70 backdrop-blur-md">
                <thead className="bg-gray-100 sticky top-0 z-20">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">
                      Patient
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">
                      Appointment
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">
                      Amount
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">
                      Method
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">
                      Transaction ID
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {localPayments.map((p) => (
                    <tr
                      key={p._id}
                      className="border-t hover:bg-gray-50 transition"
                    >
                      <td className="px-4 py-3 text-gray-700">
                        {(p.patientId as any)?.name || "N/A"}
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        {(p.appointmentId as any)?.date
                          ? new Date(
                              (p.appointmentId as any)?.date
                            ).toLocaleDateString()
                          : "-"}{" "}
                        {(p.appointmentId as any)?.time || ""}
                      </td>
                      <td className="px-4 py-3 font-semibold text-gray-800">
                        ${p.amount}
                      </td>
                      <td className="px-4 py-3 text-gray-600">{p.method}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-2 py-1 rounded-full text-sm font-medium ${
                            p.status === "Completed"
                              ? "bg-green-100 text-green-700"
                              : p.status === "Failed"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {p.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        {p.transactionId || "-"}
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => handleDelete(p._id)}
                          className="text-red-600 hover:text-red-800 flex items-center gap-1"
                        >
                          <FaTrash /> Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Card layout on Mobile */}
            <div className="grid gap-4 md:hidden">
              {localPayments.map((p) => (
                <div
                  key={p._id}
                  className="bg-white/80 backdrop-blur-md shadow-md rounded-xl p-4 border border-gray-200"
                >
                  <p className="text-sm text-gray-500">
                    <span className="font-semibold">Patient:</span>{" "}
                    {(p.patientId as any)?.name || "N/A"}
                  </p>
                  <p className="text-sm text-gray-500">
                    <span className="font-semibold">Appointment:</span>{" "}
                    {(p.appointmentId as any)?.date
                      ? new Date(
                          (p.appointmentId as any)?.date
                        ).toLocaleDateString()
                      : "-"}{" "}
                    {(p.appointmentId as any)?.time || ""}
                  </p>
                  <p className="text-sm text-gray-500">
                    <span className="font-semibold">Amount:</span> ${p.amount}
                  </p>
                  <p className="text-sm text-gray-500">
                    <span className="font-semibold">Method:</span> {p.method}
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold">Status:</span>{" "}
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        p.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : p.status === "Failed"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {p.status}
                    </span>
                  </p>
                  <p className="text-sm text-gray-500">
                    <span className="font-semibold">Txn ID:</span>{" "}
                    {p.transactionId || "-"}
                  </p>
                  <button
                    onClick={() => handleDelete(p._id)}
                    className="mt-3 w-full bg-red-500 text-white py-2 rounded-lg text-sm hover:bg-red-600 flex items-center justify-center gap-2"
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </main>

      {/* Floating animations */}
      <style>{`
        @keyframes float1 { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-20px); } }
        @keyframes float2 { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(30px); } }
        @keyframes float3 { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-25px); } }
        .animate-float1 { animation: float1 6s ease-in-out infinite; }
        .animate-float2 { animation: float2 8s ease-in-out infinite; }
        .animate-float3 { animation: float3 7s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default PaymentsDashboard;
