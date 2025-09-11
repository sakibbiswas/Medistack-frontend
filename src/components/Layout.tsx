// src/components/Layout.tsx
// import React, { ReactNode } from "react";
import type { ReactNode } from "react";
import { getUser } from "../utils/auth";

type LayoutProps = {
  children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const user = getUser();
  const hasSidebar = !!user;

  return (
    <div
      className={`relative min-h-screen px-6 md:px-16 py-12 bg-gradient-to-br 
        from-gray-50 via-blue-50 to-gray-100 overflow-hidden ${
          hasSidebar ? "ml-64 pt-24" : "pt-12"
        }`}
    >
      {/* Floating shapes */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float1"></div>
      <div className="absolute top-1/4 -right-32 w-80 h-80 bg-teal-300 rounded-full mix-blend-multiply filter blur-2xl opacity-25 animate-float2"></div>
      <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float3"></div>

      {/* Content Wrapper */}
      <div className="relative z-10 max-w-4xl mx-auto space-y-10 px-6 py-12">
        {children}
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

export default Layout;
