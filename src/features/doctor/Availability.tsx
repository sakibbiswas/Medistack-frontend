// src/pages/doctor/Availability.tsx
import React, { useState, useEffect } from "react";
import {
  useGetDoctorByIdQuery,
  useUpdateAvailabilityMutation,
} from "../../api/doctorApi";
import Loader from "../../components/Loader";
import Sidebar from "../../components/Sidebar";

interface Props {
  doctorId?: string;
}

const Availability: React.FC<Props> = ({ doctorId }) => {
  const { data: doctor, isLoading } = useGetDoctorByIdQuery(doctorId!, {
    skip: !doctorId,
  });

  const [updateAvailability] = useUpdateAvailabilityMutation();
  const [slots, setSlots] = useState<string[]>([]);
  const [newSlot, setNewSlot] = useState("");

  useEffect(() => {
    if (doctor?.availableSlots) {
      setSlots(doctor.availableSlots);
    }
  }, [doctor]);

  const handleAddSlot = () => {
    if (newSlot && !slots.includes(newSlot)) {
      setSlots([...slots, newSlot]);
      setNewSlot("");
    }
  };

  const handleRemoveSlot = (slot: string) => {
    setSlots(slots.filter((s) => s !== slot));
  };

  const handleSave = async () => {
    if (!doctorId) {
      alert("Doctor ID is missing!");
      return;
    }
    try {
      await updateAvailability({ id: doctorId, slots }).unwrap();
      alert("Availability updated successfully");
    } catch (err: any) {
      alert(err?.data?.message || "Update failed");
    }
  };

  if (!doctorId) {
    return (
      <div className="flex">
        <Sidebar />
        <div className="flex-1 ml-64 p-6 text-red-600 mt-6 font-bold">
          Go back to Dashboard.
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex">
        <Sidebar />
        <div className="flex-1 ml-64 p-6">
          <Loader />
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <main className="flex-1 ml-64 p-6 bg-gray-50 min-h-screen">
        <h2 className="text-2xl font-semibold mb-6">Manage Availability</h2>

        <div className="bg-white shadow rounded-lg p-6">
          {/* Add Slot */}
          <div className="flex flex-col sm:flex-row gap-2 mb-4">
            <input
              type="text"
              placeholder="e.g. 10:00 AM - 11:00 AM"
              value={newSlot}
              onChange={(e) => setNewSlot(e.target.value)}
              className="border px-3 py-2 rounded w-full sm:flex-1"
            />
            <button
              onClick={handleAddSlot}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Add
            </button>
          </div>

          {/* Slots List */}
          {slots.length > 0 ? (
            <ul className="space-y-2">
              {slots.map((slot, idx) => (
                <li
                  key={idx}
                  className="flex justify-between items-center border p-2 rounded"
                >
                  <span>{slot}</span>
                  <button
                    onClick={() => handleRemoveSlot(slot)}
                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No slots added</p>
          )}

          {/* Save Button */}
          <button
            onClick={handleSave}
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            Save Changes
          </button>
        </div>
      </main>
    </div>
  );
};

export default Availability;
