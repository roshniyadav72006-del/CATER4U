"use client";

import { useEffect, useState } from "react";
import ChartSection from "./components/ChartSection";
import {
  CheckCircle,
  Clock,
  CalendarCheck,
  IndianRupee,
  TrendingUp,
} from "lucide-react";

export default function DashboardPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await fetch("/api/admin/dashboard");
        if (!res.ok) throw new Error("Failed to fetch dashboard data");
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
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-orange-500"></div>
        <p className="ml-3 text-gray-600 font-medium">
          Loading Dashboard...
        </p>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="text-center">
        <p className="text-red-500 bg-red-50 p-4 rounded-lg inline-block border border-red-200">
          ⚠️ Failed to load data. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Dashboard
          </h1>
          <p className="text-gray-500 mt-1">
            Welcome back! Here's today's overview.
          </p>
        </div>

        <div className="text-sm font-medium text-orange-600 bg-orange-50 px-3 py-1 rounded-full flex items-center gap-1">
          <TrendingUp size={16} /> Live Overview
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card
          title="Total Bookings"
          value={stats.totalBookings}
          icon={<CalendarCheck className="text-blue-600" />}
          bgColor="bg-blue-50"
        />
        <Card
          title="Pending Bookings"
          value={stats.pendingBookings}
          icon={<Clock className="text-amber-600" />}
          bgColor="bg-amber-50"
        />
        <Card
          title="Confirmed Bookings"
          value={stats.confirmedBookings}
          icon={<CheckCircle className="text-emerald-600" />}
          bgColor="bg-emerald-50"
        />
        <Card
          title="Total Revenue"
          value={`₹${stats.totalRevenue.toLocaleString("en-IN")}`}
          icon={<IndianRupee className="text-purple-600" />}
          bgColor="bg-purple-50"
        />
      </div>

      {/* Chart Section */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">
          Revenue Analysis
        </h3>
        <ChartSection data={stats.monthlyData || []} />
      </div>
    </div>
  );
}

function Card({ title, value, icon, bgColor }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border hover:shadow-md transition">
      <div className="flex justify-between">
        <div>
          <p className="text-sm text-gray-500 uppercase tracking-wider">
            {title}
          </p>
          <h2 className="text-3xl font-bold mt-2">{value}</h2>
        </div>
        <div className={`p-3 rounded-xl ${bgColor}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}
