//Responsive for mobile and pc 
// src/pages/admin/Departments.tsx
import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import {
  useGetDepartmentsQuery,
  useCreateDepartmentMutation,
  useUpdateDepartmentMutation,
  useDeleteDepartmentMutation,
} from "../../api/departmentApi";
import Loader from "../../components/Loader";
import toast, { Toaster } from "react-hot-toast";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

const Departments: React.FC = () => {
  const { data: depts, isLoading } = useGetDepartmentsQuery();
  const [createDepartment] = useCreateDepartmentMutation();
  const [updateDepartment] = useUpdateDepartmentMutation();
  const [deleteDepartment] = useDeleteDepartmentMutation();

  const [form, setForm] = useState({ name: "", description: "" });

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) {
      toast.error("Department name is required");
      return;
    }
    try {
      await createDepartment(form).unwrap();
      setForm({ name: "", description: "" });
      toast.success("Department created successfully");
    } catch (err: any) {
      toast.error(err?.data?.message || err?.message || "Create failed");
    }
  };

  const handleEdit = (d: { _id: string; name: string; description?: string }) => {
    const newName = prompt("New name", d.name);
    const newDesc = prompt("New description", d.description ?? "");

    if (newName !== null && newName.trim()) {
      updateDepartment({
        id: d._id,
        data: {
          name: newName,
          description: newDesc !== null ? newDesc : undefined,
        },
      })
        .unwrap()
        .then(() => toast.success("Department updated"))
        .catch((err: any) => toast.error(err?.data?.message || "Update failed"));
    }
  };

  const handleDelete = (id: string) => {
    if (!confirm("Are you sure you want to delete this department?")) return;
    deleteDepartment(id)
      .unwrap()
      .then(() => toast.success("Department deleted"))
      .catch((err: any) => toast.error(err?.data?.message || "Delete failed"));
  };

  return (
    <div className="flex min-h-screen relative overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Floating background shapes */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float1"></div>
      <div className="absolute top-1/4 -right-32 w-80 h-80 bg-teal-300 rounded-full mix-blend-multiply filter blur-2xl opacity-25 animate-float2"></div>
      <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float3"></div>

      {/* Main Content */}
      <main
        className="
          flex-1 
          p-6 pt-20 
          bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 
          relative z-10
          lg:ml-64  /* Sidebar space only on PC */
        "
      >
        <Toaster position="top-right" />
        <h2 className="text-3xl font-extrabold mb-6 text-gray-800">
          Departments
        </h2>

        {/* Create Department Form */}
        <form
          onSubmit={handleCreate}
          className="mb-10 bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow-md max-w-lg space-y-4 border border-gray-100"
        >
          <h3 className="text-xl font-semibold text-gray-700 flex items-center gap-2">
            <FaPlus /> Add New Department
          </h3>
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Name"
            className="p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
          <input
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Description"
            className="p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
          <button
            type="submit"
            className="px-5 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-medium shadow-sm"
          >
            Create Department
          </button>
        </form>

        {/* Departments List */}
        {isLoading ? (
          <Loader />
        ) : depts?.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {depts.map((d) => (
              <div
                key={d._id}
                className="p-5 bg-white/70 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-xl transition relative flex flex-col justify-between border border-gray-100"
              >
                <div className="mb-4">
                  <h4 className="text-lg font-bold text-gray-700">{d.name}</h4>
                  <p className="text-gray-500 mt-1">{d.description}</p>
                </div>
                <div className="flex gap-2 mt-auto">
                  <button
                    className="flex-1 px-4 py-2 bg-yellow-500 text-white rounded-xl hover:bg-yellow-600 transition flex items-center justify-center gap-2"
                    onClick={() => handleEdit(d)}
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition flex items-center justify-center gap-2"
                    onClick={() => handleDelete(d._id)}
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-gray-500 text-center py-12 text-lg">
            No departments found
          </div>
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

export default Departments;

