// src/components/Home/FAQ.tsx
import React, { useState } from "react";
import {
  FaCalendarAlt,
  FaUserShield,
  FaCreditCard,
  FaVideo,
  FaQuestionCircle,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";

interface FAQItem {
  question: string;
  answer: string;
  category: "Booking" | "Security" | "Payments" | "Consultation" | "Support";
}

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      category: "Booking",
      question: "How do I book an appointment?",
      answer:
        "Simply register as a patient and visit the booking page to select your preferred doctor and time.",
    },
    {
      category: "Booking",
      question: "Can I reschedule or cancel my appointment?",
      answer:
        "Yes! You can reschedule or cancel appointments from your dashboard anytime before 24 hours of the scheduled time.",
    },
    {
      category: "Consultation",
      question: "Are online consultations available?",
      answer:
        "Absolutely! You can consult our certified doctors online through secure video sessions at your convenience.",
    },
    {
      category: "Security",
      question: "Is my medical information secure?",
      answer:
        "Yes! All your medical records are encrypted and safely stored, accessible only by authorized personnel.",
    },
    {
      category: "Payments",
      question: "What payment methods are accepted?",
      answer:
        "We accept multiple payment options including credit/debit cards and mobile banking for a smooth experience.",
    },
  ];

  const categoryIcon = (category: FAQItem["category"]) => {
    switch (category) {
      case "Booking":
        return (
          <FaCalendarAlt className="text-blue-500 text-xl drop-shadow-md" />
        );
      case "Security":
        return (
          <FaUserShield className="text-red-500 text-xl drop-shadow-md" />
        );
      case "Payments":
        return (
          <FaCreditCard className="text-green-500 text-xl drop-shadow-md" />
        );
      case "Consultation":
        return (
          <FaVideo className="text-purple-500 text-xl drop-shadow-md" />
        );
      default:
        return (
          <FaQuestionCircle className="text-gray-500 text-xl drop-shadow-md" />
        );
    }
  };

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
      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center bg-gradient-to-r from-sky-600 to-blue-800 bg-clip-text text-transparent drop-shadow mb-12 animate-fadeIn">
          Frequently Asked Questions
        </h2>

        <div className="space-y-6">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl p-6 flex flex-col transform transition hover:-translate-y-2 hover:shadow-2xl animated-card"
            >
              <span className="absolute left-0 top-0 h-full w-1 rounded-l-3xl bg-gradient-to-b from-blue-400 to-purple-400 opacity-30"></span>

              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="flex items-center justify-between w-full text-left relative z-10"
              >
                <div className="flex items-center gap-3">
                  {categoryIcon(faq.category)}
                  <span className="font-semibold text-gray-800 text-lg">
                    {faq.question}
                  </span>
                </div>
                {openIndex === idx ? (
                  <FaChevronUp className="text-gray-500" />
                ) : (
                  <FaChevronDown className="text-gray-500" />
                )}
              </button>

              <div
                className={`text-gray-700 mt-3 text-left relative z-10 overflow-hidden transition-all duration-500 ease-in-out ${
                  openIndex === idx
                    ? "max-h-96 opacity-100 scale-100"
                    : "max-h-0 opacity-0 scale-95"
                }`}
              >
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-float { animation: float 10s ease-in-out infinite; }
        @keyframes fadeIn {
          from {opacity:0; transform:translateY(20px);}
          to {opacity:1; transform:translateY(0);}
        }
        .animate-fadeIn {animation: fadeIn 1.5s ease forwards;}
        .animated-card {transition: all 0.4s ease;}
        .animated-card:hover {transform: translateY(-10px) scale(1.03);}
      `}</style>
    </section>
  );
};

export default FAQ;
