"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { motion, AnimatePresence, useAnimation } from "framer-motion";

// ── Theme Tokens ──────────────────────────────────────────────────────────────
const themes = {
  dark: {
    heroOverlay: "linear-gradient(135deg, rgba(10,10,30,0.72) 0%, rgba(30,27,75,0.65) 100%)",
    card: "rgba(10,10,30,0.28)",
    cardBorder: "rgba(255,255,255,0.14)",
    cardShadow: "0 40px 100px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.08)",
    fieldBg: "rgba(255,255,255,0.07)",
    fieldBgFocus: "rgba(255,255,255,0.14)",
    fieldBorder: "rgba(255,255,255,0.18)",
    fieldBorderFocus: "rgba(255,255,255,0.75)",
    fieldGlow: "rgba(255,255,255,0.07)",
    labelColor: "rgba(255,255,255,0.55)",
    inputColor: "#fff",
    headingColor: "#fff",
    subColor: "rgba(255,255,255,0.5)",
    backColor: "rgba(255,255,255,0.38)",
    dividerColor: "rgba(255,255,255,0.12)",
    dividerText: "rgba(255,255,255,0.32)",
    footerText: "rgba(255,255,255,0.42)",
    linkColor: "#a78bfa",
    btnDisabledBg: "rgba(255,255,255,0.07)",
    btnDisabledColor: "rgba(255,255,255,0.28)",
    stripe: "linear-gradient(90deg, #6366f1, #8b5cf6, #a78bfa)",
    toggleBg: "rgba(10,10,30,0.50)",
    toggleBorder: "rgba(255,255,255,0.22)",
    toggleColor: "#fff",
    logoFilter: "drop-shadow(0 8px 28px rgba(0,0,0,0.5))",
    logoBgWrap: "transparent",
  },
  light: {
    heroOverlay: "linear-gradient(135deg, rgba(224,231,255,0.55) 0%, rgba(243,232,255,0.52) 100%)",
    card: "rgba(255,255,255,0.52)",
    cardBorder: "rgba(99,102,241,0.22)",
    cardShadow: "0 40px 100px rgba(99,102,241,0.2), inset 0 1px 0 rgba(255,255,255,0.9)",
    fieldBg: "rgba(255,255,255,0.60)",
    fieldBgFocus: "rgba(255,255,255,0.88)",
    fieldBorder: "rgba(99,102,241,0.24)",
    fieldBorderFocus: "#6366f1",
    fieldGlow: "rgba(99,102,241,0.12)",
    labelColor: "rgba(60,40,120,0.62)",
    inputColor: "#1e1b4b",
    headingColor: "#1e1b4b",
    subColor: "rgba(60,40,120,0.52)",
    backColor: "rgba(60,40,120,0.42)",
    dividerColor: "rgba(99,102,241,0.16)",
    dividerText: "rgba(99,102,241,0.5)",
    footerText: "rgba(60,40,120,0.5)",
    linkColor: "#6366f1",
    btnDisabledBg: "rgba(99,102,241,0.09)",
    btnDisabledColor: "rgba(99,102,241,0.32)",
    stripe: "linear-gradient(90deg, #6366f1, #8b5cf6, #a78bfa)",
    toggleBg: "rgba(255,255,255,0.75)",
    toggleBorder: "rgba(99,102,241,0.28)",
    toggleColor: "#1e1b4b",
    logoFilter: "drop-shadow(0 8px 24px rgba(99,102,241,0.35)) brightness(0.15) sepia(1) hue-rotate(200deg) saturate(4)",
    logoBgWrap: "transparent",
  },
};

// ── Floating particles (decorative) ──────────────────────────────────────────
function Particles({ mode }) {
  const isDark = mode === "dark";
  const dots = Array.from({ length: 6 }, (_, i) => i);
  return (
    <>
      {dots.map((i) => (
        <motion.div
          key={i}
          style={{
            position: "fixed",
            width: i % 2 === 0 ? "6px" : "4px",
            height: i % 2 === 0 ? "6px" : "4px",
            borderRadius: "50%",
            background: isDark
              ? `rgba(167,139,250,${0.3 + i * 0.05})`
              : `rgba(99,102,241,${0.2 + i * 0.04})`,
            left: `${10 + i * 15}%`,
            top: `${20 + i * 10}%`,
            zIndex: 2,
            pointerEvents: "none",
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, i % 2 === 0 ? 10 : -10, 0],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 3 + i * 0.7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.4,
          }}
        />
      ))}
    </>
  );
}

