// src/pages/Meet.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUserMd, FaHeartbeat, FaStethoscope, FaBrain } from "react-icons/fa";


const Meet: React.FC = () => {
  const navigate = useNavigate();


  const doctors = [
    {
      name: "Dr. John Smith",
      specialization: "Cardiologist",
      icon: (
        <FaHeartbeat className="text-5xl text-pink-500 drop-shadow-md" />
      ),
    },
    {
      name: "Dr. Emily Johnson",
      specialization: "Dermatologist",
      icon: <FaUserMd className="text-5xl text-sky-500 drop-shadow-md" />,
    },
    {
      name: "Dr. Alex Brown",
      specialization: "Pediatrician",
      icon: (
        <FaStethoscope className="text-5xl text-green-500 drop-shadow-md" />
      ),
    },
    {
      name: "Dr. Sophia Davis",
      specialization: "Neurologist",
      icon: <FaBrain className="text-5xl text-purple-500 drop-shadow-md" />,
    },
  ];

  const testimonials = [
    {
      text: "MediStack++ made booking appointments so easy and hassle-free!",
      patient: "Emily Parker",
    },
    {
      text: "The platform is intuitive and saves me a lot of time managing appointments.",
      patient: "Robert Wilson",
    },
    {
      text: "I love how secure and user-friendly the system is. Highly recommended!",
      patient: "Sophia Martinez",
    },
    {
      text: "Thanks to MediStack++, I can connect with top doctors anytime.",
      patient: "Daniel Thompson",
    },
  ];

  const pricing = [
    {
      plan: "Free",
      price: "$0/month",
      description: "Basic access to our platform",
    },
    {
      plan: "Pro",
      price: "$9.99/month",
      description: "Advanced features for regular users",
    },
    {
      plan: "Premium",
      price: "$19.99/month",
      description: "Exclusive features and faster support",
    },
    {
      plan: "Enterprise",
      price: "Custom Pricing",
      description: "Tailored solutions for organizations",
    },
  ];

  const handleBooking = () => navigate("/booking");

  return (
    <section className="relative overflow-hidden px-6 md:px-16 py-20 animated-gradient">
      {/* Floating shapes */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float1 -z-10"></div>
      <div className="absolute top-1/3 -right-32 w-80 h-80 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-float2 -z-10"></div>
      <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-float3 -z-10"></div>

      {/* Content wrapper */}
      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* Doctors Showcase */}
        <div className="text-center mb-20">
          <h2 className="text-5xl font-extrabold text-white drop-shadow-lg mb-12 animate-fadeIn">
            Meet Our Doctors
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {doctors.map((doc, i) => (
              <div
                key={i}
                className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 text-center animated-card"
              >
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-pink-400 to-sky-400 blur-xl opacity-20 -z-10"></div>
                <div className="flex items-center justify-center h-32 w-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-pink-100 to-sky-100 shadow-inner">
                  {doc.icon}
                </div>
                <h3 className="text-2xl font-bold mb-1 text-gray-800">
                  {doc.name}
                </h3>
                <p className="text-gray-600 mb-4">{doc.specialization}</p>
                <button
                  onClick={handleBooking}
                  className="bg-gradient-to-r from-pink-500 via-purple-500 to-sky-500 text-white font-semibold px-6 py-2 rounded-full hover:scale-110 transform transition shadow-lg"
                >
                  Book Now
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="text-center mb-20">
          <h2 className="text-5xl font-extrabold text-white drop-shadow-lg mb-12 animate-fadeIn">
            What Our Patients Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {testimonials.map((t, i) => (
              <blockquote
                key={i}
                className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 italic text-gray-700 animated-card"
              >
                <p className="mb-4">“{t.text}”</p>
                <p className="font-semibold text-gray-800 text-right">
                  - {t.patient}
                </p>
              </blockquote>
            ))}
          </div>
        </div>

        {/* Pricing */}
        <div className="text-center">
          <h2 className="text-5xl font-extrabold text-white drop-shadow-lg mb-12 animate-fadeIn">
            Affordable Pricing
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {pricing.map((p, i) => (
              <div
                key={i}
                className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-lg p-8 text-center animated-card"
              >
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-green-400 to-blue-400 blur-xl opacity-20 -z-10"></div>
                <h3 className="text-2xl font-bold mb-2 text-gray-800">
                  {p.plan}
                </h3>
                <p className="text-purple-600 font-extrabold text-3xl mb-2">
                  {p.price}
                </p>
                <p className="text-gray-600 mb-4">{p.description}</p>
                <button
                  onClick={handleBooking}
                  className="bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 text-white font-semibold px-6 py-2 rounded-full hover:scale-110 transform transition shadow-lg"
                >
                  Choose Plan
                </button>
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
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes float1 {0%,100% {transform: translateY(0);}50%{transform:translateY(-25px);}}
        @keyframes float2 {0%,100% {transform: translateY(0);}50%{transform:translateY(20px);}}
        @keyframes float3 {0%,100% {transform: translateY(0);}50%{transform:translateY(-20px);}}
        .animate-float1 {animation: float1 7s ease-in-out infinite;}
        .animate-float2 {animation: float2 9s ease-in-out infinite;}
        .animate-float3 {animation: float3 8s ease-in-out infinite;}

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 1.5s ease forwards; }

        .animated-card { transition: all 0.4s ease; }
        .animated-card:hover { transform: translateY(-10px) scale(1.03); }
      `}</style>
    </section>
  );
};

export default Meet;
