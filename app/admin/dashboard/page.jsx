"use client";

import { useEffect, useState } from "react";
import ChartSection from "./components/ChartSection";

export default function DashboardPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await fetch("/api/admin/dashboard");

        if (!res.ok) {
          throw new Error("Failed to fetch dashboard data");
        }

        const data = await res.json();
        setStats(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <p className="p-6">Loading Dashboard...</p>;
  }

  if (!stats) {
    return <p className="p-6 text-red-500">Failed to load data.</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card title="Total Bookings" value={stats.totalBookings} />
        <Card title="Pending Bookings" value={stats.pendingBookings} />
        <Card title="Confirmed Bookings" value={stats.confirmedBookings} />
        <Card
          title="Completed Revenue"
          value={`₹${stats.totalRevenue}`}
        />
      </div>

      {/* Chart Section */}
      <ChartSection data={stats.monthlyData || []} />
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md border">
      <p className="text-gray-500 text-sm">{title}</p>
      <h2 className="text-2xl font-bold mt-2">{value}</h2>
    </div>
  );
}
