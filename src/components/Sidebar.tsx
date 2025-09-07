// src/components/Sidebar.tsx
import React from "react";
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
} from "react-icons/fa";

type SidebarLink = {
  label: string;
  path: string;
  icon: React.ReactNode;
};

const Sidebar: React.FC = () => {
  const user = getUser(); // লগইন করা ইউজারের তথ্য
  const location = useLocation();

  // যদি ইউজার লগইন না করে থাকে, sidebar রেন্ডার হবে না
  if (!user) return null;

  // Role-based links
  const links: Record<string, SidebarLink[]> = {
    Admin: [
      { label: "Users", path: "/admin/users", icon: <FaUsers /> },
      { label: "Doctors", path: "/admin/doctors", icon: <FaUserMd /> },
      { label: "Appointments", path: "/admin/appointments", icon: <FaCalendarAlt /> },
      { label: "Departments", path: "/admin/departments", icon: <FaBuilding /> },
      { label: "Payments", path: "/admin/payments", icon: <FaCreditCard /> },
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

  // Active link styles
  const getLinkClasses = (path: string) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 ease-in-out
     ${
       location.pathname === path
         ? "bg-gradient-to-r from-blue-600 to-teal-500 text-white shadow-lg"
         : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
     }`;

  return (
    <aside className="w-64 bg-gradient-to-b from-white to-gray-50 h-screen pt-20 p-6 shadow-lg flex flex-col fixed top-14 left-0 z-40">
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
                <Link to={link.path} className={getLinkClasses(link.path)}>
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
  );
};

export default Sidebar;




