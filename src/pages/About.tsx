// // src/pages/About.tsx
// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { FaBullseye, FaEye, FaUsers, FaHeartbeat, FaCalendarCheck } from "react-icons/fa";
// import { getUser } from "../utils/auth";

// const About: React.FC = () => {
//   const navigate = useNavigate();
//   const user = getUser();

//   const team = [
//     { name: "Dr. Alice Morgan", role: "CEO", color: "bg-blue-500" },
//     { name: "Mr. James Carter", role: "CTO", color: "bg-green-500" },
//     { name: "Ms. Olivia Brown", role: "Head of Operations", color: "bg-purple-500" },
//     { name: "Mr. Liam Smith", role: "Lead Developer", color: "bg-yellow-500" },
//   ];

//   const stats = [
//     { title: "Doctors Onboarded", value: "150+", icon: <FaUsers className="text-white text-2xl" /> },
//     { title: "Appointments Completed", value: "12,000+", icon: <FaCalendarCheck className="text-white text-2xl" /> },
//     { title: "Satisfied Patients", value: "8,500+", icon: <FaHeartbeat className="text-white text-2xl" /> },
//     { title: "Years of Experience", value: "10+", icon: <FaEye className="text-white text-2xl" /> },
//   ];

//   const testimonials = [
//     {
//       name: "Emily Johnson",
//       role: "Patient",
//       text: "MediStack++ made booking appointments effortless. Quick, reliable, and easy to use!",
//     },
//     {
//       name: "Dr. Robert Lee",
//       role: "Cardiologist",
//       text: "Managing patients is much simpler now. The platform saves so much time and improves care quality.",
//     },
//   ];

//   const handleBooking = () => navigate("/booking");

//   return (
//     <div
//       className={`relative overflow-hidden min-h-screen py-16 px-6 md:px-16 ${
//         user ? "ml-64" : ""
//       } pt-24 bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100`}
//     >
//       {/* Professional floating shapes */}
//       <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float1"></div>
//       <div className="absolute top-1/4 -right-32 w-80 h-80 bg-teal-300 rounded-full mix-blend-multiply filter blur-2xl opacity-25 animate-float2"></div>
//       <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float3"></div>

//       {/* Hero Section */}
//       <section className="text-center mb-16 relative z-10">
//         <h1 className="text-5xl font-extrabold text-gray-800 mb-4">About MediStack++</h1>
//         <p className="text-gray-700 text-lg md:text-xl max-w-3xl mx-auto">
//           MediStack++ is a modern healthcare platform designed to make doctor appointments simple,
//           transparent, and accessible. Our mission is to bridge the gap between patients, doctors,
//           and healthcare providers using cutting-edge technology.
//         </p>
//       </section>

//       {/* Mission & Vision */}
//       <section className="grid md:grid-cols-2 gap-10 mb-16 relative z-10">
//         <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-8 flex flex-col items-center text-center hover:-translate-y-2 hover:shadow-2xl transition">
//           <FaBullseye className="text-blue-500 text-4xl mb-4" />
//           <h2 className="text-2xl font-semibold mb-4 text-blue-700">Our Mission</h2>
//           <p className="text-gray-700">
//             Empower patients and healthcare providers with a seamless digital experience,
//             enabling efficient appointments, better communication, and improved healthcare outcomes.
//           </p>
//         </div>
//         <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-8 flex flex-col items-center text-center hover:-translate-y-2 hover:shadow-2xl transition">
//           <FaEye className="text-teal-500 text-4xl mb-4" />
//           <h2 className="text-2xl font-semibold mb-4 text-teal-700">Our Vision</h2>
//           <p className="text-gray-700">
//             To be the most trusted and innovative healthcare platform, connecting people and professionals,
//             making healthcare accessible for everyone.
//           </p>
//         </div>
//       </section>

