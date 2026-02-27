"use client";

import { useState } from "react";

const initialEvents = [
  {
    _id: "1",
    name: "Wedding",
    emoji: "💍",
    description: "Traditional and modern wedding ceremonies",
    minGuests: 100,
    maxGuests: 1000,
    status: "active",
    bookings: 45,
  },
  {
    _id: "2",
    name: "Corporate Event",
    emoji: "💼",
    description: "Business meetings, conferences, and corporate parties",
    minGuests: 20,
    maxGuests: 500,
    status: "active",
    bookings: 30,
  },
  {
    _id: "3",
    name: "Birthday Party",
    emoji: "🎂",
    description: "Birthday celebrations for all ages",
    minGuests: 20,
    maxGuests: 200,
    status: "active",
    bookings: 25,
  },
  {
    _id: "4",
    name: "Anniversary",
    emoji: "🥰",
    description: "Anniversary celebrations and special occasions",
    minGuests: 30,
    maxGuests: 150,
    status: "active",
    bookings: 18,
  },
  {
    _id: "5",
    name: "Religious Ceremony",
    emoji: "🕉️",
    description: "Pooja, Havan, and other religious events",
    minGuests: 50,
    maxGuests: 300,
    status: "active",
    bookings: 22,
  },
  {
    _id: "6",
    name: "Outdoor Picnic",
    emoji: "🌳",
    description: "Garden parties and outdoor gatherings",
    minGuests: 30,
    maxGuests: 200,
    status: "inactive",
    bookings: 12,
  },
];

const today = new Date().toLocaleDateString("en-US", {
  weekday: "long", day: "numeric", month: "long", year: "numeric",
});

