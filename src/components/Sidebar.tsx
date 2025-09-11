
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getUser } from "../utils/auth";
import {
  FaUsers,
  FaUserMd,
  FaCalendarAlt,
  FaBuilding,
  FaCreditCard,
  FaTachometerAlt,
  FaClipboardList,
  FaStethoscope,
  FaBars,
  FaTimes,
  FaHome,
} from "react-icons/fa";

type SidebarLink = {
  label: string;
  path: string;
  icon: React.ReactNode;
};

const Sidebar: React.FC = () => {
  const user = getUser();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false); // Mobile sidebar toggle

  if (!user) return null;

  const links: Record<string, SidebarLink[]> = {
    Admin: [
      { label: "Admin Dashboard", path: "/admin/dashboard", icon: <FaHome /> },
      { label: "Users", path: "/admin/users", icon: <FaUsers /> },
      { label: "Doctors", path: "/admin/doctors", icon: <FaUserMd /> },
      { label: "Appointments", path: "/admin/appointments", icon: <FaCalendarAlt /> },
      { label: "Departments", path: "/admin/departments", icon: <FaBuilding /> },
      { label: "Payments", path: "/admin/payments", icon: <FaCreditCard /> },
      { label: "Analytics", path: "/admin/analytics", icon: <FaTachometerAlt /> }, // ✅ New Analytics link
    ],
    Doctor: [
      { label: "Dashboard", path: "/doctor/dashboard", icon: <FaTachometerAlt /> },
      { label: "Availability", path: "/doctor/availability", icon: <FaClipboardList /> },
    ],
    Patient: [
      { label: "Dashboard", path: "/patient/dashboard", icon: <FaTachometerAlt /> },
      { label: "Book Appointment", path: "/patient/book", icon: <FaStethoscope /> },
    ],
  };

  const roleLinks = user.role && links[user.role] ? links[user.role] : [];

  const getLinkClasses = (path: string) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 ease-in-out
     ${
       location.pathname === path
         ? "bg-gradient-to-r from-blue-600 to-teal-500 text-white shadow-lg"
         : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
     }`;

  return (
    <>
      {/* Mobile hamburger button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-2xl text-blue-600 p-2 rounded-md bg-white shadow-md"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Sidebar overlay for mobile */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-30 z-40 transition-opacity md:hidden ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Sidebar */}
      <aside
        className={`w-64 bg-gradient-to-b from-white to-gray-50 h-screen pt-20 p-6 shadow-lg flex flex-col fixed top-0 left-0 z-50 transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:top-14 md:left-0`}
      >
        {/* Header */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-800">Dashboard</h3>
          <p className="text-sm text-gray-500 mt-1 capitalize">{user.role || "Guest"}</p>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-gray-200">
          <ul className="space-y-2">
            {roleLinks.length > 0 ? (
              roleLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={getLinkClasses(link.path)}
                    onClick={() => setIsOpen(false)} // Close on mobile after click
                  >
                    <span className="text-lg">{link.icon}</span>
                    <span className="flex-1">{link.label}</span>
                  </Link>
                </li>
              ))
            ) : (
              <li className="text-gray-400 italic">No accessible links</li>
            )}
          </ul>
        </nav>

        {/* Footer */}
        <div className="mt-6 text-center text-gray-400 text-xs">
          &copy; {new Date().getFullYear()} MediStack
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
