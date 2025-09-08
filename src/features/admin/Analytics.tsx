// src/features/admin/Analytics.tsx
import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import Loader from "../../components/Loader";
import Sidebar from "../../components/Sidebar";
import { FaBars, FaTimes } from "react-icons/fa";

interface Totals {
  usersCount: number;
  doctorsCount: number;
  appointmentsCount: number;
  paymentsCount: number;
  totalRevenue: number;
}

interface AnalyticsResponse {
  totals: Totals;
  appointmentsByDay: { date: string; count: number }[];
  revenueByMonth: { month: string; revenue: number }[];
  topDoctors: {
    doctorId: string;
    name: string;
    specialization?: string;
    count: number;
  }[];
  topPatients: {
    patientId: string;
    name: string;
    email?: string;
    count: number;
  }[];
}

const SummaryCard: React.FC<{ title: string; value: string | number }> = ({
  title,
  value,
}) => (
  <div className="p-6 rounded-2xl shadow-md hover:shadow-xl transition bg-white/80 backdrop-blur-md border border-gray-200">
    <div className="text-sm text-gray-500">{title}</div>
    <div className="text-2xl font-extrabold text-gray-800">{value}</div>
  </div>
);

const AdminAnalytics: React.FC = () => {
  const [data, setData] = useState<AnalyticsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const API_BASE = (import.meta.env.VITE_API_BASE_URL as string) || "";

  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? "hidden" : "auto";
  }, [isSidebarOpen]);

  useEffect(() => {
    const controller = new AbortController();

    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        setError(null);

        const base = API_BASE.replace(/\/$/, "");
        const url = `${base}/admin/analytics`;

        const token = localStorage.getItem("accessToken");
        const res = await fetch(url, {
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
          signal: controller.signal,
        });

        if (!res.ok) {
          const errMsg =
            (await res.json().catch(() => null))?.message ||
            `Request failed: ${res.status}`;
          throw new Error(errMsg);
        }

        const json = await res.json();
        const payload = json?.data ?? json;

        const safePayload: AnalyticsResponse = {
          totals: payload?.totals ?? {
            usersCount: 0,
            doctorsCount: 0,
            appointmentsCount: 0,
            paymentsCount: 0,
            totalRevenue: 0,
          },
          appointmentsByDay: payload?.appointmentsByDay ?? [],
          revenueByMonth: payload?.revenueByMonth ?? [],
          topDoctors: payload?.topDoctors ?? [],
          topPatients: payload?.topPatients ?? [],
        };

        setData(safePayload);
      } catch (err: any) {
        if (err.name !== "AbortError") {
          console.error("Analytics fetch error:", err);
          setError(err.message || "Failed to fetch analytics");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
    return () => controller.abort();
  }, [API_BASE]);

  if (loading) return <Loader />;

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 relative overflow-hidden">
      {/* Mobile Hamburger */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="text-2xl text-blue-600 p-2 rounded-md bg-white shadow-md"
        >
          {isSidebarOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
        </button>
      </div>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-30 z-40 transition-opacity md:hidden ${
          isSidebarOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsSidebarOpen(false)}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 w-64 h-full z-50 transform transition-transform duration-300 ease-in-out md:translate-x-0
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <Sidebar />
      </div>

      {/* Floating background shapes */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float1"></div>
      <div className="absolute top-1/4 -right-32 w-80 h-80 bg-teal-300 rounded-full mix-blend-multiply filter blur-2xl opacity-25 animate-float2"></div>
      <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float3"></div>

      {/* Main Content */}
      <main
        className={`flex-1 p-6 pt-20 relative z-10 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "md:ml-64" : "md:ml-64"
        }`}
      >
        <h1 className="text-3xl font-extrabold text-gray-800 mb-6">
          Admin Analytics
        </h1>

        {error && (
          <div className="bg-red-100 text-red-800 p-4 rounded-xl shadow mb-6">
            {error}
          </div>
        )}

        {data ? (
          <>
            {/* Summary cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <SummaryCard title="Users" value={data.totals.usersCount} />
              <SummaryCard title="Doctors" value={data.totals.doctorsCount} />
              <SummaryCard
                title="Appointments"
                value={data.totals.appointmentsCount}
              />
              <SummaryCard
                title="Revenue"
                value={`$${Number(data.totals.totalRevenue || 0).toFixed(2)}`}
              />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <section className="p-6 rounded-2xl shadow-md bg-white/80 backdrop-blur-md border border-gray-200">
                <h2 className="text-lg font-semibold mb-2 text-gray-700">
                  Appointments (Last 7 days)
                </h2>
                <div style={{ width: "100%", height: 260 }}>
                  <ResponsiveContainer>
                    <LineChart data={data.appointmentsByDay}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis allowDecimals={false} />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="count"
                        stroke="#2563EB"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </section>

              <section className="p-6 rounded-2xl shadow-md bg-white/80 backdrop-blur-md border border-gray-200">
                <h2 className="text-lg font-semibold mb-2 text-gray-700">
                  Revenue (Last 6 months)
                </h2>
                <div style={{ width: "100%", height: 260 }}>
                  <ResponsiveContainer>
                    <BarChart data={data.revenueByMonth}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="revenue" name="Revenue" fill="#16A34A" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </section>
            </div>

            {/* Top doctors */}
            <section className="p-6 rounded-2xl shadow-md bg-white/80 backdrop-blur-md border border-gray-200 mt-6">
              <h2 className="text-lg font-semibold mb-3 text-gray-700">
                Top Doctors (by appointments)
              </h2>
              <div className="space-y-3">
                {data.topDoctors.length === 0 ? (
                  <div className="text-gray-500 italic">No data available</div>
                ) : (
                  data.topDoctors.map((d) => (
                    <div
                      key={d.doctorId}
                      className="flex justify-between items-center p-3 rounded-xl bg-gray-50 shadow-sm hover:bg-gray-100 transition"
                    >
                      <div>
                        <div className="font-medium text-gray-800">{d.name}</div>
                        <div className="text-sm text-gray-500">
                          {d.specialization ?? "—"}
                        </div>
                      </div>
                      <div className="text-xl font-semibold text-blue-600">
                        {d.count}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>

            {/* Top patients */}
            <section className="p-6 rounded-2xl shadow-md bg-white/80 backdrop-blur-md border border-gray-200 mt-6">
              <h2 className="text-lg font-semibold mb-3 text-gray-700">
                Top Patients (by appointments)
              </h2>
              <div className="space-y-3">
                {data.topPatients.length === 0 ? (
                  <div className="text-gray-500 italic">No data available</div>
                ) : (
                  data.topPatients.map((p) => (
                    <div
                      key={p.patientId}
                      className="flex justify-between items-center p-3 rounded-xl bg-gray-50 shadow-sm hover:bg-gray-100 transition"
                    >
                      <div>
                        <div className="font-medium text-gray-800">{p.name}</div>
                        <div className="text-sm text-gray-500">
                          {p.email ?? "—"}
                        </div>
                      </div>
                      <div className="text-xl font-semibold text-green-600">
                        {p.count}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>
          </>
        ) : (
          <div className="text-gray-400 italic">
            No analytics data available.
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

export default AdminAnalytics;
