// src/components/Navbar.tsx
import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { logout, getUser } from "../utils/auth";
import {
  FaBars,
  FaTimes,
  FaHome,
  FaUserMd,
  FaCalendarAlt,
  FaInfoCircle,
  FaLock,
  FaUserPlus,
  FaClipboardList,
} from "react-icons/fa";
import { Shield, Stethoscope } from "lucide-react";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = getUser();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setIsOpen(false);
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { label: "Home", path: "/landing", icon: <FaHome className="inline-block mr-2" /> },
    { label: "About", path: "/about", icon: <FaInfoCircle className="inline-block mr-2" /> },
    { label: "Services", path: "/services", icon: <Stethoscope className="inline-block mr-2 w-4 h-4" /> },
    { label: "Doctors", path: "/doctors", icon: <FaUserMd className="inline-block mr-2" /> },
    { label: "Booking", path: "/booking", icon: <FaCalendarAlt className="inline-block mr-2" /> },
    { label: "My Bookings", path: "/my-bookings", icon: <FaClipboardList className="inline-block mr-2" /> },
    { label: "Privacy", path: "/privacy", icon: <Shield className="inline-block mr-2 w-4 h-4" /> },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-indigo-950 via-blue-900 to-teal-800 text-white shadow-xl backdrop-blur-xl bg-opacity-95 border-b border-white/10 h-16">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center h-full">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 font-extrabold text-2xl md:text-3xl tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-yellow-300 to-pink-400 hover:scale-105 transition-transform duration-300"
          >
            <Stethoscope className="w-7 h-7 text-cyan-300" />
            MediStack++
          </Link>

          {/* Desktop Links + Auth */}
          <div className="hidden md:flex flex-1 justify-center items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative flex items-center text-sm font-semibold transition-all duration-200 px-2 py-1 ${
                  isActive(link.path) ? "text-yellow-400" : "text-white hover:text-cyan-300"
                }`}
              >
                {link.icon}
                {link.label}
                <span
                  className={`absolute left-0 -bottom-1 w-0 h-[2px] bg-gradient-to-r from-yellow-300 to-cyan-400 transition-all duration-300 ${
                    isActive(link.path) ? "w-full" : ""
                  }`}
                />
              </Link>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <>
                <span className="px-3 py-1 text-xs rounded-full bg-gradient-to-r from-indigo-500 to-cyan-600 text-white capitalize font-semibold shadow-md">
                  {user.role}
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 shadow-lg hover:scale-105"
                >
                  <FaLock /> Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 shadow-lg hover:scale-105"
                >
                  <FaLock /> Login
                </Link>
                <Link
                  to="/register"
                  className="flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 shadow-lg hover:scale-105"
                >
                  <FaUserPlus /> Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center">
            <button
              className="text-white text-2xl focus:outline-none hover:scale-110 transition-transform duration-200"
              onClick={toggleMenu}
            >
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 w-72 max-w-full h-full bg-gradient-to-b from-indigo-950 via-blue-900 to-teal-800 shadow-2xl transform transition-transform duration-300 ease-in-out z-50 backdrop-blur-2xl border-r border-white/10 flex flex-col md:hidden
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex justify-between items-center px-6 py-4 border-b border-white/20">
          <span className="font-extrabold text-white text-xl tracking-wider flex items-center gap-2">
            <Stethoscope className="w-6 h-6 text-cyan-300" />
            Menu
          </span>
          <button
            className="text-white text-2xl hover:rotate-90 transition-transform duration-300"
            onClick={toggleMenu}
          >
            <FaTimes />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-white py-3 px-4 rounded-lg font-medium tracking-wide shadow-sm transition-all duration-300 flex items-center ${
                isActive(link.path) ? "bg-yellow-400/20" : "hover:bg-white/10 hover:translate-x-2"
              }`}
              onClick={toggleMenu} // close sidebar on click
            >
              {link.icon}
              {link.label}
            </Link>
          ))}

          {user ? (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 px-4 py-2 rounded-lg text-sm font-semibold mt-6 w-full transition-all duration-300 text-white shadow-lg hover:scale-105"
            >
              <FaLock /> Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                onClick={toggleMenu}
                className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 px-4 py-2 rounded-lg text-sm font-semibold mt-6 w-full transition-all duration-300 text-white shadow-lg hover:scale-105"
              >
                <FaLock /> Login
              </Link>
              <Link
                to="/register"
                onClick={toggleMenu}
                className="flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 px-4 py-2 rounded-lg text-sm font-semibold mt-3 w-full transition-all duration-300 text-white shadow-lg hover:scale-105"
              >
                <FaUserPlus /> Register
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 animate-fadeIn md:hidden"
          onClick={toggleMenu}
        />
      )}
    </>
  );
};

export default Navbar;
