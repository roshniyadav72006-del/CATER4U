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

  useEffect(() => { fetchBookings(); }, []);

  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(`/api/admin/bookings/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (!res.ok) { console.error("Server Error:", data.error); return; }
      setTimeout(() => { setSelectedBooking(null); fetchBookings(); }, 300);
    } catch (err) {
      console.error("Update status error:", err.message);
    }
  };

  if (loading) return (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"center", height:"100vh", backgroundColor:"#F5F3E4" }}>
      <p style={{ color:"#5C6B2E", fontSize:15, fontFamily:"Georgia, serif" }}>Loading bookings...</p>
    </div>
  );

  const pendingCount  = bookings.filter(b => b.status?.toLowerCase() === "pending").length;
  const approvedCount = bookings.filter(b => ["approved","confirmed"].includes(b.status?.toLowerCase())).length;
  const rejectedCount = bookings.filter(b => ["cancelled","rejected"].includes(b.status?.toLowerCase())).length;

  const filteredBookings = bookings.filter(b => {
    const matchesSearch =
      b.fullName.toLowerCase().includes(search.toLowerCase()) ||
      (b.bookingId && b.bookingId.toLowerCase().includes(search.toLowerCase()));
    const matchesStatus = statusFilter === "all" || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div style={s.page}>

      {/* ── Header ── */}
      <div style={{ marginBottom: 28 }}>
        <h1 style={s.pageTitle}>
          Approve /{" "}
          <span style={{ color: "#7A8C3A" }}>Reject Bookings</span>
        </h1>
        <p style={s.pageSub}>Review and manage incoming booking requests</p>
        <p style={s.dateText}>
          {new Date().toLocaleDateString("en-IN", { weekday:"long", day:"numeric", month:"long", year:"numeric" })}
        </p>
      </div>

      {/* ── Stat Cards ── */}
      <div style={s.cardGrid}>
        <StatCard
          icon="⏳"
          label="PENDING REQUESTS"
          count={pendingCount}
          sub="Awaiting confirmation"
          accentColor="#B8860B"
          iconBg="#FFF8E7"
          borderColor="#B8860B"
        />
        <StatCard
          icon="✓"
          label="APPROVED"
          count={approvedCount}
          sub="Successfully booked"
          accentColor="#4A6741"
          iconBg="#EEF3E8"
          borderColor="#4A6741"
        />
        <StatCard
          icon="✕"
          label="REJECTED"
          count={rejectedCount}
          sub="Cancelled bookings"
          accentColor="#9B2335"
          iconBg="#FDECEA"
          borderColor="#9B2335"
        />
      </div>

      {/* ── Toolbar ── */}
      <div style={s.toolbar}>
        <input
          type="text"
          placeholder="Search by customer name or booking ID..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={s.searchInput}
          onFocus={e => (e.target.style.borderColor = "#7A8C3A")}
          onBlur={e  => (e.target.style.borderColor = "#D6D3C0")}
        />
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          style={s.select}
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="confirmed">Confirmed</option>
          <option value="cancelled">Cancelled</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {/* ── Table ── */}
      <div style={s.tableWrap}>
        <table style={s.table}>
          <thead>
            <tr style={s.theadRow}>
              {["Booking ID","Customer","Event Type","Date","Guests","Status","Actions"].map(h => (
                <th key={h} style={s.th}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredBookings.length === 0 ? (
              <tr>
                <td colSpan={7} style={s.emptyCell}>No bookings found</td>
              </tr>
            ) : filteredBookings.map((b, i) => (
              <tr
                key={b._id}
                style={{ ...s.tr, backgroundColor: i % 2 === 0 ? "#fff" : "#FAFAF5" }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#F2F5E8")}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = i % 2 === 0 ? "#fff" : "#FAFAF5")}
              >
                <td style={{ ...s.td, fontFamily:"monospace", fontSize:12, color:"#9A9580" }}>
                  {b.bookingId || "-"}
                </td>
                <td style={{ ...s.td, fontWeight:600, color:"#2C2C1E" }}>{b.fullName}</td>
                <td style={s.td}>{b.eventType}</td>
                <td style={s.td}>
                  {new Date(b.eventDate).toLocaleDateString("en-IN",{day:"numeric",month:"long",year:"numeric"})}
                </td>
                <td style={{ ...s.td, textAlign:"center" }}>{b.guests}</td>
                <td style={s.td}><StatusBadge status={b.status} /></td>
                <td style={s.td}>
                  <div style={{ display:"flex", gap:6, flexWrap:"wrap", alignItems:"center" }}>
                    <button style={s.btnView} onClick={() => setSelectedBooking(b)}>
                      View Details
                    </button>
                    {b.status === "pending" && (
                      <>
                        <button style={s.btnApprove} onClick={() => updateStatus(b._id, "approved")}>
                          Approve
                        </button>
                        <button style={s.btnReject} onClick={() => updateStatus(b._id, "rejected")}>
                          Reject
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Modal ── */}
      {selectedBooking && (
        <div style={s.overlay}>
          <div style={s.modal}>
            {/* Modal Header */}
            <div style={{ borderBottom:"1px solid #E8E5D4", paddingBottom:16, marginBottom:16, display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
              <div>
                <h2 style={{ fontSize:20, fontWeight:700, color:"#2C2C1E", fontFamily:"Georgia, serif", margin:0 }}>
                  Booking Details
                </h2>
                <p style={{ fontSize:12, color:"#9A9580", marginTop:4 }}>
                  {selectedBooking.bookingId || "-"}
                </p>
              </div>
              <StatusBadge status={selectedBooking.status} />
            </div>

            {/* Modal Rows */}
            {[
              ["Name",   selectedBooking.fullName],
              ["Email",  selectedBooking.email],
              ["Phone",  selectedBooking.phone],
              ["Event",  selectedBooking.eventType],
              ["Date",   new Date(selectedBooking.eventDate).toLocaleDateString("en-IN",{day:"numeric",month:"long",year:"numeric"})],
              ["Guests", selectedBooking.guests],
            ].map(([label, value]) => (
              <div key={label} style={s.modalRow}>
                <span style={s.modalLabel}>{label}</span>
                <span style={s.modalValue}>{value}</span>
              </div>
            ))}

            {/* Modal Footer */}
            <div style={{ display:"flex", justifyContent:"flex-end", gap:8, marginTop:20, paddingTop:16, borderTop:"1px solid #E8E5D4" }}>
              {selectedBooking.status === "pending" && (
                <>
                  <button style={s.btnApprove} onClick={() => updateStatus(selectedBooking._id, "approved")}>
                    Approve
                  </button>
                  <button style={s.btnReject} onClick={() => updateStatus(selectedBooking._id, "rejected")}>
                    Reject
                  </button>
                </>
              )}
              <button style={s.btnClose} onClick={() => setSelectedBooking(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── StatCard ──
const StatCard = ({ icon, label, count, sub, accentColor, iconBg, borderColor }) => (
  <div style={{
    backgroundColor: "#fff",
    borderRadius: 12,
    border: "1px solid #E8E5D4",
    borderTop: `3px solid ${borderColor}`,
    padding: "20px 24px",
    display: "flex",
    flexDirection: "column",
    gap: 8,
  }}>
    <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
      <span style={{ fontSize:11, fontWeight:600, letterSpacing:"0.08em", color:"#9A9580" }}>{label}</span>
      <div style={{ width:36, height:36, borderRadius:8, backgroundColor:iconBg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:16 }}>
        {icon}
      </div>
    </div>
    <div style={{ fontSize:36, fontWeight:700, color:accentColor, fontFamily:"Georgia, serif", lineHeight:1 }}>
      {count}
    </div>
    <div style={{ fontSize:12, color:"#9A9580" }}>{sub}</div>
  </div>
);

// ── StatusBadge ──
const StatusBadge = ({ status }) => {
  const map = {
    pending:   { bg:"#FFF8E7", color:"#B8860B", border:"#F0D070" },
    approved:  { bg:"#EEF3E8", color:"#4A6741", border:"#B8CEA8" },
    confirmed: { bg:"#EEF3E8", color:"#4A6741", border:"#B8CEA8" },
    rejected:  { bg:"#FDECEA", color:"#9B2335", border:"#F5B8BE" },
    cancelled: { bg:"#FDECEA", color:"#9B2335", border:"#F5B8BE" },
  };
  const st = map[status?.toLowerCase()] || { bg:"#F0EFE6", color:"#6B6A5E", border:"#D6D3C0" };
  return (
    <span style={{
      display:"inline-block", padding:"4px 12px", borderRadius:20,
      fontSize:11, fontWeight:600, letterSpacing:"0.05em",
      backgroundColor:st.bg, color:st.color, border:`1px solid ${st.border}`,
    }}>
      {status?.charAt(0).toUpperCase() + status?.slice(1)}
    </span>
  );
};

// ── Styles ──
const s = {
  page: {
    padding: "28px 32px",
    backgroundColor: "#FFF8DC",
    minHeight: "100vh",
    fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
  },
  pageTitle: {
    fontSize: 32,
    fontWeight: 800,
    color: "#2C2C1E",
    fontFamily: "Georgia, serif",
    margin: 0,
  },
  pageSub:  { fontSize:14, color:"#6B6A5E", marginTop:6 },
  dateText: { fontSize:12, color:"#9A9580", marginTop:2 },

  cardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 16,
    marginBottom: 24,
  },

  toolbar: { display:"flex", gap:10, marginBottom:16 },
  searchInput: {
    flex:1, padding:"10px 16px",
    border:"1px solid #D6D3C0", borderRadius:8,
    backgroundColor:"#fff", color:"#2C2C1E",
    fontSize:14, outline:"none",
    fontFamily:"inherit",
  },
  select: {
    padding:"10px 14px",
    border:"1px solid #D6D3C0", borderRadius:8,
    backgroundColor:"#273B09", color:"#fff",
    fontSize:14, outline:"none", cursor:"pointer",
    fontFamily:"inherit",
  },

  tableWrap: {
    backgroundColor:"#fff",
    borderRadius:12,
    border:"1px solid #E8E5D4",
    overflow:"hidden",
    boxShadow:"0 2px 12px rgba(0,0,0,0.04)",
  },
  table: { width:"100%", borderCollapse:"collapse" },

  theadRow: { backgroundColor: "#273B09" },
  th: {
  padding: "13px 16px",
  fontSize: 11, fontWeight: 600, color: "#E8E5D4",  // ← golden
  textAlign: "left", letterSpacing: "0.07em", textTransform: "uppercase",
  borderBottom: "1px solid #2c4508",},
  td: {
    padding:"14px 16px",
    fontSize:13, color:"#3C3B2E",
    borderBottom:"1px solid #F0EFE6",
    verticalAlign:"middle",
  },
  tr: { transition:"background 0.12s" },
  emptyCell: { textAlign:"center", padding:48, color:"#B0AFA4", fontSize:14 },

  btnView: {
    padding:"5px 12px", borderRadius:6,
    border:"1px solid #C8D8F0",
    backgroundColor:"#EBF2FB", color:"#2E5FA3",
    fontSize:12, cursor:"pointer", fontWeight:500,
  },
  btnApprove: {
    padding:"5px 12px", borderRadius:6,
    border:"1px solid #B8CEA8",
    backgroundColor:"#EEF3E8", color:"#4A6741",
    fontSize:12, cursor:"pointer", fontWeight:500,
  },
  btnReject: {
    padding:"5px 12px", borderRadius:6,
    border:"1px solid #F5B8BE",
    backgroundColor:"#FDECEA", color:"#9B2335",
    fontSize:12, cursor:"pointer", fontWeight:500,
  },
  btnClose: {
    padding:"8px 20px", borderRadius:8,
    border:"1px solid #D6D3C0",
    backgroundColor:"#F5F3E4", color:"#3C3B2E",
    fontSize:13, cursor:"pointer", fontWeight:500,
  },

  overlay: {
    position:"fixed", inset:0,
    background:"rgba(30,28,20,0.5)",
    display:"flex", alignItems:"center", justifyContent:"center", zIndex:1000,
  },
  modal: {
    backgroundColor:"#fff", borderRadius:14,
    border:"1px solid #E8E5D4",
    padding:28, width:440, maxWidth:"95vw",
    boxShadow:"0 16px 48px rgba(0,0,0,0.14)",
  },
  modalRow: {
    display:"flex", justifyContent:"space-between", alignItems:"center",
    padding:"10px 0", borderBottom:"1px solid #F0EFE6", fontSize:13,
  },
  modalLabel: { color:"#9A9580", fontSize:13 },
  modalValue: { color:"#2C2C1E", fontWeight:500, textAlign:"right", maxWidth:"65%" },
};