// ── Theme Toggle ──────────────────────────────────────────────────────────────
function ThemeToggle({ mode, setMode }) {
  const t = themes[mode];
  const isDark = mode === "dark";
  return (
    <motion.button
      onClick={() => setMode(isDark ? "light" : "dark")}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      style={{
        position: "fixed", top: "20px", right: "20px", zIndex: 200,
        display: "flex", alignItems: "center", gap: "7px",
        padding: "8px 16px", borderRadius: "50px",
        background: t.toggleBg,
        border: `1.5px solid ${t.toggleBorder}`,
        backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
        cursor: "pointer", color: t.toggleColor,
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: "13px", fontWeight: 700, letterSpacing: "0.3px",
        boxShadow: isDark ? "0 4px 20px rgba(0,0,0,0.4)" : "0 4px 20px rgba(99,102,241,0.18)",
        transition: "background 0.3s, border-color 0.3s, color 0.3s, box-shadow 0.3s",
      }}
    >
      <AnimatePresence mode="wait">
        <motion.span key={mode}
          initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
          transition={{ duration: 0.25 }}
          style={{ display: "block", fontSize: "15px" }}
        >
          {isDark ? "☀️" : "🌙"}
        </motion.span>
      </AnimatePresence>
      <AnimatePresence mode="wait">
        <motion.span key={mode + "-label"}
          initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 5 }} transition={{ duration: 0.2 }}
        >
          {isDark ? "Light" : "Dark"}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}

// ── Floating Label Input — with shimmer + slide-in animation ─────────────────
function FloatingField({ label, icon, type = "text", value, onChange, step, theme }) {
  const [focused, setFocused] = useState(false);
  const lifted = focused || value?.length > 0;
  const t = themes[theme];

  return (
    <motion.div
      initial={{ opacity: 0, x: -40, filter: "blur(6px)" }}
      animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.5, delay: step * 0.12, ease: [0.22, 1, 0.36, 1] }}
      style={{ position: "relative", marginBottom: "6px" }}
    >
      <motion.div
        whileFocus={{ scale: 1.01 }}
        style={{
          position: "relative", borderRadius: "14px",
          background: focused ? t.fieldBgFocus : t.fieldBg,
          border: `1.5px solid ${focused ? t.fieldBorderFocus : t.fieldBorder}`,
          transition: "all 0.25s ease",
          boxShadow: focused ? `0 0 0 4px ${t.fieldGlow}, 0 4px 16px rgba(99,102,241,0.1)` : "none",
          overflow: "hidden",
        }}
      >
        {focused && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "200%" }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
              pointerEvents: "none", zIndex: 1,
            }}
          />
        )}

        <span style={{
          position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)",
          fontSize: "17px", pointerEvents: "none", opacity: focused ? 1 : 0.6,
          transition: "opacity 0.2s", zIndex: 2,
        }}>{icon}</span>

        <label style={{
          position: "absolute", left: "46px",
          top: lifted ? "8px" : "50%", transform: lifted ? "none" : "translateY(-50%)",
          fontSize: lifted ? "10px" : "14px", fontWeight: lifted ? 700 : 500,
          color: t.labelColor, letterSpacing: lifted ? "0.8px" : "0",
          textTransform: lifted ? "uppercase" : "none",
          transition: "all 0.2s cubic-bezier(.4,0,.2,1)", pointerEvents: "none", zIndex: 2,
        }}>{label}</label>

        <input
          type={type} value={value} onChange={onChange}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          style={{
            width: "100%", background: "transparent", border: "none", outline: "none",
            paddingTop: "24px", paddingBottom: "8px", paddingLeft: "46px", paddingRight: "14px",
            fontSize: "15px", color: t.inputColor, fontFamily: "inherit", boxSizing: "border-box",
            position: "relative", zIndex: 2,
          }}
          autoComplete="off"
        />
      </motion.div>
    </motion.div>
  );
}

