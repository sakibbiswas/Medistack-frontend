// src/pages/patient/PatientDashboard.tsx
import React from "react";
import { useGetPatientAppointmentsQuery } from "../../api/appointmentApi";
import Loader from "../../components/Loader";
import Sidebar from "../../components/Sidebar";

const statusColors: Record<string, string> = {
  Pending: "bg-yellow-100 text-yellow-800",
  Confirmed: "bg-green-100 text-green-800",
  Cancelled: "bg-red-100 text-red-800",
  Completed: "bg-blue-100 text-blue-800",
};

const PatientDashboard: React.FC = () => {
  const { data, isLoading } = useGetPatientAppointmentsQuery();

  if (isLoading) return <Loader />;

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Welcome Back!</h1>
          <p className="text-gray-600">Here's a summary of your appointments</p>
        </header>

        {/* Stats Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-2xl shadow-lg p-6 flex flex-col items-start">
            <p className="text-sm font-medium">Total Appointments</p>
            <p className="text-3xl font-bold mt-2">{data?.length || 0}</p>
          </div>
          <div className="bg-gradient-to-r from-green-400 to-green-600 text-white rounded-2xl shadow-lg p-6 flex flex-col items-start">
            <p className="text-sm font-medium">Upcoming</p>
            <p className="text-3xl font-bold mt-2">
              {data?.filter(a => a.status === "Pending" || a.status === "Confirmed").length || 0}
            </p>
          </div>
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white rounded-2xl shadow-lg p-6 flex flex-col items-start">
            <p className="text-sm font-medium">Completed</p>
            <p className="text-3xl font-bold mt-2">
              {data?.filter(a => a.status === "Completed").length || 0}
            </p>
          </div>
          <div className="bg-gradient-to-r from-red-400 to-red-600 text-white rounded-2xl shadow-lg p-6 flex flex-col items-start">
            <p className="text-sm font-medium">Cancelled</p>
            <p className="text-3xl font-bold mt-2">
              {data?.filter(a => a.status === "Cancelled").length || 0}
            </p>
          </div>
        </section>

        {/* Appointments Table */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">My Appointments</h2>
          <div className="overflow-x-auto bg-white rounded-2xl shadow p-4">
            <table className="min-w-full border-collapse">
              <thead className="bg-blue-50 rounded-t-lg">
                <tr>
                  <th className="text-left py-2 px-4 text-gray-700 font-medium">Doctor</th>
                  <th className="text-left py-2 px-4 text-gray-700 font-medium">Date</th>
                  <th className="text-left py-2 px-4 text-gray-700 font-medium">Time</th>
                  <th className="text-left py-2 px-4 text-gray-700 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {data?.map(appt => (
                  <tr
                    key={appt._id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="py-3 px-4 text-gray-800 font-medium">
                      {(appt.doctorId as any)?.name || appt.doctorId}
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {new Date(appt.date).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 text-gray-600">{appt.time}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                          statusColors[appt.status] || "bg-gray-100 text-gray-800"
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
        </section>
      </main>
    </div>
  );
};

export default PatientDashboard;
