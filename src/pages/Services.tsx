// src/pages/Services.tsx
import React from "react";
import {
  FaStethoscope,
  FaHeart,
  FaUserMd,
  FaBaby,
  FaSyringe,
  FaNotesMedical,
  FaClinicMedical,
  FaAmbulance,
  FaFileMedicalAlt,
  FaVial,
  FaPrescription,
  FaUserNurse,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getUser } from "../utils/auth";

const services = [
  { icon: <FaStethoscope className="text-white text-3xl" />, title: "General Medicine", description: "Comprehensive consultations for all general health concerns.", color: "bg-blue-500" },
  { icon: <FaHeart className="text-white text-3xl" />, title: "Cardiology", description: "Heart health monitoring and cardiology consultations.", color: "bg-red-500" },
  { icon: <FaUserMd className="text-white text-3xl" />, title: "Dermatology", description: "Advanced skin care treatments and dermatology solutions.", color: "bg-green-500" },
  { icon: <FaBaby className="text-white text-3xl" />, title: "Pediatrics", description: "Child care services, check-ups, and pediatric consultations.", color: "bg-purple-500" },
  { icon: <FaSyringe className="text-white text-3xl" />, title: "Vaccinations", description: "Routine immunizations and specialized vaccination services.", color: "bg-pink-500" },
  { icon: <FaNotesMedical className="text-white text-3xl" />, title: "Medical Checkups", description: "Full body health checkups and preventive care solutions.", color: "bg-yellow-500" },
];

const additionalSections = [
  { icon: <FaClinicMedical className="text-white text-3xl" />, title: "Telemedicine", description: "Consult with doctors online from the comfort of your home.", color: "bg-indigo-500" },
  { icon: <FaAmbulance className="text-white text-3xl" />, title: "Emergency Care", description: "Quick response emergency services for urgent situations.", color: "bg-teal-500" },
  { icon: <FaFileMedicalAlt className="text-white text-3xl" />, title: "Health Records", description: "Digital access to your medical history ensuring accuracy and continuity.", color: "bg-purple-500" },
  { icon: <FaVial className="text-white text-3xl" />, title: "Lab Services", description: "Reliable laboratory testing with detailed reports for diagnosis.", color: "bg-pink-500" },
  { icon: <FaPrescription className="text-white text-3xl" />, title: "Pharmacy Services", description: "Access prescriptions and medicines directly from our platform.", color: "bg-yellow-500" },
  { icon: <FaUserNurse className="text-white text-3xl" />, title: "Nursing Care", description: "Professional in-home nursing support and healthcare assistance.", color: "bg-green-500" },
];

const stats = [
  { title: "Doctors Onboarded", value: "150+" },
  { title: "Appointments Completed", value: "12,000+" },
  { title: "Satisfied Patients", value: "8,500+" },
  { title: "Years of Experience", value: "10+" },
];

const Services: React.FC = () => {
  const navigate = useNavigate();
  const handleBooking = () => navigate("/booking");

  const user = getUser(); 
  const hasSidebar = !!user;

  return (
    <div className={`relative min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 px-6 md:px-16 z-10 ${hasSidebar ? "ml-64 pt-24" : "pt-12"}`}>
      
      {/* Floating abstract shapes */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float1"></div>
      <div className="absolute top-1/4 -right-32 w-80 h-80 bg-teal-300 rounded-full mix-blend-multiply filter blur-2xl opacity-25 animate-float2"></div>
      <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float3"></div>

      {/* Hero Section */}
      <section className="text-center mb-16 relative z-10">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-4">Our Services</h1>
        <p className="text-gray-700 text-lg md:text-xl max-w-3xl mx-auto">
          MediStack++ offers a wide range of healthcare services to ensure the wellbeing of every patient.
          Our team of experts provides top-notch care using the latest medical technology and best practices.
        </p>
      </section>

      {/* Main Service Cards */}
      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 relative z-10">
        {services.map((service, idx) => (
          <div key={idx} className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-8 text-center transform transition hover:-translate-y-2 hover:shadow-2xl">
            <div className={`h-20 w-20 mx-auto mb-6 flex items-center justify-center rounded-full ${service.color}`}>
              {service.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">{service.title}</h3>
            <p className="text-gray-600">{service.description}</p>
          </div>
        ))}
      </section>

      {/* Additional Sections */}
      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 relative z-10">
        {additionalSections.map((sec, idx) => (
          <div key={idx} className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-8 text-center transform transition hover:-translate-y-2 hover:shadow-2xl">
            <div className={`h-20 w-20 mx-auto mb-6 flex items-center justify-center rounded-full ${sec.color}`}>
              {sec.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">{sec.title}</h3>
            <p className="text-gray-600">{sec.description}</p>
          </div>
        ))}
      </section>

      {/* Statistics / Impact */}
      <section className="mb-16 text-center relative z-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-10">Our Impact</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white/60 backdrop-blur-md rounded-2xl shadow-md p-6 transform transition hover:-translate-y-1 hover:shadow-xl">
              <p className="text-2xl font-extrabold text-gray-800">{stat.value}</p>
              <p className="text-gray-600 mt-2">{stat.title}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call-to-Action */}
      <section className="text-center py-16 relative z-10">
        <h2 className="text-4xl font-bold text-gray-800 mb-6">Ready to Experience Our Services?</h2>
        <p className="text-gray-600 mb-6">Book your appointment now and get professional medical care with ease and reliability.</p>
        <button onClick={handleBooking} className="bg-gradient-to-r from-blue-600 via-teal-600 to-indigo-600 text-white font-semibold px-8 py-4 rounded-full hover:scale-105 transform transition shadow-lg">
          Book Now
        </button>
      </section>

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

export default Services;
