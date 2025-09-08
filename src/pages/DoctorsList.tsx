//Responsive for mobile and pc 
// src/pages/DoctorsList.tsx
import React from "react";
import { getUser } from "../utils/auth";
import { useGetDoctorsQuery } from "../api/doctorApi";
import Loader from "../components/Loader";
import { FaUserMd, FaHospital, FaClock } from "react-icons/fa";

const DoctorsList: React.FC = () => {
  const user = getUser();
  const hasSidebar = !!user;

  const { data: doctors, isLoading } = useGetDoctorsQuery();

  if (isLoading) return <Loader />;

  if (!doctors?.length) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center px-6 py-12 bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 relative overflow-hidden
        ${hasSidebar ? "md:ml-64 pt-24" : "pt-12"}`} // ✅ responsive sidebar
      >
        <div className="bg-white/70 backdrop-blur-md shadow-lg rounded-2xl p-10 max-w-lg w-full text-center transform transition hover:-translate-y-2 hover:shadow-2xl">
          <h1 className="text-3xl font-bold mb-4 text-blue-700">Our Doctors</h1>
          <p className="text-gray-600">No doctors available at the moment.</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative min-h-screen px-6 py-12 bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 overflow-hidden
      ${hasSidebar ? "md:ml-64 pt-24" : "pt-12"}`} // ✅ responsive sidebar
    >
      {/* Floating shapes */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float1"></div>
      <div className="absolute top-1/4 -right-32 w-80 h-80 bg-teal-300 rounded-full mix-blend-multiply filter blur-2xl opacity-25 animate-float2"></div>
      <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float3"></div>

      <h1 className="text-4xl font-extrabold text-gray-800 mb-10 text-center relative z-10">
        Our Doctors
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto relative z-10">
        {doctors.map((doctor) => (
          <div
            key={doctor._id}
            className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-6 flex flex-col gap-4 transform transition hover:-translate-y-3 hover:shadow-2xl hover:scale-105"
          >
            {/* Name */}
            <div className="flex items-center gap-3">
              <FaUserMd className="text-blue-600 text-2xl" />
              <h2 className="text-xl font-semibold text-gray-800">{doctor.name}</h2>
            </div>

            {/* Specialization */}
            <div className="flex items-center gap-2 text-gray-700">
              <FaHospital className="text-teal-600" />
              <p className="text-sm font-medium">{doctor.specialization}</p>
            </div>

            {/* Available Slots */}
            <div className="flex items-center gap-2 text-gray-600">
              <FaClock className="text-purple-600" />
              <p className="text-sm">
                Available Slots:{" "}
                {doctor.availableSlots && doctor.availableSlots.length > 0
                  ? doctor.availableSlots.join(", ")
                  : "None"}
              </p>
            </div>

            {/* Department */}
            <div className="flex items-center gap-2 text-gray-600">
              <FaHospital className="text-indigo-600" />
              <p className="text-sm">
                Department:{" "}
                {typeof doctor.departmentId === "object"
                  ? (doctor.departmentId as any)?.name
                  : doctor.departmentId || "N/A"}
              </p>
            </div>
          </div>
        ))}
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

export default DoctorsList;
