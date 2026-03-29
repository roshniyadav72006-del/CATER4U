"use client";
import { useState, useEffect } from "react";

export default function EventsPage() {
  // ✅ Initial state empty array
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // --- Modal States ---
  const [showModal, setShowModal] = useState(false); 
  const [showEditModal, setShowEditModal] = useState(false); 
  const [formData, setFormData] = useState({ name: "", description: "", emoji: "", minGuests: "", maxGuests: "" });
  const [editData, setEditData] = useState(null);
  const [processing, setProcessing] = useState(false);

  // ✅ STEP 2: Cleaned & Fixed Fetch Function
  const fetchEvents = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/events");

      if (!res.ok) {
        console.error("Fetch failed with status:", res.status);
        setEvents([]);
        return;
      }

      const data = await res.json();
      // Safe state update
      setEvents(Array.isArray(data) ? data : []);
      
    } catch (err) {
      console.error("Fetch error:", err);
      setEvents([]); 
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // ✅ STEP 1: Safe Calculations (reduce error fix)
  const totalBookings = Array.isArray(events) ? events.length : 0;
  const getCategoryCount = (name) => {
  return events.filter(e => e.name === name).length;
  };

  const totalCategories = Array.isArray(events) ? events.length : 0;

  const activeEventsCount = Array.isArray(events)
    ? events.filter((event) => event.status === "active").length
    : 0;

  // Safe filtering
  const filteredEvents = Array.isArray(events)
    ? events.filter((event) =>
        event.name?.toLowerCase().includes(search.toLowerCase()) || 
        event._id?.toString().includes(search)
      )
    : [];

  // --- Handlers ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (showEditModal) {
      setEditData({ ...editData, [name]: value });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    try {
      const res = await fetch("/api/admin/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, totalBookings: 0, status: "active" }),
      });
      if (res.ok) {
        setShowModal(false);
        setFormData({ name: "", description: "", emoji: "", minGuests: "", maxGuests: "" });
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
        body: JSON.stringify(editData),
      });
      if (res.ok) {
        setShowEditModal(false);
        fetchEvents();
      }
    } catch (err) { alert("Update failed"); }
    finally { setProcessing(false); }
  };

  const openEditModal = (event) => {
    setEditData(event);
    setShowEditModal(true);
  };

  const toggleStatus = async (id, currentStatus) => {
    try {
      await fetch(`/api/admin/events/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: currentStatus === "active" ? "inactive" : "active" }),
      });
      fetchEvents();
    } catch (err) { console.error(err); }
  };

  return (
    <div className="container">
      <h1>Event Categories</h1>

      <div className="top-header">
        <button className="add-btn" onClick={() => setShowModal(true)}>+ Add Category</button>
      </div>

      <div className="stats-grid">
        <div className="stat-card"><h3>Total Bookings</h3><p>{totalBookings}</p></div>
        <div className="stat-card"><h3>Total Categories</h3><p>{totalCategories}</p></div>
        <div className="stat-card"><h3>Active Categories</h3><p>{activeEventsCount}</p></div>
      </div>

      <div className="table-section">
        <div className="section-header">
          <h2>Categories Overview</h2>
          <div className="search-section">
            <input type="text" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </div>

        <div className="table-wrapper">
          {loading ? (
            <p style={{ textAlign: 'center', padding: '20px' }}>Loading events...</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Description</th>
                  
                  <th>Bookings</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEvents.map((event) => (
                  <tr key={event._id}>
                    <td className="cat-name"><span className="emoji">{event.emoji}</span>{event.name}</td>
                    <td>{event.description}</td>
                    
                    <td>{getCategoryCount(event.name)}</td>
                    <td><span className={`badge ${event.status}`}>{event.status}</span></td>
                    <td>
                      <button className="edit-btn" onClick={() => openEditModal(event)}>Edit</button>
                      <button 
                        onClick={() => toggleStatus(event._id, event.status)}
                        className={event.status === "active" ? "deactivate-btn" : "activate-btn"}
                      >
                        {event.status === "active" ? "Deactivate" : "Activate"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {!loading && filteredEvents.length === 0 && <p className="no-data">No events found.</p>}
        </div>
      </div>

      {/* ================= MODALS (ADD & EDIT) ================= */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Add New Category</h2>
              <button onClick={() => setShowModal(false)}>✕</button>
            </div>
            <form onSubmit={handleAddSubmit}>
              <label>Name</label>
              <input name="name" onChange={handleChange} required />
              <label>Emoji</label>
              <input name="emoji" placeholder="🎉" onChange={handleChange} />
              <label>Description</label>
              <input name="description" onChange={handleChange} />
              <div className="row">
                <input type="number" name="minGuests" placeholder="Min" onChange={handleChange} required />
                <input type="number" name="maxGuests" placeholder="Max" onChange={handleChange} required />
              </div>
              <button type="submit" disabled={processing} className="submit-main-btn">
                {processing ? "Saving..." : "Create Category"}
              </button>
            </form>
          </div>
        </div>
      )}

      {showEditModal && editData && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Edit Category</h2>
              <button onClick={() => setShowEditModal(false)}>✕</button>
            </div>
            <form onSubmit={handleEditSubmit}>
              <label>Name</label>
              <input name="name" value={editData.name} onChange={handleChange} required />
              <label>Emoji</label>
              <input name="emoji" value={editData.emoji} onChange={handleChange} />
              <label>Description</label>
              <input name="description" value={editData.description} onChange={handleChange} />
              <div className="row">
                <input type="number" name="minGuests" value={editData.minGuests} onChange={handleChange} required />
                <input type="number" name="maxGuests" value={editData.maxGuests} onChange={handleChange} required />
              </div>
              <button type="submit" disabled={processing} className="submit-main-btn">
                {processing ? "Updating..." : "Save Changes"}
              </button>
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
        .container { padding: 30px; background: #f8fafc; min-height: 100vh; font-family: sans-serif; }
        .top-header { display: flex; justify-content: flex-end; margin-bottom: 20px; }
        .add-btn { background: #22c55e; color: white; padding: 10px 16px; border-radius: 8px; border: none; font-weight: 600; cursor: pointer; }
        .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px; margin-bottom: 30px; }
        .stat-card { background: white; padding: 20px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); }
        .stat-card h3 { font-size: 14px; color: #64748b; margin-bottom: 5px; }
        .stat-card p { font-size: 24px; font-weight: bold; margin: 0; }
        .table-section { background: white; padding: 25px; border-radius: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); }
        .section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
        .search-section input { padding: 8px 15px; border-radius: 8px; border: 1px solid #cbd5e1; width: 250px; }
        table { width: 100%; border-collapse: collapse; }
        th, td { padding: 12px; border-top: 1px solid #e2e8f0; text-align: left; }
        th { background: #f1f5f9; font-weight: 600; color: #475569; }
        .cat-name { display: flex; align-items: center; gap: 10px; }
        .badge { padding: 4px 10px; border-radius: 20px; font-size: 12px; font-weight: 500; text-transform: capitalize; }
        .active { background: #bbf7d0; color: #166534; }
        .inactive { background: #fecaca; color: #991b1b; }
        .edit-btn { background: #e2e8f0; padding: 6px 12px; border-radius: 6px; border: none; cursor: pointer; margin-right: 8px; }
        .deactivate-btn { background: #f87171; color: white; padding: 6px 12px; border-radius: 6px; border: none; cursor: pointer; }
        .activate-btn { background: #22c55e; color: white; padding: 6px 12px; border-radius: 6px; border: none; cursor: pointer; }
        .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000; }
        .modal { background: white; padding: 25px; border-radius: 15px; width: 450px; max-width: 90%; }
        .modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
        .modal label { display: block; margin-bottom: 5px; font-weight: 600; font-size: 14px; }
        .modal input { width: 100%; padding: 10px; margin-bottom: 15px; border: 1px solid #cbd5e1; border-radius: 8px; box-sizing: border-box; }
        .row { display: flex; gap: 10px; }
        .submit-main-btn { width: 100%; padding: 12px; background: #2563eb; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 600; margin-top: 10px; }
        .no-data { text-align: center; padding: 20px; color: #64748b; }
      `}</style>
    </div>
  );
}