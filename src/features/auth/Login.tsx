// // src/pages/Login.tsx
// import React, { useState } from "react";
// import { useLoginMutation } from "../../api/authApi";
// import { useDispatch } from "react-redux";
// import { setCredentials } from "../../features/auth/authSlice";
// import { setTokens, setUser } from "../../utils/auth";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-hot-toast";
// import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";

// const Login: React.FC = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [login, { isLoading }] = useLoginMutation();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const res = await login({ email, password }).unwrap();
//       const { token, refreshToken, user } = res.data;

//       dispatch(setCredentials({ token, refreshToken, user }));
//       setTokens(token, refreshToken);
//       setUser(user);

//       toast.success(`Welcome back, ${user.name}! 🎉`);

//       if (user.role === "Admin") navigate("/admin/dashboard");
//       else if (user.role === "Doctor") navigate("/doctor/dashboard");
//       else navigate("/patient/dashboard");
//     } catch (err: any) {
//       toast.error(err?.data?.message || err?.message || "Login failed");
//     }
//   };

//   return (
//     <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 overflow-hidden p-4">
//       {/* Floating Background Shapes */}
//       <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-400/30 rounded-full blur-[120px] animate-float1"></div>
//       <div className="absolute top-1/3 -right-32 w-80 h-80 bg-teal-400/30 rounded-full blur-[100px] animate-float2"></div>
//       <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-indigo-400/30 rounded-full blur-[100px] animate-float3"></div>

//       {/* Login Card */}
//       <div className="relative z-10 w-full max-w-md p-10 bg-white/80 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/40 animate-fadeIn overflow-hidden">
//         {/* Glow border effect */}
//         <div className="absolute inset-0 rounded-3xl border border-transparent bg-gradient-to-r from-blue-500/40 via-teal-400/30 to-indigo-500/40 opacity-50 blur-xl"></div>

//         <div className="relative z-10">
//           <h2 className="text-4xl font-extrabold text-center text-gray-800 drop-shadow-sm mb-2">
//             Welcome Back
//           </h2>
//           <p className="text-sm text-gray-500 text-center mb-8">
//             Login to continue to your <span className="font-semibold">MediStack++</span> account
//           </p>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* Email Field */}
//             <div className="relative">
//               <FiMail className="absolute top-4 left-3 text-gray-400" />
//               <input
//                 id="email"
//                 type="email"
//                 required
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="Email"
//                 className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl bg-white/70 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:outline-none transition-all duration-200 shadow-sm"
//               />
//               {/* Label shows only when field is empty */}
//               {!email && (
//                 <label
//                   htmlFor="email"
//                   className="absolute left-10 top-3 text-gray-400 text-base pointer-events-none"
//                 >
//                   Email
//                 </label>
//               )}
//             </div>

//             {/* Password Field */}
//             <div className="relative">
//               <FiLock className="absolute top-4 left-3 text-gray-400" />
//               <input
//                 id="password"
//                 type={showPassword ? "text" : "password"}
//                 required
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="Password"
//                 className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-xl bg-white/70 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:outline-none transition-all duration-200 shadow-sm"
//               />
//               {/* Label shows only when field is empty */}
//               {!password && (
//                 <label
//                   htmlFor="password"
//                   className="absolute left-10 top-3 text-gray-400 text-base pointer-events-none"
//                 >
//                   Password
//                 </label>
//               )}
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600 focus:outline-none transition"
//               >
//                 {showPassword ? <FiEyeOff /> : <FiEye />}
//               </button>
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               disabled={isLoading}
//               className="w-full py-3 bg-gradient-to-r from-blue-600 via-teal-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:scale-[1.02] hover:shadow-xl transition transform duration-200 disabled:opacity-50"
//             >
//               {isLoading ? "Logging in..." : "Login"}
//             </button>
//           </form>

//           <div className="mt-6 text-center text-sm text-gray-500">
//             Don’t have an account?{" "}
//             <span
//               className="text-blue-600 hover:underline cursor-pointer font-medium"
//               onClick={() => navigate("/register")}
//             >
//               Sign up
//             </span>
//           </div>
//         </div>
//       </div>

