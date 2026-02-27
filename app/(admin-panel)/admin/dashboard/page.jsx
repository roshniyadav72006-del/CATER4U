"use client";

import { useEffect, useState } from "react";
import ChartSection from "./components/ChartSection";
import { useRouter } from "next/navigation";
import {
  CheckCircle,
  Clock,
  CalendarCheck,
  IndianRupee,
  TrendingUp,
  Activity,
  Users,
} from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS_MAP = {
  cyan: {
    text: "text-cyan-600",
    bg: "bg-cyan-50",
    icon: "text-cyan-500",
  },
  amber: {
    text: "text-amber-600",
    bg: "bg-amber-50",
    icon: "text-amber-500",
  },
  emerald: {
    text: "text-emerald-600",
    bg: "bg-emerald-50",
    icon: "text-emerald-500",
  },
  violet: {
    text: "text-violet-600",
    bg: "bg-violet-50",
    icon: "text-violet-500",
  },
};

const PIE_COLORS = ["#06b6d4", "#818cf8", "#34d399", "#f59e0b", "#f87171"];

const eventDistributionData = [
  { name: "Wedding", value: 45 },
  { name: "Corporate", value: 25 },
  { name: "Birthday", value: 15 },
  { name: "Anniversary", value: 5 },
  { name: "Other", value: 10 },
];

// Status badge styles
function StatusBadge({ status }) {
  const s = status?.toLowerCase();
  const styles = {
    ongoing:    "bg-emerald-100 text-emerald-700 border-emerald-200",
    confirmed:  "bg-cyan-100 text-cyan-700 border-cyan-200",
    preparing:  "bg-amber-100 text-amber-700 border-amber-200",
    pending:    "bg-orange-100 text-orange-700 border-orange-200",
    cancelled:  "bg-red-100 text-red-700 border-red-200",
    completed:  "bg-gray-100 text-gray-600 border-gray-200",
  };
  const dot = {
    ongoing:   "bg-emerald-500",
    confirmed: "bg-cyan-500",
    preparing: "bg-amber-500",
    pending:   "bg-orange-500",
    cancelled: "bg-red-500",
    completed: "bg-gray-400",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${styles[s] || "bg-gray-100 text-gray-500 border-gray-200"}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dot[s] || "bg-gray-400"}`} />
      {status}
    </span>
  );
}

// Dot color for event row
function EventDot({ status }) {
  const s = status?.toLowerCase();
  const color = {
    ongoing:   "bg-emerald-500",
    confirmed: "bg-cyan-500",
    preparing: "bg-amber-500",
    pending:   "bg-orange-400",
    cancelled: "bg-red-500",
    completed: "bg-gray-400",
  };
  return (
    <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 mt-1 ${color[s] || "bg-gray-400"}`} />
  );
}

