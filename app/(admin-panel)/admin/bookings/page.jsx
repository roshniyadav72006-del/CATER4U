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
      <style>{`
        * { box-sizing: border-box; }

        /* ── Stat cards: 1 col mobile → 3 col desktop ── */
        .bk-card-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
          margin-bottom: 20px;
        }
        @media (min-width: 480px) {
          .bk-card-grid { grid-template-columns: repeat(3, 1fr); }
        }

        /* ── Toolbar: stack on mobile ── */
        .bk-toolbar {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 16px;
        }
        @media (min-width: 600px) {
          .bk-toolbar { flex-direction: row; }
        }
        .bk-search {
          flex: 1;
          padding: 10px 16px;
          border: 1px solid #D6D3C0;
          border-radius: 8px;
          background: #fff;
          color: #2C2C1E;
          font-size: 14px;
          outline: none;
          width: 100%;
        }
        .bk-select {
          padding: 10px 14px;
          border: 1px solid #D6D3C0;
          border-radius: 8px;
          background: #273B09;
          color: #fff;
          font-size: 14px;
          outline: none;
          cursor: pointer;
          width: 100%;
        }
        @media (min-width: 600px) {
          .bk-select { width: auto; }
        }

        /* ── Table: hidden on mobile ── */
        .bk-table-wrap {
          background: #fff;
          border-radius: 12px;
          border: 1px solid #E8E5D4;
          overflow-x: auto;
          box-shadow: 0 2px 12px rgba(0,0,0,0.04);
        }
        @media (max-width: 700px) {
          .bk-table-wrap { display: none; }
        }

        /* ── Mobile cards: hidden on desktop ── */
        .bk-mobile-list {
          display: none;
          flex-direction: column;
          gap: 12px;
        }
        @media (max-width: 700px) {
          .bk-mobile-list { display: flex; }
        }

        .bk-card {
          background: #fff;
          border-radius: 14px;
          border: 1px solid #E8E5D4;
          padding: 16px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
        }
        .bk-card-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 10px;
        }
        .bk-card-name {
          font-size: 15px;
          font-weight: 700;
          color: #2C2C1E;
          font-family: Georgia, serif;
        }
        .bk-card-id {
          font-size: 11px;
          color: #9A9580;
          font-family: monospace;
          margin-top: 2px;
        }
        .bk-card-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 12px;
        }
        .bk-card-meta-item {
          font-size: 12px;
          color: #6B6A5E;
          background: #F5F3E4;
          padding: 4px 10px;
          border-radius: 20px;
          border: 1px solid #E8E5D4;
        }
        .bk-card-actions {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          padding-top: 10px;
          border-top: 1px solid #F0EFE6;
        }

        /* ── Modal responsive ── */
        .bk-overlay {
          position: fixed; inset: 0;
          background: rgba(30,28,20,0.5);
          display: flex; align-items: center; justify-content: center;
          z-index: 1000;
          padding: 16px;
        }
        .bk-modal {
          background: #fff;
          border-radius: 14px;
          border: 1px solid #E8E5D4;
          padding: 22px;
          width: 100%;
          max-width: 440px;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 16px 48px rgba(0,0,0,0.14);
        }

        /* ── Page title responsive ── */
        .bk-title {
          font-size: clamp(20px, 5vw, 32px);
          font-weight: 800;
          color: #2C2C1E;
          font-family: Georgia, serif;
          margin: 0;
          line-height: 1.2;
        }
      `}</style>

      {/* ── Header ── */}
      <div style={{ marginBottom: 24 }}>
        <h1 className="bk-title">
          Approve /{" "}
          <span style={{ color: "#7A8C3A" }}>Reject Bookings</span>
        </h1>
        <p style={s.pageSub}>Review and manage incoming booking requests</p>
        <p style={s.dateText}>
          {new Date().toLocaleDateString("en-IN", { weekday:"long", day:"numeric", month:"long", year:"numeric" })}
        </p>
      </div>

      {/* ── Stat Cards ── */}
      <div className="bk-card-grid">
        <StatCard icon="⏳" label="PENDING REQUESTS" count={pendingCount}  sub="Awaiting confirmation" accentColor="#B8860B" iconBg="#FFF8E7" borderColor="#B8860B" />
        <StatCard icon="✓"  label="APPROVED"         count={approvedCount} sub="Successfully booked"  accentColor="#4A6741" iconBg="#EEF3E8" borderColor="#4A6741" />
        <StatCard icon="✕"  label="REJECTED"         count={rejectedCount} sub="Cancelled bookings"   accentColor="#9B2335" iconBg="#FDECEA" borderColor="#9B2335" />
      </div>

      {/* ── Toolbar ── */}
      <div className="bk-toolbar">
        <input
          type="text"
          placeholder="Search by name or booking ID..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="bk-search"
          onFocus={e => (e.target.style.borderColor = "#7A8C3A")}
          onBlur={e  => (e.target.style.borderColor = "#D6D3C0")}
        />
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="bk-select"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="confirmed">Confirmed</option>
          <option value="cancelled">Cancelled</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {/* ── DESKTOP: Table ── */}
      <div className="bk-table-wrap">
        <table style={{ width:"100%", borderCollapse:"collapse" }}>
          <thead>
            <tr style={{ backgroundColor:"#273B09" }}>
              {["Booking ID","Customer","Event Type","Date","Guests","Status","Actions"].map(h => (
                <th key={h} style={s.th}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredBookings.length === 0 ? (
              <tr><td colSpan={7} style={s.emptyCell}>No bookings found</td></tr>
            ) : filteredBookings.map((b, i) => (
              <tr
                key={b._id}
                style={{ ...s.tr, backgroundColor: i % 2 === 0 ? "#fff" : "#FAFAF5" }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#F2F5E8")}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = i % 2 === 0 ? "#fff" : "#FAFAF5")}
              >
                <td style={{ ...s.td, fontFamily:"monospace", fontSize:12, color:"#9A9580" }}>{b.bookingId || "-"}</td>
                <td style={{ ...s.td, fontWeight:600, color:"#2C2C1E" }}>{b.fullName}</td>
                <td style={s.td}>{b.eventType}</td>
                <td style={s.td}>{new Date(b.eventDate).toLocaleDateString("en-IN",{day:"numeric",month:"long",year:"numeric"})}</td>
                <td style={{ ...s.td, textAlign:"center" }}>{b.guests}</td>
                <td style={s.td}><StatusBadge status={b.status} /></td>
                <td style={s.td}>
                  <div style={{ display:"flex", gap:6, flexWrap:"wrap", alignItems:"center" }}>
                    <button style={s.btnView} onClick={() => setSelectedBooking(b)}>View Details</button>
                    {b.status === "pending" && (
                      <>
                        <button style={s.btnApprove} onClick={() => updateStatus(b._id, "approved")}>Approve</button>
                        <button style={s.btnReject}  onClick={() => updateStatus(b._id, "rejected")}>Reject</button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── MOBILE: Cards ── */}
      <div className="bk-mobile-list">
        {filteredBookings.length === 0 ? (
          <p style={{ textAlign:"center", color:"#B0AFA4", fontSize:14, padding:"32px 0" }}>No bookings found</p>
        ) : filteredBookings.map((b) => (
          <div key={b._id} className="bk-card">
            <div className="bk-card-row">
              <div>
                <div className="bk-card-name">{b.fullName}</div>
                <div className="bk-card-id">{b.bookingId || "-"}</div>
              </div>
              <StatusBadge status={b.status} />
            </div>

            <div className="bk-card-meta">
              <span className="bk-card-meta-item">🎉 {b.eventType}</span>
              <span className="bk-card-meta-item">
                📅 {new Date(b.eventDate).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"})}
              </span>
              <span className="bk-card-meta-item">👥 {b.guests} guests</span>
            </div>

            <div className="bk-card-actions">
              <button style={s.btnView} onClick={() => setSelectedBooking(b)}>View Details</button>
              {b.status === "pending" && (
                <>
                  <button style={s.btnApprove} onClick={() => updateStatus(b._id, "approved")}>Approve</button>
                  <button style={s.btnReject}  onClick={() => updateStatus(b._id, "rejected")}>Reject</button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* ── Modal ── */}
      {selectedBooking && (
        <div className="bk-overlay">
          <div className="bk-modal">
            <div style={{ borderBottom:"1px solid #E8E5D4", paddingBottom:14, marginBottom:14, display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:10 }}>
              <div>
                <h2 style={{ fontSize:18, fontWeight:700, color:"#2C2C1E", fontFamily:"Georgia, serif", margin:0 }}>
                  Booking Details
                </h2>
                <p style={{ fontSize:11, color:"#9A9580", marginTop:3 }}>{selectedBooking.bookingId || "-"}</p>
              </div>
              <StatusBadge status={selectedBooking.status} />
            </div>

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

            <div style={{ display:"flex", justifyContent:"flex-end", gap:8, marginTop:18, paddingTop:14, borderTop:"1px solid #E8E5D4", flexWrap:"wrap" }}>
              {selectedBooking.status === "pending" && (
                <>
                  <button style={s.btnApprove} onClick={() => updateStatus(selectedBooking._id, "approved")}>Approve</button>
                  <button style={s.btnReject}  onClick={() => updateStatus(selectedBooking._id, "rejected")}>Reject</button>
                </>
              )}
              <button style={s.btnClose} onClick={() => setSelectedBooking(null)}>Close</button>
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
    backgroundColor: "#fff", borderRadius: 12,
    border: "1px solid #E8E5D4", borderTop: `3px solid ${borderColor}`,
    padding: "18px 20px", display: "flex", flexDirection: "column", gap: 8,
  }}>
    <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
      <span style={{ fontSize:10, fontWeight:600, letterSpacing:"0.08em", color:"#9A9580" }}>{label}</span>
      <div style={{ width:34, height:34, borderRadius:8, backgroundColor:iconBg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:15 }}>
        {icon}
      </div>
    </div>
    <div style={{ fontSize:32, fontWeight:700, color:accentColor, fontFamily:"Georgia, serif", lineHeight:1 }}>{count}</div>
    <div style={{ fontSize:11, color:"#9A9580" }}>{sub}</div>
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
      whiteSpace:"nowrap",
    }}>
      {status?.charAt(0).toUpperCase() + status?.slice(1)}
    </span>
  );
};

// ── Styles ──
const s = {
  page: {
    padding: "16px",
    backgroundColor: "#FFF8DC",
    minHeight: "100vh",
    fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
    overflowX: "hidden",
  },
  pageSub:  { fontSize:13, color:"#6B6A5E", marginTop:5 },
  dateText: { fontSize:11, color:"#9A9580", marginTop:2 },

  th: {
    padding:"12px 14px", fontSize:11, fontWeight:600,
    color:"#E8E5D4", textAlign:"left", letterSpacing:"0.07em",
    textTransform:"uppercase", borderBottom:"1px solid #2c4508",
    whiteSpace:"nowrap",
  },
  td: {
    padding:"13px 14px", fontSize:13, color:"#3C3B2E",
    borderBottom:"1px solid #F0EFE6", verticalAlign:"middle",
  },
  tr: { transition:"background 0.12s" },
  emptyCell: { textAlign:"center", padding:48, color:"#B0AFA4", fontSize:14 },

  btnView: {
    padding:"5px 12px", borderRadius:6,
    border:"1px solid #C8D8F0", backgroundColor:"#EBF2FB", color:"#2E5FA3",
    fontSize:12, cursor:"pointer", fontWeight:500, whiteSpace:"nowrap",
  },
  btnApprove: {
    padding:"5px 12px", borderRadius:6,
    border:"1px solid #B8CEA8", backgroundColor:"#EEF3E8", color:"#4A6741",
    fontSize:12, cursor:"pointer", fontWeight:500, whiteSpace:"nowrap",
  },
  btnReject: {
    padding:"5px 12px", borderRadius:6,
    border:"1px solid #F5B8BE", backgroundColor:"#FDECEA", color:"#9B2335",
    fontSize:12, cursor:"pointer", fontWeight:500, whiteSpace:"nowrap",
  },
  btnClose: {
    padding:"8px 18px", borderRadius:8,
    border:"1px solid #D6D3C0", backgroundColor:"#F5F3E4", color:"#3C3B2E",
    fontSize:13, cursor:"pointer", fontWeight:500,
  },

  modalRow: {
    display:"flex", justifyContent:"space-between", alignItems:"center",
    padding:"9px 0", borderBottom:"1px solid #F0EFE6", fontSize:13,
    gap:10,
  },
  modalLabel: { color:"#9A9580", fontSize:13, flexShrink:0 },
  modalValue: { color:"#2C2C1E", fontWeight:500, textAlign:"right", wordBreak:"break-word" },
};