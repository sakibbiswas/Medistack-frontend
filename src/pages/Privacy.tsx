// src/pages/Privacy.tsx
import React from "react";
import { getUser } from "../utils/auth";

const Privacy: React.FC = () => {
  const user = getUser(); // লগইন চেক
  const hasSidebar = !!user; // sidebar আছে কি না

  return (
    <div
      className={`relative min-h-screen px-6 md:px-16 py-12 bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 overflow-hidden ${
        hasSidebar ? "ml-64 pt-24" : "pt-12"
      }`}
    >
      {/* Floating shapes */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float1"></div>
      <div className="absolute top-1/4 -right-32 w-80 h-80 bg-teal-300 rounded-full mix-blend-multiply filter blur-2xl opacity-25 animate-float2"></div>
      <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float3"></div>

      {/* Content Wrapper */}
      <div className="relative z-10 max-w-4xl mx-auto space-y-10 px-6 py-12">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-5xl font-extrabold text-gray-800 mb-4">
            Privacy Policy & Terms of Service
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            At <span className="font-semibold text-blue-600">MediStack++</span>, your trust is our top priority.
            We ensure full transparency in handling your data and delivering healthcare services securely.
          </p>
        </div>

        {/* Card Sections */}
        <div className="space-y-8">
          {/* Privacy Section */}
          <section className="bg-white/70 backdrop-blur-md shadow-lg rounded-2xl p-8 transform transition hover:-translate-y-2 hover:shadow-2xl">
            <h2 className="text-3xl font-bold text-blue-700 mb-4 flex items-center gap-2">🔒 Privacy Policy</h2>
            <p className="text-gray-700 mb-4">
              We value your privacy and are committed to safeguarding your personal information. Any data collected (name, email, booking details) is used only to provide healthcare services.
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>We never sell or share your personal data with third parties.</li>
              <li>Data is stored securely with industry-standard encryption.</li>
              <li>You have full control over your account and can request deletion anytime.</li>
            </ul>
          </section>

          {/* Terms Section */}
          <section className="bg-white/70 backdrop-blur-md shadow-lg rounded-2xl p-8 transform transition hover:-translate-y-2 hover:shadow-2xl">
            <h2 className="text-3xl font-bold text-teal-700 mb-4 flex items-center gap-2">📜 Terms of Service</h2>
            <p className="text-gray-700 mb-4">
              By using our platform, you agree to abide by the following terms:
            </p>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>Bookings must be made with accurate details. False info may lead to suspension.</li>
              <li>Payments are securely processed through verified providers.</li>
              <li>Doctors and patients must maintain professional conduct at all times.</li>
            </ol>
          </section>

          {/* Data Security Section */}
          <section className="bg-white/70 backdrop-blur-md shadow-lg rounded-2xl p-8 transform transition hover:-translate-y-2 hover:shadow-2xl">
            <h2 className="text-3xl font-bold text-indigo-700 mb-4 flex items-center gap-2">🛡️ Data Security</h2>
            <p className="text-gray-700">
              All sensitive information is encrypted, and servers comply with global healthcare security standards. Unauthorized access is strictly prohibited, with regular audits for safety.
            </p>
          </section>
        </div>

        {/* Contact Section */}
        <section className="text-center mt-12">
          <h3 className="text-2xl font-semibold text-blue-700 mb-2">Have Questions?</h3>
          <p className="text-gray-600 mb-4">
            For any privacy or legal concerns, contact us at:
          </p>
          <a
            href="mailto:support@medistack.com"
            className="inline-block px-8 py-3 font-semibold text-white rounded-xl bg-gradient-to-r from-blue-600 via-teal-600 to-indigo-600 hover:scale-105 transform transition shadow-lg"
          >
            support@medistack.com
          </a>
        </section>
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

export default Privacy;
