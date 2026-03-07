"use client";

import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState(null); // { msg, type: 'success'|'error' }
  const [previewImage, setPreviewImage] = useState(null);
  const [activeTab, setActiveTab] = useState("info");

  const [formData, setFormData] = useState({
    username: "",
    phone: "",
    address: "",
  });

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    fetch("/api/profile", { headers: { userid: userId } })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setFormData({
          username: data.username || "",
          phone: data.phone || "",
          address: data.address || "",
        });
        setPreviewImage(data.image || null);
      })
      .catch(() => showToast("Failed to load profile", "error"));

    fetch("/api/booking", { headers: { userid: userId } })
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch(() => {});
  }, []);

  const handleSave = async () => {
    const userId = localStorage.getItem("userId");
    const updatedData = { ...formData, image: previewImage };

    // ✅ Optimistic update — UI turant change ho jaata hai
    setUser((prev) => ({ ...prev, ...formData, image: previewImage }));
    setIsEditing(false);
    setIsSaving(true);

    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json", userid: userId },
        body: JSON.stringify(updatedData),
      });

      if (!res.ok) throw new Error("Server error");

      const data = await res.json();
      setUser(data); // server response se confirm update
      showToast("Profile updated successfully! ✓", "success");
    } catch (err) {
      // Revert agar API fail ho
      showToast("Failed to save. Please try again.", "error");
      setIsEditing(true); // editing mode back
    } finally {
      setIsSaving(false);
    }
  };

  if (!user)
    return (
      <div style={styles.loadingScreen}>
        <div style={styles.spinner}></div>
        <p style={styles.loadingText}>Loading your profile…</p>
        <style>{spinnerCSS}</style>
      </div>
    );

  const completed = orders.filter((o) => o.status === "Completed").length;
  const pending = orders.filter((o) => o.status === "Pending").length;
  const completionRate = orders.length ? Math.round((completed / orders.length) * 100) : 0;

  return (
    <div style={styles.page}>
      <style>{globalCSS}</style>

      {/* Background decoration */}
      <div style={styles.bgBlob1}></div>
      <div style={styles.bgBlob2}></div>

      {/* ── TOAST ── */}
      {toast && (
        <div style={{
          ...styles.toast,
          background: toast.type === "success" ? "#0f172a" : "#dc2626",
        }}>
          <span>{toast.type === "success" ? "✅" : "❌"}</span>
          <span>{toast.msg}</span>
        </div>
      )}

      <div style={styles.container}>

        {/* ── HERO CARD ── */}
        <div style={styles.heroCard} className="hero-card">
          {/* Decorative stripe */}
          <div style={styles.heroStripe}></div>

          <div style={styles.heroContent}>
            {/* Avatar */}
            <div style={styles.avatarWrapper}>
              <img
                src={previewImage || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                alt="Profile"
                style={styles.avatar}
              />
              {isEditing && (
                <>
                  <div style={styles.avatarOverlay} className="avatar-overlay">
                    <span style={styles.cameraIcon}>📷</span>
                    <span style={styles.changeText}>Change</span>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    style={styles.fileInput}
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => setPreviewImage(reader.result);
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                </>
              )}
              <div style={styles.onlineDot}></div>
            </div>

            {/* Identity */}
            <div style={styles.identity}>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  style={styles.nameInput}
                  placeholder="Your name"
                />
              ) : (
                <h1 style={styles.name}>{user.username}</h1>
              )}
              <p style={styles.email}>{user.email}</p>
              <div style={styles.badgeRow}>
                <span style={{ ...styles.badge, ...styles.badgeVerified }}>
                  {user.isVerified ? "✓ Verified" : "Unverified"}
                </span>
                <span style={{ ...styles.badge, ...styles.badgeMember }}>
                  Member since {new Date(user.createdAt).getFullYear()}
                </span>
              </div>
            </div>

            {/* Edit Button */}
            <button
              onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
              style={isEditing ? styles.saveBtn : styles.editBtn}
              className="action-btn"
              disabled={isSaving}
            >
              {isSaving
                ? <span style={styles.savingRow}><span className="btn-spinner"></span> Saving…</span>
                : isEditing
                ? "✓ Save Changes"
                : "✎ Edit Profile"}
            </button>
          </div>

          {/* Stats bar */}
          <div style={styles.statsBar}>
            <div style={styles.statItem}>
              <span style={styles.statNumber}>{orders.length}</span>
              <span style={styles.statLabel}>Total Bookings</span>
            </div>
            <div style={styles.statDivider}></div>
            <div style={styles.statItem}>
              <span style={{ ...styles.statNumber, color: "#22c55e" }}>{completed}</span>
              <span style={styles.statLabel}>Completed</span>
            </div>
            <div style={styles.statDivider}></div>
            <div style={styles.statItem}>
              <span style={{ ...styles.statNumber, color: "#f59e0b" }}>{pending}</span>
              <span style={styles.statLabel}>Pending</span>
            </div>
            <div style={styles.statDivider}></div>
            <div style={styles.statItem}>
              <span style={{ ...styles.statNumber, color: "#6366f1" }}>{completionRate}%</span>
              <span style={styles.statLabel}>Success Rate</span>
            </div>
          </div>
        </div>

        {/* ── BODY GRID ── */}
        <div style={styles.grid}>

          {/* LEFT: Personal Info */}
          <div style={styles.card} className="card">
            <div style={styles.cardHeader}>
              <div style={styles.cardHeaderAccent}></div>
              <h3 style={styles.cardTitle}>Personal Information</h3>
            </div>

            <div style={styles.infoGrid}>
              <InfoField
                label="Phone"
                icon="📱"
                value={user.phone}
                editing={isEditing}
                inputValue={formData.phone}
                onChange={(v) => setFormData({ ...formData, phone: v })}
              />
              <InfoField
                label="Address"
                icon="📍"
                value={user.address}
                editing={isEditing}
                inputValue={formData.address}
                onChange={(v) => setFormData({ ...formData, address: v })}
              />
              <InfoField
                label="Account Status"
                icon="🔒"
                value={user.isVerified ? "Verified Account" : "Not Verified"}
              />
              <InfoField
                label="Member Since"
                icon="📅"
                value={new Date(user.createdAt).toDateString()}
              />
            </div>
          </div>

          {/* RIGHT: Booking Summary + Progress */}
          <div style={styles.rightCol}>

            {/* Progress ring card */}
            <div style={{ ...styles.card, ...styles.ringCard }} className="card">
              <div style={styles.cardHeader}>
                <div style={{ ...styles.cardHeaderAccent, background: "#6366f1" }}></div>
                <h3 style={styles.cardTitle}>Completion Rate</h3>
              </div>
              <div style={styles.ringWrapper}>
                <svg width="120" height="120" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="50" fill="none" stroke="#e5e7eb" strokeWidth="10" />
                  <circle
                    cx="60" cy="60" r="50"
                    fill="none"
                    stroke="url(#grad)"
                    strokeWidth="10"
                    strokeDasharray={`${2 * Math.PI * 50}`}
                    strokeDashoffset={`${2 * Math.PI * 50 * (1 - completionRate / 100)}`}
                    strokeLinecap="round"
                    transform="rotate(-90 60 60)"
                    style={{ transition: "stroke-dashoffset 1s ease" }}
                  />
                  <defs>
                    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#6366f1" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                  </defs>
                </svg>
                <div style={styles.ringCenter}>
                  <span style={styles.ringPercent}>{completionRate}%</span>
                  <span style={styles.ringSubtext}>Success</span>
                </div>
              </div>
            </div>

            {/* Mini booking cards */}
            <div style={styles.miniCards}>
              <MiniCard color="#10b981" bg="#ecfdf5" icon="✅" label="Completed" value={completed} />
              <MiniCard color="#f59e0b" bg="#fffbeb" icon="⏳" label="Pending" value={pending} />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