//       {/* Floating Animations */}
//       <style>{`
//         @keyframes float1 { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-25px); } }
//         @keyframes float2 { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(20px); } }
//         @keyframes float3 { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-15px); } }
//         .animate-float1 { animation: float1 6s ease-in-out infinite; }
//         .animate-float2 { animation: float2 8s ease-in-out infinite; }
//         .animate-float3 { animation: float3 7s ease-in-out infinite; }
//         .animate-fadeIn { animation: fadeIn 1s ease-in-out; }
//         @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
//       `}</style>
//     </div>
//   );
// };

// export default Login;
























// src/pages/Login.tsx
import React, { useState } from "react";
import { useLoginMutation } from "../../api/authApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../features/auth/authSlice";
import { setTokens, setUser } from "../../utils/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import pic from "../../assets/download (1).png";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const demoCredentials = {
    admin: { email: "admin@medistack.com", password: "admin123" },
    patient: { email: "sakib@gmail.com", password: "sakib9988" },
    doctor: { email: "sazzadur@gmail.com", password: "sazzadur9988" },
    
  };

  const handleDemoClick = (type: "patient" | "doctor" | "admin") => {
    setEmail(demoCredentials[type].email);
    setPassword(demoCredentials[type].password);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      const { token, refreshToken, user } = res.data;

      dispatch(setCredentials({ token, refreshToken, user }));
      setTokens(token, refreshToken);
      setUser(user);

      toast.success(`Welcome back, ${user.name}! 🎉`);

      if (user.role === "Admin") navigate("/admin/dashboard");
      else if (user.role === "Doctor") navigate("/doctor/dashboard");
      else navigate("/patient/dashboard");
    } catch (err: any) {
      toast.error(err?.data?.message || err?.message || "Login failed");
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
            alt="login illustration"
            className="w-56 sm:w-64 md:w-80 lg:w-96 rounded-2xl drop-shadow-xl"
          />
        </div>

        {/* Form */}
        <div className="flex-1 flex flex-col justify-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-800 drop-shadow-sm mb-3 sm:mb-4 text-center md:text-left">
            Sign in to your Account
          </h2>
          <p className="text-gray-600 mb-4 sm:mb-6 text-center md:text-left text-sm sm:text-base">
            Enter your credentials or use a demo login to explore
          </p>

          {/* Demo Buttons */}
          <div className="flex flex-wrap justify-center md:justify-start gap-2 sm:gap-3 mb-4 sm:mb-6">
            {(["patient", "doctor", "admin"] as const).map((role) => (
              <button
                key={role}
                onClick={() => handleDemoClick(role)}
                className="px-4 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-lg hover:scale-105 hover:shadow-lg transition transform duration-200 font-medium shadow-md text-xs sm:text-sm"
              >
                {role.charAt(0).toUpperCase() + role.slice(1)} Credentials
              </button>
            ))}
          </div>

          {/* Form Fields */}
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            <div className="relative">
              <FiMail className="absolute top-3.5 left-3 text-gray-400 text-lg" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full pl-12 pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-xl bg-white/60 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:outline-none transition-all duration-200 shadow-md placeholder-gray-400 text-sm sm:text-base"
              />
            </div>

            <div className="relative">
              <FiLock className="absolute top-3.5 left-3 text-gray-400 text-lg" />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full pl-12 pr-12 py-2.5 sm:py-3 border border-gray-300 rounded-xl bg-white/60 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:outline-none transition-all duration-200 shadow-md placeholder-gray-400 text-sm sm:text-base"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 via-teal-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:scale-[1.03] hover:shadow-xl transition transform duration-200 disabled:opacity-50 text-sm sm:text-base"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Signup Redirect */}
          <div className="mt-4 sm:mt-6 text-center md:text-left text-xs sm:text-sm text-gray-500">
            Don’t have an account?{" "}
            <span
              className="text-blue-600 hover:underline cursor-pointer font-medium"
              onClick={() => navigate("/register")}
            >
              Sign up
            </span>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        .animate-fadeIn { animation: fadeIn 1s ease-in-out; }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
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

export default Login;

