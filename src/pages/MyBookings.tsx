import React from "react";
import { getUser } from "../utils/auth";
import { useGetPatientAppointmentsQuery } from "../api/appointmentApi";
import Loader from "../components/Loader";

const MyBookings: React.FC = () => {
  const user = getUser();
  const hasSidebar = !!user && user.role === "Patient"; // Sidebar only for logged-in patients

  // Access check
  if (!hasSidebar) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center px-6 bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 relative overflow-hidden ${
          hasSidebar ? "ml-64 pt-24" : "pt-12"
        }`}
      >
        {/* Floating shapes */}
        <div className="absolute top-0 left-0 w-48 h-48 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float1"></div>
        <div className="absolute top-1/3 right-0 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-float2"></div>
        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float3"></div>

        <div className="relative z-10 bg-white shadow-lg rounded-2xl p-10 max-w-lg w-full text-center transform transition hover:-translate-y-1 hover:shadow-2xl">
          <h2 className="text-3xl font-bold mb-4 text-red-600">Access Denied</h2>
          <p className="text-gray-700 mb-6">
            You must be logged in as a <span className="font-semibold text-blue-600">Patient</span> to view your bookings.
          </p>
        </div>
      </div>
    );
  }

  const { data: appointments, isLoading } = useGetPatientAppointmentsQuery(user._id);

  if (isLoading) return <Loader />;

  if (!appointments?.length) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center px-6 bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 relative overflow-hidden ${
          hasSidebar ? "ml-64 pt-24" : "pt-12"
        }`}
      >
        <div className="relative z-10 bg-white shadow-lg rounded-2xl p-10 max-w-lg w-full text-center transform transition hover:-translate-y-1 hover:shadow-2xl">
          <h1 className="text-3xl font-bold mb-4 text-blue-700">My Bookings</h1>
          <p className="text-gray-600">You have no appointments booked yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen px-6 bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 relative overflow-hidden ${
        hasSidebar ? "ml-64 pt-24" : "pt-12"
      }`}
    >
      {/* Floating shapes */}
      <div className="absolute top-0 left-0 w-48 h-48 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float1"></div>
      <div className="absolute top-1/3 right-0 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-float2"></div>
      <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float3"></div>

      <div className="relative z-10 max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8 transform transition hover:-translate-y-1 hover:shadow-2xl">
        <h1 className="text-3xl font-bold mb-6 text-blue-700 text-center">My Bookings</h1>

        <table className="w-full border-collapse rounded overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-3 text-left text-gray-700">Doctor</th>
              <th className="border p-3 text-left text-gray-700">Date</th>
              <th className="border p-3 text-left text-gray-700">Time</th>
              <th className="border p-3 text-left text-gray-700">Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appt) => (
              <tr key={appt._id} className="hover:bg-gray-50 transition">
                <td className="border p-3">{(appt.doctorId as any)?.name || appt.doctorId}</td>
                <td className="border p-3">{new Date(appt.date).toLocaleDateString()}</td>
                <td className="border p-3">{appt.time}</td>
                <td className="border p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-white text-sm font-semibold ${
                      appt.status === "Pending"
                        ? "bg-yellow-500"
                        : appt.status === "Confirmed"
                        ? "bg-green-600"
                        : "bg-gray-500"
                    }`}
                  >
                    {appt.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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

export default MyBookings;
