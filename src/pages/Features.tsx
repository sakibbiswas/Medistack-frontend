// src/components/Home/Features.tsx
import React from "react";
import {
  FaLock,
  FaCalendarAlt,
  FaUserMd,
  FaHeartbeat,
  FaStethoscope,
  FaNotesMedical,
  FaUserShield,
  FaClinicMedical,
  FaCheckCircle,
  FaHospital,
  FaUsers,
  FaAward,
} from "react-icons/fa";
import { getUser } from "../utils/auth";

const Features: React.FC = () => {
  const user = getUser();
  const hasSidebar = !!user;

  const features = [
    {
      icon: <FaLock className="text-5xl text-blue-600 drop-shadow-md" />,
      title: "Secure Login",
      description:
        "Advanced authentication to keep your medical data safe and private.",
    },
    {
      icon: <FaCalendarAlt className="text-5xl text-teal-600 drop-shadow-md" />,
      title: "Easy Appointments",
      description:
        "Book, reschedule, and manage doctor visits with just a few clicks.",
    },
    {
      icon: <FaUserMd className="text-5xl text-indigo-600 drop-shadow-md" />,
      title: "Dedicated Dashboards",
      description: "Personalized dashboards for patients, doctors, and admins.",
    },
    {
      icon: <FaUserShield className="text-5xl text-purple-600 drop-shadow-md" />,
      title: "24/7 Support",
      description:
        "Get round-the-clock assistance for any medical or technical queries.",
    },
  ];

  const services = [
    {
      icon: <FaStethoscope className="text-5xl text-blue-600 drop-shadow-md" />,
      name: "General Medicine",
      description:
        "Comprehensive care for routine checkups and general health concerns.",
    },
    {
      icon: <FaHeartbeat className="text-5xl text-red-600 drop-shadow-md" />,
      name: "Cardiology",
      description: "Specialized treatment and care for heart-related conditions.",
    },
    {
      icon: <FaNotesMedical className="text-5xl text-green-600 drop-shadow-md" />,
      name: "Dermatology",
      description:
        "Expert solutions for skin, hair, and cosmetic health issues.",
    },
    {
      icon: <FaClinicMedical className="text-5xl text-pink-600 drop-shadow-md" />,
      name: "Pediatrics",
      description:
        "Comprehensive healthcare services tailored for children and infants.",
    },
  ];

  const steps = [
    { icon: <FaCheckCircle />, title: "Sign Up", text: "Create your secure account in minutes." },
    { icon: <FaCalendarAlt />, title: "Book Appointment", text: "Choose your doctor and time slot." },
    { icon: <FaUserMd />, title: "Consult Doctor", text: "Get professional medical advice." },
    { icon: <FaNotesMedical />, title: "Get Reports", text: "Access prescriptions and reports online." },
  ];

  const stats = [
    { icon: <FaUsers />, value: "10K+", label: "Happy Patients" },
    { icon: <FaUserMd />, value: "500+", label: "Specialist Doctors" },
    { icon: <FaHospital />, value: "120+", label: "Partner Hospitals" },
    { icon: <FaAward />, value: "50+", label: "Awards & Recognition" },
  ];

  const partners = [
    "Apollo Hospitals",
    "Square Hospital",
    "United Hospital",
    "LabAid Diagnostics",
  ];

  return (
    <section className="relative overflow-hidden mt-8 px-6 md:px-16 py-20 animated-gradient">
      {/* Wrap all content in a responsive sidebar margin container */}
      <div className={`transition-all duration-300 ${hasSidebar ? "md:ml-64" : "md:ml-0"}`}>
        {/* Floating shapes */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float1 -z-10"></div>
        <div className="absolute top-1/3 -right-32 w-80 h-80 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-float2 -z-10"></div>
        <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-float3 -z-10"></div>

        {/* Features */}
        <div className="text-center mb-20 relative z-10">
          <h2 className="text-5xl font-extrabold text-white drop-shadow-lg mb-12 animate-fadeIn">
            Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {features.map((feature, i) => (
              <div
                key={i}
                className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 text-center animated-card"
              >
                <div className="flex items-center justify-center h-32 w-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 shadow-inner">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-800">
                  {feature.title}
                </h3>
                <p className="text-gray-700">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Services */}
        <div className="text-center relative z-10 mb-24">
          <h2 className="text-5xl font-extrabold text-white drop-shadow-lg mb-12 animate-fadeIn">
            Our Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {services.map((service, i) => (
              <div
                key={i}
                className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 text-center animated-card"
              >
                <div className="flex items-center justify-center h-32 w-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-100 to-pink-100 shadow-inner">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-800">
                  {service.name}
                </h3>
                <p className="text-gray-700">{service.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="text-center relative z-10 mb-24">
          <h2 className="text-5xl font-extrabold text-white drop-shadow-lg mb-12 animate-fadeIn">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <div
                key={i}
                className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 text-center animated-card"
              >
                <div className="flex items-center justify-center h-32 w-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-teal-100 to-blue-100 shadow-inner">
                  <div className="text-5xl text-teal-600">{step.icon}</div>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-800">{step.title}</h3>
                <p className="text-gray-700">{step.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="text-center relative z-10 mb-24">
          <h2 className="text-5xl font-extrabold text-white drop-shadow-lg mb-12 animate-fadeIn">
            Our Achievements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <div
                key={i}
                className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 text-center animated-card"
              >
                <div className="flex items-center justify-center h-32 w-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-yellow-100 to-orange-100 shadow-inner">
                  <div className="text-5xl text-yellow-600">{s.icon}</div>
                </div>
                <h3 className="text-4xl font-extrabold text-gray-800">{s.value}</h3>
                <p className="text-lg text-gray-700">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Partners */}
        <div className="text-center relative z-10">
          <h2 className="text-5xl font-extrabold text-white drop-shadow-lg mb-12 animate-fadeIn">
            Our Partners
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {partners.map((p, i) => (
              <div
                key={i}
                className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 text-center animated-card"
              >
                <div className="flex items-center justify-center h-32 w-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 shadow-inner">
                  <FaHospital className="text-5xl text-gray-700" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">{p}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        .animated-gradient {
          background: linear-gradient(-45deg, #ff9a9e, #fad0c4, #a1c4fd, #c2e9fb);
          background-size: 400% 400%;
          animation: gradientMove 15s ease infinite;
        }
        @keyframes gradientMove {
          0% {background-position: 0% 50%;}
          50% {background-position: 100% 50%;}
          100% {background-position: 0% 50%;}
        }
        @keyframes float1 {0%,100% {transform: translateY(0);} 50% {transform: translateY(-25px);} }
        @keyframes float2 {0%,100% {transform: translateY(0);} 50% {transform: translateY(20px);} }
        @keyframes float3 {0%,100% {transform: translateY(0);} 50% {transform: translateY(-20px);} }
        .animate-float1 {animation: float1 7s ease-in-out infinite;}
        .animate-float2 {animation: float2 9s ease-in-out infinite;}
        .animate-float3 {animation: float3 8s ease-in-out infinite;}
        @keyframes fadeIn { from {opacity: 0; transform: translateY(20px);} to {opacity: 1; transform: translateY(0);} }
        .animate-fadeIn { animation: fadeIn 1.5s ease forwards; }
        .animated-card { transition: all 0.4s ease; }
        .animated-card:hover { transform: translateY(-10px) scale(1.03); }
      `}</style>
    </section>
  );
};

export default Features;
