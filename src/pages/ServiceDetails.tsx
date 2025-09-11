// src/pages/ServiceDetails.tsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import AppointmentForm from "../components/AppointmentForm";
import Sidebar from "../components/Sidebar";

// Services Data
const services = {
  1: {
    title: "Neurology",
    image:
      "https://d2csxpduxe849s.cloudfront.net/media/E32629C6-9347-4F84-81FEAEF7BFA342B3/D315ADB2-2967-48B6-BE3B61009343D69E/84855035-8C7E-4727-AB7CEC390287243C/WebsiteJpg_XL-FNEUR_Main%20Visual_Cyan_Website.jpg",
    details: [
      "Comprehensive diagnosis and treatment of brain, spinal cord, and nerve disorders.",
      "Advanced facilities for stroke management, epilepsy care, and movement disorders.",
      "Highly experienced team of neurologists and neurosurgeons.",
      "Personalized care plans to improve recovery and long-term health.",
    ],
  },
  2: {
    title: "Cardiac Surgery",
    image:
      "https://t4.ftcdn.net/jpg/15/77/26/65/360_F_1577266573_gVbMQEKbwOeyH5IWlsF4wZq6CEtlJ1AJ.jpg",
    details: [
      "Expert team for open-heart surgery, bypass, and valve replacement.",
      "Minimally invasive techniques ensuring faster recovery.",
      "Comprehensive pre- and post-surgery cardiac rehabilitation.",
      "Cutting-edge monitoring and emergency response facilities.",
    ],
  },
  3: {
    title: "Bills & Insurance",
    image: "https://images.pexels.com/photos/4386326/pexels-photo-4386326.jpeg",
    details: [
      "Hassle-free processing of hospital bills and medical claims.",
      "Partnerships with leading insurance providers nationwide.",
      "Dedicated support staff to guide you through paperwork.",
      "Transparent billing system with real-time updates.",
    ],
  },
  4: {
    title: "Cancer Screening",
    image: "https://images.pexels.com/photos/7088524/pexels-photo-7088524.jpeg",
    details: [
      "Early detection programs for breast, cervical, and colon cancer.",
      "Latest screening technologies including MRI, CT, and PET scans.",
      "Specialized oncologists ensuring accurate diagnosis.",
      "Preventive care packages designed for long-term health monitoring.",
    ],
  },
};

// Dummy doctors data
const doctors = [
  { id: 1, name: "Dr. Ayesha Rahman", specialty: "Senior Neurologist", image: "https://randomuser.me/api/portraits/women/44.jpg" },
  { id: 2, name: "Dr. Tanvir Ahmed", specialty: "Cardiac Surgeon", image: "https://randomuser.me/api/portraits/men/45.jpg" },
  { id: 3, name: "Dr. Shirin Akter", specialty: "Oncologist", image: "https://randomuser.me/api/portraits/women/46.jpg" },
  { id: 4, name: "Dr. Farhan Hossain", specialty: "Insurance Advisor", image: "https://randomuser.me/api/portraits/men/47.jpg" },
];

const ServiceDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const service = services[Number(id) as keyof typeof services];

  if (!service) return <p>Service not found</p>;

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-blue-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <main className="flex-1 relative z-10 max-w-7xl mx-auto py-8 px-4 md:px-6 md:ml-64">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-40 pointer-events-none">
          <div className="bubbles">
            {[...Array(20)].map((_, i) => (
              <span
                key={i}
                className="bubble"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDuration: `${6 + Math.random() * 8}s`,
                  animationDelay: `${Math.random() * 4}s`,
                  width: `${20 + Math.random() * 30}px`,
                  height: `${20 + Math.random() * 30}px`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Back button */}
 <button
  onClick={() => navigate(-1)}
  className="inline-flex items-center gap-2 px-5 py-3 mt-3 mb-6 font-medium text-white bg-gradient-to-r from-sky-600 to-blue-700 rounded-xl shadow-lg hover:from-sky-700 hover:to-blue-800 hover:shadow-2xl transition-all duration-300"
>
  <span className="text-lg">←</span>
  Back to Services
</button>


        {/* Service Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center mb-12 md:mb-16">
          <div className="rounded-2xl overflow-hidden shadow-xl">
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-64 sm:h-80 md:h-96 object-cover transform hover:scale-105 transition duration-500"
            />
          </div>
          <div className="bg-white/90 backdrop-blur-lg p-6 sm:p-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">{service.title}</h2>
            <p className="text-gray-700 mt-2 sm:mt-3 text-sm sm:text-base md:text-lg">
              We provide world-class facilities to ensure your health and well-being. Our services include:
            </p>
            <ul className="mt-4 sm:mt-5 space-y-2 sm:space-y-3">
              {service.details.map((point, index) => (
                <li key={index} className="flex items-start space-x-2 sm:space-x-3 text-gray-800 text-sm sm:text-base md:text-base">
                  <span className="text-green-600 text-lg sm:text-xl">✔</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Doctors Section */}
        <div className="mb-12 md:mb-16">
          <h3 className="text-2xl sm:text-3xl md:text-3xl font-bold mb-6 sm:mb-8 text-gray-800 text-center">Meet Our Specialists</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {doctors.map((doctor) => (
              <div
                key={doctor.id}
                className="bg-white/90 backdrop-blur-md rounded-2xl shadow-md p-4 sm:p-6 text-center transform hover:scale-105 hover:shadow-2xl transition duration-300"
              >
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 object-cover rounded-full mx-auto mb-3 sm:mb-4 border-4 border-blue-100 shadow-sm"
                />
                <h4 className="font-semibold text-base sm:text-lg md:text-lg text-gray-900">{doctor.name}</h4>
                <p className="text-gray-600 text-xs sm:text-sm md:text-sm">{doctor.specialty}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Appointment Form */}
        <div className="bg-gradient-to-r from-blue-100 to-blue-50 p-6 sm:p-8 md:p-10 rounded-2xl shadow-xl border border-blue-200">
          <h3 className="text-2xl sm:text-3xl md:text-3xl font-bold mb-4 sm:mb-6 md:mb-6 text-gray-900 text-center">Book an Appointment</h3>
          <AppointmentForm />
        </div>
      </main>

      {/* Bubble Animation Styles */}
      <style>{`
        .bubbles {
          position: absolute;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }
        .bubble {
          position: absolute;
          bottom: -100px;
          background: rgba(59,130,246,0.25);
          border-radius: 50%;
          animation: rise linear infinite;
        }
        @keyframes rise {
          0% { transform: translateY(0) scale(1); opacity: 0.8; }
          50% { opacity: 0.4; }
          100% { transform: translateY(-120vh) scale(1.2); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default ServiceDetails;
