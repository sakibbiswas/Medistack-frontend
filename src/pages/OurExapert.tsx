// src/components/OurExperts.tsx
import React, { useState } from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import pic from "../../src/assets/doctor.jpg";

type Expert = {
  id: number;
  name: string;
  title: string;
  image: string;
  alt?: string;
  socials?: {
    fb?: string;
    tw?: string;
    li?: string;
  };
};

const experts: Expert[] = [
  {
    id: 1,
    name: "Dr. John Smith",
    title: "Cardiology Specialist",
    image:
      "https://static.vecteezy.com/system/resources/thumbnails/026/375/249/small_2x/ai-generative-portrait-of-confident-male-doctor-in-white-coat-and-stethoscope-standing-with-arms-crossed-and-looking-at-camera-photo.jpg",
    alt: "Dr. John Smith",
    socials: { fb: "#", tw: "#", li: "#" },
  },
  {
    id: 2,
    name: "Dr. Sarah Lee",
    title: "Gynecology Specialist",
    image:
      "https://static.vecteezy.com/system/resources/thumbnails/028/287/555/small/an-indian-young-female-doctor-isolated-on-green-ai-generated-photo.jpg",
    alt: "Dr. Sarah Lee",
    socials: { fb: "#", tw: "#", li: "#" },
  },
  {
    id: 3,
    name: "Dr. Michael Brown",
    title: "Medicine Specialist",
    image:
      "https://t4.ftcdn.net/jpg/03/20/52/31/360_F_320523164_tx7Rdd7I2XDTvvKfz2oRuRpKOPE5z0ni.jpg",
    alt: "Dr. Michael Brown",
    socials: { fb: "#", tw: "#", li: "#" },
  },
  {
    id: 4,
    name: "Dr. Emily Davis",
    title: "Neurology Specialist",
    image:
      "https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=85",
    alt: "Dr. Emily Davis",
    socials: { fb: "#", tw: "#", li: "#" },
  },
];

const ExpertCard: React.FC<{ expert: Expert }> = ({ expert }) => {
  return (
    <div className="group relative bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-500 w-full max-w-xs sm:max-w-sm mx-auto transform hover:-translate-y-2">
      {/* Image */}
      <div className="w-full h-52 sm:h-64 overflow-hidden">
        <img
          src={expert.image}
          loading="lazy"
          alt={expert.alt || expert.name}
          className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
        />
      </div>

      {/* Overlay socials */}
      <div className="absolute left-0 right-0 bottom-20 sm:bottom-24 px-3 sm:px-4 opacity-0 group-hover:opacity-100 transition-all duration-500">
        <div className="backdrop-blur-md bg-white/40 rounded-full py-2 flex justify-center gap-3 sm:gap-4 shadow-md">
          <a
            href={expert.socials?.fb || "#"}
            aria-label="facebook"
            className="p-2 rounded-full bg-white/80 hover:bg-sky-500 hover:text-white transition text-sm sm:text-base"
          >
            <FaFacebookF />
          </a>
          <a
            href={expert.socials?.tw || "#"}
            aria-label="twitter"
            className="p-2 rounded-full bg-white/80 hover:bg-sky-400 hover:text-white transition text-sm sm:text-base"
          >
            <FaTwitter />
          </a>
          <a
            href={expert.socials?.li || "#"}
            aria-label="linkedin"
            className="p-2 rounded-full bg-white/80 hover:bg-blue-600 hover:text-white transition text-sm sm:text-base"
          >
            <FaLinkedinIn />
          </a>
        </div>
      </div>

      {/* Name & Title */}
      <div className="p-4 sm:p-5 text-center">
        <h3 className="font-bold text-base sm:text-lg text-slate-900 group-hover:text-sky-600 transition">
          {expert.name}
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">{expert.title}</p>
      </div>
    </div>
  );
};

const OurExperts: React.FC = () => {
  const navigate = useNavigate();
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const handleConfirmAppointment = () => {
    navigate("/login");
  };

  return (
    <section className="relative w-full mt-6 sm:mt-8 py-14 sm:py-20 px-4 sm:px-6 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-200 via-white to-blue-100"></div>

      {/* Floating Bubbles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 12 }).map((_, i) => (
          <span
            key={i}
            className="absolute w-10 h-10 sm:w-16 sm:h-16 bg-blue-300/20 rounded-full animate-float"
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
      <div className="relative z-10 max-w-7xl mx-auto text-center mb-10 sm:mb-14 px-2">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-sky-600 to-blue-800 bg-clip-text text-transparent">
          Our Medical Experts
        </h2>
        <p className="mt-3 sm:mt-4 text-slate-600 max-w-2xl mx-auto text-sm sm:text-lg">
          Meet our highly qualified and compassionate doctors ready to provide
          the best healthcare services for you.
        </p>
      </div>

      {/* Grid (Expert cards) */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10 max-w-7xl mx-auto">
        {experts.map((ex) => (
          <ExpertCard key={ex.id} expert={ex} />
        ))}
      </div>

      {/* CTA + Stats */}
      <div className="relative z-10 mt-14 sm:mt-20 flex flex-col md:flex-row items-center justify-between gap-8 sm:gap-10 bg-gradient-to-r from-sky-100 via-white to-sky-50 p-6 sm:p-10 rounded-2xl sm:rounded-3xl shadow-lg border border-sky-100">
        <div className="flex items-center gap-4 sm:gap-5 text-center sm:text-left">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFkfPeMXpU-xmzGX3lmA4p6GFJdIOnyjcnDg&s"
            alt="doctor-cta"
            className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-full shadow-lg ring-4 ring-sky-200"
          />
          <div>
            <h4 className="text-lg sm:text-xl font-bold text-slate-900">
              Get an Appointment Now!
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Book your appointment and connect with the best specialists
              instantly.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
          {[
            { num: "50", label: "Medical Experts" },
            { num: "300", label: "Hospital Rooms" },
            { num: "500", label: "Awards Won" },
            { num: "5000", label: "Happy Patients" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-xl sm:text-2xl font-extrabold text-sky-600">
                {stat.num}+
              </div>
              <div className="text-xs sm:text-sm text-slate-500">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* New Section: Image + Calendar */}
      <div className="relative z-10 mt-14 sm:mt-20 grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center max-w-7xl mx-auto">
        {/* Left: Doctor image */}
        <div>
          <img
            src={pic}
            alt="appointment-doctor"
            className="rounded-2xl sm:rounded-3xl shadow-2xl w-full object-cover border border-slate-100"
          />
        </div>

        {/* Right: Calendar / Appointment UI */}
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-10 border border-slate-100">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6 sm:mb-8">
            Book Your Appointment
          </h3>

          {/* Calendar */}
          <div className="grid grid-cols-7 gap-1.5 sm:gap-3 text-center text-xs sm:text-sm mb-6 sm:mb-8">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
              <div key={d} className="font-semibold text-slate-600">
                {d}
              </div>
            ))}
            {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`p-2 sm:p-3 rounded-lg transition ${
                  selectedDay === day
                    ? "bg-sky-600 text-white shadow-md"
                    : "hover:bg-sky-100 text-slate-700"
                }`}
              >
                {day}
              </button>
            ))}
          </div>

          {/* CTA button */}
          <button
            onClick={handleConfirmAppointment}
            className="w-full bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-700 hover:to-blue-800 text-white py-3 sm:py-4 rounded-lg sm:rounded-xl font-semibold shadow-lg transition-all text-sm sm:text-base"
          >
            Confirm Appointment
          </button>
        </div>
      </div>
    </section>
  );
};

export default OurExperts;