//       {/* Core Values */}
//       <section className="mb-16 relative z-10">
//         <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Our Core Values</h2>
//         <div className="grid md:grid-cols-3 gap-8">
//           {[
//             { title: "Transparency", desc: "Open and clear communication between patients and healthcare providers.", color: "text-blue-600" },
//             { title: "Efficiency", desc: "Streamlined appointment booking and management for everyone.", color: "text-green-600" },
//             { title: "Innovation", desc: "Leveraging technology to solve real-world healthcare challenges.", color: "text-purple-600" },
//           ].map((val, idx) => (
//             <div
//               key={idx}
//               className="bg-white/60 backdrop-blur-md rounded-2xl shadow-md p-6 text-center hover:-translate-y-1 hover:shadow-xl transition"
//             >
//               <h3 className={`text-xl font-semibold mb-2 ${val.color}`}>{val.title}</h3>
//               <p className="text-gray-700">{val.desc}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Statistics */}
//       <section className="mb-16 text-center relative z-10">
//         <h2 className="text-3xl font-bold text-gray-800 mb-10">Our Impact</h2>
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//           {stats.map((stat, idx) => (
//             <div
//               key={idx}
//               className="bg-gradient-to-tr from-blue-500 to-teal-400 rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center text-white hover:-translate-y-1 hover:shadow-xl transition"
//             >
//               <div className="mb-2">{stat.icon}</div>
//               <p className="text-2xl font-extrabold">{stat.value}</p>
//               <p className="mt-1 text-sm">{stat.title}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Testimonials */}
//       <section className="mb-16 relative z-10">
//         <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Testimonials</h2>
//         <div className="grid md:grid-cols-2 gap-8">
//           {testimonials.map((t, idx) => (
//             <div
//               key={idx}
//               className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-6 hover:-translate-y-1 hover:shadow-xl transition"
//             >
//               <p className="text-gray-700 italic mb-4">"{t.text}"</p>
//               <p className="font-semibold text-gray-800">{t.name}</p>
//               <p className="text-gray-500 text-sm">{t.role}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Team */}
//       <section className="mb-16 relative z-10">
//         <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Meet Our Team</h2>
//         <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
//           {team.map((member, idx) => (
//             <div
//               key={idx}
//               className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-6 text-center hover:-translate-y-1 hover:shadow-xl transition"
//             >
//               <div
//                 className={`h-32 w-32 mx-auto mb-4 rounded-full flex items-center justify-center text-3xl font-bold text-white ${member.color}`}
//               >
//                 {member.name.split(" ").map((n) => n[0]).join("")}
//               </div>
//               <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
//               <p className="text-gray-500">{member.role}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Call-to-Action */}
//       <section className="text-center py-16 relative z-10">
//         <h2 className="text-4xl font-bold text-gray-800 mb-6">Ready to Book Your Appointment?</h2>
//         <p className="text-gray-600 mb-6">
//           Join thousands of patients who trust MediStack++ for quick and reliable healthcare.
//         </p>
//         <button
//           onClick={handleBooking}
//           className="bg-gradient-to-r from-blue-600 via-teal-600 to-indigo-600 text-white font-semibold px-8 py-4 rounded-full hover:scale-105 transform transition shadow-lg"
//         >
//           Book Now
//         </button>
//       </section>

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

// export default About;





























//Responsive for mobile and pc 
// src/pages/About.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBullseye,
  FaEye,
  FaUsers,
  FaHeartbeat,
  FaCalendarCheck,
} from "react-icons/fa";
import { getUser } from "../utils/auth";