export default function ManageEvents() {
  const [events, setEvents] = useState(initialEvents);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [activeView, setActiveView] = useState("cards");
  const [formData, setFormData] = useState({
    name: "", emoji: "🎉", description: "", minGuests: "", maxGuests: "", status: "active",
  });

  const totalActive = events.filter((e) => e.status === "active").length;
  const totalBookings = events.reduce((s, e) => s + e.bookings, 0);

  const openAdd = () => {
    setEditingId(null);
    setFormData({ name: "", emoji: "🎉", description: "", minGuests: "", maxGuests: "", status: "active" });
    setShowModal(true);
  };

  const openEdit = (ev) => {
    setEditingId(ev._id);
    setFormData({ name: ev.name, emoji: ev.emoji, description: ev.description, minGuests: ev.minGuests, maxGuests: ev.maxGuests, status: ev.status });
    setShowModal(true);
  };

  const handleDelete = (id) => setEvents((p) => p.filter((e) => e._id !== id));

  const toggleStatus = (id) =>
    setEvents((p) => p.map((e) => e._id === id ? { ...e, status: e.status === "active" ? "inactive" : "active" } : e));

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (editingId) {
      setEvents((p) => p.map((e) => e._id === editingId ? { ...e, ...formData, minGuests: +formData.minGuests, maxGuests: +formData.maxGuests } : e));
    } else {
      setEvents((p) => [...p, { _id: Date.now().toString(), ...formData, minGuests: +formData.minGuests, maxGuests: +formData.maxGuests, bookings: 0 }]);
    }
    setShowModal(false);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap');
        .me-page {
          background: #f0f5fb;
          font-family: 'Outfit', sans-serif;
          color: #1a2b40;
        }
        .me-topbar {
          background: #fff;
          border-bottom: 1px solid #e2eaf3;
          padding: 14px 32px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 1px 4px rgba(0,0,0,0.05);
          position: sticky; top: 0; z-index: 10;
        }
        .me-hamburger {
          background: none; border: none; font-size: 20px;
          cursor: pointer; color: #4a6080; padding: 4px 8px; border-radius: 6px;
        }
        .me-topbar-date { color: #7a93b0; font-size: 14px; font-weight: 500; }

        .me-body { padding: 32px 36px; max-width: 1280px; margin: 0 auto; }

        .me-header {
          display: flex; justify-content: space-between;
          align-items: flex-start; margin-bottom: 28px;
          flex-wrap: wrap; gap: 16px;
        }
        .me-title {
          font-size: 30px; font-weight: 800;
          color: #0ea5e9; letter-spacing: -0.03em;
        }
        .me-subtitle { color: #7a93b0; font-size: 14px; margin-top: 5px; }
        .me-add-btn {
          background: linear-gradient(135deg, #0ea5e9, #0077cc);
          color: #fff; border: none;
          padding: 13px 26px; border-radius: 12px;
          font-size: 14px; font-weight: 700;
          font-family: 'Outfit', sans-serif;
          cursor: pointer; display: flex; align-items: center; gap: 8px;
          box-shadow: 0 4px 16px rgba(14,165,233,0.35);
          transition: all 0.2s;
        }
        .me-add-btn:hover { transform: translateY(-1px); box-shadow: 0 6px 24px rgba(14,165,233,0.45); }

        .me-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px; margin-bottom: 28px;
        }
        .me-stat {
          background: #fff; border-radius: 16px;
          padding: 24px 28px;
          border: 1px solid #e2eaf3;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .me-stat:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(0,0,0,0.08); }
        .me-stat-label { font-size: 13px; font-weight: 600; color: #7a93b0; margin-bottom: 14px; }
        .me-stat-value { font-size: 40px; font-weight: 800; color: #0ea5e9; letter-spacing: -0.04em; }

        .me-section {
          background: #fff; border-radius: 18px;
          border: 1px solid #e2eaf3;
          box-shadow: 0 2px 12px rgba(0,0,0,0.05);
          overflow: hidden; margin-bottom: 24px;
        }
        .me-section-head {
          padding: 22px 26px 18px;
          border-bottom: 1px solid #f0f5fb;
          display: flex; justify-content: space-between; align-items: flex-start; gap: 16px;
          flex-wrap: wrap;
        }
        .me-section-title { font-size: 17px; font-weight: 700; color: #1a2b40; }
        .me-section-sub { font-size: 13px; color: #7a93b0; margin-top: 3px; }
        .me-toggle { display: flex; gap: 6px; }
        .me-toggle-btn {
          padding: 8px 16px; border-radius: 8px;
          border: 1px solid #e2eaf3;
          background: #fff; color: #7a93b0;
          font-size: 13px; font-weight: 600;
          font-family: 'Outfit', sans-serif;
          cursor: pointer; transition: all 0.2s;
        }
        .me-toggle-btn.active {
          background: #0ea5e9; color: #fff; border-color: #0ea5e9;
          box-shadow: 0 3px 10px rgba(14,165,233,0.3);
        }

        .me-cards {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 20px; padding: 22px 24px;
        }
        .me-card {
          border: 1.5px solid #e8f0fa; border-radius: 16px;
          padding: 22px; background: #fafcff;
          transition: all 0.25s; position: relative; overflow: hidden;
        }
        .me-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, #0ea5e9, #38bdf8);
          opacity: 0; transition: opacity 0.25s;
        }
        .me-card:hover { border-color: #bfdbfe; box-shadow: 0 8px 28px rgba(14,165,233,0.12); transform: translateY(-3px); }
        .me-card:hover::before { opacity: 1; }

        .me-card-head { display: flex; align-items: flex-start; gap: 14px; margin-bottom: 10px; }
        .me-card-emoji {
          width: 52px; height: 52px; border-radius: 14px;
          background: linear-gradient(135deg, #e0f2fe, #bfdbfe);
          display: flex; align-items: center; justify-content: center;
          font-size: 26px; flex-shrink: 0;
        }
        .me-card-name-wrap { flex: 1; min-width: 0; }
        .me-card-name-row { display: flex; justify-content: space-between; align-items: flex-start; gap: 8px; }
        .me-card-name { font-size: 16px; font-weight: 700; color: #1a2b40; line-height: 1.2; }
        .me-card-btns { display: flex; gap: 5px; flex-shrink: 0; }
        .me-icon-btn {
          width: 28px; height: 28px; border-radius: 7px;
          background: none; border: 1px solid #e2eaf3;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; font-size: 13px; transition: all 0.15s;
        }
        .me-icon-btn:hover { background: #f0f5fb; }
        .me-icon-btn.del:hover { background: #fee2e2; border-color: #fca5a5; }

        .me-badge {
          display: inline-block; padding: 4px 12px; border-radius: 20px;
          font-size: 11px; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.05em;
        }
        .me-badge.active { background: #dcfce7; color: #16a34a; border: 1px solid #bbf7d0; }
        .me-badge.inactive { background: #fee2e2; color: #dc2626; border: 1px solid #fca5a5; }

        .me-card-desc { color: #7a93b0; font-size: 13px; line-height: 1.55; margin: 12px 0 14px; }
        .me-card-divider { height: 1px; background: #f0f5fb; margin-bottom: 12px; }
        .me-card-meta { display: flex; justify-content: space-between; font-size: 13px; margin-top: 6px; }
        .me-meta-label { color: #7a93b0; }
        .me-meta-val { font-weight: 700; color: #0ea5e9; }

        .me-table-wrap { overflow-x: auto; }
        .me-table { width: 100%; border-collapse: collapse; font-size: 14px; }
        .me-th {
          padding: 13px 18px; text-align: left;
          font-size: 11px; font-weight: 700; text-transform: uppercase;
          letter-spacing: 0.07em; color: #7a93b0;
          background: #f7fafd; border-bottom: 2px solid #e8f0fa;
        }
        .me-tr { border-bottom: 1px solid #f0f5fb; transition: background 0.15s; }
        .me-tr:last-child { border-bottom: none; }
        .me-tr:hover { background: #f7fbff; }
        .me-td { padding: 14px 18px; vertical-align: middle; }
        .me-cat-cell { display: flex; align-items: center; gap: 12px; }
        .me-cat-emoji {
          width: 36px; height: 36px; border-radius: 10px;
          background: linear-gradient(135deg, #e0f2fe, #bfdbfe);
          display: flex; align-items: center; justify-content: center; font-size: 18px;
        }
        .me-cat-name { font-weight: 700; color: #1a2b40; }
        .me-range { font-weight: 600; color: #0ea5e9; }
        .me-tbl-actions { display: flex; gap: 8px; }
        .me-edit-btn {
          padding: 7px 16px; border-radius: 8px;
          border: 1px solid #e2eaf3; background: #fff;
          font-size: 12px; font-weight: 700; color: #4a6080;
          font-family: 'Outfit', sans-serif; cursor: pointer; transition: all 0.15s;
        }
        .me-edit-btn:hover { border-color: #93c5fd; color: #0ea5e9; background: #f0f9ff; }
        .me-deact-btn {
          padding: 7px 16px; border-radius: 8px;
          border: 1px solid #e2eaf3; background: #fff;
          font-size: 12px; font-weight: 700; color: #dc2626;
          font-family: 'Outfit', sans-serif; cursor: pointer; transition: all 0.15s;
        }
        .me-deact-btn.activate { color: #16a34a; }
        .me-deact-btn:hover { background: #fef2f2; border-color: #fca5a5; }
        .me-deact-btn.activate:hover { background: #f0fdf4; border-color: #bbf7d0; }

        .me-overlay {
          position: fixed; inset: 0;
          background: rgba(15,30,50,0.55);
          backdrop-filter: blur(6px);
          display: flex; align-items: center; justify-content: center;
          z-index: 100; animation: fadeIn 0.2s;
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .me-modal {
          background: #fff; border-radius: 20px;
          width: 100%; max-width: 460px;
          box-shadow: 0 24px 64px rgba(0,0,0,0.18);
          overflow: hidden; animation: slideUp 0.25s ease;
          position: relative;
        }
        .me-modal::before {
          content: ''; position: absolute;
          top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, #0ea5e9, #38bdf8, #0077cc);
        }
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .me-modal-head {
          display: flex; justify-content: space-between; align-items: center;
          padding: 22px 26px 16px; border-bottom: 1px solid #f0f5fb;
        }
        .me-modal-title { font-size: 18px; font-weight: 800; color: #0ea5e9; }
        .me-modal-close {
          background: #f0f5fb; border: none; width: 30px; height: 30px;
          border-radius: 50%; font-size: 15px; cursor: pointer; color: #7a93b0;
          display: flex; align-items: center; justify-content: center; transition: background 0.15s;
        }
        .me-modal-close:hover { background: #e2eaf3; }
        .me-modal-body { padding: 22px 26px; display: flex; flex-direction: column; gap: 14px; }
        .me-form-label { font-size: 12px; font-weight: 700; color: #7a93b0; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 6px; display: block; }
        .me-input, .me-textarea, .me-select {
          width: 100%; padding: 11px 14px;
          border: 1.5px solid #e2eaf3; border-radius: 10px;
          font-size: 14px; font-family: 'Outfit', sans-serif;
          color: #1a2b40; outline: none; transition: all 0.2s; background: #f7fafd;
        }
        .me-input:focus, .me-textarea:focus, .me-select:focus {
          border-color: #0ea5e9;
          box-shadow: 0 0 0 3px rgba(14,165,233,0.12); background: #fff;
        }
        .me-textarea { min-height: 82px; resize: vertical; }
        .me-input-row { display: flex; gap: 12px; }
        .me-input-row > * { flex: 1; }
        .me-modal-footer {
          display: flex; justify-content: flex-end; gap: 10px;
          padding: 16px 26px; border-top: 1px solid #f0f5fb;
        }
        .me-cancel { padding: 11px 22px; border-radius: 10px; border: 1.5px solid #e2eaf3; background: #fff; color: #7a93b0; font-size: 14px; font-weight: 600; font-family: 'Outfit', sans-serif; cursor: pointer; transition: all 0.15s; }
        .me-cancel:hover { background: #f7fafd; }
        .me-save { padding: 11px 26px; border-radius: 10px; border: none; background: linear-gradient(135deg, #0ea5e9, #0077cc); color: #fff; font-size: 14px; font-weight: 700; font-family: 'Outfit', sans-serif; cursor: pointer; box-shadow: 0 4px 14px rgba(14,165,233,0.35); transition: all 0.2s; }
        .me-save:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(14,165,233,0.45); }

        /* ── Categories Overview Table ── */
        .me-overview {
          background: #fff; border-radius: 18px;
          border: 1px solid #e2eaf3;
          box-shadow: 0 2px 12px rgba(0,0,0,0.05);
          overflow: hidden; margin-bottom: 40px;
        }
        .me-overview-head {
          padding: 22px 26px 18px;
          border-bottom: 1px solid #f0f5fb;
        }
        .me-overview-title { font-size: 17px; font-weight: 700; color: #1a2b40; }
        .me-overview-sub { font-size: 13px; color: #7a93b0; margin-top: 3px; }

        .me-ov-table { width: 100%; border-collapse: collapse; font-size: 14px; }
        .me-ov-th {
          padding: 13px 20px; text-align: left;
          font-size: 12px; font-weight: 700;
          color: #7a93b0; background: #f7fafd;
          border-bottom: 2px solid #e8f0fa;
          letter-spacing: 0.03em;
        }
        .me-ov-tr {
          border-bottom: 1px solid #f0f5fb;
          transition: background 0.15s;
        }
        .me-ov-tr:last-child { border-bottom: none; }
        .me-ov-tr:hover { background: #f7fbff; }
        .me-ov-td { padding: 15px 20px; vertical-align: middle; }

        .me-ov-cat { display: flex; align-items: center; gap: 12px; }
        .me-ov-emoji {
          width: 36px; height: 36px; border-radius: 10px;
          background: linear-gradient(135deg, #e0f2fe, #bfdbfe);
          display: flex; align-items: center; justify-content: center;
          font-size: 18px; flex-shrink: 0;
        }
        .me-ov-name { font-weight: 700; color: #1a2b40; font-size: 14px; }
        .me-ov-desc { color: #7a93b0; font-size: 13px; max-width: 300px; line-height: 1.4; }
        .me-ov-range { font-weight: 600; color: #1a2b40; }
        .me-ov-bookings { font-weight: 700; color: #1a2b40; }

        .me-ov-badge {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 5px 14px; border-radius: 20px;
          font-size: 12px; font-weight: 700;
          letter-spacing: 0.03em; border: 1px solid;
        }
        .me-ov-badge-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: currentColor;
        }
        .me-ov-badge.active {
          background: #dcfce7; color: #16a34a; border-color: #bbf7d0;
        }
        .me-ov-badge.inactive {
          background: #f3f4f6; color: #6b7280; border-color: #e5e7eb;
        }

        .me-ov-actions { display: flex; gap: 8px; }
        .me-ov-edit {
          padding: 7px 18px; border-radius: 8px;
          border: 1px solid #e2eaf3; background: #fff;
          font-size: 13px; font-weight: 600; color: #4a6080;
          font-family: 'Outfit', sans-serif; cursor: pointer; transition: all 0.15s;
        }
        .me-ov-edit:hover { border-color: #93c5fd; color: #0ea5e9; background: #f0f9ff; }
        .me-ov-deact {
          padding: 7px 18px; border-radius: 8px;
          border: 1px solid #e2eaf3; background: #fff;
          font-size: 13px; font-weight: 600;
          font-family: 'Outfit', sans-serif; cursor: pointer; transition: all 0.15s;
          color: #dc2626;
        }
        .me-ov-deact.act { color: #16a34a; }
        .me-ov-deact:hover { background: #fef2f2; border-color: #fca5a5; }
        .me-ov-deact.act:hover { background: #f0fdf4; border-color: #bbf7d0; }

        @media (max-width: 768px) {
          .me-stats { grid-template-columns: 1fr; }
          .me-body { padding: 20px 16px; }
          .me-title { font-size: 22px; }
          .me-ov-desc { display: none; }
        }
      `}</style>
      <div className="me-page">
        {/* Topbar */}
        <div className="me-topbar">
          <div className="me-topbar-date">{today}</div>
        </div>
        <div className="me-body">
          {/* Header */}
          <div className="me-header">
            <div>
              <h1 className="me-title">Manage Event Categories</h1>
              <p className="me-subtitle">Create and manage different types of catering events</p>
            </div>
            <button className="me-add-btn" onClick={openAdd}>
              <span style={{ fontSize: 18 }}>+</span> Add Category
            </button>
          </div>

          {/* Stats */}
          <div className="me-stats">
            <div className="me-stat">
              <div className="me-stat-label">Total Categories</div>
              <div className="me-stat-value">{events.length}</div>
            </div>
            <div className="me-stat">
              <div className="me-stat-label">Active Categories</div>
              <div className="me-stat-value" style={{ color: "#16a34a" }}>{totalActive}</div>
            </div>
            <div className="me-stat">
              <div className="me-stat-label">Total Bookings</div>
              <div className="me-stat-value">{totalBookings}</div>
            </div>
          </div>

          {/* Section */}
          <div className="me-section">
            <div className="me-section-head">
              <div>
                <div className="me-section-title">Event Categories</div>
                <div className="me-section-sub">All available event types for catering services</div>
              </div>
              <div className="me-toggle">
                <button className={`me-toggle-btn ${activeView === "cards" ? "active" : ""}`} onClick={() => setActiveView("cards")}>⊞ Cards</button>
                <button className={`me-toggle-btn ${activeView === "table" ? "active" : ""}`} onClick={() => setActiveView("table")}>≡ Table</button>
              </div>
            </div>

            {activeView === "cards" ? (
              <div className="me-cards">
                {events.map((ev) => (
                  <div key={ev._id} className="me-card">
                    <div className="me-card-head">
                      <div className="me-card-emoji">{ev.emoji}</div>
                      <div className="me-card-name-wrap">
                        <div className="me-card-name-row">
                          <div className="me-card-name">{ev.name}</div>
                          <div className="me-card-btns">
                            <button className="me-icon-btn" onClick={() => openEdit(ev)} title="Edit">✏️</button>
                            <button className="me-icon-btn del" onClick={() => handleDelete(ev._id)} title="Delete">🗑️</button>
                          </div>
                        </div>
                        <span className={`me-badge ${ev.status}`} style={{ marginTop: 8, display: "inline-block" }}>{ev.status}</span>
                      </div>
                    </div>
                    <p className="me-card-desc">{ev.description}</p>
                    <div className="me-card-divider" />
                    <div className="me-card-meta">
                      <span className="me-meta-label">Guest Range:</span>
                      <span className="me-meta-val">{ev.minGuests} - {ev.maxGuests}</span>
                    </div>
                    <div className="me-card-meta" style={{ marginTop: 8 }}>
                      <span className="me-meta-label">Total Bookings:</span>
                      <span className="me-meta-val">{ev.bookings}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="me-table-wrap">
                <table className="me-table">
                  <thead>
                    <tr>
                      <th className="me-th">Category</th>
                      <th className="me-th">Description</th>
                      <th className="me-th">Guest Range</th>
                      <th className="me-th">Bookings</th>
                      <th className="me-th">Status</th>
                      <th className="me-th">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {events.map((ev) => (
                      <tr key={ev._id} className="me-tr">
                        <td className="me-td">
                          <div className="me-cat-cell">
                            <div className="me-cat-emoji">{ev.emoji}</div>
                            <span className="me-cat-name">{ev.name}</span>
                          </div>
                        </td>
                        <td className="me-td" style={{ color: "#7a93b0", fontSize: 13, maxWidth: 280 }}>{ev.description}</td>
                        <td className="me-td"><span className="me-range">{ev.minGuests} - {ev.maxGuests}</span></td>
                        <td className="me-td" style={{ fontWeight: 700 }}>{ev.bookings}</td>
                        <td className="me-td">
                          <span className={`me-badge ${ev.status}`}>{ev.status}</span>
                        </td>
                        <td className="me-td">
                          <div className="me-tbl-actions">
                            <button className="me-edit-btn" onClick={() => openEdit(ev)}>Edit</button>
                            <button
                              className={`me-deact-btn ${ev.status === "inactive" ? "activate" : ""}`}
                              onClick={() => toggleStatus(ev._id)}
                            >
                              {ev.status === "active" ? "Deactivate" : "Activate"}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* ── Categories Overview Table ── */}
          <div className="me-overview">
            <div className="me-overview-head">
              <div className="me-overview-title">Categories Overview</div>
              <div className="me-overview-sub">Detailed table view of all event categories</div>
            </div>
            <div style={{ overflowX: "auto" }}>
              <table className="me-ov-table">
                <thead>
                  <tr>
                    <th className="me-ov-th">Category</th>
                    <th className="me-ov-th">Description</th>
                    <th className="me-ov-th">Guest Range</th>
                    <th className="me-ov-th">Bookings</th>
                    <th className="me-ov-th">Status</th>
                    <th className="me-ov-th">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((ev) => (
                    <tr key={ev._id} className="me-ov-tr">
                      {/* Category */}
                      <td className="me-ov-td">
                        <div className="me-ov-cat">
                          <div className="me-ov-emoji">{ev.emoji}</div>
                          <span className="me-ov-name">{ev.name}</span>
                        </div>
                      </td>

                      {/* Description */}
                      <td className="me-ov-td">
                        <span className="me-ov-desc">{ev.description}</span>
                      </td>

                      {/* Guest Range */}
                      <td className="me-ov-td">
                        <span className="me-ov-range">{ev.minGuests} - {ev.maxGuests}</span>
                      </td>

                      {/* Bookings */}
                      <td className="me-ov-td">
                        <span className="me-ov-bookings">{ev.bookings}</span>
                      </td>

                      {/* Status Badge */}
                      <td className="me-ov-td">
                        <span className={`me-ov-badge ${ev.status}`}>
                          <span className="me-ov-badge-dot" />
                          {ev.status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="me-ov-td">
                        <div className="me-ov-actions">
                          <button className="me-ov-edit" onClick={() => openEdit(ev)}>
                            Edit
                          </button>
                          <button
                            className={`me-ov-deact ${ev.status === "inactive" ? "act" : ""}`}
                            onClick={() => toggleStatus(ev._id)}
                          >
                            {ev.status === "active" ? "Deactivate" : "Activate"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Modal */}
        {showModal && (
          <div className="me-overlay" onClick={() => setShowModal(false)}>
            <div className="me-modal" onClick={(e) => e.stopPropagation()}>
              <div className="me-modal-head">
                <div className="me-modal-title">{editingId ? "Edit Category" : "Add New Category"}</div>
                <button className="me-modal-close" onClick={() => setShowModal(false)}>✕</button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="me-modal-body">
                  <div>
                    <label className="me-form-label">Category Name</label>
                    <input className="me-input" type="text" placeholder="e.g. Wedding"
                      value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                  </div>
                  <div>
                    <label className="me-form-label">Emoji Icon</label>
                    <input className="me-input" type="text" placeholder="e.g. 💍"
                      value={formData.emoji} onChange={(e) => setFormData({ ...formData, emoji: e.target.value })} />
                  </div>
                  <div>
                    <label className="me-form-label">Description</label>
                    <textarea className="me-textarea" placeholder="Short description..."
                      value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} required />
                  </div>
                  <div>
                    <label className="me-form-label">Guest Range</label>
                    <div className="me-input-row">
                      <input className="me-input" type="number" placeholder="Min Guests"
                        value={formData.minGuests} onChange={(e) => setFormData({ ...formData, minGuests: e.target.value })} required />
                      <input className="me-input" type="number" placeholder="Max Guests"
                        value={formData.maxGuests} onChange={(e) => setFormData({ ...formData, maxGuests: e.target.value })} required />
                    </div>
                  </div>
                  <div>
                    <label className="me-form-label">Status</label>
                    <select className="me-select" value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>
                <div className="me-modal-footer">
                  <button type="button" className="me-cancel" onClick={() => setShowModal(false)}>Cancel</button>
                  <button type="submit" className="me-save">{editingId ? "Save Changes" : "Add Category"}</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}