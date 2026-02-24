"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

// ── Floating Label Input ──────────────────────────────────────────────────────
function FloatingField({ label, icon, type = "text", value, onChange, step }) {
  const [focused, setFocused] = useState(false);
  const lifted = focused || value?.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: step * 0.08, ease: "easeOut" }}
      style={{ position: "relative", marginBottom: "6px" }}
    >
      <div style={{
        position: "relative", borderRadius: "14px",
        background: focused ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.1)",
        border: focused
          ? "1.5px solid rgba(255,255,255,0.8)"
          : "1.5px solid rgba(255,255,255,0.25)",
        transition: "all 0.25s ease",
        boxShadow: focused ? "0 0 0 4px rgba(255,255,255,0.08)" : "none",
      }}>
        <span style={{
          position: "absolute", left: "16px", top: "50%",
          transform: "translateY(-50%)", fontSize: "17px", pointerEvents: "none",
          opacity: focused ? 1 : 0.6, transition: "opacity 0.2s",
        }}>{icon}</span>

        <label style={{
          position: "absolute", left: "46px",
          top: lifted ? "8px" : "50%",
          transform: lifted ? "none" : "translateY(-50%)",
          fontSize: lifted ? "10px" : "14px",
          fontWeight: lifted ? 700 : 500,
          color: "rgba(255,255,255,0.7)",
          letterSpacing: lifted ? "0.8px" : "0",
          textTransform: lifted ? "uppercase" : "none",
          transition: "all 0.2s cubic-bezier(.4,0,.2,1)",
          pointerEvents: "none",
        }}>{label}</label>

        <input
          type={type} value={value} onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            width: "100%", background: "transparent", border: "none", outline: "none",
            paddingTop: "24px", paddingBottom: "8px", paddingLeft: "46px", paddingRight: "14px",
            fontSize: "15px", color: "#fff", fontFamily: "inherit", boxSizing: "border-box",
          }}
          autoComplete="off"
        />
      </div>
    </motion.div>
  );
}