// ── Password Field ────────────────────────────────────────────────────────────
function PasswordField({ label, icon, value, onChange, step, theme }) {
  const [show, setShow] = useState(false);
  const [focused, setFocused] = useState(false);
  const lifted = focused || value?.length > 0;
  const t = themes[theme];

  return (
    <motion.div
      initial={{ opacity: 0, x: 40, filter: "blur(6px)" }}
      animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.5, delay: step * 0.12, ease: [0.22, 1, 0.36, 1] }}
      style={{ position: "relative", marginBottom: "6px" }}
    >
      <div style={{
        position: "relative", borderRadius: "14px",
        background: focused ? t.fieldBgFocus : t.fieldBg,
        border: `1.5px solid ${focused ? t.fieldBorderFocus : t.fieldBorder}`,
        transition: "all 0.25s ease",
        boxShadow: focused ? `0 0 0 4px ${t.fieldGlow}, 0 4px 16px rgba(99,102,241,0.1)` : "none",
        overflow: "hidden",
      }}>
        {focused && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "200%" }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
              pointerEvents: "none", zIndex: 1,
            }}
          />
        )}

        <span style={{
          position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)",
          fontSize: "17px", pointerEvents: "none", opacity: focused ? 1 : 0.6, zIndex: 2,
        }}>{icon}</span>

        <label style={{
          position: "absolute", left: "46px",
          top: lifted ? "8px" : "50%", transform: lifted ? "none" : "translateY(-50%)",
          fontSize: lifted ? "10px" : "14px", fontWeight: lifted ? 700 : 500,
          color: t.labelColor, letterSpacing: lifted ? "0.8px" : "0",
          textTransform: lifted ? "uppercase" : "none",
          transition: "all 0.2s cubic-bezier(.4,0,.2,1)", pointerEvents: "none", zIndex: 2,
        }}>{label}</label>

        <input
          type={show ? "text" : "password"} value={value} onChange={onChange}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          style={{
            width: "100%", background: "transparent", border: "none", outline: "none",
            paddingTop: "24px", paddingBottom: "8px", paddingLeft: "46px", paddingRight: "52px",
            fontSize: "15px", color: t.inputColor, fontFamily: "inherit", boxSizing: "border-box",
            position: "relative", zIndex: 2,
          }}
        />
        <button type="button" onClick={() => setShow(!show)} style={{
          position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)",
          background: "none", border: "none", cursor: "pointer", fontSize: "18px",
          color: t.labelColor, padding: "4px", zIndex: 3,
        }}>
          <AnimatePresence mode="wait">
            <motion.span key={show ? "h" : "s"}
              initial={{ opacity: 0, rotate: -60, scale: 0.5 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 60, scale: 0.5 }}
              transition={{ duration: 0.2 }}
              style={{ display: "block" }}>
              {show ? "🙈" : "👁️"}
            </motion.span>
          </AnimatePresence>
        </button>
      </div>
    </motion.div>
  );
}

