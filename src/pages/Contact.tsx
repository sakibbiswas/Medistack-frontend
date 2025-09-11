// src/pages/Contact.tsx
import React, { useEffect, useRef } from "react";
import type { FormEvent } from "react";
import {
  Stethoscope,
  HeartPulse,
  Briefcase,
  Users2,
  Newspaper,
} from "lucide-react";
import img from "../../src/assets/download.png";
import AOS from "aos";
import "aos/dist/aos.css";
import emailjs from "emailjs-com";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";

const Contact: React.FC = () => {
  const formRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    AOS.init({ once: true, duration: 600, easing: "ease-out-cubic", offset: 50 });
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;

    const sendingToast = toast.loading("Sending message...");

    emailjs
      .sendForm(
        "service_ykqjfoy",
        "template_hcrpgi7",
        formRef.current,
        "h1NvnufJ-KM-DrLRN"
      )
      .then(
        () => {
          toast.dismiss(sendingToast);
          toast.success("Message sent successfully! ✅", { duration: 4000 });
          formRef.current?.reset();
        },
        (error) => {
          toast.dismiss(sendingToast);
          console.error(error);
          toast.error("Failed to send message. ❌ Please try again.", { duration: 4000 });
        }
      );
  };

  const inputFields = [
    { name: "name", label: "Your Name", type: "text", required: true },
    { name: "email", label: "Email Address", type: "email", required: true },
    { name: "subject", label: "Subject", type: "text", required: true },
  ];

  const contactSections = [
    {
      Icon: HeartPulse,
      title: "Patient Support",
      text: "Need help with booking, medical records, or account access? Our 24/7 support team is here for you.",
    },
    {
      Icon: Users2,
      title: "Doctor Partnerships",
      text: "Join thousands of healthcare professionals already using MediStack to serve patients efficiently.",
    },
    {
      Icon: Briefcase,
      title: "Careers",
      text: "We’re hiring passionate people who want to transform healthcare through innovation.",
    },
    {
      Icon: Newspaper,
      title: "Media & Press",
      text: "For press inquiries, collaborations, or media coverage about MediStack’s impact.",
    },
  ];

  return (
    <section className="relative w-full py-24 px-6 md:px-16 overflow-hidden">
      <Toaster position="top-right" reverseOrder={false} />

      {/* Background Gradient */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-200 via-white to-blue-100"></div>

      {/* Floating Bubbles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 14 }).map((_, i) => (
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

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex justify-center mb-4">
            <Stethoscope className="w-12 h-12 text-blue-700 drop-shadow-lg" />
          </div>
          <h2 className="text-5xl font-extrabold bg-gradient-to-r from-sky-600 to-blue-800 bg-clip-text text-transparent drop-shadow mb-3">
            Contact MediStack
          </h2>
          <p className="text-gray-700 text-lg md:text-xl max-w-2xl mx-auto">
            Have questions, want to partner, or looking for support? Reach out to us and we’ll get back as soon as possible.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative overflow-hidden rounded-3xl shadow-2xl bg-white/80 backdrop-blur-xl"
          >
            <img
              src={img}
              alt="Contact Illustration"
              className="w-full max-h-[450px] object-contain rounded-3xl shadow-xl"
            />
          </motion.div>

          {/* Premium Contact Form */}
          <motion.form
            ref={formRef}
            onSubmit={handleSubmit}
            className="bg-white/70 backdrop-blur-2xl rounded-3xl shadow-2xl p-10 space-y-8 border border-white/30"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {inputFields.map((field, idx) => (
              <motion.div
                key={idx}
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + idx * 0.2 }}
              >
                <input
                  name={field.name}
                  type={field.type}
                  required={field.required}
                  placeholder=" "
                  className="peer w-full bg-white/30 border border-gray-300 text-gray-900 rounded-xl px-4 pt-6 pb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 placeholder-transparent"
                />
                <label className="absolute left-4 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-600">
                  {field.label}
                </label>
              </motion.div>
            ))}

            {/* Message */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              <textarea
                name="message"
                placeholder=" "
                className="peer w-full h-32 bg-white/30 border border-gray-300 text-gray-900 rounded-xl px-4 pt-6 pb-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-transparent transition"
                required
              ></textarea>
              <label className="absolute left-4 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-600">
                Message
              </label>
            </motion.div>

            {/* Button */}
            <motion.button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 via-cyan-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg py-3 hover:shadow-xl hover:scale-[1.02] focus:ring-4 focus:ring-blue-300 transition-transform duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              Send Message ✉️
            </motion.button>
          </motion.form>
        </div>

        {/* MediStack Contact Sections */}
        <motion.div
          className="mt-20 grid sm:grid-cols-2 md:grid-cols-4 gap-6 text-center relative z-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.2 }}
        >
          {contactSections.map((section, idx) => (
            <motion.div
              key={idx}
              className="flex flex-col items-center bg-white/80 backdrop-blur-xl rounded-xl shadow-xl p-6 cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{
                y: -8,
                scale: 1.05,
                boxShadow: "0px 12px 30px rgba(0,0,0,0.12)",
              }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <section.Icon className="w-10 h-10 text-blue-600 mb-3" />
              <h3 className="font-semibold text-gray-800">{section.title}</h3>
              <p className="text-gray-600 text-sm">{section.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 10s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Contact;
