// src/pages/patient/PatientDashboard.tsx
import React, { useState } from "react";
import { useGetPatientAppointmentsQuery } from "../../api/appointmentApi";
import Loader from "../../components/Loader";
import Sidebar from "../../components/Sidebar";
import { FaBars, FaTimes } from "react-icons/fa";

const statusColors: Record<string, string> = {
  Pending: "bg-yellow-100 text-yellow-800",
  Confirmed: "bg-green-100 text-green-800",
  Cancelled: "bg-red-100 text-red-800",
  Completed: "bg-blue-100 text-blue-800",
};

const PatientDashboard: React.FC = () => {
  const { data, isLoading } = useGetPatientAppointmentsQuery();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (isLoading) return <Loader />;

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:flex-shrink-0">
        <div className="w-64 bg-white border-r border-gray-200">
          <Sidebar />
        </div>
      </aside>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          <aside className="w-64 bg-white shadow-xl border-r border-gray-200">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-bold">Menu</h2>
              <button
                className="text-gray-700 focus:outline-none"
                onClick={() => setSidebarOpen(false)}
              >
                <FaTimes size={20} />
              </button>
            </div>
            <Sidebar />
          </aside>
          {/* Overlay */}
          <div
            className="flex-1 bg-black bg-opacity-50"
            onClick={() => setSidebarOpen(false)}
          ></div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:ml-64">
        {/* Mobile top bar */}
        <div className="md:hidden flex items-center justify-between p-4 border-b border-gray-200">
          <button
            className="text-gray-700 focus:outline-none"
            onClick={() => setSidebarOpen(true)}
          >
            <FaBars size={24} />
          </button>
          <h1 className="text-base sm:text-lg font-bold text-gray-800">
            Dashboard
          </h1>
        </div>

        <main className="flex-1 p-3 sm:p-6 lg:p-8">
          {/* Header */}
          <header className="mb-6 sm:mb-8">
            <h1 className="text-xl mt-5 sm:text-3xl font-bold text-gray-800 mb-2">
              Welcome Back!
            </h1>
            <p className="text-gray-600 text-sm">
              Here's a summary of your appointments
            </p>
          </header>

          {/* Stats Cards */}
          <section className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
            <div className="bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-xl shadow-lg p-3 sm:p-6 flex flex-col items-start">
              <p className="text-xs sm:text-sm font-medium">Total</p>
              <p className="text-lg sm:text-3xl font-bold mt-1">
                {data?.length || 0}
              </p>
            </div>
            <div className="bg-gradient-to-r from-green-400 to-green-600 text-white rounded-xl shadow-lg p-3 sm:p-6 flex flex-col items-start">
              <p className="text-xs sm:text-sm font-medium">Upcoming</p>
              <p className="text-lg sm:text-3xl font-bold mt-1">
                {data?.filter(
                  (a) => a.status === "Pending" || a.status === "Confirmed"
                ).length || 0}
              </p>
            </div>
            <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white rounded-xl shadow-lg p-3 sm:p-6 flex flex-col items-start">
              <p className="text-xs sm:text-sm font-medium">Completed</p>
              <p className="text-lg sm:text-3xl font-bold mt-1">
                {data?.filter((a) => a.status === "Completed").length || 0}
              </p>
            </div>
            <div className="bg-gradient-to-r from-red-400 to-red-600 text-white rounded-xl shadow-lg p-3 sm:p-6 flex flex-col items-start">
              <p className="text-xs sm:text-sm font-medium">Cancelled</p>
              <p className="text-lg sm:text-3xl font-bold mt-1">
                {data?.filter((a) => a.status === "Cancelled").length || 0}
              </p>
            </div>
          </section>

          {/* Appointments Table (responsive card style on mobile) */}
          <section>
            <h2 className="text-lg sm:text-2xl font-semibold text-gray-800 mb-3 sm:mb-4">
              My Appointments
            </h2>
            <div className="bg-white rounded-xl shadow p-3 sm:p-4">
              {/* Desktop Table */}
              <div className="hidden sm:block overflow-x-auto">
                <table className="min-w-full border-collapse text-sm sm:text-base">
                  <thead className="bg-blue-50">
                    <tr>
                      <th className="text-left py-2 px-3 sm:px-4 text-gray-700 font-medium">
                        Doctor
                      </th>
                      <th className="text-left py-2 px-3 sm:px-4 text-gray-700 font-medium">
                        Date
                      </th>
                      <th className="text-left py-2 px-3 sm:px-4 text-gray-700 font-medium">
                        Time
                      </th>
                      <th className="text-left py-2 px-3 sm:px-4 text-gray-700 font-medium">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.map((appt) => (
                      <tr
                        key={appt._id}
                        className="border-b hover:bg-gray-50 transition"
                      >
                        <td className="py-2 sm:py-3 px-3 sm:px-4 text-gray-800 font-medium">
                          {(appt.doctorId as any)?.name || appt.doctorId}
                        </td>
                        <td className="py-2 sm:py-3 px-3 sm:px-4 text-gray-600">
                          {new Date(appt.date).toLocaleDateString()}
                        </td>
                        <td className="py-2 sm:py-3 px-3 sm:px-4 text-gray-600">
                          {appt.time}
                        </td>
                        <td className="py-2 sm:py-3 px-3 sm:px-4">
                          <span
                            className={`inline-block px-2 sm:px-3 py-1 rounded-full text-xs font-semibold ${
                              statusColors[appt.status] ||
                              "bg-gray-100 text-gray-800"
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

              {/* Mobile Card View */}
              <div className="space-y-3 sm:hidden">
                {data?.map((appt) => (
                  <div
                    key={appt._id}
                    className="border rounded-lg p-3 shadow-sm bg-gray-50"
                  >
                    <p className="text-sm font-semibold text-gray-800">
                      {(appt.doctorId as any)?.name || appt.doctorId}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      {new Date(appt.date).toLocaleDateString()} • {appt.time}
                    </p>
                    <span
                      className={`inline-block mt-2 px-2 py-1 rounded-full text-xs font-semibold ${
                        statusColors[appt.status] ||
                        "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {appt.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default PatientDashboard;
