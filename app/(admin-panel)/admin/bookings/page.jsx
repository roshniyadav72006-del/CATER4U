"use client";

import { useState } from "react";

const mockBookings = [
  {
    _id: "1",
    userId: { name: "Aryan Sharma", email: "aryan@email.com" },
    eventDate: "2026-03-15",
    guests: 250,
    status: "Pending",
    createdAt: "2026-02-20",
    eventType: "Wedding",
  },
  {
    _id: "2",
    userId: { name: "Priya Mehta", email: "priya@email.com" },
    eventDate: "2026-03-22",
    guests: 80,
    status: "Confirmed",
    createdAt: "2026-02-18",
    eventType: "Corporate Event",
  },
  {
    _id: "3",
    userId: { name: "Rohan Verma", email: "rohan@email.com" },
    eventDate: "2026-04-05",
    guests: 50,
    status: "Completed",
    createdAt: "2026-02-15",
    eventType: "Birthday Party",
  },
  {
    _id: "4",
    userId: { name: "Sneha Kapoor", email: "sneha@email.com" },
    eventDate: "2026-04-10",
    guests: 120,
    status: "Cancelled",
    createdAt: "2026-02-10",
    eventType: "Anniversary",
  },
  {
    _id: "5",
    userId: { name: "Karan Patel", email: "karan@email.com" },
    eventDate: "2026-04-18",
    guests: 200,
    status: "Pending",
    createdAt: "2026-02-08",
    eventType: "Religious Ceremony",
  },
  {
    _id: "6",
    userId: { name: "Nisha Joshi", email: "nisha@email.com" },
    eventDate: "2026-05-02",
    guests: 60,
    status: "Confirmed",
    createdAt: "2026-02-05",
    eventType: "Outdoor Picnic",
  },
];

const STATUS_OPTIONS = ["Pending", "Confirmed", "Completed", "Cancelled"];

const statusStyles = {
  Pending: {
    bg: "rgba(255,180,0,0.08)",
    color: "#ffb400",
    border: "rgba(255,180,0,0.3)",
    glow: "rgba(255,180,0,0.15)",
  },
  Confirmed: {
    bg: "rgba(0,195,255,0.08)",
    color: "#00c3ff",
    border: "rgba(0,195,255,0.3)",
    glow: "rgba(0,195,255,0.15)",
  },
  Completed: {
    bg: "rgba(0,255,160,0.08)",
    color: "#00ffa0",
    border: "rgba(0,255,160,0.3)",
    glow: "rgba(0,255,160,0.15)",
  },
  Cancelled: {
    bg: "rgba(255,80,80,0.08)",
    color: "#ff5050",
    border: "rgba(255,80,80,0.3)",
    glow: "rgba(255,80,80,0.15)",
  },
};