// ── Password Field ────────────────────────────────────────────────────────────
function PasswordField({ label, icon, value, onChange, step }) {
  const [show, setShow] = useState(false);
  const [focused, setFocused] = useState(false);
  const lifted = focused || value?.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: step * 0.08, ease: "easeOut" }}
      style={{ position: "relative", marginBottom: "6px" }}
    >
      <div style={{
        position: "relative", borderRadius: "14px",
        background: focused ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.1)",
        border: focused ? "1.5px solid rgba(255,255,255,0.8)" : "1.5px solid rgba(255,255,255,0.25)",
        transition: "all 0.25s ease",
        boxShadow: focused ? "0 0 0 4px rgba(255,255,255,0.08)" : "none",
      }}>
        <span style={{
          position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)",
          fontSize: "17px", pointerEvents: "none", opacity: focused ? 1 : 0.6,
        }}>{icon}</span>

        <label style={{
          position: "absolute", left: "46px",
          top: lifted ? "8px" : "50%", transform: lifted ? "none" : "translateY(-50%)",
          fontSize: lifted ? "10px" : "14px", fontWeight: lifted ? 700 : 500,
          color: "rgba(255,255,255,0.7)", letterSpacing: lifted ? "0.8px" : "0",
          textTransform: lifted ? "uppercase" : "none",
          transition: "all 0.2s cubic-bezier(.4,0,.2,1)", pointerEvents: "none",
        }}>{label}</label>

        <input
          type={show ? "text" : "password"} value={value} onChange={onChange}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          style={{
            width: "100%", background: "transparent", border: "none", outline: "none",
            paddingTop: "24px", paddingBottom: "8px", paddingLeft: "46px", paddingRight: "52px",
            fontSize: "15px", color: "#fff", fontFamily: "inherit", boxSizing: "border-box",
          }}
        />
        <button type="button" onClick={() => setShow(!show)} style={{
          position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)",
          background: "none", border: "none", cursor: "pointer", fontSize: "18px",
          color: "rgba(255,255,255,0.6)", padding: "4px",
        }}>
          <AnimatePresence mode="wait">
            <motion.span key={show ? "h" : "s"}
              initial={{ opacity: 0, rotate: -60 }} animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 60 }} transition={{ duration: 0.2 }}
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
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)",
      fontFamily: "'Plus Jakarta Sans', 'Nunito', sans-serif",
      padding: "20px",
    }}>
      <style>{css}</style>

      {/* Static glow orbs */}
      <div style={{
        position: "fixed", top: "-160px", left: "-120px",
        width: "500px", height: "500px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(99,102,241,0.18), transparent 70%)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "fixed", bottom: "-140px", right: "-100px",
        width: "450px", height: "450px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(139,92,246,0.15), transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* Glass Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
        style={{
          width: "100%", maxWidth: "420px",
          background: "rgba(255,255,255,0.07)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          borderRadius: "28px",
          border: "1.5px solid rgba(255,255,255,0.15)",
          boxShadow: "0 30px 80px rgba(0,0,0,0.5)",
          overflow: "hidden",
          position: "relative",
          zIndex: 10,
        }}
      >
        {/* Top stripe */}
        <div style={{
          height: "5px",
          background: "linear-gradient(90deg, #6366f1, #8b5cf6, #a78bfa)",
        }} />

        <div style={{ padding: "40px 40px 44px" }}>

          {/* Back link */}
          <Link href="/" style={{
            display: "inline-block", marginBottom: "24px",
            fontSize: "11px", fontWeight: 700, color: "rgba(255,255,255,0.45)",
            textDecoration: "none", letterSpacing: "1px",
          }}>← HOME</Link>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            style={{ textAlign: "center", marginBottom: "36px" }}
          >
            <div style={{
              width: "68px", height: "68px", borderRadius: "22px",
              background: "rgba(255,255,255,0.12)",
              border: "1.5px solid rgba(255,255,255,0.2)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "30px", margin: "0 auto 16px",
              boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
            }}>🍽️</div>

            <h1 style={{ margin: 0, fontSize: "28px", fontWeight: 800, color: "#fff", letterSpacing: "-0.5px" }}>
              CATER4U
            </h1>
            <p style={{ margin: "6px 0 0", color: "rgba(255,255,255,0.5)", fontSize: "13px", fontWeight: 500 }}>
              Welcome back! Please sign in
            </p>
          </motion.div>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>

            <FloatingField
              label="Email Address" icon="✉️" type="email" value={email} step={1}
              onChange={(e) => setEmail(e.target.value)}
            />

            <PasswordField
              label="Password" icon="🔑" value={password} step={2}
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* Forgot Password */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              style={{ textAlign: "right", marginTop: "-4px" }}
            >
              <Link href="/forgot" style={{
                fontSize: "12px", fontWeight: 700,
                color: "#a78bfa", textDecoration: "none",
                borderBottom: "1px solid rgba(167,139,250,0.3)",
                paddingBottom: "1px",
              }}>
                Forgot Password?
              </Link>
            </motion.div>

            {/* Submit */}
            <motion.button
              type="submit" disabled={isDisabled}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              whileHover={!isDisabled ? { scale: 1.02, y: -1 } : {}}
              whileTap={!isDisabled ? { scale: 0.98 } : {}}
              style={{
                marginTop: "6px", padding: "15px", borderRadius: "14px", border: "none",
                background: isDisabled
                  ? "rgba(255,255,255,0.08)"
                  : "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                color: isDisabled ? "rgba(255,255,255,0.3)" : "#fff",
                fontSize: "15px", fontWeight: 700, fontFamily: "inherit",
                cursor: isDisabled ? "not-allowed" : "pointer",
                boxShadow: isDisabled ? "none" : "0 8px 24px rgba(99,102,241,0.4)",
                transition: "all 0.25s ease", letterSpacing: "0.3px",
                display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
              }}
            >
              {loading ? <><span className="btn-spinner" /> Signing in…</> : "Sign In →"}
            </motion.button>
          </form>

          {/* Divider */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            style={{ display: "flex", alignItems: "center", gap: "12px", margin: "24px 0" }}
          >
            <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.12)" }} />
            <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.35)", fontWeight: 600 }}>OR</span>
            <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.12)" }} />
          </motion.div>

          {/* Register link */}
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}
            style={{ textAlign: "center", fontSize: "13px", color: "rgba(255,255,255,0.45)", margin: 0 }}
          >
            Don't have an account?{" "}
            <Link href="/register" style={{
              color: "#a78bfa", fontWeight: 700, textDecoration: "none",
              borderBottom: "1.5px solid rgba(167,139,250,0.4)", paddingBottom: "1px",
            }}>Create one</Link>
          </motion.p>
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
    -webkit-text-fill-color: #fff !important;
    transition: background-color 5000s;
  }
  input::placeholder { color: transparent; }
`;