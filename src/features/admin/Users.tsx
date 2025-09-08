// src/pages/admin/Users.tsx
import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import {
  useGetUsersQuery,
  useCreateUserMutation,
  useDeleteUserMutation,
} from "../../api/userApi";
import Loader from "../../components/Loader";
import toast, { Toaster } from "react-hot-toast";

type UserRole = "Admin" | "Patient";

const Users: React.FC = () => {
  const { data: users, isLoading } = useGetUsersQuery();
  const [createUser, { isLoading: creating }] = useCreateUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  const [form, setForm] = useState<{
    name: string;
    email: string;
    password: string;
    role: UserRole;
  }>({
    name: "",
    email: "",
    password: "",
    role: "Patient",
  });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUser(form).unwrap();
      setForm({ name: "", email: "", password: "", role: "Patient" });
      toast.success("User created successfully");
    } catch (err: any) {
      toast.error(err?.data?.message || err?.message || "Create user failed");
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 relative overflow-hidden">
      <Sidebar />

      {/* Floating background shapes */}
      <div className="absolute -top-32 -left-32 w-72 h-72 sm:w-96 sm:h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float1"></div>
      <div className="absolute top-1/4 -right-28 w-64 h-64 sm:w-80 sm:h-80 bg-teal-300 rounded-full mix-blend-multiply filter blur-2xl opacity-25 animate-float2"></div>
      <div className="absolute bottom-0 left-1/4 w-56 h-56 sm:w-72 sm:h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float3"></div>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 p-4 sm:p-6 pt-20 sm:pt-24 relative z-10 transition-all">
        <Toaster position="top-right" />
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 text-center sm:text-left">
          Users Management
        </h2>

        {/* Create User Form */}
        <form
          onSubmit={submit}
          className="mb-8 p-4 sm:p-6 bg-white/70 backdrop-blur-md rounded-2xl shadow-lg max-w-md w-full mx-auto sm:mx-0 space-y-4 border border-gray-200 hover:-translate-y-1 hover:shadow-xl transition"
        >
          <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2 text-center sm:text-left">
            Add New User
          </h3>
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Name"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
            required
          />
          <input
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="Email"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
            required
          />
          <input
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            placeholder="Password"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
            required
          />
          <select
            value={form.role}
            onChange={(e) =>
              setForm({ ...form, role: e.target.value as UserRole })
            }
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
          >
            <option value="Patient">Patient</option>
            <option value="Admin">Admin</option>
          </select>

          <button
            type="submit"
            disabled={creating}
            className={`w-full px-4 py-3 bg-gradient-to-r from-blue-600 via-teal-600 to-indigo-600 text-white rounded-lg font-semibold hover:scale-105 transform transition shadow-lg ${
              creating ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {creating ? "Creating..." : "Create User"}
          </button>
        </form>

        {/* Users List */}
        <h3 className="text-lg sm:text-xl font-semibold mb-4 text-center sm:text-left">
          All Users
        </h3>
        {isLoading ? (
          <Loader />
        ) : users?.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {users.map((u) => (
              <div
                key={u._id}
                className="bg-white/70 backdrop-blur-md p-4 sm:p-5 rounded-2xl shadow-md hover:-translate-y-1 hover:shadow-xl transition flex flex-col sm:flex-row justify-between items-start sm:items-center border border-gray-200"
              >
                <div className="pr-0 sm:pr-3 mb-2 sm:mb-0">
                  <div className="font-semibold text-gray-800 text-sm sm:text-base">
                    {u.name}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-500 break-all">
                    {u.email} — <span className="font-medium">{u.role}</span>
                  </div>
                </div>
                <button
                  className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition text-xs sm:text-sm w-full sm:w-auto"
                  onClick={() => {
                    if (
                      confirm("Are you sure you want to delete this user?")
                    )
                      deleteUser(u._id);
                  }}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-gray-400 italic py-12 text-center">
            No users found
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

        @media (max-width: 450px) {
          main { padding: 1rem; pt: 16; }
          form { max-width: 100%; p-3; }
          input, select, button { text-sm; padding: 2.5 !important; }
          h2 { text-2xl !important; text-center; }
          h3 { text-lg !important; text-center; }
          .grid { grid-template-columns: 1fr; gap: 1rem; }
          div[class*="backdrop-blur-md"] { p-3 !important; }
          button { width: 100% !important; }
        }
      `}</style>
    </div>
  );
};

export default Users;
