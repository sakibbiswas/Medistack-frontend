// Responsive Doctors Management Page
import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Loader from "../../components/Loader";
import toast, { Toaster } from "react-hot-toast";

import {
  useGetDoctorsQuery,
  useCreateDoctorMutation,
  useDeleteDoctorMutation,
  useUpdateAvailabilityMutation,
} from "../../api/doctorApi";
import { useGetDepartmentsQuery } from "../../api/departmentApi";
import { FaPlus, FaClock, FaUserMd, FaTimes } from "react-icons/fa";

interface DoctorForm {
  name: string;
  email: string;
  password: string;
  specialization: string;
  departmentId: string;
}

const Doctors: React.FC = () => {
  const { data: doctors, isLoading: loadingDoctors } = useGetDoctorsQuery();
  const { data: departments } = useGetDepartmentsQuery();
  const [createDoctor, { isLoading: creating }] = useCreateDoctorMutation();
  const [deleteDoctor] = useDeleteDoctorMutation();
  const [updateAvailability] = useUpdateAvailabilityMutation();

  const [form, setForm] = useState<DoctorForm>({
    name: "",
    email: "",
    password: "",
    specialization: "",
    departmentId: "",
  });

  const [slots, setSlots] = useState<string[]>([]);
  const [slotInput, setSlotInput] = useState("");

  const [editSlots, setEditSlots] = useState<string[]>([]);
  const [editSlotInput, setEditSlotInput] = useState("");
  const [selectedDoctorId, setSelectedDoctorId] = useState<string | null>(null);

  // --- Handlers ---
  const handleAddSlot = () => {
    if (!slotInput.trim()) return;
    setSlots([...slots, slotInput.trim()]);
    setSlotInput("");
  };

  const handleRemoveSlot = (slot: string) =>
    setSlots(slots.filter((s) => s !== slot));

  const handleCreateDoctor = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createDoctor({ ...form, availableSlots: slots }).unwrap();
      toast.success("Doctor created successfully!");
      setForm({
        name: "",
        email: "",
        password: "",
        specialization: "",
        departmentId: "",
      });
      setSlots([]);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to create doctor");
    }
  };

  const handleAddEditSlot = () => {
    if (!editSlotInput.trim()) return;
    setEditSlots([...editSlots, editSlotInput.trim()]);
    setEditSlotInput("");
  };

  const handleRemoveEditSlot = (slot: string) =>
    setEditSlots(editSlots.filter((s) => s !== slot));

  const handleUpdateDoctorAvailability = async () => {
    if (!selectedDoctorId) return toast.error("Select a doctor first");
    try {
      await updateAvailability({ id: selectedDoctorId, slots: editSlots }).unwrap();
      toast.success("Availability updated!");
      setSelectedDoctorId(null);
      setEditSlots([]);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update availability");
    }
  };

  const handleDeleteDoctor = async (id: string) => {
    if (!confirm("Are you sure you want to delete this doctor?")) return;
    try {
      await deleteDoctor(id).unwrap();
      toast.success("Doctor deleted successfully!");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to delete doctor");
    }
  };

  // --- Components ---
  const SlotBadge = ({
    slot,
    onRemove,
  }: {
    slot: string;
    onRemove?: (slot: string) => void;
  }) => (
    <span className="flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm shadow-sm">
      <FaClock className="text-gray-500" />
      {slot}
      {onRemove && (
        <button
          onClick={() => onRemove(slot)}
          className="ml-1 text-red-500 hover:text-red-600 transition-colors text-xs"
        >
          <FaTimes />
        </button>
      )}
    </span>
  );

  const DoctorCard = ({ doctor }: { doctor: any }) => (
    <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-md hover:shadow-xl transition flex flex-col justify-between border border-gray-200 p-4 sm:p-5 w-full">
      <div className="mb-4">
        <h4 className="text-lg font-semibold text-gray-800">{doctor.name}</h4>
        <p className="text-gray-500 text-sm break-words">
          {doctor.email} • {doctor.specialization}
        </p>
        <p className="text-gray-500 text-sm">
          Dept:{" "}
          {typeof doctor.departmentId === "object"
            ? doctor.departmentId.name
            : doctor.departmentId || "N/A"}
        </p>
        <div className="flex flex-wrap gap-2 mt-3">
          {doctor.availableSlots?.length ? (
            doctor.availableSlots.map((s: string) => <SlotBadge key={s} slot={s} />)
          ) : (
            <span className="text-gray-400 text-sm italic">No slots</span>
          )}
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-2 mt-auto">
        <button
          className="flex-1 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          onClick={() => {
            setSelectedDoctorId(doctor._id);
            setEditSlots(doctor.availableSlots || []);
          }}
        >
          Update
        </button>
        <button
          className="flex-1 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          onClick={() => handleDeleteDoctor(doctor._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100">
      {/* Floating shapes */}
      <div className="absolute -top-32 -left-32 w-72 h-72 sm:w-96 sm:h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float1"></div>
      <div className="absolute top-1/4 -right-28 w-64 h-64 sm:w-80 sm:h-80 bg-teal-300 rounded-full mix-blend-multiply filter blur-2xl opacity-25 animate-float2"></div>
      <div className="absolute bottom-0 left-1/3 w-56 h-56 sm:w-72 sm:h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float3"></div>

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6 pt-20 relative z-10 lg:ml-64 w-full max-w-full">
        <Toaster position="top-right" />
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 flex items-center gap-3">
          <FaUserMd /> Doctors Management
        </h2>

        {/* Create Doctor Form */}
        <form
          onSubmit={handleCreateDoctor}
          className="mb-6 p-4 sm:p-6 bg-white/70 backdrop-blur-md rounded-2xl shadow-lg w-full max-w-full sm:max-w-lg space-y-4 border border-gray-200"
        >
          <h3 className="text-lg sm:text-xl font-semibold text-gray-700 flex items-center gap-2">
            <FaPlus /> Add New Doctor
          </h3>
          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            placeholder="Specialization"
            value={form.specialization}
            onChange={(e) => setForm({ ...form, specialization: e.target.value })}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <select
            value={form.departmentId}
            onChange={(e) => setForm({ ...form, departmentId: e.target.value })}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Department</option>
            {departments?.map((dept) => (
              <option key={dept._id} value={dept._id}>
                {dept.name}
              </option>
            ))}
          </select>

          {/* Slot Input */}
          <div className="border p-3 rounded-lg bg-white/50">
            <div className="flex flex-col sm:flex-row gap-2 mb-2">
              <input
                value={slotInput}
                onChange={(e) => setSlotInput(e.target.value)}
                placeholder="Enter slot (e.g., 10:00)"
                className="flex-1 p-2 border rounded-lg"
              />
              <button
                type="button"
                onClick={handleAddSlot}
                className="px-3 sm:px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition w-full sm:w-auto"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {slots.map((s) => (
                <SlotBadge key={s} slot={s} onRemove={handleRemoveSlot} />
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={creating}
            className={`w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition ${
              creating ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {creating ? "Creating..." : "Create Doctor"}
          </button>
        </form>

        {/* Update Availability */}
        {selectedDoctorId && (
          <div className="w-full max-w-full sm:max-w-md bg-white/70 backdrop-blur-md p-4 sm:p-5 rounded-2xl shadow-lg mb-6 border border-gray-200">
            <h3 className="text-gray-700 font-semibold mb-3 flex items-center gap-2">
              <FaClock /> Update Availability
            </h3>
            <div className="flex flex-col sm:flex-row gap-2 mb-3">
              <input
                value={editSlotInput}
                onChange={(e) => setEditSlotInput(e.target.value)}
                placeholder="Enter slot (e.g., 15:00)"
                className="flex-1 p-2 border rounded-lg"
              />
              <button
                type="button"
                onClick={handleAddEditSlot}
                className="px-3 sm:px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition w-full sm:w-auto"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mb-3">
              {editSlots.map((s) => (
                <SlotBadge key={s} slot={s} onRemove={handleRemoveEditSlot} />
              ))}
            </div>
            <button
              onClick={handleUpdateDoctorAvailability}
              className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Save
            </button>
          </div>
        )}

        {/* Doctors List */}
        <h3 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800">All Doctors</h3>
        {loadingDoctors ? (
          <Loader />
        ) : doctors?.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {doctors.map((d) => (
              <DoctorCard key={d._id} doctor={d} />
            ))}
          </div>
        ) : (
          <div className="text-gray-500 text-center py-12 italic">No doctors found</div>
        )}
      </main>

      {/* Floating animations */}
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

export default Doctors;
