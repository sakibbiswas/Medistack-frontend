
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import ProtectedRoute from "./components/ProtectedRoute";

// 🔑 Auth
import Login from "./features/auth/Login";
import Register from "./features/auth/Register";

// 🛠️ Admin
import AdminDashboard from "./features/admin/Dashboard";
import Users from "./features/admin/Users";
import Doctors from "./features/admin/Doctors";
import Appointments from "./features/admin/Appointments";
import Departments from "./features/admin/Departments";
import Payments from "./features/admin/Payments";
import AdminAnalytics from "./features/admin/Analytics";

// 👨‍⚕️ Doctor
import DoctorDashboard from "./features/doctor/Dashboard";
import Availability from "./features/doctor/Availability";

// 🧑‍⚕️ Patient
import PatientDashboard from "./features/patient/Dashboard";
import BookAppointment from "./features/patient/BookAppointment";

// 🌍 Public Pages
import Landing from "./pages/Landing";
import About from "./pages/About";
import Services from "./pages/Services";
import DoctorsList from "./pages/DoctorsList";
import BookingPage from "./pages/BookingPage";
import MyBookings from "./pages/MyBookings";
import Privacy from "./pages/Privacy";

import { getUser } from "./utils/auth";

const App: React.FC = () => {
  const user = getUser();

  return (
    <>
      <Toaster position="top-right" />

      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 p-6 overflow-y-auto">
            <Routes>
              {/* 🌍 Public Pages */}
              <Route path="/" element={<Landing />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/doctors" element={<DoctorsList />} />
              <Route path="/booking" element={<BookingPage />} />
              <Route path="/my-bookings" element={<MyBookings />} />
              <Route path="/privacy" element={<Privacy />} />

              {/* 🔑 Auth */}
              <Route
                path="/login"
                element={user ? <Navigate to={`/${user.role.toLowerCase()}/dashboard`} replace /> : <Login />}
              />
              <Route
                path="/register"
                element={user ? <Navigate to={`/${user.role.toLowerCase()}/dashboard`} replace /> : <Register />}
              />

              {/* 🛠️ Admin */}
              <Route element={<ProtectedRoute allowedRoles={["Admin"]} />}>
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/users" element={<Users />} />
                <Route path="/admin/doctors" element={<Doctors />} />
                <Route path="/admin/appointments" element={<Appointments />} />
                <Route path="/admin/departments" element={<Departments />} />
                <Route path="/admin/payments" element={<Payments />} />
                <Route path="/admin/analytics" element={<AdminAnalytics />} />
              </Route>

              {/* 👨‍⚕️ Doctor */}
              <Route element={<ProtectedRoute allowedRoles={["Doctor"]} />}>
                <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
                <Route path="/doctor/availability" element={<Availability />} />
              </Route>

              {/* 🧑‍⚕️ Patient */}
              <Route element={<ProtectedRoute allowedRoles={["Patient"]} />}>
                <Route path="/patient/dashboard" element={<PatientDashboard />} />
                <Route path="/patient/book" element={<BookAppointment />} />
              </Route>

        {/* payment */}




              {/* Catch-all: redirect unknown routes to landing */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </>
  );
};

export default App;