export default function DashboardPage() {
  const [stats, setStats] = useState(null);
  const [todayEvents, setTodayEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [dashRes, eventsRes] = await Promise.all([
          fetch("/api/admin/dashboard"),
          fetch("/api/admin/today-events"),
        ]);

        if (!dashRes.ok) throw new Error("Failed to fetch dashboard data");
        const dashData = await dashRes.json();
        setStats(dashData);

        if (eventsRes.ok) {
          const eventsData = await eventsRes.json();
          setTodayEvents(eventsData.events || eventsData || []);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  async function handleLogout() {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] bg-gray-50">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-2 border-cyan-400/20" />
          <div className="absolute inset-0 rounded-full border-t-2 border-cyan-500 animate-spin" />
          <div
            className="absolute inset-2 rounded-full border-t-2 border-violet-400 animate-spin"
            style={{ animationDuration: "0.7s", animationDirection: "reverse" }}
          />
        </div>
        <p className="mt-5 text-sm tracking-[0.3em] uppercase text-gray-400 font-light">
          Loading Analytics
        </p>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="flex items-center justify-center h-[70vh] bg-gray-50">
        <div className="text-center p-8 rounded-2xl border border-red-200 bg-red-50">
          <p className="text-red-500 text-lg">⚠️ Failed to load dashboard data</p>
          <p className="text-gray-400 text-sm mt-2">
            Please check your connection and try again
          </p>
        </div>
      </div>
    );
  }

  const cards = [
    {
      title: "Total Bookings",
      value: stats.totalBookings,
      subtext: "All time",
      icon: CalendarCheck,
      color: "cyan",
    },
    {
      title: "Pending",
      value: stats.pendingBookings,
      subtext: "Awaiting confirmation",
      icon: Clock,
      color: "amber",
    },
    {
      title: "Confirmed",
      value: stats.confirmedBookings,
      subtext: "Successfully booked",
      icon: CheckCircle,
      color: "emerald",
    },
    {
      title: "Revenue",
      value: `₹${stats.totalRevenue.toLocaleString("en-IN")}`,
      subtext: "Total earnings",
      icon: IndianRupee,
      color: "violet",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseDot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.4; transform: scale(0.8); }
        }
        .card-hover { transition: transform 0.25s ease, box-shadow 0.25s ease; }
        .card-hover:hover { transform: translateY(-4px); box-shadow: 0 8px 24px rgba(0,0,0,0.08); }
        .fade-in   { animation: fadeSlideUp 0.5s ease both; }
        .delay-1   { animation-delay: 0.05s; }
        .delay-2   { animation-delay: 0.10s; }
        .delay-3   { animation-delay: 0.15s; }
        .delay-4   { animation-delay: 0.20s; }
        .delay-5   { animation-delay: 0.27s; }
        .delay-6   { animation-delay: 0.34s; }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* ── Header ── */}
        <header className="fade-in flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-none text-gray-800">
              Dashboard
            </h1>
            <p className="mt-2 text-gray-400 text-sm">
              Welcome back! Here's your catering business overview
            </p>
            <p className="mt-1 text-gray-400 text-xs">
              {new Date().toLocaleDateString("en-IN", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2 shadow-sm">
              <span
                className="w-2 h-2 rounded-full bg-emerald-400"
                style={{ animation: "pulseDot 1.8s ease-in-out infinite" }}
              />
              <span className="text-xs tracking-widest uppercase text-gray-500">Live</span>
            </div>
            <div className="flex items-center gap-2 bg-cyan-50 border border-cyan-200 rounded-full px-4 py-2">
              <Activity size={14} className="text-cyan-500" />
              <span className="text-xs text-cyan-600 tracking-wider">Overview</span>
            </div>
          </div>
        </header>

        {/* ── Stat Cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
          {cards.map((card, i) => (
            <StatCard key={card.title} {...card} delay={i + 1} />
          ))}
        </div>

        {/* ── Charts Row ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Monthly Revenue Chart */}
          <div className="fade-in delay-5 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-100">
              <div className="w-8 h-8 rounded-lg bg-violet-50 border border-violet-100 flex items-center justify-center">
                <TrendingUp size={15} className="text-violet-500" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-800">Monthly Revenue</h3>
                <p className="text-xs text-gray-400">Last 12 months analysis</p>
              </div>
            </div>
            <div className="p-6">
              <ChartSection data={stats.monthlyData || []} />
            </div>
          </div>

          {/* Event Types Distribution */}
          <div className="fade-in delay-5 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-100">
              <div className="w-8 h-8 rounded-lg bg-cyan-50 border border-cyan-100 flex items-center justify-center">
                <CalendarCheck size={15} className="text-cyan-500" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-800">Event Types Distribution</h3>
                <p className="text-xs text-gray-400">Bookings by category</p>
              </div>
            </div>
            <div className="p-6" style={{ height: 320 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={eventDistributionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {eventDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => [`${value}%`, "Share"]}
                    contentStyle={{
                      borderRadius: "10px",
                      border: "1px solid #e5e7eb",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                      fontSize: "12px",
                    }}
                  />
                  <Legend
                    iconType="circle"
                    iconSize={8}
                    formatter={(value) => (
                      <span style={{ color: "#6b7280", fontSize: "12px" }}>{value}</span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* ── Today's Events ── */}
        <div className="fade-in delay-6 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {/* Section Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                <CalendarCheck size={15} className="text-emerald-500" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-800">Today's Events</h3>
                <p className="text-xs text-gray-400">Active catering events scheduled for today</p>
              </div>
            </div>
            <span className="text-xs bg-gray-100 text-gray-500 px-3 py-1 rounded-full font-medium">
              {todayEvents.length} event{todayEvents.length !== 1 ? "s" : ""}
            </span>
          </div>

          {/* Events List */}
          <div className="divide-y divide-gray-50">
            {todayEvents.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                  <CalendarCheck size={20} className="text-gray-400" />
                </div>
                <p className="text-sm text-gray-400 font-medium">No events scheduled for today</p>
                <p className="text-xs text-gray-300 mt-1">Enjoy your free day!</p>
              </div>
            ) : (
              todayEvents.map((event, i) => (
                <div
                  key={event._id || event.id || i}
                  className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors duration-150"
                >
                  {/* Left: dot + name + venue */}
                  <div className="flex items-start gap-3 min-w-0">
                    <EventDot status={event.status} />
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-gray-800 truncate">
                        {event.eventName || event.name || event.title}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5 truncate">
                        {event.venue || event.location || event.venueName || "—"}
                      </p>
                    </div>
                  </div>

                  {/* Right: time + guests + status */}
                  <div className="flex items-center gap-6 flex-shrink-0 ml-4">
                    {/* Time */}
                    <div className="hidden sm:flex items-center gap-1.5 text-gray-500">
                      <Clock size={13} />
                      <span className="text-xs">
                        {event.eventTime ||
                          event.time ||
                          (event.eventDate
                            ? new Date(event.eventDate).toLocaleTimeString("en-IN", {
                                hour: "2-digit",
                                minute: "2-digit",
                              })
                            : "—")}
                      </span>
                    </div>

                    {/* Guests */}
                    <div className="hidden md:flex items-center gap-1.5 text-gray-500">
                      <Users size={13} />
                      <span className="text-xs">
                        {event.guestCount || event.guests || event.numberOfGuests || "—"} guests
                      </span>
                    </div>

                    {/* Status badge */}
                    <StatusBadge status={event.status || "Pending"} />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, subtext, icon: Icon, color, delay }) {
  const c = COLORS_MAP[color];
  return (
    <div
      className={`fade-in delay-${delay} card-hover bg-white rounded-2xl border border-gray-100 p-6 relative overflow-hidden shadow-sm`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`w-10 h-10 rounded-xl ${c.bg} flex items-center justify-center`}>
          <Icon size={18} className={c.icon} />
        </div>
        <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">{title}</span>
      </div>
      <h2 className={`text-3xl font-bold tracking-tight ${c.text}`}>{value}</h2>
      <p className="mt-1 text-xs text-gray-400">{subtext}</p>
      <div className="mt-4 h-px w-full bg-gray-100 rounded-full" />
    </div>
  );
}