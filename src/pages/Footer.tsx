// src/components/Footer.tsx
import React, { useState } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaHeartbeat,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    alert(`Subscribed with ${email}!`);
    setEmail("");
  };

  return (
    <footer className="relative z-10 bg-gradient-to-r from-indigo-950 via-blue-900 to-teal-800 text-white">
      {/* Top section */}
      <div className="max-w-7xl mx-auto px-8 lg:px-12 py-16 grid grid-cols-1 md:grid-cols-5 gap-10 border-b border-white/10">
        {/* Brand / About */}
        <div className="md:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <FaHeartbeat className="text-pink-400 text-4xl" />
            <h2 className="text-3xl font-extrabold tracking-wider bg-gradient-to-r from-cyan-300 via-yellow-300 to-pink-400 bg-clip-text text-transparent">
              MediStack++
            </h2>
          </div>
          <p className="text-gray-300 leading-relaxed mb-6">
            Next-gen healthcare platform connecting patients, doctors, and
            services in one seamless experience.
          </p>
          <form
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row items-center gap-3"
          >
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full sm:w-auto px-4 py-2 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white font-semibold rounded-lg shadow-lg transition transform hover:scale-105"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-yellow-400">Quick Links</h3>
          <ul className="space-y-3 text-sm">
            <li>
              <Link
                to="/about"
                className="hover:text-cyan-300 transition-colors duration-300"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/services"
                className="hover:text-cyan-300 transition-colors duration-300"
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                to="/doctors"
                className="hover:text-cyan-300 transition-colors duration-300"
              >
                Our Doctors
              </Link>
            </li>
            <li>
              <Link
                to="/booking"
                className="hover:text-cyan-300 transition-colors duration-300"
              >
                Book Appointment
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-yellow-400">Contact Us</h3>
          <p className="text-gray-300 text-sm mb-1">📍 123 Health Street, Dhaka, Bangladesh</p>
          <p className="text-gray-300 text-sm mb-1">📧 support@medistack.com</p>
          <p className="text-gray-300 text-sm">☎ +880 1234 567890</p>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-yellow-400">Follow Us</h3>
          <div className="flex gap-4">
            {[
              { icon: <FaFacebookF />, link: "#" },
              { icon: <FaTwitter />, link: "#" },
              { icon: <FaLinkedinIn />, link: "#" },
              { icon: <FaInstagram />, link: "#" },
            ].map((s, idx) => (
              <a
                key={idx}
                href={s.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/30 backdrop-blur-md transition-all duration-300 transform hover:scale-110"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="py-6 text-center text-sm text-gray-400 backdrop-blur-md bg-black/20">
        <p>
          &copy; {new Date().getFullYear()}{" "}
          <span className="font-semibold text-white">MediStack++</span>. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