const About: React.FC = () => {
  const navigate = useNavigate();
  const user = getUser();

  const team = [
    { name: "Dr. Alice Morgan", role: "CEO", color: "bg-blue-500" },
    { name: "Mr. James Carter", role: "CTO", color: "bg-green-500" },
    { name: "Ms. Olivia Brown", role: "Head of Operations", color: "bg-purple-500" },
    { name: "Mr. Liam Smith", role: "Lead Developer", color: "bg-yellow-500" },
  ];

  const stats = [
    {
      title: "Doctors Onboarded",
      value: "150+",
      icon: <FaUsers className="text-white text-2xl" />,
    },
    {
      title: "Appointments Completed",
      value: "12,000+",
      icon: <FaCalendarCheck className="text-white text-2xl" />,
    },
    {
      title: "Satisfied Patients",
      value: "8,500+",
      icon: <FaHeartbeat className="text-white text-2xl" />,
    },
    {
      title: "Years of Experience",
      value: "10+",
      icon: <FaEye className="text-white text-2xl" />,
    },
  ];

  const testimonials = [
    {
      name: "Emily Johnson",
      role: "Patient",
      text: "MediStack++ made booking appointments effortless. Quick, reliable, and easy to use!",
    },
    {
      name: "Dr. Robert Lee",
      role: "Cardiologist",
      text: "Managing patients is much simpler now. The platform saves so much time and improves care quality.",
    },
  ];

  const handleBooking = () => navigate("/booking");

  return (
    <div
      className={`relative overflow-hidden min-h-screen py-16 px-6 md:px-16 pt-24 bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 
      ${user ? "md:ml-64" : ""}`} // ✅ Sidebar only pushes content on desktop
    >
      {/* Floating shapes */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float1"></div>
      <div className="absolute top-1/4 -right-32 w-80 h-80 bg-teal-300 rounded-full mix-blend-multiply filter blur-2xl opacity-25 animate-float2"></div>
      <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float3"></div>

      {/* Hero */}
      <section className="text-center mb-16 relative z-10">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-4">
          About MediStack++
        </h1>
        <p className="text-gray-700 text-lg md:text-xl max-w-3xl mx-auto">
          MediStack++ is a modern healthcare platform designed to make doctor
          appointments simple, transparent, and accessible. Our mission is to
          bridge the gap between patients, doctors, and healthcare providers
          using cutting-edge technology.
        </p>
      </section>

      {/* Mission & Vision */}
      <section className="grid md:grid-cols-2 gap-10 mb-16 relative z-10">
        <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-8 flex flex-col items-center text-center hover:-translate-y-2 hover:shadow-2xl transition">
          <FaBullseye className="text-blue-500 text-4xl mb-4" />
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">
            Our Mission
          </h2>
          <p className="text-gray-700">
            Empower patients and healthcare providers with a seamless digital
            experience, enabling efficient appointments, better communication,
            and improved healthcare outcomes.
          </p>
        </div>
        <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-8 flex flex-col items-center text-center hover:-translate-y-2 hover:shadow-2xl transition">
          <FaEye className="text-teal-500 text-4xl mb-4" />
          <h2 className="text-2xl font-semibold mb-4 text-teal-700">
            Our Vision
          </h2>
          <p className="text-gray-700">
            To be the most trusted and innovative healthcare platform,
            connecting people and professionals, making healthcare accessible
            for everyone.
          </p>
        </div>
      </section>

      {/* Core Values */}
      <section className="mb-16 relative z-10">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
          Our Core Values
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Transparency",
              desc: "Open and clear communication between patients and healthcare providers.",
              color: "text-blue-600",
            },
            {
              title: "Efficiency",
              desc: "Streamlined appointment booking and management for everyone.",
              color: "text-green-600",
            },
            {
              title: "Innovation",
              desc: "Leveraging technology to solve real-world healthcare challenges.",
              color: "text-purple-600",
            },
          ].map((val, idx) => (
            <div
              key={idx}
              className="bg-white/60 backdrop-blur-md rounded-2xl shadow-md p-6 text-center hover:-translate-y-1 hover:shadow-xl transition"
            >
              <h3 className={`text-xl font-semibold mb-2 ${val.color}`}>
                {val.title}
              </h3>
              <p className="text-gray-700">{val.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="mb-16 text-center relative z-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-10">Our Impact</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-tr from-blue-500 to-teal-400 rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center text-white hover:-translate-y-1 hover:shadow-xl transition"
            >
              <div className="mb-2">{stat.icon}</div>
              <p className="text-2xl font-extrabold">{stat.value}</p>
              <p className="mt-1 text-sm">{stat.title}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="mb-16 relative z-10">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
          Testimonials
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-6 hover:-translate-y-1 hover:shadow-xl transition"
            >
              <p className="text-gray-700 italic mb-4">"{t.text}"</p>
              <p className="font-semibold text-gray-800">{t.name}</p>
              <p className="text-gray-500 text-sm">{t.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="mb-16 relative z-10">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
          Meet Our Team
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
          {team.map((member, idx) => (
            <div
              key={idx}
              className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-6 text-center hover:-translate-y-1 hover:shadow-xl transition"
            >
              <div
                className={`h-32 w-32 mx-auto mb-4 rounded-full flex items-center justify-center text-3xl font-bold text-white ${member.color}`}
              >
                {member.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
              <p className="text-gray-500">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-16 relative z-10">
        <h2 className="text-4xl font-bold text-gray-800 mb-6">
          Ready to Book Your Appointment?
        </h2>
        <p className="text-gray-600 mb-6">
          Join thousands of patients who trust MediStack++ for quick and
          reliable healthcare.
        </p>
        <button
          onClick={handleBooking}
          className="bg-gradient-to-r from-blue-600 via-teal-600 to-indigo-600 text-white font-semibold px-8 py-4 rounded-full hover:scale-105 transform transition shadow-lg"
        >
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

export default About;
