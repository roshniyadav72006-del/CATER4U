"use client";
import { useEffect, useState } from "react";
export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedBooking, setSelectedBooking] = useState(null);

  const fetchBookings = async () => {
    try {
      const res = await fetch("/api/admin/bookings");
      if (!res.ok) throw new Error("Failed to fetch bookings");

      const data = await res.json();
      setBookings(data);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(`/api/admin/bookings/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to update status");
      }
      fetchBookings();
    } catch (err) {
      console.error("Update status error:", err);
      alert("Error updating status: " + err.message);
    }
  };

  if (loading) return <p>Loading bookings...</p>;

  // Compute summary counts
  const pendingCount = bookings.filter((b) => b.status === "pending").length;
  const approvedCount = bookings.filter((b) => b.status === "approved" || b.status === "confirmed").length;
  const rejectedCount = bookings.filter((b) => b.status === "cancelled" || b.status === "rejected").length;

  // Filtered bookings
  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      b.fullName.toLowerCase().includes(search.toLowerCase()) ||
      (b.bookingID && b.bookingID.toLowerCase().includes(search.toLowerCase()));
    const matchesStatus = statusFilter === "all" || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div style={{ padding: 20  ,backgroundColor: "#f9fafb",   // light background
    minHeight: "100vh"}}>
      <h1>Approve / Reject Bookings</h1>
      <p>Review and manage incoming booking requests</p>

      {/* Summary Cards */}
      <div style={{ display: "flex", gap: 20, marginTop: 20, marginBottom: 20 }}>
        <Card title="Pending Requests" count={pendingCount} color="#FFC107" />
        <Card title="Approved" count={approvedCount} color="#4CAF50" />
        <Card title="Rejected" count={rejectedCount} color="#F44336" />
      </div>

      {/* Search & Status Filter */}
      <div style={{ marginBottom: 15, display: "flex", gap: 10 }}>
        <input
          type="text"
          placeholder="Search by customer name or booking ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: 8, width: 300, borderRadius: 4, border: "1px solid #ccc" }}
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{ padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="confirmed">Confirmed</option>
          <option value="cancelled">Cancelled</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {/* Bookings Table */}
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse",backgroundColor: "#fff",  borderRadius: 8,  overflow: "hidden",  boxShadow: "0 4px 12px rgba(0,0,0,0.1)"}}>
          <thead>
            <tr>
              <th style={thStyle}>Booking ID</th>
              <th style={thStyle}>Customer</th>
              <th style={thStyle}>Event Type</th>
              <th style={thStyle}>Date</th>
              <th style={thStyle}>Guests</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.map((b) => (
              <tr key={b._id} style={trStyle}>
                <td style={tdStyle}>{b.bookingID || "-"}</td>
                <td style={tdStyle}>{b.fullName}</td>
                <td style={tdStyle}>{b.eventType}</td>
                <td style={tdStyle}>{b.eventDate}</td>
                <td style={tdStyle}>{b.guests}</td>
                <td style={{ ...tdStyle, fontWeight: "bold", color: statusColor(b.status) }}>
                  {b.status.toUpperCase()}
                </td>
                <td style={tdStyle}>
                  <button style={viewBtnStyle} onClick={() => setSelectedBooking(b)}>
                    View Details
                  </button>
                  {b.status === "pending" && (
                    <>
                      <button style={confirmBtnStyle} onClick={() => updateStatus(b._id, "approved")}>
                        Approve
                      </button>
                      <button style={cancelBtnStyle} onClick={() => updateStatus(b._id, "rejected")}>
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
            {filteredBookings.length === 0 && (
              <tr>
                <td colSpan={7} style={{ textAlign: "center", padding: 20 }}>
                  No bookings found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {selectedBooking && (
  <div style={overlayStyle}>
    <div style={modalStyle}>
      <h2>Booking Details</h2>

      <p><b>Booking ID:</b> {selectedBooking.bookingID || "-"}</p>
      <p><b>Name:</b> {selectedBooking.fullName}</p>
      <p><b>Email:</b> {selectedBooking.email}</p>
      <p><b>Phone:</b> {selectedBooking.phone}</p>
      <p><b>Event:</b> {selectedBooking.eventType}</p>
      <p><b>Date:</b> {selectedBooking.eventDate}</p>
      <p><b>Guests:</b> {selectedBooking.guests}</p>
      <p><b>Status:</b> {selectedBooking.status}</p>

      <button
        onClick={() => setSelectedBooking(null)}
        style={{
          marginTop: 15,
          padding: "8px 16px",
          background: "#333",
          color: "#fff",
          border: "none",
          borderRadius: 6,
          cursor: "pointer"
        }}  >
        Close
      </button>
    </div>
    </div>
   )}
    </div>
  );
}

// Summary Card Component
const Card = ({ title, count, color }) => (
  <div
    style={{
      flex: 1,
      padding: 20,
      borderRadius: 8,
      backgroundColor: color,
      color: "#fff",
      textAlign: "center",
    }}
  >
    <h3 style={{ margin: 0 }}>{count}</h3>
    <p style={{ margin: 0 }}>{title}</p>
  </div>
);

// Styles
const thStyle = {
  border: "1px solid #ccc",
  padding: 8,
  backgroundColor: "#f2f2f2",
  textAlign: "left",
};
const tdStyle = {
  border: "1px solid #ccc",
  padding: 8,
};
const trStyle = {
  borderBottom: "1px solid #ddd",
};
const viewBtnStyle = {
  marginRight: 5,
  padding: "4px 8px",
  backgroundColor: "#2196F3",
  color: "#fff",
  border: "none",
  borderRadius: 4,
  cursor: "pointer",
};
const confirmBtnStyle = {
  marginRight: 5,
  padding: "4px 8px",
  backgroundColor: "#4CAF50",
  color: "#fff",
  border: "none",
  borderRadius: 4,
  cursor: "pointer",
};
const cancelBtnStyle = {
  padding: "4px 8px",
  backgroundColor: "#F44336",
  color: "#fff",
  border: "none",
  borderRadius: 4,
  cursor: "pointer",
};
const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modalStyle = {
  background: "#fff",
  padding: 20,
  borderRadius: 10,
  width: 400,
  boxShadow: "0 5px 20px rgba(0,0,0,0.3)",
};
const statusColor = (status) => {
  switch (status.toLowerCase()) {
    case "pending":
      return "#FFC107";
    case "approved":
    case "confirmed":
      return "#4CAF50";
    case "cancelled":
    case "rejected":
      return "#F44336";
    default:
      return "#000";
  }
};