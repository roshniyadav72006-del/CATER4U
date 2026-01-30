"use client";

import React, { useState } from "react";
import {
  LogIn,
  Utensils,
  Tag,
  CheckSquare,
  BarChart3,
  MessageSquare,
  Database,
  Calendar,
  Hourglass,
  PartyPopper,
  Star,
} from "lucide-react";

export default function AdminDashboard() {
  const [activeItem, setActiveItem] = useState("Dashboard");

  const sidebarItems = [
    { name: "Dashboard", icon: <BarChart3 size={20} /> },
    { name: "Manage Menu", icon: <Utensils size={20} /> },
    { name: "Event Categories", icon: <Tag size={20} /> },
    { name: "Bookings", icon: <CheckSquare size={20} /> },
    { name: "Reports", icon: <BarChart3 size={20} /> },
    { name: "Feedback & Reviews", icon: <MessageSquare size={20} /> },
    { name: "Database Backup", icon: <Database size={20} /> },
  ];

  return (
    <div className="flex h-screen bg-slate-50 text-slate-700">
      {/* ================= SIDEBAR ================= */}
      <aside className="w-80 bg-white border-r p-6 overflow-y-auto">
        <h2 className="text-xl font-bold mb-8 text-slate-800">
          Admin Panel
        </h2>

        <nav className="space-y-3">
          {sidebarItems.map((item) => {
            const isActive = activeItem === item.name;

            return (
              <div
                key={item.name}
                onClick={() => setActiveItem(item.name)}
                className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${
                  isActive
                    ? "bg-blue-50 text-blue-600 font-semibold"
                    : "hover:bg-slate-100 text-slate-500"
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className={isActive ? "text-blue-600" : "text-slate-400"}>
                    {item.icon}
                  </span>
                  <span>{item.name}</span>
                </div>
                {isActive && (
                  <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                )}
              </div>
            );
          })}
        </nav>
      </aside>

      {/* ================= MAIN ================= */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* HEADER */}
        <header className="bg-white px-10 py-5 border-b flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              Admin Dashboard
            </h1>
            <p className="text-sm text-slate-400">
              Vegetarian Catering Management
            </p>
          </div>

          <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-semibold">
            Logout
          </button>
        </header>

        {/* CONTENT */}
        <section className="p-10 space-y-10 overflow-y-auto">
          {/* METRICS */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
            <MetricCard
              label="Total Bookings"
              value="247"
              icon={<Calendar />}
              color="bg-blue-50"
            />
            <MetricCard
              label="Pending Approvals"
              value="12"
              icon={<Hourglass />}
              color="bg-orange-50"
            />
            <MetricCard
              label="Active Events"
              value="18"
              icon={<PartyPopper />}
              color="bg-green-50"
            />
            <MetricCard
              label="Total Reviews"
              value="89"
              icon={<Star />}
              color="bg-purple-50"
            />
          </div>

          {/* ACTIVITY */}
          <div className="bg-white rounded-3xl p-10 border min-h-[300px]">
            <h3 className="text-xl font-bold mb-8 text-slate-800">
              Recent Activity
            </h3>

            <div className="space-y-6">
              <ActivityItem
                dotColor="bg-green-500"
                text="New booking approved (Wedding Event)"
                time="2 minutes ago"
              />
              <ActivityItem
                dotColor="bg-blue-500"
                text="Menu item updated: Paneer Tikka"
                time="15 minutes ago"
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

/* ================= COMPONENTS ================= */

const MetricCard = ({ label, value, icon, color }) => (
  <div className="bg-white p-8 rounded-3xl flex justify-between items-center border">
    <div>
      <p className="text-sm font-semibold text-slate-400 mb-1">{label}</p>
      <p className="text-3xl font-bold text-slate-800">{value}</p>
    </div>
    <div className={`${color} p-4 rounded-2xl`}>
      {React.cloneElement(icon, { size: 28, className: "text-slate-700" })}
    </div>
  </div>
);

const ActivityItem = ({ dotColor, text, time }) => (
  <div className="flex items-start gap-4">
    <span className={`w-2.5 h-2.5 rounded-full mt-2 ${dotColor}`} />
    <div>
      <p className="font-semibold text-slate-800">{text}</p>
      <p className="text-sm text-slate-400">{time}</p>
    </div>
  </div>
);