const statCards = (bookings) => [
  { label: "Total Bookings", value: bookings.length, color: "#00c3ff" },
  {
    label: "Confirmed",
    value: bookings.filter((b) => b.status === "Confirmed").length,
    color: "#00c3ff",
  },
  {
    label: "Pending",
    value: bookings.filter((b) => b.status === "Pending").length,
    color: "#ffb400",
  },
  {
    label: "Cancelled",
    value: bookings.filter((b) => b.status === "Cancelled").length,
    color: "#ff5050",
  },
];

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState(mockBookings);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const handleStatusChange = (id, newStatus) => {
    setBookings((prev) =>
      prev.map((b) => (b._id === id ? { ...b, status: newStatus } : b))
    );
  };

  const filtered = bookings.filter((b) => {
    const matchFilter = filter === "All" || b.status === filter;
    const matchSearch =
      b.userId.name.toLowerCase().includes(search.toLowerCase()) ||
      b.userId.email.toLowerCase().includes(search.toLowerCase()) ||
      b.eventType.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const stats = statCards(bookings);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap');
        .ab-root {
          min-height: 100vh;
          background: #050d1a;
          font-family: 'Outfit', sans-serif;
          padding: 36px 40px;
          position: relative;
          overflow-x: hidden;
          color: #c8e8f5;
        }

        .ab-glow-1 {
          position: fixed; top: -150px; left: -150px;
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(0,195,255,0.07) 0%, transparent 70%);
          pointer-events: none; z-index: 0;
        }
        .ab-glow-2 {
          position: fixed; bottom: -150px; right: -100px;
          width: 450px; height: 450px;
          background: radial-gradient(circle, rgba(0,80,255,0.06) 0%, transparent 70%);
          pointer-events: none; z-index: 0;
        }

        .ab-content { position: relative; z-index: 1; }

        /* Header */
        .ab-header { margin-bottom: 32px; }
        .ab-title {
          font-size: 32px; font-weight: 800;
          color: #00c3ff;
          text-shadow: 0 0 20px rgba(0,195,255,0.5), 0 0 40px rgba(0,195,255,0.2);
          letter-spacing: -0.03em;
        }
        .ab-subtitle { color: #2e6080; font-size: 14px; margin-top: 6px; }

        /* Stats */
        .ab-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 16px;
          margin-bottom: 28px;
        }
        .ab-stat {
          background: linear-gradient(145deg, #0a1628, #0d1f38);
          border: 1px solid rgba(0,195,255,0.1);
          border-radius: 14px;
          padding: 20px 22px;
          position: relative;
          overflow: hidden;
          transition: border-color 0.2s, transform 0.2s;
        }
        .ab-stat:hover {
          border-color: rgba(0,195,255,0.3);
          transform: translateY(-2px);
        }
        .ab-stat-label { font-size: 12px; color: #2e6080; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 10px; }
        .ab-stat-value { font-size: 34px; font-weight: 800; letter-spacing: -0.04em; }
        .ab-stat-bar {
          position: absolute; top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, transparent, var(--sc), transparent);
          opacity: 0.6;
        }

        /* Controls */
        .ab-controls {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 14px;
          margin-bottom: 24px;
        }

        .ab-filters { display: flex; gap: 8px; flex-wrap: wrap; }
        .ab-filter-btn {
          padding: 8px 18px;
          border-radius: 24px;
          border: 1px solid rgba(0,195,255,0.15);
          background: transparent;
          color: #4a7a99;
          font-size: 13px;
          font-weight: 600;
          font-family: 'Outfit', sans-serif;
          cursor: pointer;
          transition: all 0.2s;
        }
        .ab-filter-btn:hover {
          border-color: rgba(0,195,255,0.35);
          color: #00c3ff;
        }
        .ab-filter-btn.active {
          background: rgba(0,195,255,0.1);
          border-color: #00c3ff;
          color: #00c3ff;
          box-shadow: 0 0 12px rgba(0,195,255,0.15);
        }

        .ab-search-wrap { position: relative; }
        .ab-search-icon {
          position: absolute; left: 14px; top: 50%;
          transform: translateY(-50%);
          color: #2e6080; font-size: 15px; pointer-events: none;
        }
        .ab-search {
          background: rgba(0,195,255,0.04);
          border: 1px solid rgba(0,195,255,0.15);
          border-radius: 10px;
          padding: 10px 16px 10px 40px;
          font-size: 14px;
          font-family: 'Outfit', sans-serif;
          color: #c8e8f5;
          outline: none;
          width: 240px;
          transition: all 0.2s;
        }
        .ab-search::placeholder { color: #2e6080; }
        .ab-search:focus {
          border-color: #00c3ff;
          box-shadow: 0 0 0 3px rgba(0,195,255,0.1);
          background: rgba(0,195,255,0.07);
        }

        /* Table Wrapper */
        .ab-table-wrap {
          background: linear-gradient(145deg, #0a1628, #0d1f38);
          border: 1px solid rgba(0,195,255,0.12);
          border-radius: 18px;
          overflow: hidden;
          box-shadow: 0 8px 40px rgba(0,0,0,0.3);
        }

        .ab-table { width: 100%; border-collapse: collapse; }

        .ab-thead { background: rgba(0,195,255,0.05); }
        .ab-th {
          padding: 14px 18px;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #00c3ff;
          text-align: left;
          border-bottom: 1px solid rgba(0,195,255,0.1);
        }

        .ab-tr {
          border-bottom: 1px solid rgba(0,195,255,0.06);
          transition: background 0.15s;
        }
        .ab-tr:last-child { border-bottom: none; }
        .ab-tr:hover { background: rgba(0,195,255,0.03); }

        .ab-td { padding: 14px 18px; font-size: 14px; vertical-align: middle; }

        .ab-avatar {
          width: 34px; height: 34px;
          border-radius: 50%;
          background: linear-gradient(135deg, #00c3ff, #0064ff);
          display: flex; align-items: center; justify-content: center;
          font-size: 13px; font-weight: 800; color: #fff;
          flex-shrink: 0;
          box-shadow: 0 0 10px rgba(0,195,255,0.3);
        }
        .ab-user-cell { display: flex; align-items: center; gap: 12px; }
        .ab-user-name { font-weight: 600; color: #e0f4ff; font-size: 14px; }
        .ab-user-email { font-size: 12px; color: #2e6080; margin-top: 2px; }

        .ab-event-tag {
          display: inline-block;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          background: rgba(0,100,255,0.1);
          color: #5ca8ff;
          border: 1px solid rgba(0,100,255,0.2);
        }

        .ab-date { color: #4a7a99; font-size: 13px; }

        .ab-guests {
          font-weight: 700;
          color: #00c3ff;
          font-size: 15px;
        }

        /* Status Badge */
        .ab-status-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 5px 14px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.03em;
          border: 1px solid;
          white-space: nowrap;
        }
        .ab-status-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: currentColor;
          box-shadow: 0 0 6px currentColor;
        }

        /* Status Select */
        .ab-select-wrap { position: relative; }
        .ab-select {
          appearance: none;
          background: rgba(0,195,255,0.04);
          border: 1px solid rgba(0,195,255,0.15);
          border-radius: 8px;
          padding: 8px 32px 8px 12px;
          font-size: 13px;
          font-family: 'Outfit', sans-serif;
          color: #c8e8f5;
          cursor: pointer;
          outline: none;
          transition: all 0.2s;
          width: 140px;
        }
        .ab-select:focus {
          border-color: #00c3ff;
          box-shadow: 0 0 0 3px rgba(0,195,255,0.1);
        }
        .ab-select option { background: #0a1628; }
        .ab-select-arrow {
          position: absolute; right: 10px; top: 50%;
          transform: translateY(-50%);
          color: #2e6080; font-size: 11px; pointer-events: none;
        }

        /* Empty */
        .ab-empty {
          text-align: center;
          padding: 60px 20px;
          color: #2e6080;
        }
        .ab-empty-icon { font-size: 48px; margin-bottom: 12px; opacity: 0.5; }

        /* Count */
        .ab-count {
          margin-top: 16px;
          text-align: right;
          font-size: 13px;
          color: #2e6080;
        }
        .ab-count span { color: #00c3ff; font-weight: 700; }
      `}</style>

      <div className="ab-root">
        <div className="ab-glow-1" />
        <div className="ab-glow-2" />

        <div className="ab-content">
          {/* Header */}
          <div className="ab-header">
            <h1 className="ab-title">All Bookings</h1>
            <p className="ab-subtitle">View and manage all catering event bookings</p>
          </div>

          {/* Stats */}
          <div className="ab-stats">
            {stats.map((s) => (
              <div className="ab-stat" key={s.label} style={{ "--sc": s.color }}>
                <div className="ab-stat-bar" />
                <div className="ab-stat-label">{s.label}</div>
                <div className="ab-stat-value" style={{ color: s.color, textShadow: `0 0 16px ${s.color}55` }}>
                  {s.value}
                </div>
              </div>
            ))}
          </div>

          {/* Controls */}
          <div className="ab-controls">
            <div className="ab-filters">
              {["All", ...STATUS_OPTIONS].map((f) => (
                <button
                  key={f}
                  className={`ab-filter-btn ${filter === f ? "active" : ""}`}
                  onClick={() => setFilter(f)}
                >
                  {f}
                </button>
              ))}
            </div>
            <div className="ab-search-wrap">
              <span className="ab-search-icon">🔍</span>
              <input
                className="ab-search"
                placeholder="Search name, email, event..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Table */}
          <div className="ab-table-wrap">
            <table className="ab-table">
              <thead className="ab-thead">
                <tr>
                  {["Customer", "Event Type", "Event Date", "Guests", "Status", "Change Status", "Created"].map((h) => (
                    <th key={h} className="ab-th">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7}>
                      <div className="ab-empty">
                        <div className="ab-empty-icon">📋</div>
                        No bookings found.
                      </div>
                    </td>
                  </tr>
                ) : (
                  filtered.map((b) => {
                    const st = statusStyles[b.status];
                    return (
                      <tr key={b._id} className="ab-tr">
                        {/* Customer */}
                        <td className="ab-td">
                          <div className="ab-user-cell">
                            <div className="ab-avatar">
                              {b.userId.name.charAt(0)}
                            </div>
                            <div>
                              <div className="ab-user-name">{b.userId.name}</div>
                              <div className="ab-user-email">{b.userId.email}</div>
                            </div>
                          </div>
                        </td>

                        {/* Event Type */}
                        <td className="ab-td">
                          <span className="ab-event-tag">{b.eventType}</span>
                        </td>

                        {/* Event Date */}
                        <td className="ab-td">
                          <span className="ab-date">
                            {new Date(b.eventDate).toLocaleDateString("en-US", {
                              day: "numeric", month: "short", year: "numeric",
                            })}
                          </span>
                        </td>

                        {/* Guests */}
                        <td className="ab-td">
                          <span className="ab-guests">{b.guests}</span>
                        </td>

                        {/* Status Badge */}
                        <td className="ab-td">
                          <span
                            className="ab-status-badge"
                            style={{
                              background: st.bg,
                              color: st.color,
                              borderColor: st.border,
                              boxShadow: `0 0 8px ${st.glow}`,
                            }}
                          >
                            <span className="ab-status-dot" />
                            {b.status}
                          </span>
                        </td>

                        {/* Change Status */}
                        <td className="ab-td">
                          <div className="ab-select-wrap">
                            <select
                              className="ab-select"
                              value={b.status}
                              onChange={(e) => handleStatusChange(b._id, e.target.value)}
                            >
                              {STATUS_OPTIONS.map((opt) => (
                                <option key={opt} value={opt}>{opt}</option>
                              ))}
                            </select>
                            <span className="ab-select-arrow">▼</span>
                          </div>
                        </td>

                        {/* Created */}
                        <td className="ab-td">
                          <span className="ab-date">
                            {new Date(b.createdAt).toLocaleDateString("en-US", {
                              day: "numeric", month: "short", year: "numeric",
                            })}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          <div className="ab-count">
            Showing <span>{filtered.length}</span> of <span>{bookings.length}</span> bookings
          </div>
        </div>
      </div>
    </>
  );
}