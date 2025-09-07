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
    <section className="relative overflow-hidden px-6 md:px-16 py-24 animated-gradient">
      <Toaster position="top-right" reverseOrder={false} />

      {/* Floating colorful shapes */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float1 -z-10"></div>
      <div className="absolute top-1/3 -right-32 w-80 h-80 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-float2 -z-10"></div>
      <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-float3 -z-10"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: -40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <div className="flex justify-center mb-4">
            <Stethoscope className="w-12 h-12 text-white drop-shadow-lg" />
          </div>
          <h2 className="text-5xl font-extrabold text-white drop-shadow-lg mb-3">
            Contact MediStack
          </h2>
          <p className="text-white text-lg md:text-xl max-w-2xl mx-auto drop-shadow-sm">
            Have questions, want to partner, or looking for support? Reach out to us and we’ll get back as soon as possible.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Illustration */}
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="relative overflow-hidden rounded-3xl shadow-2xl bg-white/80 backdrop-blur-xl">
            <img src={img} alt="Contact Illustration" className="w-full max-h-[450px] object-contain rounded-3xl shadow-xl" />
          </motion.div>

          {/* Form */}
          <motion.form ref={formRef} onSubmit={handleSubmit} className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-10 space-y-6 border border-white/30" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
            {inputFields.map((field, idx) => (
              <motion.div key={idx} className="flex flex-col space-y-2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 + idx * 0.2 }}>
                <label className="text-gray-800 text-sm font-medium">{field.label}</label>
                <input name={field.name} type={field.type} required={field.required} placeholder={field.label} className="w-full bg-white/70 border border-white/50 text-gray-800 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 placeholder-gray-400" />
              </motion.div>
            ))}

            {/* Message */}
            <motion.div className="flex flex-col space-y-2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 1 }}>
              <label className="text-gray-800 text-sm font-medium">Message</label>
              <textarea name="message" placeholder="Write your message..." className="w-full h-32 bg-white/70 border border-white/50 text-gray-800 rounded-xl p-4 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 placeholder-gray-400" required></textarea>
            </motion.div>

            <motion.button type="submit" className="w-full bg-gradient-to-r from-blue-600 via-teal-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg py-3 hover:scale-105 hover:shadow-2xl transition-transform duration-300" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              Send Message
            </motion.button>
          </motion.form>
        </div>

        {/* MediStack Contact Sections */}
        <motion.div className="mt-20 grid sm:grid-cols-2 md:grid-cols-4 gap-6 text-center relative z-10" initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ staggerChildren: 0.2 }}>
          {contactSections.map((section, idx) => (
            <motion.div key={idx} className="flex flex-col items-center bg-white/80 backdrop-blur-xl rounded-xl shadow-xl p-6 cursor-pointer" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} whileHover={{ y: -8, scale: 1.05, boxShadow: "0px 12px 30px rgba(0,0,0,0.12)" }} transition={{ duration: 0.5, delay: idx * 0.1 }}>
              <section.Icon className="w-10 h-10 text-blue-600 mb-3" />
              <h3 className="font-semibold text-gray-800">{section.title}</h3>
              <p className="text-gray-600 text-sm">{section.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Animations */}
      <style>{`
        /* Animated Gradient Background */
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

        /* Floating */
        @keyframes float1 {0%,100% {transform: translateY(0);} 50% {transform: translateY(-25px);} }
        @keyframes float2 {0%,100% {transform: translateY(0);} 50% {transform: translateY(20px);} }
        @keyframes float3 {0%,100% {transform: translateY(0);} 50% {transform: translateY(-20px);} }
        .animate-float1 {animation: float1 7s ease-in-out infinite;}
        .animate-float2 {animation: float2 9s ease-in-out infinite;}
        .animate-float3 {animation: float3 8s ease-in-out infinite;}
      `}</style>
    </section>
  );
};

export default Contact;
