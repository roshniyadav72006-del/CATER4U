"use client";

import { useState } from "react";

const statusConfig = {
  completed: { bg: "#dcfce7", color: "#166534", label: "Completed" },
  Completed: { bg: "#dcfce7", color: "#166534", label: "Completed" },
  confirmed: { bg: "#dbeafe", color: "#1e40af", label: "Confirmed" },
  Confirmed: { bg: "#dbeafe", color: "#1e40af", label: "Confirmed" },
  pending:   { bg: "#fef9c3", color: "#854d0e", label: "Pending" },
  Pending:   { bg: "#fef9c3", color: "#854d0e", label: "Pending" },
  cancelled: { bg: "#fee2e2", color: "#991b1b", label: "Cancelled" },
  Cancelled: { bg: "#fee2e2", color: "#991b1b", label: "Cancelled" },
};

// Yeh statuses cancel NAHI ho sakti
const NON_CANCELLABLE = ["completed", "Completed", "cancelled", "Cancelled"];

const FILTERS = ["All", "Pending", "Confirmed", "Completed", "Cancelled"];

export default function BookingsModal({ orders: initialOrders = [], onClose  , onCancelSuccess }) {
  const [orders, setOrders]               = useState(initialOrders);
  const [bookingFilter, setBookingFilter] = useState("All");
  const [confirmId, setConfirmId]         = useState(null);
  const [cancelling, setCancelling]       = useState(false);
  const [toast, setToast]                 = useState(null);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const filteredOrders =
    bookingFilter === "All"
      ? orders
      : orders.filter(
          (o) => o.status?.toLowerCase() === bookingFilter.toLowerCase()
        );

  const getCount = (f) =>
    f === "All"
      ? orders.length
      : orders.filter((o) => o.status?.toLowerCase() === f.toLowerCase()).length;

  // ── CANCEL HANDLER ──
  const handleCancel = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId || !confirmId) return;

    setCancelling(true);
    try {
      const res = await fetch("/api/booking", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          userid: userId,
        },
        body: JSON.stringify({ bookingId: confirmId }),
      });

      const data = await res.json();

      if (!res.ok) {
        showToast(data.message || "Cancel failed", "error");
        return;
      }

      // UI mein instantly update — page reload ki zaroorat nahi
      setOrders((prev) =>
        prev.map((o) =>
          o._id === confirmId ? { ...o, status: "cancelled" } : o
        )
      );
      showToast("Booking cancelled successfully!", "success");
      onCancelSuccess && onCancelSuccess();
    } catch {
      showToast("Something went wrong. Try again.", "error");
    } finally {
      setCancelling(false);
      setConfirmId(null);
    }
  };

  return (
    <div style={styles.backdrop} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>

        {/* ── TOAST (modal ke andar) ── */}
        {toast && (
          <div style={{
            ...styles.toast,
            background: toast.type === "success" ? "#0f172a" : "#dc2626",
          }}>
            {toast.type === "success" ? "✅" : "❌"} {toast.msg}
          </div>
        )}

        {/* ── CANCEL CONFIRM DIALOG ── */}
        {confirmId && (
          <div style={styles.confirmBackdrop} onClick={() => !cancelling && setConfirmId(null)}>
            <div style={styles.confirmBox} onClick={(e) => e.stopPropagation()}>
              <span style={styles.confirmEmoji}>⚠️</span>
              <h4 style={styles.confirmTitle}>Cancel this booking?</h4>
              <p style={styles.confirmSub}>
                Yeh action undo nahi ho sakti. Kya aap sure hain?
              </p>
              <div style={styles.confirmBtns}>
                <button
                  style={styles.confirmNoBtn}
                  onClick={() => setConfirmId(null)}
                  disabled={cancelling}
                >
                  No, Keep it
                </button>
                <button
                  style={{
                    ...styles.confirmYesBtn,
                    opacity: cancelling ? 0.7 : 1,
                  }}
                  onClick={handleCancel}
                  disabled={cancelling}
                >
                  {cancelling ? "Cancelling…" : "Yes, Cancel"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── HEADER ── */}
        <div style={styles.header}>
          <div>
            <h3 style={styles.title}>📋 My Bookings</h3>
            <p style={styles.sub}>
              {orders.length} total booking{orders.length !== 1 ? "s" : ""}
            </p>
          </div>
          <button style={styles.closeBtn} onClick={onClose}>✕</button>
        </div>

        {/* ── FILTER TABS ── */}
        <div style={styles.filterTabs}>
          {FILTERS.map((f) => {
            const active = bookingFilter === f;
            return (
              <button
                key={f}
                onClick={() => setBookingFilter(f)}
                style={{
                  ...styles.filterTab,
                  ...(active ? styles.filterTabActive : {}),
                }}
              >
                {f}
                <span style={{
                  ...styles.filterCount,
                  background: active ? "#6366f1" : "#e2e8f0",
                  color: active ? "#fff" : "#64748b",
                }}>
                  {getCount(f)}
                </span>
              </button>
            );
          })}
        </div>

        {/* ── BOOKINGS LIST ── */}
        <div style={styles.list}>
          {filteredOrders.length === 0 ? (
            <div style={styles.emptyState}>
              <span style={styles.emptyIcon}>📭</span>
              <p style={styles.emptyText}>
                No {bookingFilter !== "All" ? bookingFilter.toLowerCase() + " " : ""}
                bookings found.
              </p>
            </div>
          ) : (
            filteredOrders.map((order, i) => (
              <BookingCard
                key={order._id || i}
                order={order}
                onCancelClick={() => setConfirmId(order._id)}
              />
            ))
          )}
        </div>
      </div>

      <style>{css}</style>
    </div>
  );
}

// ── BOOKING CARD ──
function BookingCard({ order, onCancelClick }) {
  const sc = statusConfig[order.status] || {
    bg: "#f1f5f9", color: "#475569", label: order.status,
  };

  const canCancel = !NON_CANCELLABLE.includes(order.status);

  return (
    <div style={styles.card} className="bm-card">

      {/* Top Row */}
      <div style={styles.cardTop}>
        <div style={styles.eventInfo}>
          <span style={styles.eventIcon}>🎉</span>
          <span style={styles.eventType}>{order.eventType}</span>
        </div>
        <span style={{ ...styles.statusBadge, background: sc.bg, color: sc.color }}>
          {sc.label}
        </span>
      </div>

      <div style={styles.divider} />

      {/* Details Grid */}
      <div style={styles.detailsGrid}>
        <Detail icon="📅" label="Date"       value={order.eventDate}  />
        <Detail icon="🕐" label="Time"       value={order.eventTime} />
        <Detail icon="👥" label="Guests"     value={order.guests} />
        <Detail icon="🏛️" label="Venue Type" value={order.venueType} />
        
        {order.fullName && (
          <Detail icon="👤" label="Booked By" value={order.fullName} />
        )}
      </div>

      {/* Venue Address */}
      {order.venueAddress && (
        <div style={styles.infoRow("#f8faff", "#2e3035")}>
          <span style={styles.rowIcon}>📍</span>
          <p style={styles.rowText("#475569")}>{order.venueAddress}</p>
        </div>
      )}

      {/* Special Requests */}
      {order.specialRequests && order.specialRequests !== "none" && (
        <div style={styles.infoRow("#fffbeb", "#2e3035")}>
          <span style={styles.rowIcon}>📝</span>
          <p style={styles.rowText("#78350f")}>
            <strong>Note:</strong> {order.specialRequests}
          </p>
        </div>
      )}

      {/* Menu */}
      {order.selectedMenu && order.selectedMenu.length > 0 && (
        <div style={styles.menuRow}>
          <span style={styles.menuLabel}>
            🍽️ Menu ({order.selectedMenu.length} items)
          </span>
          <span style={styles.menuItems}>
            {order.selectedMenu.slice(0, 3).map((m) => m.itemName).join(", ")}
            {order.selectedMenu.length > 3 &&
              ` +${order.selectedMenu.length - 3} more`}
          </span>
        </div>
      )}

      {/* ── CARD BOTTOM — date + cancel button ── */}
      <div style={styles.cardBottom}>
        <p style={styles.createdAt}>
           <span style={{ color: "#000" , marginRight:"6px"}}>Booked on </span>
          <span style={{ fontWeight: 900 , color: "#0f172a"}}>
            {order.createdAt
              ? new Date(order.createdAt).toLocaleDateString("en-IN", {
                  day: "numeric", month: "short", year: "numeric",
              })
            : "—"}
          </span>
        </p>

        {/* Cancel button — sirf pending / confirmed pe dikhega */}
        {canCancel ? (
          <button
            style={styles.cancelBtn}
            className="bm-cancel-btn"
            onClick={onCancelClick}
          >
            🚫 Cancel Booking
          </button>
        ) : (
          order.status?.toLowerCase() === "cancelled" && (
            <span style={styles.cancelledTag}>Cancelled</span>
          )
        )}
      </div>
    </div>
  );
}

// ── DETAIL CELL ──
function Detail({ icon, label, value, valueStyle = {} }) {
  return (
    <div style={styles.detail}>
      <span style={styles.detailIcon}>{icon}</span>
      <div>
        <p style={styles.detailLabel}>{label}</p>
        <p style={{ ...styles.detailValue, ...valueStyle }}>{value || "—"}</p>
      </div>
    </div>
  );
}

// ── STYLES ──────────────────────────────────────────────────────────────────
const styles = {
  backdrop: {
    position: "fixed", inset: 0,
    background: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)",
    display: "flex", alignItems: "center", justifyContent: "center",
    zIndex: 10000, animation: "bm-fadeIn 0.2s ease",
  },
  modal: {
    background: "#fff", borderRadius: "24px",
    width: "90%", maxWidth: "600px", maxHeight: "85vh",
    display: "flex", flexDirection: "column",
    boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
    animation: "bm-popIn 0.25s cubic-bezier(0.34,1.56,0.64,1)",
    overflow: "hidden", fontFamily: "'Sora','Nunito',sans-serif",
    position: "relative",
  },

  // Toast
  toast: {
    position: "absolute", top: "16px", left: "50%",
    transform: "translateX(-50%)", color: "#fff",
    padding: "10px 20px", borderRadius: "10px",
    fontWeight: 600, fontSize: "13px", zIndex: 20,
    whiteSpace: "nowrap", boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
    animation: "bm-fadeIn 0.2s ease",
  },

  // Confirm dialog
  confirmBackdrop: {
    position: "absolute", inset: 0,
    background: "rgba(0,0,0,0.4)", backdropFilter: "blur(3px)",
    display: "flex", alignItems: "center", justifyContent: "center",
    zIndex: 15, borderRadius: "24px",
    animation: "bm-fadeIn 0.15s ease",
  },
  confirmBox: {
    background: "#fff", borderRadius: "20px",
    padding: "32px 28px", maxWidth: "320px", width: "90%",
    textAlign: "center", boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
    animation: "bm-popIn 0.2s cubic-bezier(0.34,1.56,0.64,1)",
  },
  confirmEmoji: { fontSize: "36px", display: "block", marginBottom: "12px" },
  confirmTitle: { margin: "0 0 8px", fontSize: "18px", fontWeight: 800, color: "#0f172a" },
  confirmSub:   { margin: "0 0 24px", fontSize: "13px", color: "#64748b", lineHeight: 1.5 },
  confirmBtns:  { display: "flex", gap: "10px" },
  confirmNoBtn: {
    flex: 1, padding: "11px", borderRadius: "12px",
    border: "2px solid #e2e8f0", background: "#f8fafc",
    color: "#374151", fontWeight: 600, fontSize: "13px",
    cursor: "pointer", fontFamily: "'Sora','Nunito',sans-serif",
  },
  confirmYesBtn: {
    flex: 1, padding: "11px", borderRadius: "12px", border: "none",
    background: "linear-gradient(135deg,#ef4444,#dc2626)",
    color: "#fff", fontWeight: 600, fontSize: "13px",
    cursor: "pointer", fontFamily: "'Sora','Nunito',sans-serif",
    boxShadow: "0 4px 12px rgba(220,38,38,0.35)",
  },

  header: {
    display: "flex", justifyContent: "space-between", alignItems: "flex-start",
    padding: "28px 28px 0", flexShrink: 0,
  },
  title: { margin: "0 0 4px", fontSize: "20px", fontWeight: 800, color: "#0f172a" },
  sub:   { margin: 0, fontSize: "13px", color: "#94a3b8", fontWeight: 500 },
  closeBtn: {
    background: "#f1f5f9", border: "none",
    width: "32px", height: "32px", borderRadius: "50%",
    fontSize: "14px", cursor: "pointer", color: "#64748b",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontWeight: 600, flexShrink: 0,
  },

  filterTabs: {
    display: "flex", gap: "6px", padding: "16px 28px",
    flexShrink: 0, overflowX: "auto", borderBottom: "1px solid #f1f5f9",
  },
  filterTab: {
    padding: "6px 12px", borderRadius: "20px",
    border: "1.5px solid #e2e8f0", background: "#fff",
    color: "#64748b", fontWeight: 600, fontSize: "12px",
    cursor: "pointer", whiteSpace: "nowrap",
    display: "flex", alignItems: "center", gap: "6px",
    transition: "all 0.15s", fontFamily: "'Sora','Nunito',sans-serif",
  },
  filterTabActive: { border: "1.5px solid #6366f1", background: "#eef2ff", color: "#4338ca" },
  filterCount: {
    fontSize: "10px", fontWeight: 700,
    padding: "1px 6px", borderRadius: "10px",
    minWidth: "18px", textAlign: "center",
  },

  list: {
    overflowY: "auto", padding: "16px 28px 28px",
    display: "flex", flexDirection: "column", gap: "14px", flex: 1,
  },
  emptyState: {
    display: "flex", flexDirection: "column",
    alignItems: "center", justifyContent: "center",
    padding: "60px 0", gap: "12px",
  },
  emptyIcon: { fontSize: "40px" },
  emptyText: { margin: 0, fontSize: "15px", color: "#94a3b8", fontWeight: 500 },

  card: {
    border: "1.5px solid #040910", borderRadius: "16px",
    padding: "18px", background: "#f9f5f5", marginBottom: "10px", transition: "box-shadow0 4px 12px rgba(14, 14, 14, 0.05)",
  },
  cardTop: {
    display: "flex", justifyContent: "space-between",
    alignItems: "center", marginBottom: "12px",
  },
  eventInfo: { display: "flex", alignItems: "center", gap: "8px" },
  eventIcon: { fontSize: "18px" },
  eventType: { fontSize: "16px", fontWeight: 700, color: "#0f172a" },
  statusBadge: {
    padding: "4px 12px", borderRadius: "20px",
    fontSize: "11px", fontWeight: 700, letterSpacing: "0.3px", textTransform: "capitalize",
  },
  divider: { height: "1px", background: "#3a4450", marginBottom: "14px" },

  detailsGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "10px" },
  detail:      { display: "flex", alignItems: "flex-start", gap: "8px" },
  detailIcon:  { fontSize: "14px", marginTop: "2px", flexShrink: 0 },
  detailLabel: { margin: 0, fontSize: "10px", color: "#94a3b8", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.4px" },
  detailValue: { margin: "2px 0 0", fontSize: "13px", fontWeight: 600, color: "#1e293b" },

  infoRow: (bg, border) => ({
    display: "flex", alignItems: "flex-start", gap: "6px",
    marginTop: "8px", padding: "8px 10px",
    background: bg, borderRadius: "8px", border: `1px solid ${border}`,
  }),
  rowIcon: { fontSize: "13px" },
  rowText: (color) => ({ margin: 0, fontSize: "12px", color, lineHeight: 1.5 }),

  menuRow: {
    display: "flex", alignItems: "center", gap: "8px",
    marginTop: "10px", padding: "8px 12px",
    background: "#f0fdf4", borderRadius: "8px",
    border: "1px solid #bbf7d0", flexWrap: "wrap",
  },
  menuLabel: { fontSize: "12px", fontWeight: 700, color: "#166534", whiteSpace: "nowrap" },
  menuItems: { fontSize: "12px", color: "#15803d", flex: 1 },

  // Card bottom row
  cardBottom: {
    display: "flex", justifyContent: "space-between",
    alignItems: "center", marginTop: "14px",
    flexWrap: "wrap", gap: "8px",
  },
  createdAt: { margin: 0, fontSize: "11px", color: "#94a3b8" },

  // ── CANCEL BUTTON ──
  cancelBtn: {
    padding: "7px 14px", borderRadius: "10px",
    border: "1.5px solid #fecaca", background: "#fff5f5",
    color: "#dc2626", fontWeight: 600, fontSize: "12px",
    cursor: "pointer", transition: "all 0.15s",
    fontFamily: "'Sora','Nunito',sans-serif",
    display: "flex", alignItems: "center", gap: "4px",
  },
  cancelledTag: {
    fontSize: "11px", fontWeight: 700,
    color: "#991b1b", background: "#fee2e2",
    padding: "4px 10px", borderRadius: "20px",
  },
};

const css = `
  @keyframes bm-fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes bm-popIn {
    from { opacity: 0; transform: scale(0.88); }
    to   { opacity: 1; transform: scale(1); }
  }
  .bm-card:hover {
    box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  }
  .bm-cancel-btn:hover {
    background: #fee2e2 !important;
    border-color: #fca5a5 !important;
    box-shadow: 0 2px 8px rgba(220,38,38,0.18);
    transform: translateY(-1px);
  }
`;