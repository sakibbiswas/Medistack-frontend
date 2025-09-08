//Responsive for mobile and pc 
// src/pages/patient/BookAppointment.tsx
import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import {
  useGetDepartmentsQuery,
  useGetDoctorsByDepartmentQuery,
} from "../../api/departmentApi";
import { useCreateAppointmentMutation } from "../../api/appointmentApi";
import { toast } from "react-hot-toast";

const BookAppointment: React.FC = () => {
  const [formData, setFormData] = useState({
    departmentId: "",
    doctorId: "",
    date: "",
    time: "",
  });
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);

  const { data: departments = [] } = useGetDepartmentsQuery();
  const { data: doctors = [] } = useGetDoctorsByDepartmentQuery(
    formData.departmentId,
    { skip: !formData.departmentId }
  );

  const [createAppointment, { isLoading }] = useCreateAppointmentMutation();

  // Load available slots when doctor changes
  useEffect(() => {
    if (!formData.doctorId || !doctors.length) return;
    const doctor = doctors.find((d) => d._id === formData.doctorId);
    setAvailableSlots(doctor?.availableSlots || []);
  }, [formData.doctorId, doctors]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.departmentId ||
      !formData.doctorId ||
      !formData.date ||
      !formData.time
    ) {
      return toast.error("⚠️ Please fill all fields");
    }
    try {
      await createAppointment(formData).unwrap();
      toast.success("✅ Appointment booked successfully!");
      setFormData({ departmentId: "", doctorId: "", date: "", time: "" });
      setAvailableSlots([]);
    } catch (err: any) {
      toast.error(err?.data?.message || err?.error || "Booking failed");
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-gray-100 relative overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 ml-0 lg:ml-64 p-6 pt-24 relative z-10 flex items-center justify-center">
        <div className="w-full max-w-lg bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-10 border border-gray-200">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Book an Appointment
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Department */}
            <div className="relative">
              <select
                name="departmentId"
                value={formData.departmentId}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-200"
                required
              >
                <option value="">Select Department</option>
                {departments.map((d) => (
                  <option key={d._id} value={d._id}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Doctor */}
            <div className="relative">
              <select
                name="doctorId"
                value={formData.doctorId}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-200 disabled:opacity-50"
                required
                disabled={!formData.departmentId || !doctors.length}
              >
                <option value="">Select Doctor</option>
                {doctors.map((doc) => (
                  <option key={doc._id} value={doc._id}>
                    {doc.name} ({doc.specialization})
                  </option>
                ))}
              </select>
            </div>

            {/* Date */}
            <div className="relative">
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-200"
                required
              />
            </div>

            {/* Time Slot */}
            <div className="relative">
              <select
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-200 disabled:opacity-50"
                required
                disabled={!availableSlots.length}
              >
                <option value="">Select Time</option>
                {availableSlots.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-blue-600 via-teal-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:scale-105 transform transition duration-200 disabled:opacity-50"
            >
              {isLoading ? "Booking..." : "Book Appointment"}
            </button>
          </form>
        </div>
      </main>

      {/* Floating Background Shapes */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float1"></div>
      <div className="absolute top-1/4 -right-32 w-80 h-80 bg-teal-300 rounded-full mix-blend-multiply filter blur-2xl opacity-25 animate-float2"></div>
      <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float3"></div>

      <style>{`
        @keyframes float1 { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-20px); } }
        @keyframes float2 { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(30px); } }
        @keyframes float3 { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-25px); } }
        .animate-float1 { animation: float1 6s ease-in-out infinite; }
        .animate-float2 { animation: float2 8s ease-in-out infinite; }
        .animate-float3 { animation: float3 7s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default BookAppointment;
