"use client";
import "./events.css";
import { useState, useEffect } from "react";

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [formData, setFormData] = useState({ name: "", description: "", emoji: "" });
  const [editData, setEditData] = useState(null);
  const [processing, setProcessing] = useState(false);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/events");
      if (!res.ok) { setEvents([]); return; }
      const data = await res.json();
      setEvents(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Fetch error:", err);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchEvents(); }, []);

  const totalBookings = Array.isArray(events)
    ? events.reduce((sum, e) => sum + (e.totalBookings || 0), 0) : 0;
  const totalCategories = Array.isArray(events) ? events.length : 0;
  const activeEventsCount = Array.isArray(events)
    ? events.filter((e) => e.status === "active").length : 0;

  const filteredEvents = Array.isArray(events)
    ? events.filter((event) =>
        event.name?.trim().toLowerCase().includes(search.toLowerCase()) ||
        event._id?.toString().includes(search)
      )
    : [];

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (showEditModal) setEditData({ ...editData, [name]: value });
    else setFormData({ ...formData, [name]: value });
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    try {
      const res = await fetch("/api/admin/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: formData.name, description: formData.description, emoji: formData.emoji }),
      });
      if (res.ok) {
        setShowModal(false);
        setFormData({ name: "", description: "", emoji: "" });
        fetchEvents();
      }
    } catch (err) { alert("Add failed"); }
    finally { setProcessing(false); }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    try {
      const res = await fetch(`/api/admin/events/${editData._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: editData.name, description: editData.description, emoji: editData.emoji }),
      });
      if (res.ok) { setShowEditModal(false); fetchEvents(); }
    } catch (err) { alert("Update failed"); }
    finally { setProcessing(false); }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this event?");
    if (!confirmDelete) return;
    try {
      const res = await fetch(`/api/admin/events/${id}`, { method: "DELETE" });
      if (res.ok) fetchEvents();
      else alert("Delete failed");
    } catch (err) { alert("Error deleting"); }
  };

  const openEditModal = (event) => {
    setEditData(event);
    setShowEditModal(true);
  };

  return (
    <>
      <div className="ev-root">

        {/* Header */}
        <div className="ev-header">
          <div className="ev-header-left">
            <div className="ev-header-icon">🎪</div>
            <div>
              <h1>Event Categories</h1>
              <p className="ev-header-sub">Manage and organise your event types</p>
            </div>
          </div>
          <button className="ev-add-btn" onClick={() => setShowModal(true)}>
            ＋ Add Category
          </button>
        </div>

        {/* Stats */}
        <div className="ev-stats">
          <div className="ev-stat-card">
            <h3>Total Bookings</h3>
            <p>{totalBookings}</p>
            <div className="ev-stat-accent" />
          </div>
          <div className="ev-stat-card">
            <h3>Total Categories</h3>
            <p>{totalCategories}</p>
            <div className="ev-stat-accent" />
          </div>
          <div className="ev-stat-card">
            <h3>Active Categories</h3>
            <p>{activeEventsCount}</p>
            <div className="ev-stat-accent" />
          </div>
        </div>

        {/* Table Section */}
        <div className="ev-table-section">
          <div className="ev-section-header">
            <h2>Categories Overview</h2>
            <div className="ev-search-wrap">
              <span className="ev-search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search categories…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="ev-search-input"
              />
            </div>
          </div>

          {loading ? (
            <div className="ev-loading">
              <span className="ev-spinner" />
              Loading events…
            </div>
          ) : (
            <>
              {/* ── DESKTOP: Table ── */}
              <div className="ev-table-wrapper">
                <table className="ev-table">
                  <thead>
                    <tr>
                      <th>Category</th>
                      <th>Description</th>
                      <th>Bookings</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEvents.map((event) => (
                      <tr key={event._id}>
                        <td>
                          <div className="ev-cat-name">
                            <span className="ev-emoji">{event.emoji}</span>
                            {event.name}
                          </div>
                        </td>
                        <td>{event.description}</td>
                        <td>
                          <span className="ev-bookings-badge">{event.totalBookings || 0}</span>
                        </td>
                        <td>
                          <button className="ev-btn ev-btn-edit" onClick={() => openEditModal(event)}>
                            ✏️ Update
                          </button>
                          <button className="ev-btn ev-btn-delete" onClick={() => handleDelete(event._id)}>
                            🗑 Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* ── MOBILE: Cards ── */}
              <div className="ev-mobile-cards">
                {filteredEvents.map((event) => (
                  <div key={event._id} className="ev-mobile-card">
                    <div className="ev-mobile-card-top">
                      <span className="ev-emoji">{event.emoji}</span>
                      <span className="ev-mobile-card-name">{event.name}</span>
                    </div>
                    {event.description && (
                      <p className="ev-mobile-card-desc">{event.description}</p>
                    )}
                    <div className="ev-mobile-card-footer">
                      <span className="ev-bookings-badge">
                        {event.totalBookings || 0} bookings
                      </span>
                      <div className="ev-mobile-card-actions">
                        <button className="ev-btn ev-btn-edit" onClick={() => openEditModal(event)}>
                          ✏️ Update
                        </button>
                        <button className="ev-btn ev-btn-delete" onClick={() => handleDelete(event._id)}>
                          🗑 Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                {filteredEvents.length === 0 && (
                  <p className="ev-empty">No events found.</p>
                )}
              </div>

              {/* Desktop empty state */}
              {!filteredEvents.length && (
                <p className="ev-empty" style={{ display: "none" /* shown via CSS on desktop */ }}>
                  No events found.
                </p>
              )}
            </>
          )}
        </div>

        {/* Add Modal */}
        {showModal && (
          <div className="ev-overlay">
            <div className="ev-modal">
              <div className="ev-modal-header">
                <h2>Add New Category</h2>
                <button className="ev-modal-close" onClick={() => setShowModal(false)}>✕</button>
              </div>
              <div className="ev-modal-body">
                <form onSubmit={handleAddSubmit}>
                  <label>Name</label>
                  <input className="ev-modal-input" name="name" placeholder="e.g. Wedding" onChange={handleChange} required />
                  <label>Emoji</label>
                  <input className="ev-modal-input" name="emoji" placeholder="🎉" onChange={handleChange} />
                  <label>Description</label>
                  <input className="ev-modal-input" name="description" placeholder="Brief description…" onChange={handleChange} />
                  <button type="submit" disabled={processing} className="ev-submit-btn">
                    {processing ? "Saving…" : "✦ Create Category"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {showEditModal && editData && (
          <div className="ev-overlay">
            <div className="ev-modal">
              <div className="ev-modal-header">
                <h2>Edit Category</h2>
                <button className="ev-modal-close" onClick={() => setShowEditModal(false)}>✕</button>
              </div>
              <div className="ev-modal-body">
                <form onSubmit={handleEditSubmit}>
                  <label>Name</label>
                  <input className="ev-modal-input" name="name" value={editData.name} onChange={handleChange} required />
                  <label>Emoji</label>
                  <input className="ev-modal-input" name="emoji" value={editData.emoji} onChange={handleChange} />
                  <label>Description</label>
                  <input className="ev-modal-input" name="description" value={editData.description} onChange={handleChange} />
                  <button type="submit" disabled={processing} className="ev-submit-btn">
                    {processing ? "Updating…" : "✦ Save Changes"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

      </div>
    </>
  );
}