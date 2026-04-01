"use client";

import { useEffect, useState } from "react";
import ChartSection from "./components/ChartSection";
import { useRouter } from "next/navigation";
import { XCircle } from "lucide-react";
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

const PIE_COLORS = ["#8B9D3A", "#C9A84C", "#6B7A2A", "#E2C06A", "#A8B560"];

const eventDistributionData = [
  { name: "Wedding", value: 45 },
  { name: "Corporate", value: 25 },
  { name: "Birthday", value: 15 },
  { name: "Anniversary", value: 5 },
  { name: "Other", value: 10 },
];

function StatusBadge({ status }) {
  const s = status?.toLowerCase();
  const styles = {
    ongoing:   { bg: "#e8f0d0", color: "#4a6320", border: "#b5c97a" },
    confirmed: { bg: "#fdf6dc", color: "#7a5c0a", border: "#e2c06a" },
    preparing: { bg: "#f5f0d8", color: "#6b5a1a", border: "#c9a84c" },
    pending:   { bg: "#fef9e7", color: "#856404", border: "#d4a843" },
    cancelled: { bg: "#fde8e8", color: "#9b1c1c", border: "#f4a4a4" },
    completed: { bg: "#f3f4f0", color: "#5a5a4a", border: "#c8c8a8" },
  };
  const dotColor = {
    ongoing: "#6b8f2a", confirmed: "#c9a84c", preparing: "#a07830",
    pending: "#c9a000", cancelled: "#dc2626", completed: "#9a9a7a",
  };
  const st = styles[s] || styles.pending;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      padding: "3px 12px", borderRadius: 100,
      background: st.bg, color: st.color,
      border: `1px solid ${st.border}`,
      fontSize: 11, fontWeight: 600,
    }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: dotColor[s] || "#c9a84c", flexShrink: 0 }} />
      {status}
    </span>
  );
}

