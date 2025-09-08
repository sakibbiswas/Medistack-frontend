
//Responsive for mobile and pc 
// src/pages/admin/AdminDashboard.tsx
import React, { useState } from "react";
import { useGetUsersQuery } from "../../api/userApi";
import { useGetDoctorsQuery } from "../../api/doctorApi";
import { useGetAppointmentsQuery } from "../../api/appointmentApi";
import { useGetPaymentsQuery } from "../../api/paymentApi";
import Sidebar from "../../components/Sidebar";
import Loader from "../../components/Loader";
import { FaUsers, FaUserMd, FaCalendarAlt, FaCreditCard } from "react-icons/fa";

const AdminDashboard: React.FC = () => {
  const [showSummary, setShowSummary] = useState(true);

  const { data: users, isLoading: loadingUsers } = useGetUsersQuery();
  const { data: doctors, isLoading: loadingDoctors } = useGetDoctorsQuery();
  const { data: appointments, isLoading: loadingAppointments } = useGetAppointmentsQuery();
  const { data: payments, isLoading: loadingPayments } = useGetPaymentsQuery();

  const toggleSummary = () => setShowSummary((prev) => !prev);
  const isLoading = loadingUsers || loadingDoctors || loadingAppointments || loadingPayments;

  const summaryCards = [
    {
      label: "Users",
      value: users?.length ?? 0,
      icon: <FaUsers />,
      gradient: "from-blue-500 to-blue-400",
    },
    {
      label: "Doctors",
      value: doctors?.length ?? 0,
      icon: <FaUserMd />,
      gradient: "from-green-500 to-green-400",
    },
    {
      label: "Appointments",
      value: appointments?.length ?? 0,
      icon: <FaCalendarAlt />,
      gradient: "from-purple-500 to-purple-400",
    },
    {
      label: "Payments",
      value: payments?.length ?? 0,
      icon: <FaCreditCard />,
      gradient: "from-yellow-400 to-yellow-300",
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 relative overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <main className="flex-1 p-4 md:p-14 md:ml-64 transition-all duration-300">
        {/* Header: Title + Toggle Button */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
          <h1 className="text-3xl pt-6 font-extrabold text-gray-800">Admin Dashboard</h1>
          <button
            onClick={toggleSummary}
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-lg shadow hover:opacity-90 transition"
          >
            {showSummary ? "Hide Summary" : "Show Summary"}
          </button>
        </div>

        {isLoading ? (
          <Loader />
        ) : (
          <>
            {/* Summary Cards */}
            {showSummary && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {summaryCards.map((card) => (
                  <div
                    key={card.label}
                    className={`flex items-center p-4 md:p-6 rounded-3xl shadow-lg bg-gradient-to-br ${card.gradient} text-white hover:scale-105 transform transition`}
                  >
                    <div className="text-3xl md:text-4xl mr-3 md:mr-4">{card.icon}</div>
                    <div>
                      <div className="text-sm md:text-base font-medium opacity-80">
                        {card.label}
                      </div>
                      <div className="text-xl md:text-2xl font-bold">{card.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Recent Appointments */}
            <section className="bg-white rounded-3xl shadow-xl p-4 md:p-6">
              <h2 className="text-xl font-semibold mb-3">Recent Appointments</h2>
              <div className="space-y-3 max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-gray-200">
                {appointments && appointments.length > 0 ? (
                  appointments.slice(0, 10).map((a) => (
                    <div
                      key={(a as any)._id}
                      className="flex justify-between items-center p-3 md:p-4 rounded-xl shadow hover:shadow-lg transition bg-gray-50"
                    >
                      <div className="flex flex-col">
                        <span className="font-semibold text-gray-700">
                          {typeof a.patientId === "string"
                            ? a.patientId
                            : (a.patientId as any)?.name ?? "N/A"}
                        </span>
                        <span className="text-gray-500">
                          {a.date ? new Date(a.date).toLocaleString() : "N/A"}
                        </span>
                      </div>
                      <div className="flex flex-col text-right">
                        <span className="text-gray-600">
                          Doctor:{" "}
                          {typeof a.doctorId === "string"
                            ? a.doctorId
                            : (a.doctorId as any)?.name ?? "N/A"}
                        </span>
                        <span
                          className={`mt-1 px-3 py-1 rounded-full text-sm font-semibold ${
                            a.status === "Completed"
                              ? "bg-green-100 text-green-800"
                              : a.status === "Pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {a.status ?? "Pending"}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-gray-500 text-center py-4">No appointments yet</div>
                )}
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
