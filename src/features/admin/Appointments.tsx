
//Responsive for mobile and pc 
// src/pages/admin/Appointments.tsx
import React, { useState, useEffect } from "react";
import {
  useGetAppointmentsQuery,
  useUpdateAppointmentMutation,
  useDeleteAppointmentMutation,
} from "../../api/appointmentApi";
import type { AppointmentStatus } from "../../api/appointmentApi";
import Sidebar from "../../components/Sidebar";
import Loader from "../../components/Loader";
import toast, { Toaster } from "react-hot-toast";
import { FaCheckCircle, FaTimesCircle, FaClock, FaBars, FaTimes } from "react-icons/fa";

const statusColors: Record<AppointmentStatus, string> = {
  Pending: "bg-yellow-100 text-yellow-800",
  Confirmed: "bg-blue-100 text-blue-800",
  Completed: "bg-green-100 text-green-800",
  Cancelled: "bg-red-100 text-red-800",
};

const Appointments: React.FC = () => {
  const { data: appointments, isLoading } = useGetAppointmentsQuery();
  const [updateAppointment] = useUpdateAppointmentMutation();
  const [deleteAppointment] = useDeleteAppointmentMutation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile toggle

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? "hidden" : "auto";
  }, [isSidebarOpen]);

  const changeStatus = async (id: string, status: AppointmentStatus) => {
    try {
      await updateAppointment({ id, data: { status } }).unwrap();
      toast.success(`Appointment marked as ${status}`);
    } catch (err: any) {
      toast.error(err?.data?.message || err?.message || "Update failed");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Cancel this appointment?")) return;
    try {
      await deleteAppointment(id).unwrap();
      toast.success("Appointment canceled successfully");
    } catch (err: any) {
      toast.error(err?.data?.message || err?.message || "Failed to cancel appointment");
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 relative overflow-hidden">

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
          isSidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
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
      <main className={`flex-1 p-6 pt-20 relative z-10 transition-all duration-300 ease-in-out ${isSidebarOpen ? "md:ml-64" : "md:ml-64"}`}>
        <Toaster position="top-right" reverseOrder={false} />
        <h1 className="text-3xl font-extrabold text-gray-800 mb-6">Appointments</h1>

        {isLoading ? (
          <Loader />
        ) : appointments?.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-h-[80vh] overflow-y-auto scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-gray-200">
            {appointments.map((a) => (
              <div
                key={a._id}
                className="p-6 rounded-2xl shadow-lg hover:shadow-2xl bg-white/70 backdrop-blur-md transition relative border border-gray-200"
              >
                {/* Status badge */}
                <span
                  className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-semibold ${statusColors[a.status ?? "Pending"]}`}
                >
                  {a.status ?? "Pending"}
                </span>

                {/* Patient & Doctor Info */}
                <div className="mb-4">
                  <h2 className="text-lg font-bold text-gray-700">
                    Patient:{" "}
                    <span className="font-normal text-gray-600">
                      {typeof a.patientId === "string" ? a.patientId : a.patientId?.name ?? "N/A"}
                    </span>
                  </h2>
                  <h2 className="text-lg font-bold text-gray-700">
                    Doctor:{" "}
                    <span className="font-normal text-gray-600">
                      {typeof a.doctorId === "string" ? a.doctorId : a.doctorId?.name ?? "N/A"}
                    </span>
                  </h2>
                </div>

                {/* Appointment Date */}
                <div className="flex items-center text-gray-600 mb-4">
                  <FaClock className="mr-2 text-gray-500" />
                  {a.date ? new Date(a.date).toLocaleString() : "N/A"}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 mt-4">
                  <button
                    className="flex-1 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition flex items-center justify-center gap-2"
                    onClick={() => changeStatus(a._id, "Confirmed")}
                  >
                    <FaCheckCircle /> Confirm
                  </button>
                  <button
                    className="flex-1 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition flex items-center justify-center gap-2"
                    onClick={() => changeStatus(a._id, "Completed")}
                  >
                    <FaCheckCircle /> Complete
                  </button>
                  <button
                    className="flex-1 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition flex items-center justify-center gap-2"
                    onClick={() => handleDelete(a._id)}
                  >
                    <FaTimesCircle /> Cancel
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-gray-400 italic py-12 text-center text-lg">No appointments found</div>
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

export default Appointments;