// ── Main Login Page ───────────────────────────────────────────────────────────
export default function LoginPage() {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading]   = useState(false);
  const [mode, setMode]         = useState("dark");
  const t = themes[mode];

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return toast.error("All fields are required");
    try {
      setLoading(true);
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        if (res.status === 403) {
          toast.error("Please verify your email using OTP");
          setTimeout(() => { window.location.href = "/verify-otp"; }, 1500);
          return;
        }
        toast.error(data.error || "Invalid credentials");
        return;
      }
      toast.success("Login successful 🎉");
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.user.id);
      setTimeout(() => { window.location.href = "/profile"; }, 1200);
    } catch {
      toast.error("Server error. Try again later.");
    } finally {
      setLoading(false);
    }
  }

  const isDisabled = !email || !password || loading;

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "'Plus Jakarta Sans', 'Nunito', sans-serif",
      padding: "20px",
      position: "relative",
      overflow: "hidden",
    }}>
      <style>{css}</style>

      {/* ── HERO BACKGROUND IMAGE ── */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0 }}>
        <Image
          src="/about-bg.jpg"
          alt="Chandani Catering hero"
          fill priority
          
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
      </div>

      {/* ── COLOUR OVERLAY ── */}
      <motion.div
        animate={{ background: t.heroOverlay }}
        transition={{ duration: 0.5 }}
        style={{ position: "fixed", inset: 0, zIndex: 1, pointerEvents: "none" }}
      />

      {/* ── FLOATING PARTICLES ── */}
      <Particles mode={mode} />

      {/* ── THEME TOGGLE ── */}
      <ThemeToggle mode={mode} setMode={setMode} />

      {/* ── GLASS CARD ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.65, ease: [0.34, 1.56, 0.64, 1] }}
        style={{
          width: "100%", maxWidth: "430px",
          background: t.card,
          backdropFilter: "blur(36px)", WebkitBackdropFilter: "blur(36px)",
          borderRadius: "28px",
          border: `1.5px solid ${t.cardBorder}`,
          boxShadow: t.cardShadow,
          overflow: "hidden",
          position: "relative", zIndex: 10,
          transition: "background 0.4s, border-color 0.4s, box-shadow 0.4s",
        }}
      >
        {/* Top accent stripe */}
        <div style={{ height: "5px", background: t.stripe }} />

        <div style={{ padding: "36px 40px 44px" }}>

          {/* Back link */}
          <Link href="/" style={{
            display: "inline-block", marginBottom: "22px",
            fontSize: "11px", fontWeight: 700, color: t.backColor,
            textDecoration: "none", letterSpacing: "1px", transition: "color 0.3s",
          }}>← HOME</Link>

          {/* ── LOGO — falling from top animation ── */}
          <motion.div
            style={{ textAlign: "center", marginBottom: "20px" }}
          >
            <motion.div
              initial={{ opacity: 0, y: -80, rotate: -8, scale: 0.7 }}
              animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
              transition={{
                duration: 0.8,
                ease: [0.34, 1.56, 0.64, 1],
                delay: 0.1,
              }}
              whileInView={{ y: 0 }}
              style={{ display: "inline-block" }}
            >
              {/* continuous gentle float */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <Image
                  src="/logo.svg"
                  alt="Chandani Catering Logo"
                  width={200}
                  height={200}
                  style={{
                    objectFit: "contain",
                    filter: t.logoFilter,
                    transition: "filter 0.4s ease",
                  }}
                />
              </motion.div>
            </motion.div>

            {/* subtitle slides up */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              style={{
                margin: "4px 0 0", color: t.subColor,
                fontSize: "13px", fontWeight: 500, transition: "color 0.3s",
              }}
            >
              Welcome back! Please sign in
            </motion.p>
          </motion.div>

          {/* ── FORM ── */}
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>

            {/* Email slides in from LEFT */}
            <FloatingField
              label="Email Address" icon="✉️" type="email" value={email} step={1}
              onChange={(e) => setEmail(e.target.value)} theme={mode}
            />

            {/* Password slides in from RIGHT */}
            <PasswordField
              label="Password" icon="🔑" value={password} step={2}
              onChange={(e) => setPassword(e.target.value)} theme={mode}
            />

            {/* Forgot Password */}
            <motion.div
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.38 }}
              style={{ textAlign: "right", marginTop: "-4px" }}
            >
              <Link href="/forgot" style={{
                fontSize: "12px", fontWeight: 700, color: t.linkColor,
                textDecoration: "none", borderBottom: `1px solid ${t.linkColor}40`,
                paddingBottom: "1px", transition: "color 0.3s",
              }}>
                Forgot Password?
              </Link>
            </motion.div>

            {/* Submit */}
            <motion.button
              type="submit" disabled={isDisabled}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, ease: [0.34, 1.56, 0.64, 1] }}
              whileHover={!isDisabled ? { scale: 1.025, y: -2 } : {}}
              whileTap={!isDisabled ? { scale: 0.97 } : {}}
              style={{
                marginTop: "6px", padding: "15px", borderRadius: "14px", border: "none",
                background: isDisabled
                  ? t.btnDisabledBg
                  : "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                color: isDisabled ? t.btnDisabledColor : "#fff",
                fontSize: "15px", fontWeight: 700, fontFamily: "inherit",
                cursor: isDisabled ? "not-allowed" : "pointer",
                boxShadow: isDisabled ? "none" : "0 8px 24px rgba(99,102,241,0.40)",
                transition: "all 0.25s ease", letterSpacing: "0.3px",
                display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
              }}
            >
              {loading ? <><span className="btn-spinner" /> Signing in…</> : "Sign In →"}
            </motion.button>
          </form>

          {/* Divider */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.55 }}
            style={{ display: "flex", alignItems: "center", gap: "12px", margin: "24px 0" }}
          >
            <div style={{ flex: 1, height: "1px", background: t.dividerColor, transition: "background 0.3s" }} />
            <span style={{ fontSize: "12px", color: t.dividerText, fontWeight: 600, transition: "color 0.3s" }}>OR</span>
            <div style={{ flex: 1, height: "1px", background: t.dividerColor, transition: "background 0.3s" }} />
          </motion.div>

          {/* Register link */}
          <motion.p
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            style={{ textAlign: "center", fontSize: "13px", color: t.footerText, margin: 0, transition: "color 0.3s" }}
          >
            Don't have an account?{" "}
            <Link href="/register" style={{
              color: t.linkColor, fontWeight: 700, textDecoration: "none",
              borderBottom: `1.5px solid ${t.linkColor}55`, paddingBottom: "1px", transition: "color 0.3s",
            }}>Create one</Link>
          </motion.p>

          {/* ── Admin Login Link ── */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
            style={{ textAlign: "center", marginTop: "10px" }}
          >
            <span style={{ fontSize: "13px", color: t.footerText, transition: "color 0.3s" }}>
              Login as Admin{" "}
            </span>
            <Link
              href="/admin/login"
              style={{
                color: t.linkColor,
                fontWeight: 700,
                textDecoration: "none",
                borderBottom: `1.5px solid ${t.linkColor}55`,
                paddingBottom: "1px",
                fontSize: "13px",
                transition: "color 0.3s",
              }}
            >
              Admin Login
            </Link>
          </motion.div>

        </div>
      </motion.div>
      
    </div>
  );
}

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
  * { box-sizing: border-box; }

  .btn-spinner {
    display: inline-block; width: 16px; height: 16px;
    border: 2.5px solid rgba(255,255,255,0.3);
    border-top-color: #fff; border-radius: 50%;
    animation: spin 0.75s linear infinite;
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 1000px transparent inset !important;
    -webkit-text-fill-color: inherit !important;
    transition: background-color 5000s;
  }
  input::placeholder { color: transparent; }
`;