function EventDot({ status }) {
  const s = status?.toLowerCase();
  const color = {
    ongoing: "#6b8f2a", confirmed: "#c9a84c", preparing: "#a07830",
    pending: "#c9a000", cancelled: "#dc2626", completed: "#9a9a7a",
  };
  return <span style={{ width: 10, height: 10, borderRadius: "50%", background: color[s] || "#c9a84c", flexShrink: 0, marginTop: 4 }} />;
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
        if (!dashRes.ok) throw new Error("Failed");
        const dashData = await dashRes.json();
        setStats(dashData);
        if (eventsRes.ok) {
          const eventsData = await eventsRes.json();
          console.log("TODAY EVENTS DATA:", eventsData.todayEvents);
          setTodayEvents(eventsData.todayEvents || []);
        }
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    };
    fetchAll();
  }, []);

  async function handleLogout() {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch (e) { console.error(e); }
  }

  if (loading) {
    return (
      <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", height:"70vh", background:"#f5f2e8" }}>
        <div style={{ width:52, height:52, borderRadius:"50%", border:"3px solid #e2c06a", borderTopColor:"#8B9D3A", animation:"spin 0.9s linear infinite" }} />
        <p style={{ marginTop:16, fontSize:12, letterSpacing:"0.25em", textTransform:"uppercase", color:"#8a7a4a" }}>Loading...</p>
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    );
  }

  if (!stats) {
    return (
      <div style={{ display:"flex", alignItems:"center", justifyContent:"center", height:"70vh" }}>
        <div style={{ padding:32, borderRadius:16, border:"1px solid #f4a4a4", background:"#fde8e8", textAlign:"center" }}>
          <p style={{ color:"#9b1c1c" }}>⚠️ Failed to load dashboard data</p>
        </div>
      </div>
    );
  }

  const cards = [
    { title: "Total Bookings", value: stats.totalBookings,   subtext: "All time",             icon: CalendarCheck, accent: "#8B9D3A", lightBg: "#f0f4d8", iconColor: "#6b7a2a" },
    { title: "Pending",        value: stats.pendingBookings, subtext: "Awaiting confirmation", icon: Clock,         accent: "#C9A84C", lightBg: "#fdf6dc", iconColor: "#a07830" },
    { title: "Confirmed",      value: stats.confirmedBookings, subtext: "Successfully booked", icon: CheckCircle,  accent: "#7a9230", lightBg: "#eaf2d0", iconColor: "#5a7020" },
    { title: "Cancelled", value: stats.cancelledBookings, subtext: "Cancelled bookings", icon: XCircle, accent: "#bd3823", lightBg: "#fde8e8", iconColor: "#b91c1c" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@300;400;500&display=swap');

        * { box-sizing: border-box; }

        .og-page {
          min-height: 100vh;
          background: #FFF8DC;
          font-family: 'DM Sans', sans-serif;
          color: #2a2a1a;
          /* ✅ prevent horizontal overflow on mobile */
          overflow-x: hidden;
          max-width: 100vw;
        }

        .og-inner {
          width: 100%;
          padding: 16px 16px 32px;
        }
        @media (min-width: 768px) {
          .og-inner { padding: 20px 24px 40px; }
        }

        /* ── Header ── */
        .og-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 24px;
          flex-wrap: wrap;
          gap: 12px;
        }
        /* ✅ title wraps on mobile */
        .og-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(26px, 6vw, 42px);
          font-weight: 700;
          color: #2a2a1a;
          letter-spacing: -0.02em;
          line-height: 1.1;
          word-break: break-word;
        }
        .og-title span { color: #8B9D3A; }
        .og-subtitle { font-size: 13px; color: #8a7a4a; margin-top: 6px; }
        .og-date { font-size: 11px; color: #b0a070; margin-top: 2px; }

        /* badges — hide on very small screens, show on sm+ */
        .og-badges {
          display: flex;
          gap: 8px;
          align-items: center;
          flex-shrink: 0;
          flex-wrap: wrap;
        }
        .og-badge {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          border-radius: 100px;
          font-size: 10px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          white-space: nowrap;
        }
        .og-badge-live  { background: #f0f4d8; border: 1px solid #c8d890; color: #5a7020; }
        .og-badge-overview { background: #fdf6dc; border: 1px solid #e2c06a; color: #8a6010; }
        .og-live-dot { width: 7px; height: 7px; border-radius: 50%; background: #8B9D3A; animation: pulse-og 2s ease-in-out infinite; }
        @keyframes pulse-og { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(0.8)} }

        /* ── Stat cards ── */
        .og-cards {
          display: grid;
          /* ✅ 2 cols on mobile, 4 on desktop */
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          margin-bottom: 20px;
        }
        @media (min-width: 900px) {
          .og-cards { grid-template-columns: repeat(4, 1fr); gap: 18px; margin-bottom: 24px; }
        }

        .og-card {
          background: #fff;
          border-radius: 16px;
          padding: 16px;
          border: 1px solid #ede8d0;
          box-shadow: 0 2px 12px rgba(139,157,58,0.06);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          position: relative;
          overflow: hidden;
          min-width: 0; /* ✅ prevent overflow */
        }
        @media (min-width: 768px) {
          .og-card { padding: 22px; border-radius: 18px; }
        }
        .og-card:hover { transform: translateY(-4px); box-shadow: 0 10px 32px rgba(139,157,58,0.12); }
        .og-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: var(--card-accent);
          border-radius: 18px 18px 0 0;
        }
        .og-card-top { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 12px; }
        .og-card-icon { width: 38px; height: 38px; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        /* ✅ label wraps properly */
        .og-card-label {
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #a09060;
          text-align: right;
          line-height: 1.3;
          max-width: 80px;
        }
        .og-card-value {
          font-family: 'Playfair Display', serif;
          font-size: clamp(24px, 5vw, 34px);
          font-weight: 700;
          line-height: 1;
          margin-bottom: 4px;
        }
        .og-card-sub { font-size: 10px; color: #b0a070; }
        .og-card-line { margin-top: 12px; height: 1px; background: linear-gradient(90deg, var(--card-accent) 0%, transparent 100%); opacity: 0.3; border-radius: 4px; }

        /* ── Panels ── */
        .og-panel {
          background: #fff;
          border-radius: 16px;
          border: 1px solid #ede8d0;
          box-shadow: 0 2px 12px rgba(139,157,58,0.06);
          overflow: hidden;
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          min-width: 0;
        }
        .og-panel-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 18px;
          border-bottom: 1px solid #f0ead8;
          flex-wrap: wrap;
          gap: 8px;
        }
        .og-panel-icon { width: 34px; height: 34px; border-radius: 10px; display: flex; align-items: center; justify-content: center; }
        .og-panel-title { font-size: 13px; font-weight: 600; color: #2a2a1a; }
        .og-panel-sub { font-size: 11px; color: #a09060; margin-top: 1px; }

        /* ── Charts row ── */
        .og-charts {
          display: grid;
          /* ✅ single col on mobile, 2 col on desktop */
          grid-template-columns: 1fr;
          gap: 16px;
          margin-bottom: 20px;
        }
        @media (min-width: 860px) {
          .og-charts { grid-template-columns: 1fr 1fr; gap: 18px; margin-bottom: 24px; }
        }

        /* ── Today's events table ── */
        /* ✅ scrollable table on mobile */
        .og-table-wrap {
          width: 100%;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          padding: 10px 16px 20px;
        }
        @media (min-width: 768px) {
          .og-table-wrap { padding: 10px 20px 20px; }
        }
        .og-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 12px;
          min-width: 520px; /* ✅ forces scroll on very small screens */
        }
        @media (min-width: 768px) {
          .og-table { font-size: 13px; min-width: unset; }
        }
        .og-table th {
          padding: 10px 10px;
          background: #f7f4eb;
          text-align: left;
          font-weight: 600;
          color: #6a6040;
          white-space: nowrap;
        }
        .og-table td {
          padding: 10px 10px;
          border-bottom: 1px solid #eee;
          color: #2a2a1a;
          vertical-align: middle;
        }
        .og-table tr:last-child td { border-bottom: none; }
        .og-table tr:hover td { background: #fdfaf0; }

        /* ── Events empty state ── */
        .og-empty { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 48px 24px; gap: 10px; }
        .og-count-pill { background: #f0f4d8; border: 1px solid #c8d890; color: #5a7020; font-size: 11px; font-weight: 600; padding: 3px 12px; border-radius: 100px; white-space: nowrap; }

        /* ── Animations ── */
        .og-fade { animation: og-rise 0.5s cubic-bezier(0.16,1,0.3,1) both; }
        .d1{animation-delay:0.05s} .d2{animation-delay:0.1s} .d3{animation-delay:0.15s}
        .d4{animation-delay:0.2s} .d5{animation-delay:0.27s} .d6{animation-delay:0.34s}
        @keyframes og-rise { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
      `}</style>

      <div className="og-page">
        <div className="og-inner">

          {/* Header */}
          <header className="og-header og-fade">
            <div>
              <h1 className="og-title">Admin <span>Dashboard</span></h1>
              <p className="og-subtitle">Welcome back! Here's your catering business overview</p>
              <p className="og-date">{new Date().toLocaleDateString("en-IN",{weekday:"long",day:"numeric",month:"long",year:"numeric"})}</p>
            </div>
            <div className="og-badges">
              <div className="og-badge og-badge-live">
                <span className="og-live-dot" />
                Live
              </div>
              <div className="og-badge og-badge-overview">
                <Activity size={12} />
                Overview
              </div>
            </div>
          </header>

          {/* Stat Cards */}
          <div className="og-cards">
            {cards.map((card, i) => {
              const Icon = card.icon;
              return (
                <div key={card.title} className={`og-card og-fade d${i+1}`} style={{"--card-accent": card.accent}}>
                  <div className="og-card-top">
                    <div className="og-card-icon" style={{background: card.lightBg}}>
                      <Icon size={17} style={{color: card.iconColor}} />
                    </div>
                    <span className="og-card-label">{card.title}</span>
                  </div>
                  <div className="og-card-value" style={{color: card.accent}}>{card.value}</div>
                  <div className="og-card-sub">{card.subtext}</div>
                  <div className="og-card-line" />
                </div>
              );
            })}
          </div>

          {/* Charts */}
          <div className="og-charts og-fade d5">
            {/* Monthly Bookings */}
            <div className="og-panel">
              <div className="og-panel-head">
                <div style={{display:"flex", alignItems:"center", gap:10}}>
                  <div className="og-panel-icon" style={{background:"#f0f4d8"}}>
                    <TrendingUp size={15} style={{color:"#6b7a2a"}} />
                  </div>
                  <div>
                    <div className="og-panel-title">Monthly Bookings</div>
                    <div className="og-panel-sub">Last 12 months analysis</div>
                  </div>
                </div>
              </div>
              <div style={{ width: "100%", height: 280, padding: "10px 12px 16px 8px" }}>
                <ChartSection data={stats.monthlyData || []} />
              </div>
            </div>

            {/* Pie */}
            <div className="og-panel">
              <div className="og-panel-head">
                <div style={{display:"flex", alignItems:"center", gap:10}}>
                  <div className="og-panel-icon" style={{background:"#fdf6dc"}}>
                    <CalendarCheck size={15} style={{color:"#a07830"}} />
                  </div>
                  <div>
                    <div className="og-panel-title">Event Types Distribution</div>
                    <div className="og-panel-sub">Bookings by category</div>
                  </div>
                </div>
              </div>
              <div style={{padding:"16px 16px 20px", height: 280}}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={eventDistributionData} cx="50%" cy="50%" innerRadius={55} outerRadius={90} paddingAngle={3} dataKey="value">
                      {eventDistributionData.map((_, index) => (
                        <Cell key={index} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(v) => [`${v}%`, "Share"]} contentStyle={{borderRadius:10, border:"1px solid #e2d89a", fontSize:12}} />
                    <Legend iconType="circle" iconSize={8} formatter={(v) => <span style={{color:"#8a7a4a",fontSize:11}}>{v}</span>} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Today's Events */}
          <div className="og-panel og-fade d6">
            <div className="og-panel-head">
              <div style={{display:"flex", alignItems:"center", gap:10}}>
                <div className="og-panel-icon" style={{background:"#eaf2d0"}}>
                  <CalendarCheck size={15} style={{color:"#5a7020"}} />
                </div>
                <div>
                  <div className="og-panel-title">Today's Events</div>
                  <div className="og-panel-sub">Active catering events scheduled for today</div>
                </div>
              </div>
              <span className="og-count-pill">{todayEvents.length} event{todayEvents.length !== 1 ? "s" : ""}</span>
            </div>

            {todayEvents.length === 0 ? (
              <div className="og-empty">
                <div style={{width:48,height:48,borderRadius:"50%",background:"#f0f4d8",display:"flex",alignItems:"center",justifyContent:"center"}}>
                  <CalendarCheck size={20} style={{color:"#8B9D3A"}} />
                </div>
                <p style={{fontSize:13,color:"#a09060",fontWeight:500}}>No events scheduled for today</p>
                <p style={{fontSize:11,color:"#c0b080"}}>Enjoy your free day!</p>
              </div>
            ) : (
              /* ✅ scrollable table wrapper for mobile */
              <div className="og-table-wrap">
                <table className="og-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Event</th>
                      <th>Venue</th>
                      <th>Time</th>
                      <th>Guests</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {todayEvents.map((event, i) => (
                      <tr key={event._id || event.id || i}>
                        <td>{event.userId?.name || event.fullName || event.customerName || event.name || "—"}</td>
                        <td>{event.eventType || event.type || event.eventName || "—"}</td>
                        <td>{event.venue || event.location || event.venueName || "—"}</td>
                        <td>
                          {event.eventTime || event.time ||
                            (event.eventDate
                              ? new Date(event.eventDate).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })
                              : "—")}
                        </td>
                        <td>{event.guestCount || event.guests || event.numberOfGuests || "—"}</td>
                        <td><StatusBadge status={event.status || "Pending"} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

        </div>
      </div>
    </>
  );
}