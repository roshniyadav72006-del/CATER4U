"use client";
import { useState, useEffect, useRef } from "react";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminLoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!form.email || !form.password) { setError("Saare fields bharna zaroori hai!"); return; }
    try {
      setLoading(true);
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email.trim(), password: form.password.trim() }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.message || "Invalid credentials"); return; }
      router.push("/admin/dashboard");
    } catch { setError("Server error. Dobara try karein."); }
    finally { setLoading(false); }
  }

  const isDisabled = !form.email || !form.password || loading;

  return (
    <>
      <style>{styles}</style>

      <div className="al-root">

        {/* ── Ambient background layers ── */}
        <div className="al-bg-base" />
        <div className="al-bg-glow-1" />
        <div className="al-bg-glow-2" />
        <div className="al-bg-grid" />

        {/* ── Floating leaf/spice decorations ── */}
        {mounted && decorItems.map((d, i) => (
          <motion.div
            key={i}
            className="al-deco"
            style={{ left: d.x, top: d.y, fontSize: d.size, opacity: 0 }}
            animate={{ opacity: [0, d.op, 0], y: [0, -40, -80], rotate: [0, d.rot, d.rot * 2] }}
            transition={{ duration: d.dur, delay: d.delay, repeat: Infinity, ease: "easeInOut" }}
          >
            {d.icon}
          </motion.div>
        ))}

        {/* ── Back link ── */}
        <motion.div
          className="al-back-wrap"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Link href="/" className="al-back">
            <span className="al-back-arrow">←</span>
            <span>Home</span>
          </Link>
        </motion.div>

        {/* ── Main card ── */}
        <motion.div
          className="al-card"
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Top green stripe */}
          <div className="al-stripe" />

          {/* Left panel — brand */}
          <div className="al-panel-left">
            <motion.div
              className="al-logo-ring"
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <Image src="https://res.cloudinary.com/dpgubcyaq/image/upload/v1774555385/Logo_z7wsgh.svg" alt="Logo" width={64} height={64} className="al-logo-img" />
              </motion.div>
            </motion.div>

            <motion.h1
              className="al-brand-name"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.5 }}
            >
              Chandani<br />Catering
            </motion.h1>

            <motion.p
              className="al-brand-tagline"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.5 }}
            >
              Swad mein vishwas,<br />seva mein samarpan
            </motion.p>

            <motion.div
              className="al-panel-divider"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: 0.6, duration: 0.4 }}
            />

            <motion.p
              className="al-panel-badge"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              🔐 Admin Portal
            </motion.p>
          </div>

          {/* Right panel — form */}
          <div className="al-panel-right">

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
            >
              <h2 className="al-form-title">Welcome Back</h2>
              <p className="al-form-sub">Apne admin account mein sign in karein</p>
            </motion.div>

            <form onSubmit={handleSubmit} className="al-form">

              {/* Email */}
              <motion.div
                className="al-field"
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.45, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <label className="al-label">Email Address</label>
                <div className={`al-input-wrap ${focusedField === "email" ? "focused" : ""} ${form.email ? "filled" : ""}`}>
                  <FaEnvelope className="al-input-icon" />
                  <input
                    type="email" name="email"
                    placeholder="admin@chandani.com"
                    value={form.email} onChange={handleChange}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    className="al-input"
                  />
                  {form.email && (
                    <motion.span
                      initial={{ scale: 0 }} animate={{ scale: 1 }}
                      className="al-check"
                    >✓</motion.span>
                  )}
                </div>
              </motion.div>

              {/* Password */}
              <motion.div
                className="al-field"
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.55, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <label className="al-label">Password</label>
                <div className={`al-input-wrap ${focusedField === "password" ? "focused" : ""} ${form.password ? "filled" : ""}`}>
                  <FaLock className="al-input-icon" />
                  <input
                    type={showPassword ? "text" : "password"} name="password"
                    placeholder="••••••••"
                    value={form.password} onChange={handleChange}
                    onFocus={() => setFocusedField("password")}
                    onBlur={() => setFocusedField(null)}
                    className="al-input"
                  />
                  <button type="button" className="al-eye" onClick={() => setShowPassword(!showPassword)}>
                    <AnimatePresence mode="wait">
                      <motion.span key={showPassword ? "h" : "s"}
                        initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        exit={{ opacity: 0, scale: 0.5, rotate: 90 }}
                        transition={{ duration: 0.18 }}
                        style={{ display: "block" }}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </motion.span>
                    </AnimatePresence>
                  </button>
                </div>
              </motion.div>

              {/* Forgot password */}
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ delay: 0.62 }}
                style={{ textAlign: "right", marginTop: "-4px", marginBottom: "8px" }}
              >
                <Link href="/forgot" className="al-forgot">Forgot Password?</Link>
              </motion.div>

              {/* Error */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    className="al-error"
                    initial={{ opacity: 0, y: -8, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, y: -8, height: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    ⚠️ {error}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit */}
              <motion.button
                type="submit" disabled={isDisabled}
                className={`al-btn ${isDisabled ? "disabled" : ""}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65, ease: [0.34, 1.56, 0.64, 1] }}
                whileHover={!isDisabled ? { y: -2, boxShadow: "0 12px 32px rgba(5,110,40,0.5)" } : {}}
                whileTap={!isDisabled ? { scale: 0.97 } : {}}
              >
                {loading ? (
                  <span className="al-dots">
                    <span /><span /><span />
                  </span>
                ) : (
                  <span className="al-btn-text">
                    <span>Sign In</span>
                    <span className="al-btn-arrow">→</span>
                  </span>
                )}
              </motion.button>

            </form>

            {/* Footer link */}
            <motion.p
              className="al-footer-note"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.75 }}
            >
              User login ke liye?{" "}
              <Link href="/login" className="al-footer-link">Yahan click karein</Link>
            </motion.p>

          </div>
        </motion.div>

      </div>
    </>
  );
}

// ── Decorative floating items ──────────────────────────────────────────────
const decorItems = [
  { icon: "🌿", x: "8%",  y: "15%", size: "22px", op: 0.35, rot: 30,  dur: 6,   delay: 0 },
  { icon: "✦",  x: "88%", y: "10%", size: "14px", op: 0.4,  rot: 60,  dur: 5,   delay: 0.8 },
  { icon: "🍃", x: "92%", y: "60%", size: "18px", op: 0.3,  rot: -40, dur: 7,   delay: 1.5 },
  { icon: "✦",  x: "5%",  y: "70%", size: "10px", op: 0.45, rot: 90,  dur: 4.5, delay: 2 },
  { icon: "🌾", x: "50%", y: "5%",  size: "16px", op: 0.25, rot: 20,  dur: 8,   delay: 0.5 },
  { icon: "✦",  x: "75%", y: "85%", size: "12px", op: 0.4,  rot: -60, dur: 5.5, delay: 1.2 },
  { icon: "🌿", x: "20%", y: "88%", size: "20px", op: 0.3,  rot: 45,  dur: 6.5, delay: 2.5 },
];

// ── Styles ──────────────────────────────────────────────────────────────────
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .al-root {
    min-height: 100vh;
    display: flex; align-items: center; justify-content: center;
    font-family: 'DM Sans', sans-serif;
    padding: 24px;
    position: relative;
    overflow: hidden;
  }

  /* ── Background layers ── */
  .al-bg-base {
    position: fixed; inset: 0; z-index: 0;
    background: linear-gradient(160deg, #0a1f0e 0%, #0d2b14 40%, #071a0a 100%);
  }
  .al-bg-glow-1 {
    position: fixed; z-index: 0;
    width: 700px; height: 700px; border-radius: 50%;
    background: radial-gradient(circle, rgba(22,163,74,0.14) 0%, transparent 65%);
    top: -200px; left: -150px; pointer-events: none;
  }
  .al-bg-glow-2 {
    position: fixed; z-index: 0;
    width: 500px; height: 500px; border-radius: 50%;
    background: radial-gradient(circle, rgba(134,239,172,0.08) 0%, transparent 65%);
    bottom: -150px; right: -100px; pointer-events: none;
  }
  .al-bg-grid {
    position: fixed; inset: 0; z-index: 0; pointer-events: none;
    background-image: linear-gradient(rgba(134,239,172,0.04) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(134,239,172,0.04) 1px, transparent 1px);
    background-size: 48px 48px;
    mask-image: radial-gradient(ellipse 70% 70% at 50% 50%, black 0%, transparent 100%);
  }

  .al-deco {
    position: fixed; z-index: 1; pointer-events: none;
    user-select: none;
  }

  /* ── Back link ── */
  .al-back-wrap {
    position: fixed; top: 24px; left: 24px; z-index: 50;
  }
  .al-back {
    display: flex; align-items: center; gap: 8px;
    font-size: 12px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase;
    color: rgba(134,239,172,0.5);
    text-decoration: none;
    transition: color 0.2s;
  }
  .al-back:hover { color: rgba(134,239,172,0.9); }
  .al-back-arrow { font-size: 16px; line-height: 1; }

  /* ── Card ── */
  .al-card {
    position: relative; z-index: 10;
    width: 100%; max-width: 820px;
    display: flex;
    border-radius: 24px;
    overflow: hidden;
    border: 1px solid rgba(134,239,172,0.12);
    box-shadow: 0 40px 100px rgba(0,0,0,0.6), 0 0 0 1px rgba(134,239,172,0.06) inset;
  }

  .al-stripe {
    position: absolute; top: 0; left: 0; right: 0;
    height: 3px;
    background: linear-gradient(90deg, #166534, #16a34a, #4ade80, #16a34a, #166534);
    background-size: 200% 100%;
    animation: shimmer-stripe 3s linear infinite;
    z-index: 2;
  }
  @keyframes shimmer-stripe {
    0% { background-position: 0% 0% }
    100% { background-position: 200% 0% }
  }

  /* ── Left panel ── */
  .al-panel-left {
    width: 280px; flex-shrink: 0;
    background: linear-gradient(160deg, rgba(22,101,52,0.5) 0%, rgba(10,31,14,0.8) 100%);
    border-right: 1px solid rgba(134,239,172,0.1);
    padding: 52px 32px;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    position: relative; overflow: hidden;
  }
  .al-panel-left::before {
    content: '';
    position: absolute; inset: 0;
    background: radial-gradient(circle at 50% 30%, rgba(74,222,128,0.1) 0%, transparent 60%);
    pointer-events: none;
  }

  .al-logo-ring {
    width: 96px; height: 96px; border-radius: 50%;
    background: rgba(22,163,74,0.15);
    border: 1.5px solid rgba(74,222,128,0.3);
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 24px;
    box-shadow: 0 0 40px rgba(74,222,128,0.2), inset 0 1px 0 rgba(255,255,255,0.1);
  }
  .al-logo-img {
    object-fit: contain;
    filter: brightness(0) invert(1) sepia(1) hue-rotate(90deg) saturate(2) brightness(1.4);
  }

  .al-brand-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 26px; font-weight: 700; line-height: 1.2;
    color: #dcfce7; text-align: center;
    letter-spacing: -0.01em;
    margin-bottom: 12px;
  }
  .al-brand-tagline {
    font-size: 12px; font-weight: 400; line-height: 1.7;
    color: rgba(134,239,172,0.55);
    text-align: center; font-style: italic;
    letter-spacing: 0.02em;
    margin-bottom: 28px;
  }
  .al-panel-divider {
    width: 32px; height: 1px;
    background: rgba(74,222,128,0.3);
    margin-bottom: 20px;
    transform-origin: center;
  }
  .al-panel-badge {
    font-size: 11px; font-weight: 600; letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(74,222,128,0.6);
    background: rgba(74,222,128,0.08);
    border: 1px solid rgba(74,222,128,0.18);
    padding: 6px 14px; border-radius: 50px;
  }

  /* ── Right panel ── */
  .al-panel-right {
    flex: 1;
    background: rgba(8,20,10,0.85);
    backdrop-filter: blur(20px);
    padding: 52px 44px;
    display: flex; flex-direction: column; justify-content: center;
  }

  .al-form-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 32px; font-weight: 700;
    color: #f0fdf4;
    letter-spacing: -0.02em;
    margin-bottom: 6px;
  }
  .al-form-sub {
    font-size: 13px; color: rgba(134,239,172,0.45);
    margin-bottom: 32px; font-weight: 400; line-height: 1.5;
  }

  .al-form { display: flex; flex-direction: column; gap: 16px; }
  .al-field { display: flex; flex-direction: column; gap: 8px; }
  .al-label {
    font-size: 11px; font-weight: 600; letter-spacing: 0.08em;
    text-transform: uppercase; color: rgba(134,239,172,0.5);
  }

  .al-input-wrap {
    display: flex; align-items: center; gap: 12px;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(134,239,172,0.12);
    border-radius: 12px; padding: 0 16px;
    height: 52px;
    transition: all 0.25s ease;
    position: relative;
  }
  .al-input-wrap.focused {
    background: rgba(74,222,128,0.06);
    border-color: rgba(74,222,128,0.4);
    box-shadow: 0 0 0 4px rgba(74,222,128,0.08);
  }
  .al-input-wrap.filled:not(.focused) {
    border-color: rgba(74,222,128,0.2);
  }
  .al-input-icon {
    color: rgba(74,222,128,0.35);
    font-size: 13px; flex-shrink: 0;
    transition: color 0.2s;
  }
  .al-input-wrap.focused .al-input-icon { color: rgba(74,222,128,0.7); }
  .al-input {
    background: none; border: none; outline: none;
    font-family: 'DM Sans', sans-serif;
    font-size: 14.5px; font-weight: 400;
    color: #f0fdf4; width: 100%;
    letter-spacing: 0.01em;
  }
  .al-input::placeholder { color: rgba(134,239,172,0.2); }
  .al-check {
    color: #4ade80; font-size: 14px; font-weight: 700; flex-shrink: 0;
  }

  .al-eye {
    background: none; border: none; cursor: pointer;
    color: rgba(74,222,128,0.35); display: flex; padding: 0;
    transition: color 0.2s; flex-shrink: 0; font-size: 13px;
  }
  .al-eye:hover { color: rgba(74,222,128,0.8); }

  .al-forgot {
    font-size: 12px; font-weight: 500;
    color: rgba(74,222,128,0.45);
    text-decoration: none;
    transition: color 0.2s;
    letter-spacing: 0.01em;
  }
  .al-forgot:hover { color: rgba(74,222,128,0.8); }

  .al-error {
    font-size: 13px; color: #fca5a5;
    background: rgba(239,68,68,0.1);
    border: 1px solid rgba(239,68,68,0.25);
    border-radius: 10px; padding: 10px 14px;
    overflow: hidden;
  }

  .al-btn {
    height: 52px; border: none; border-radius: 12px; cursor: pointer;
    background: linear-gradient(135deg, #15803d 0%, #16a34a 60%, #22c55e 100%);
    color: #fff; font-family: 'DM Sans', sans-serif;
    font-size: 15px; font-weight: 600;
    letter-spacing: 0.02em;
    box-shadow: 0 6px 24px rgba(22,163,74,0.35);
    transition: all 0.25s ease;
    position: relative; overflow: hidden;
  }
  .al-btn::before {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
    transform: translateX(-100%);
    transition: transform 0.4s ease;
  }
  .al-btn:hover:not(.disabled)::before { transform: translateX(100%); }
  .al-btn.disabled {
    background: rgba(255,255,255,0.06);
    color: rgba(255,255,255,0.2);
    cursor: not-allowed;
    box-shadow: none;
  }
  .al-btn-text {
    display: flex; align-items: center; justify-content: center; gap: 10px;
  }
  .al-btn-arrow {
    font-size: 18px; transition: transform 0.2s;
  }
  .al-btn:hover:not(.disabled) .al-btn-arrow { transform: translateX(4px); }

  .al-dots { display: inline-flex; gap: 5px; align-items: center; }
  .al-dots span {
    width: 5px; height: 5px; border-radius: 50%; background: #fff;
    animation: al-db 1.1s ease-in-out infinite;
  }
  .al-dots span:nth-child(2) { animation-delay: .18s }
  .al-dots span:nth-child(3) { animation-delay: .36s }
  @keyframes al-db {
    0%,80%,100%{transform:scale(0.6);opacity:0.4}
    40%{transform:scale(1);opacity:1}
  }

  .al-footer-note {
    margin-top: 24px;
    font-size: 13px; color: rgba(134,239,172,0.3);
    text-align: center;
  }
  .al-footer-link {
    color: rgba(74,222,128,0.6);
    font-weight: 600; text-decoration: none;
    border-bottom: 1px solid rgba(74,222,128,0.25);
    padding-bottom: 1px;
    transition: color 0.2s, border-color 0.2s;
  }
  .al-footer-link:hover {
    color: rgba(74,222,128,0.9);
    border-color: rgba(74,222,128,0.5);
  }

  /* ── Responsive ── */
  @media (max-width: 640px) {
    .al-card { flex-direction: column; max-width: 400px; }
    .al-panel-left {
      width: 100%; padding: 36px 28px 28px;
      border-right: none; border-bottom: 1px solid rgba(134,239,172,0.1);
    }
    .al-panel-right { padding: 32px 28px 36px; }
    .al-brand-name { font-size: 22px; }
    .al-form-title { font-size: 26px; }
  }

  input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 1000px rgba(8,20,10,0.9) inset !important;
    -webkit-text-fill-color: #f0fdf4 !important;
  }
`;