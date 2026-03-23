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
    bg: "rgba(180,140,20,0.10)",
    color: "#a07800",
    border: "rgba(180,140,20,0.30)",
  },
  Confirmed: {
    bg: "rgba(74,103,28,0.10)",
    color: "#4a671c",
    border: "rgba(74,103,28,0.30)",
  },
  Completed: {
    bg: "rgba(60,120,60,0.10)",
    color: "#2e7a2e",
    border: "rgba(60,120,60,0.25)",
  },
  Cancelled: {
    bg: "rgba(180,40,40,0.08)",
    color: "#b82020",
    border: "rgba(180,40,40,0.25)",
  },
};

const statCards = (bookings) => [
  { label: "Total Bookings", value: bookings.length, color: "#4a6b1e", icon: "📋" },
  {
    label: "Confirmed",
    value: bookings.filter((b) => b.status === "Confirmed").length,
    color: "#3a5c14",
    icon: "✅",
  },
  {
    label: "Pending",
    value: bookings.filter((b) => b.status === "Pending").length,
    color: "#8a6000",
    icon: "⏳",
  },
  {
    label: "Cancelled",
    value: bookings.filter((b) => b.status === "Cancelled").length,
    color: "#a02020",
    icon: "✕",
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

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .ab-root {
          min-height: 100vh;
          background: #e4df9a;
          font-family: 'Outfit', sans-serif;
          padding: 36px 40px;
          color: #2a3010;
        }

        .ab-header { margin-bottom: 28px; }
        .ab-title {
          font-size: 30px;
          font-weight: 700;
          color: #2e3e0e;
          letter-spacing: -0.02em;
        }
        .ab-subtitle { color: #6a7040; font-size: 14px; margin-top: 4px; }
        .ab-header-line {
          width: 50px; height: 3px;
          background: #4a6020;
          border-radius: 2px;
          margin-top: 12px;
        }

        .ab-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
          gap: 14px;
          margin-bottom: 28px;
        }
        .ab-stat {
          background: #f5f2d0;
          border: 1.5px solid #c8c478;
          border-top: 3px solid var(--sc, #4a6020);
          border-radius: 12px;
          padding: 18px 20px;
          transition: box-shadow 0.2s, transform 0.2s;
        }
        .ab-stat:hover {
          box-shadow: 0 4px 18px rgba(60,80,10,0.12);
          transform: translateY(-2px);
        }
        .ab-stat-label {
          font-size: 11px; color: #6a7040; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 10px;
        }
        .ab-stat-row { display: flex; align-items: flex-end; justify-content: space-between; }
        .ab-stat-value { font-size: 38px; font-weight: 800; letter-spacing: -0.04em; line-height: 1; }
        .ab-stat-icon { font-size: 22px; opacity: 0.3; margin-bottom: 2px; }

        .ab-controls {
          display: flex; justify-content: space-between; align-items: center;
          flex-wrap: wrap; gap: 12px; margin-bottom: 20px;
        }

        .ab-filters { display: flex; gap: 8px; flex-wrap: wrap; }
        .ab-filter-btn {
          padding: 7px 18px;
          border-radius: 6px;
          border: 1.5px solid #c8c478;
          background: #f5f2d0;
          color: #4a5a18;
          font-size: 13px; font-weight: 600;
          font-family: 'Outfit', sans-serif;
          cursor: pointer; transition: all 0.18s;
        }
        .ab-filter-btn:hover { border-color: #4a6020; color: #2e3e0e; background: #dde8a0; }
        .ab-filter-btn.active {
          background: #4a6020; border-color: #4a6020; color: #fff;
          box-shadow: 0 2px 10px rgba(60,80,10,0.22);
        }

        .ab-search-wrap { position: relative; }
        .ab-search-icon {
          position: absolute; left: 13px; top: 50%;
          transform: translateY(-50%); color: #6a7040; font-size: 14px; pointer-events: none;
        }
        .ab-search {
          background: #f5f2d0;
          border: 1.5px solid #c8c478;
          border-radius: 8px;
          padding: 9px 16px 9px 38px;
          font-size: 13px; font-family: 'Outfit', sans-serif;
          color: #2a3010; outline: none; width: 250px; transition: all 0.18s;
        }
        .ab-search::placeholder { color: #6a7040; }
        .ab-search:focus { border-color: #4a6020; box-shadow: 0 0 0 3px rgba(74,96,32,0.15); }

        .ab-table-wrap {
          background: #fff;
          border: 1.5px solid #c8c478;
          border-radius: 14px;
          overflow: hidden;
          box-shadow: 0 4px 24px rgba(60,80,10,0.10);
        }

        .ab-table { width: 100%; border-collapse: collapse; }
        .ab-thead { background: #4a6020; }
        .ab-th {
          padding: 13px 18px; font-size: 12px; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.07em; color: #c8c050; text-align: left;
        }

        .ab-tr { border-bottom: 1px solid #ede9b8; transition: background 0.12s; }
        .ab-tr:last-child { border-bottom: none; }
        .ab-tr:hover { background: #f8f6e0; }
        .ab-td { padding: 13px 18px; font-size: 14px; vertical-align: middle; }

        .ab-avatar {
          width: 34px; height: 34px; border-radius: 50%;
          background: linear-gradient(135deg, #4a6020, #8a7a10);
          display: flex; align-items: center; justify-content: center;
          font-size: 14px; font-weight: 700; color: #fff; flex-shrink: 0;
        }
        .ab-user-cell { display: flex; align-items: center; gap: 11px; }
        .ab-user-name { font-weight: 600; color: #2a3010; font-size: 14px; }
        .ab-user-email { font-size: 12px; color: #6a7040; margin-top: 1px; }

        .ab-event-tag {
          display: inline-block; padding: 3px 11px; border-radius: 4px;
          font-size: 12px; font-weight: 600;
          background: #e8eebc; color: #3a5010; border: 1px solid #b8c870;
        }

        .ab-date { color: #6a7040; font-size: 13px; }
        .ab-guests { font-weight: 800; color: #3a5010; font-size: 16px; }

        .ab-status-badge {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 4px 12px; border-radius: 5px;
          font-size: 11.5px; font-weight: 700; letter-spacing: 0.04em;
          border: 1px solid; white-space: nowrap; text-transform: uppercase;
        }
        .ab-status-dot { width: 5px; height: 5px; border-radius: 50%; background: currentColor; }

        .ab-select-wrap { position: relative; }
        .ab-select {
          appearance: none;
          background: #f0eecc; border: 1.5px solid #c8c478;
          border-radius: 7px; padding: 7px 30px 7px 11px;
          font-size: 13px; font-family: 'Outfit', sans-serif;
          color: #2a3010; cursor: pointer; outline: none;
          transition: all 0.18s; width: 138px;
        }
        .ab-select:focus { border-color: #4a6020; box-shadow: 0 0 0 3px rgba(74,96,32,0.15); }
        .ab-select option { background: #f0eecc; }
        .ab-select-arrow {
          position: absolute; right: 10px; top: 50%;
          transform: translateY(-50%); color: #6a7040; font-size: 10px; pointer-events: none;
        }

        .ab-empty { text-align: center; padding: 60px 20px; color: #6a7040; font-size: 15px; }
        .ab-empty-icon { font-size: 44px; margin-bottom: 12px; opacity: 0.5; }

        .ab-count { margin-top: 14px; text-align: right; font-size: 13px; color: #6a7040; }
        .ab-count span { color: #3a5010; font-weight: 700; }
      `}</style>

      <div className="ab-root">
        <div className="ab-header">
          <h1 className="ab-title">All Bookings</h1>
          <p className="ab-subtitle">View and manage all catering event bookings</p>
          <div className="ab-header-line" />
        </div>

        <div className="ab-stats">
          {stats.map((s) => (
            <div className="ab-stat" key={s.label} style={{ "--sc": s.color }}>
              <div className="ab-stat-label">{s.label}</div>
              <div className="ab-stat-row">
                <div className="ab-stat-value" style={{ color: s.color }}>{s.value}</div>
                <div className="ab-stat-icon">{s.icon}</div>
              </div>
            </div>
          ))}
        </div>

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
              placeholder="Search name, email, event…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

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
                      <td className="ab-td">
                        <div className="ab-user-cell">
                          <div className="ab-avatar">{b.userId.name.charAt(0)}</div>
                          <div>
                            <div className="ab-user-name">{b.userId.name}</div>
                            <div className="ab-user-email">{b.userId.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="ab-td"><span className="ab-event-tag">{b.eventType}</span></td>
                      <td className="ab-td">
                        <span className="ab-date">
                          {new Date(b.eventDate).toLocaleDateString("en-US", {
                            day: "numeric", month: "short", year: "numeric",
                          })}
                        </span>
                      </td>
                      <td className="ab-td"><span className="ab-guests">{b.guests}</span></td>
                      <td className="ab-td">
                        <span
                          className="ab-status-badge"
                          style={{ background: st.bg, color: st.color, borderColor: st.border }}
                        >
                          <span className="ab-status-dot" />
                          {b.status}
                        </span>
                      </td>
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
    </>
  );
}