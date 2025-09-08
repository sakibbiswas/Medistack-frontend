// // src/pages/BookingPage.tsx
// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { getUser } from "../utils/auth";

// const BookingPage: React.FC = () => {
//   const navigate = useNavigate();
//   const user = getUser();
//   const hasSidebar = !!user; // Sidebar only if logged in

//   const handleLogin = () => navigate("/login");
//   const handleRegister = () => navigate("/register");

//   // Redirect if already logged in as Patient
//   if (user?.role === "Patient") {
//     navigate("/patient/book");
//     return null;
//   }

//   return (
//     <div
//       className={`relative min-h-screen px-6 bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 overflow-hidden ${
//         hasSidebar ? "ml-64" : ""
//       } flex items-center justify-center`}
//     >
//       {/* Floating shapes */}
//       <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float1"></div>
//       <div className="absolute top-1/4 -right-32 w-80 h-80 bg-teal-300 rounded-full mix-blend-multiply filter blur-2xl opacity-25 animate-float2"></div>
//       <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float3"></div>

//       {/* Main card */}
//       <div className="relative bg-white/70 backdrop-blur-md shadow-lg rounded-2xl p-10 max-w-lg w-full text-center transform transition hover:-translate-y-2 hover:shadow-2xl">
//         <h1 className="text-4xl font-extrabold text-blue-700 mb-4">
//           Book an Appointment
//         </h1>
//         <p className="text-gray-700 mb-6">
//           You need to <span className="font-semibold text-teal-600">login as a Patient</span> to book your appointment.
//         </p>

//         <div className="flex justify-center gap-4 mb-6">
//           <button
//             onClick={handleLogin}
//             className="px-6 py-3 bg-gradient-to-r from-blue-600 via-teal-600 to-indigo-600 text-white font-semibold rounded-xl hover:scale-105 transform transition shadow-lg"
//           >
//             Login
//           </button>
//           <button
//             onClick={handleRegister}
//             className="px-6 py-3 bg-gradient-to-r from-green-600 via-teal-500 to-blue-500 text-white font-semibold rounded-xl hover:scale-105 transform transition shadow-lg"
//           >
//             Register
//           </button>
//         </div>

//         <p className="text-gray-500 text-sm">
//           Already logged in with another role? Please logout first.
//         </p>
//       </div>

//       {/* Floating animations */}
//       <style>{`
//         @keyframes float1 { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-20px); } }
//         @keyframes float2 { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(30px); } }
//         @keyframes float3 { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-25px); } }
//         .animate-float1 { animation: float1 6s ease-in-out infinite; }
//         .animate-float2 { animation: float2 8s ease-in-out infinite; }
//         .animate-float3 { animation: float3 7s ease-in-out infinite; }
//       `}</style>
//     </div>
//   );
// };

// export default BookingPage;



















//Responsive for mobile and pc 
// src/pages/BookingPage.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../utils/auth";

const BookingPage: React.FC = () => {
  const navigate = useNavigate();
  const user = getUser();
  const hasSidebar = !!user; // Sidebar only if logged in

  const handleLogin = () => navigate("/login");
  const handleRegister = () => navigate("/register");

  // Redirect if already logged in as Patient
  if (user?.role === "Patient") {
    navigate("/patient/book");
    return null;
  }

  return (
    <div
      className={`relative min-h-screen px-6 bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 overflow-hidden flex items-center justify-center
      ${hasSidebar ? "md:ml-64" : ""}`} // ✅ Sidebar only pushes content on desktop
    >
      {/* Floating shapes */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float1"></div>
      <div className="absolute top-1/4 -right-32 w-80 h-80 bg-teal-300 rounded-full mix-blend-multiply filter blur-2xl opacity-25 animate-float2"></div>
      <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float3"></div>

      {/* Main card */}
      <div className="relative bg-white/70 backdrop-blur-md shadow-lg rounded-2xl p-10 max-w-lg w-full text-center transform transition hover:-translate-y-2 hover:shadow-2xl">
        <h1 className="text-4xl font-extrabold text-blue-700 mb-4">
          Book an Appointment
        </h1>
        <p className="text-gray-700 mb-6">
          You need to{" "}
          <span className="font-semibold text-teal-600">login as a Patient</span>{" "}
          to book your appointment.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
          <button
            onClick={handleLogin}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 via-teal-600 to-indigo-600 text-white font-semibold rounded-xl hover:scale-105 transform transition shadow-lg"
          >
            Login
          </button>
          <button
            onClick={handleRegister}
            className="px-6 py-3 bg-gradient-to-r from-green-600 via-teal-500 to-blue-500 text-white font-semibold rounded-xl hover:scale-105 transform transition shadow-lg"
          >
            Register
          </button>
        </div>

        <p className="text-gray-500 text-sm">
          Already logged in with another role? Please logout first.
        </p>
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

export default BookingPage;
