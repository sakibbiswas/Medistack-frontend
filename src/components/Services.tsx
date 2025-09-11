
import React from "react";
import ServiceCard from "./ServiceCard";
import { useNavigate } from "react-router-dom";

// Services Data
const services = [
  {
    id: 1,
    title: "Neurology",
    description:
      "Our Neurology department is dedicated to diagnosing, treating, and managing disorders affecting the brain.",
    image:
      "https://d2csxpduxe849s.cloudfront.net/media/E32629C6-9347-4F84-81FEAEF7BFA342B3/D315ADB2-2967-48B6-BE3B61009343D69E/84855035-8C7E-4727-AB7CEC390287243C/WebsiteJpg_XL-FNEUR_Main%20Visual_Cyan_Website.jpg",
  },
  {
    id: 2,
    title: "Cardiac Surgery",
    description:
      "We deliver advanced cardiac surgery services with precision, compassion, and commitment to saving lives.",
    image:
      "https://t4.ftcdn.net/jpg/15/77/26/65/360_F_1577266573_gVbMQEKbwOeyH5IWlsF4wZq6CEtlJ1AJ.jpg",
  },
  {
    id: 3,
    title: "Bills & Insurance",
    description:
      "We assist patients in handling medical bills and insurance claims, making the process stress-free.",
    image: "https://images.pexels.com/photos/4386326/pexels-photo-4386326.jpeg",
  },
  {
    id: 4,
    title: "Cancer Screening",
    description:
      "Early detection is at the heart of better outcomes. Our cancer screening services identify potential risks early.",
    image: "https://images.pexels.com/photos/7088524/pexels-photo-7088524.jpeg",
  },
];

const Services: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="relative w-full mt-8 py-20 px-6 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-200 via-white to-blue-100"></div>

      {/* Floating Bubbles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 12 }).map((_, i) => (
          <span
            key={i}
            className="absolute w-16 h-16 bg-blue-300/20 rounded-full animate-float"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${8 + Math.random() * 6}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          ></span>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container  mx-auto text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-sky-600 to-blue-800 bg-clip-text text-transparent">
          Our Premium Services
        </h2>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-lg">
          We provide world-class healthcare with expert specialists and
          compassionate care.
        </p>
      </div>

      {/* Service Cards */}
      <div className="relative z-10 container mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-10">
        {services.map((service) => (
          <div
            key={service.id}
            className="transition-transform transform hover:scale-105"
          >
            <ServiceCard
              title={service.title}
              description={service.description}
              image={service.image}
              onClick={() => navigate(`/service/${service.id}`)}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;










