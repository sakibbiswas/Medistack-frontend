//Responsive for mobile and pc 
// src/pages/doctor/DoctorDashboard.tsx
import React from "react";
import { useSelector } from "react-redux";
import { useGetDoctorAppointmentsQuery } from "../../api/appointmentApi";
import Loader from "../../components/Loader";
import Availability from "./Availability";
import Sidebar from "../../components/Sidebar";
import type { RootState } from "../../store/store";

const DoctorDashboard: React.FC = () => {
  const authUser = useSelector((state: RootState) => state.auth.user);
  const doctorId = authUser?._id;

  if (!authUser) {
    return (
      <div className="flex">
        <Sidebar />
        <div className="ml-0 lg:ml-64 p-6 text-red-600">
          Error: You are not logged in. Please login as Doctor.
        </div>
      </div>
    );
  }

  const {
    data: appointments = [],
    isLoading,
    isError,
  } = useGetDoctorAppointmentsQuery(undefined, { skip: !doctorId });

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 overflow-hidden">
      {/* Floating shapes */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float1"></div>
      <div className="absolute top-1/4 -right-32 w-80 h-80 bg-teal-300 rounded-full mix-blend-multiply filter blur-2xl opacity-25 animate-float2"></div>
      <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float3"></div>

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="ml-0 lg:ml-64 flex flex-col items-center justify-start pt-24 space-y-10 px-4 sm:px-6 md:px-12 lg:px-16 relative z-10">
        <h2 className="text-3xl md:text-5xl font-extrabold text-gray-800 mb-4 text-center">
          Doctor Dashboard
        </h2>

        {/* Availability Card */}
        {doctorId ? (
          <div className="w-full max-w-5xl">
            <Availability doctorId={doctorId} />
          </div>
        ) : (
          <div className="text-red-600 mb-6 text-center">
            Doctor ID missing in your profile.
          </div>
        )}

        {/* Appointments Card */}
        <section className="w-full max-w-5xl bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-6 sm:p-8">
          <h3 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 text-center">
            My Appointments
          </h3>

          {isLoading ? (
            <Loader />
          ) : isError ? (
            <div className="text-red-500 text-center">
              Error loading appointments. Please try again.
            </div>
          ) : appointments.length > 0 ? (
            <div className="grid gap-6">
              {appointments.map((appt) => {
                const patient =
                  typeof appt.patientId === "object"
                    ? appt.patientId
                    : { name: "Unknown" };

                const statusColor =
                  appt.status === "Completed"
                    ? "bg-green-100 text-green-800"
                    : appt.status === "Pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-gray-100 text-gray-800";

                return (
                  <div
                    key={appt._id}
                    className="flex flex-col sm:flex-row sm:justify-between sm:items-center bg-white rounded-xl shadow-md p-4 hover:shadow-xl transition"
                  >
                    <div className="flex flex-col mb-2 sm:mb-0">
                      <span className="font-semibold text-lg">
                        {patient.name}
                      </span>
                      <span className="text-gray-500">
                        {new Date(appt.date).toLocaleDateString("en-GB")} at{" "}
                        {appt.time}
                      </span>
                    </div>
                    <div
                      className={`px-4 py-2 rounded-full font-semibold text-sm text-center ${statusColor}`}
                    >
                      {appt.status}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-gray-500 text-center py-4">
              No appointments yet
            </div>
          )}
        </section>
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

export default DoctorDashboard;
