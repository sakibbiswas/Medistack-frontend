// src/pages/Register.tsx
import React, { useState } from "react";
import { useRegisterMutation } from "../../api/authApi";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FiUser, FiMail, FiLock } from "react-icons/fi";
import pic from "../../assets/download (2).png";

const Register: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"Patient" | "Doctor" | "Admin">("Patient");
  const [register, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await register({ name, email, password, role }).unwrap();
      const { user } = res.data;

      toast.success(
        `🎉 Registration successful for ${user.email}! Please login.`
      );

      setName("");
      setEmail("");
      setPassword("");
      setRole("Patient");
      navigate("/login");
    } catch (err: any) {
      toast.error(err?.data?.message || err?.message || "Registration failed");
    }
  };

  return (
    <div className="relative min-h-screen px-4 sm:px-6 bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 overflow-hidden flex items-center justify-center">
      {/* Floating shapes */}
      <div className="absolute -top-32 -left-32 w-64 sm:w-96 h-64 sm:h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float1"></div>
      <div className="absolute top-1/4 -right-32 w-64 sm:w-80 h-64 sm:h-80 bg-teal-300 rounded-full mix-blend-multiply filter blur-2xl opacity-25 animate-float2"></div>
      <div className="absolute bottom-0 left-1/4 w-56 sm:w-72 h-56 sm:h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float3"></div>

      {/* Glass Card */}
      <div className="relative z-10 w-full max-w-3xl sm:max-w-5xl p-6 sm:p-12 bg-white/30 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/30 animate-fadeIn flex flex-col md:flex-row gap-8 sm:gap-10">
        
        {/* Illustration */}
        <div className="flex flex-1 items-center justify-center mb-6 md:mb-0">
          <img
            src={pic}
            alt="register illustration"
            className="w-56 sm:w-64 md:w-80 lg:w-96 rounded-2xl drop-shadow-xl"
          />
        </div>

        {/* Form */}
        <div className="flex-1 flex flex-col justify-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-800 drop-shadow-sm mb-3 sm:mb-4 text-center md:text-left">
            Create Your Account
          </h2>
          <p className="text-gray-600 mb-4 sm:mb-6 text-center md:text-left text-sm sm:text-base">
            Join <span className="font-semibold">MediStack++</span> today 
          </p>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            {/* Name Field */}
            <div className="relative">
              <FiUser className="absolute top-3.5 left-3 text-gray-400 text-lg" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                className="w-full pl-12 pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-xl bg-white/60 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:outline-none transition-all duration-200 shadow-md text-sm sm:text-base"
              />
            </div>

            {/* Email Field */}
            <div className="relative">
              <FiMail className="absolute top-3.5 left-3 text-gray-400 text-lg" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full pl-12 pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-xl bg-white/60 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:outline-none transition-all duration-200 shadow-md text-sm sm:text-base"
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <FiLock className="absolute top-3.5 left-3 text-gray-400 text-lg" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full pl-12 pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-xl bg-white/60 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:outline-none transition-all duration-200 shadow-md text-sm sm:text-base"
              />
            </div>

            {/* Role Field */}
            <div className="relative">
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as any)}
                className="w-full pl-3 pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-xl bg-white/60 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:outline-none transition-all duration-200 shadow-md text-gray-700 text-sm sm:text-base"
              >
                <option value="Patient">Patient</option>
                <option value="Doctor">Doctor</option>
                <option value="Admin">Admin</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 via-teal-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:scale-[1.03] hover:shadow-xl transition transform duration-200 disabled:opacity-50 text-sm sm:text-base"
            >
              {isLoading ? "Registering..." : "Register"}
            </button>
          </form>

          <div className="mt-4 sm:mt-6 text-center md:text-left text-xs sm:text-sm text-gray-500">
            Already have an account?{" "}
            <span
              className="text-blue-600 hover:underline cursor-pointer font-medium"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        .animate-fadeIn { animation: fadeIn 1s ease-in-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
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

export default Register;