function InfoField({ label, icon, value, editing, inputValue, onChange }) {
  return (
    <div style={styles.infoField}>
      <div style={styles.infoLabelRow}>
        <span style={styles.infoIcon}>{icon}</span>
        <span style={styles.infoLabel}>{label}</span>
      </div>
      {editing && onChange ? (
        <input
          type="text"
          value={inputValue}
          onChange={(e) => onChange(e.target.value)}
          style={styles.infoInput}
          className="info-input"
        />
      ) : (
        <p style={styles.infoValue}>{value || "—"}</p>
      )}
    </div>
  );
}

function MiniCard({ color, bg, icon, label, value }) {
  return (
    <div style={{ ...styles.miniCard, background: bg }} className="mini-card">
      <span style={styles.miniIcon}>{icon}</span>
      <div>
        <p style={{ ...styles.miniValue, color }}>{value}</p>
        <p style={styles.miniLabel}>{label}</p>
      </div>
    </div>
  );
}

// ── STYLES ──────────────────────────────────────────────────────────────────

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f1f5f9",
    fontFamily: "'Sora', 'Nunito', sans-serif",
    paddingTop: "100px",
    paddingBottom: "60px",
    paddingLeft: "20px",
    paddingRight: "20px",
    position: "relative",
    overflow: "hidden",
  },
  bgBlob1: {
    position: "fixed",
    top: "-200px",
    left: "-200px",
    width: "600px",
    height: "600px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(99,102,241,0.12), transparent 70%)",
    pointerEvents: "none",
  },
  bgBlob2: {
    position: "fixed",
    bottom: "-200px",
    right: "-100px",
    width: "500px",
    height: "500px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(20,184,166,0.12), transparent 70%)",
    pointerEvents: "none",
  },
  container: {
    maxWidth: "960px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },

  // Hero
  heroCard: {
    borderRadius: "24px",
    background: "#fff",
    boxShadow: "0 4px 40px rgba(0,0,0,0.08)",
    overflow: "hidden",
  },
  heroStripe: {
    height: "6px",
    background: "linear-gradient(90deg, #0d9488, #6366f1, #8b5cf6)",
  },
  heroContent: {
    display: "flex",
    alignItems: "center",
    gap: "24px",
    padding: "32px 36px",
    flexWrap: "wrap",
  },
  avatarWrapper: {
    position: "relative",
    flexShrink: 0,
  },
  avatar: {
    width: "96px",
    height: "96px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "4px solid #e0f2fe",
    boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
  },
  avatarOverlay: {
    position: "absolute",
    inset: 0,
    borderRadius: "50%",
    background: "rgba(0,0,0,0.45)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "2px",
    cursor: "pointer",
  },
  cameraIcon: { fontSize: "20px" },
  changeText: { fontSize: "10px", color: "#fff", fontWeight: 600 },
  fileInput: {
    position: "absolute",
    inset: 0,
    opacity: 0,
    cursor: "pointer",
    borderRadius: "50%",
  },
  onlineDot: {
    position: "absolute",
    bottom: "4px",
    right: "4px",
    width: "16px",
    height: "16px",
    borderRadius: "50%",
    background: "#22c55e",
    border: "3px solid #fff",
  },
  identity: { flex: 1, minWidth: "200px" },
  name: {
    margin: 0,
    fontSize: "26px",
    fontWeight: 700,
    color: "#0f172a",
    letterSpacing: "-0.5px",
  },
  nameInput: {
    fontSize: "22px",
    fontWeight: 700,
    color: "#0f172a",
    border: "2px solid #6366f1",
    borderRadius: "10px",
    padding: "6px 12px",
    outline: "none",
    width: "100%",
    background: "#f8faff",
    marginBottom: "4px",
  },
  email: { margin: "4px 0 10px", color: "#64748b", fontSize: "14px" },
  badgeRow: { display: "flex", gap: "8px", flexWrap: "wrap" },
  badge: {
    padding: "3px 10px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: 600,
    letterSpacing: "0.3px",
  },
  badgeVerified: { background: "#dcfce7", color: "#166534" },
  badgeMember: { background: "#ede9fe", color: "#5b21b6" },
  editBtn: {
    marginLeft: "auto",
    padding: "10px 22px",
    borderRadius: "12px",
    border: "2px solid #e2e8f0",
    background: "#fff",
    color: "#374151",
    fontWeight: 600,
    fontSize: "14px",
    cursor: "pointer",
    transition: "all 0.2s",
    whiteSpace: "nowrap",
  },
  saveBtn: {
    marginLeft: "auto",
    padding: "10px 22px",
    borderRadius: "12px",
    border: "none",
    background: "linear-gradient(135deg, #0d9488, #0891b2)",
    color: "#fff",
    fontWeight: 600,
    fontSize: "14px",
    cursor: "pointer",
    whiteSpace: "nowrap",
    boxShadow: "0 4px 14px rgba(13,148,136,0.4)",
  },

  // Stats bar
  statsBar: {
    display: "flex",
    borderTop: "1px solid #f1f5f9",
    background: "#fafafa",
  },
  statItem: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "18px 8px",
    gap: "4px",
  },
  statDivider: { width: "1px", background: "#e2e8f0", margin: "14px 0" },
  statNumber: {
    fontSize: "26px",
    fontWeight: 800,
    color: "#0f172a",
    lineHeight: 1,
  },
  statLabel: { fontSize: "11px", color: "#94a3b8", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px" },

  // Grid
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 320px",
    gap: "24px",
    alignItems: "start",
  },

  // Card
  card: {
    background: "#fff",
    borderRadius: "20px",
    boxShadow: "0 2px 20px rgba(0,0,0,0.06)",
    padding: "28px",
  },
  cardHeader: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "24px",
  },
  cardHeaderAccent: {
    width: "4px",
    height: "22px",
    borderRadius: "4px",
    background: "linear-gradient(180deg, #0d9488, #6366f1)",
  },
  cardTitle: {
    margin: 0,
    fontSize: "17px",
    fontWeight: 700,
    color: "#0f172a",
  },

  // Info fields
  infoGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
  },
  infoField: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  infoLabelRow: { display: "flex", alignItems: "center", gap: "6px" },
  infoIcon: { fontSize: "14px" },
  infoLabel: { fontSize: "12px", color: "#94a3b8", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px" },
  infoValue: { margin: 0, fontSize: "15px", fontWeight: 600, color: "#1e293b" },
  infoInput: {
    fontSize: "14px",
    fontWeight: 600,
    color: "#1e293b",
    border: "2px solid #e0e7ff",
    borderRadius: "8px",
    padding: "8px 10px",
    outline: "none",
    background: "#f8faff",
    transition: "border-color 0.2s",
  },

  // Right col
  rightCol: { display: "flex", flexDirection: "column", gap: "16px" },
  ringCard: { display: "flex", flexDirection: "column" },
  ringWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    margin: "8px 0 4px",
  },
  ringCenter: {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  ringPercent: { fontSize: "24px", fontWeight: 800, color: "#0f172a" },
  ringSubtext: { fontSize: "11px", color: "#94a3b8", fontWeight: 600, textTransform: "uppercase" },

  // Mini cards
  miniCards: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" },
  miniCard: {
    borderRadius: "16px",
    padding: "16px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
  },
  miniIcon: { fontSize: "24px" },
  miniValue: { fontSize: "22px", fontWeight: 800, margin: 0, lineHeight: 1 },
  miniLabel: { fontSize: "11px", color: "#6b7280", fontWeight: 600, margin: "2px 0 0", textTransform: "uppercase" },

  // Toast
  toast: {
    position: "fixed",
    bottom: "32px",
    left: "50%",
    transform: "translateX(-50%)",
    color: "#fff",
    padding: "12px 24px",
    borderRadius: "12px",
    fontWeight: 600,
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    zIndex: 9999,
    boxShadow: "0 8px 30px rgba(0,0,0,0.25)",
    animation: "slideUp 0.3s ease",
  },
  savingRow: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },

  // Loading
  loadingScreen: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "16px",
    background: "#f1f5f9",
  },
  spinner: { /* handled by CSS */ },
  loadingText: { color: "#64748b", fontFamily: "'Sora', sans-serif", fontSize: "15px" },
};

const spinnerCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&display=swap');
  div[style*="flex-direction: column; align-items: center; justify-content: center"] > div {
    width: 40px; height: 40px;
    border: 4px solid #e2e8f0;
    border-top-color: #0d9488;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }
  @keyframes spin { to { transform: rotate(360deg); } }
`;

const globalCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&display=swap');

  * { box-sizing: border-box; }

  .hero-card {
    transition: box-shadow 0.3s ease;
  }
  .hero-card:hover {
    box-shadow: 0 8px 60px rgba(0,0,0,0.12) !important;
  }

  .card {
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
  .card:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 30px rgba(0,0,0,0.1) !important;
  }

  .action-btn:hover {
    opacity: 0.88;
    transform: translateY(-1px);
  }

  .info-input:focus {
    border-color: #6366f1 !important;
    box-shadow: 0 0 0 3px rgba(99,102,241,0.15);
  }

  .avatar-overlay {
    transition: opacity 0.2s;
  }

  .mini-card {
    transition: transform 0.2s ease;
  }
  .mini-card:hover {
    transform: translateY(-2px);
  }

  @keyframes slideUp {
    from { opacity: 0; transform: translateX(-50%) translateY(20px); }
    to   { opacity: 1; transform: translateX(-50%) translateY(0); }
  }

  .btn-spinner {
    display: inline-block;
    width: 14px; height: 14px;
    border: 2px solid rgba(255,255,255,0.4);
    border-top-color: #fff;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
  }
  @keyframes spin { to { transform: rotate(360deg); } }

    div[style*="grid-template-columns: 1fr 320px"] {
      grid-template-columns: 1fr !important;
    }
    div[style*="grid-template-columns: 1fr 1fr"][style*="gap: 20px"] {
      grid-template-columns: 1fr !important;
    }
  }
`;