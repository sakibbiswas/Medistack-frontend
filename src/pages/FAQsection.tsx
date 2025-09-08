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
    { category: "Booking", question: "How do I book an appointment?", answer: "Simply register as a patient and visit the booking page to select your preferred doctor and time." },
    { category: "Booking", question: "Can I reschedule or cancel my appointment?", answer: "Yes! You can reschedule or cancel appointments from your dashboard anytime before 24 hours of the scheduled time." },
    { category: "Consultation", question: "Are online consultations available?", answer: "Absolutely! You can consult our certified doctors online through secure video sessions at your convenience." },
    { category: "Security", question: "Is my medical information secure?", answer: "Yes! All your medical records are encrypted and safely stored, accessible only by authorized personnel." },
    { category: "Payments", question: "What payment methods are accepted?", answer: "We accept multiple payment options including credit/debit cards and mobile banking for a smooth experience." },
  ];

  const categoryIcon = (category: FAQItem["category"]) => {
    switch (category) {
      case "Booking": return <FaCalendarAlt className="text-blue-500 text-xl drop-shadow-md" />;
      case "Security": return <FaUserShield className="text-red-500 text-xl drop-shadow-md" />;
      case "Payments": return <FaCreditCard className="text-green-500 text-xl drop-shadow-md" />;
      case "Consultation": return <FaVideo className="text-purple-500 text-xl drop-shadow-md" />;
      default: return <FaQuestionCircle className="text-gray-500 text-xl drop-shadow-md" />;
    }
  };

  return (
    <section className="relative overflow-hidden px-6 md:px-16 py-20 animated-gradient">
      {/* Content wrapper - centered and responsive */}
      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="text-5xl font-extrabold text-center text-white drop-shadow-lg mb-12 animate-fadeIn">
          Frequently Asked Questions
        </h2>

        <div className="space-y-6">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 flex flex-col transform transition hover:-translate-y-2 hover:shadow-2xl hover:bg-white/90 animated-card"
            >
              <span className="absolute left-0 top-0 h-full w-1 rounded-l-3xl bg-gradient-to-b from-blue-400 to-purple-400 opacity-30"></span>

              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="flex items-center justify-between w-full text-left relative z-10"
              >
                <div className="flex items-center gap-3">
                  {categoryIcon(faq.category)}
                  <span className="font-semibold text-gray-800 text-lg">{faq.question}</span>
                </div>
                {openIndex === idx ? <FaChevronUp className="text-gray-500" /> : <FaChevronDown className="text-gray-500" />}
              </button>

              <div
                className={`text-gray-700 mt-3 text-left relative z-10 overflow-hidden transition-all duration-500 ease-in-out ${
                  openIndex === idx ? "max-h-96 opacity-100 scale-100" : "max-h-0 opacity-0 scale-95"
                }`}
              >
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Floating shapes */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float1 -z-10"></div>
        <div className="absolute top-1/3 -right-32 w-80 h-80 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-float2 -z-10"></div>
        <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-float3 -z-10"></div>
      </div>

      <style>{`
        .animated-gradient {
          background: linear-gradient(-45deg, #ff9a9e, #fad0c4, #a1c4fd, #c2e9fb);
          background-size: 400% 400%;
          animation: gradientMove 15s ease infinite;
        }
        @keyframes gradientMove {0% {background-position:0% 50%;}50%{background-position:100% 50%;}100%{background-position:0%50%;}}
        @keyframes float1 {0%,100% {transform: translateY(0);}50%{transform:translateY(-25px);}}
        @keyframes float2 {0%,100% {transform: translateY(0);}50%{transform:translateY(20px);}}
        @keyframes float3 {0%,100% {transform: translateY(0);}50%{transform:translateY(-20px);}}
        .animate-float1 {animation: float1 7s ease-in-out infinite;}
        .animate-float2 {animation: float2 9s ease-in-out infinite;}
        .animate-float3 {animation: float3 8s ease-in-out infinite;}
        @keyframes fadeIn { from {opacity:0; transform:translateY(20px);} to {opacity:1; transform:translateY(0);} }
        .animate-fadeIn {animation: fadeIn 1.5s ease forwards;}
        .animated-card {transition: all 0.4s ease;}
        .animated-card:hover {transform: translateY(-10px) scale(1.03);}
      `}</style>
    </section>
  );
};

export default FAQ;
