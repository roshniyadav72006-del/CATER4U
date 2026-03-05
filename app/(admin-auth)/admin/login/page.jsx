"use client";
import { useState } from "react";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!form.email || !form.password) { setError("All fields are required!"); return; }
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
    } catch { setError("Server error"); }
    finally { setLoading(false); }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .root {
          min-height: 100vh;
          background: radial-gradient(ellipse at 60% 0%, #c1f8cc 0%, #c1f8cc 40%, #c1f8cc 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Plus Jakarta Sans', sans-serif;
          padding: 24px;
          position: relative;
          overflow: hidden;
        }

        /* background glow blobs */
        .root::before {
          content: '';
          position: fixed;
          width: 600px; height: 600px;
          background: radial-gradient(circle, rgba(193, 245, 214, 0.96) 0%, transparent 70%);
          top: -200px; left: 50%;
          transform: translateX(-50%);
          pointer-events: none;
        }
        .root::after {
          content: '';
          position: fixed;
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(11, 151, 72, 0.37) 0%, transparent 70%);
          bottom: -100px; right: -100px;
          pointer-events: none;
        }

        .wrapper {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 400px;
          display: flex;
          flex-direction: column;
          align-items: center;
          animation: rise 0.6s cubic-bezier(0.16,1,0.3,1) both;
        }
        @keyframes rise {
          from { opacity:0; transform:translateY(24px); }
          to   { opacity:1; transform:translateY(0); }
        }

        /* top icon */
        .brand-icon {
          width: 72px; height: 72px;
          border-radius: 50%;
          background: linear-gradient(135deg, #055e0d2b, #044c18);
          display: flex; align-items: center; justify-content: center;
          font-size: 28px;
          box-shadow: 0 0 0 6px rgba(139,92,246,0.15), 0 12px 32px rgba(139,92,246,0.4);
          margin-bottom: 18px;
        }

        .brand-name {
          font-size: 28px;
          font-weight: 700;
          color: #074d1b;
          letter-spacing: -0.02em;
          margin-bottom: 4px;
        }

        .brand-sub {
          font-size: 13px;
          font-weight: 400;
          color: #0a6b32;
          margin-bottom: 28px;
          letter-spacing: 0.01em;
        }

        /* card */
        .card {
          width: 100%;
          background: rgb(255, 255, 255);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px;
          padding: 32px 28px 28px;
          backdrop-filter: blur(20px);
          box-shadow: 0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(139,92,246,0.1) inset;
        }

        .card-title {
          font-size: 18px;
          font-weight: 700;
          color: #086b40;
          margin-bottom: 4px;
        }
        .card-sub {
          font-size: 12.5px;
          color: #0a603e;
          margin-bottom: 24px;
          font-weight: 400;
        }

        .field { margin-bottom: 16px; }
        .field-label {
          display: block;
          font-size: 12px;
          font-weight: 600;
          color: #054b25;
          margin-bottom: 8px;
          letter-spacing: 0.02em;
        }
        .input-wrap {
          display: flex; align-items: center; gap: 10px;
          background: rgba(5, 91, 15, 0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          padding: 0 14px; height: 50px;
          transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
        }
        .input-wrap:focus-within {
          border-color: rgba(5, 89, 24, 0.6);
          background: rgba(11, 105, 42, 0.06);
          box-shadow: 0 0 0 3px rgba(10, 121, 34, 0.12);
        }
        .input-wrap svg { color: rgba(20, 104, 33, 0.5); font-size: 13px; flex-shrink:0; }
        .input-wrap input {
          background: none; border: none; outline: none;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 14px; font-weight: 400;
          color: #090c0fdc; width: 100%;
        }
        .input-wrap input::placeholder { color: rgb(6, 77, 30); }
        .eye-btn {
          background: none; border: none; cursor: pointer;
          color: rgba(8, 92, 24, 0.5); display: flex; padding: 0;
          transition: color 0.2s;
        }
        .eye-btn:hover { color: #096228; }

        .error-box {
          font-size: 12.5px; color: #750a0a;
          background: rgba(239,68,68,0.08);
          border: 1px solid rgba(239,68,68,0.2);
          border-radius: 10px; padding: 10px 14px;
          margin-bottom: 16px; text-align: center;
        }

        .sign-btn {
          width: 100%; height: 50px; margin-top: 4px;
          background: linear-gradient(135deg, #0a6e20 0%, #07601d 100%);
          border: none; border-radius: 12px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 15px; font-weight: 600;
          color: #fff; cursor: pointer;
          letter-spacing: 0.01em;
          transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s;
          box-shadow: 0 4px 20px rgba(7, 83, 33, 0.4);
        }
        .sign-btn:hover:not(:disabled) {
          opacity: 0.92;
          transform: translateY(-1px);
          box-shadow: 0 8px 28px rgba(4, 85, 9, 0.5);
        }
        .sign-btn:disabled { opacity: 0.5; cursor: not-allowed; }

        .dots { display:inline-flex; gap:5px; align-items:center; }
        .dots span { width:5px; height:5px; border-radius:50%; background:#fff; animation:db 1.1s ease-in-out infinite; }
        .dots span:nth-child(2){animation-delay:.18s}
        .dots span:nth-child(3){animation-delay:.36s}
        @keyframes db{0%,80%,100%{transform:scale(0.6);opacity:0.4}40%{transform:scale(1);opacity:1}}

        .forgot {
          display: block; text-align: center; margin-top: 16px;
          font-size: 13px; font-weight: 500;
          color: #044911; text-decoration: none;
          transition: color 0.2s;
        }
        .forgot:hover { color: #05630d; }

        .back-link {
          margin-top: 20px;
          font-size: 12px;
          color: rgba(5, 71, 28, 0.25);
          text-decoration: none;
          transition: color 0.2s;
          letter-spacing: 0.02em;
        }
        .back-link:hover { color: rgba(3, 50, 18, 0.6); }
      `}</style>

      <div className="root">
        <div className="wrapper">

          {/* Top brand */}
          <div className="brand-icon">
            <Image 
             src="/logo.png"   // public folder me logo.png rakho
             alt="Chandani Catering Logo"
               width={40}
             height={40}  />
           </div>
          <center><h1 className="brand-name">CHANDANI CATERING SERVICES</h1></center>
          <p className="brand-sub">Admin Login</p>

          {/* Card */}
          <div className="card">
            <p className="card-title">Welcome</p>

            <form onSubmit={handleSubmit}>
              <div className="field">
                <label className="field-label">Email </label>
                <div className="input-wrap">
                  <FaEnvelope />
                  <input
                    type="email" name="email"
                    placeholder="Enter your email"
                    value={form.email} onChange={handleChange}
                  />
                </div>
              </div>

              <div className="field">
                <label className="field-label">Password</label>
                <div className="input-wrap">
                  <FaLock />
                  <input
                    type={showPassword ? "text" : "password"} name="password"
                    placeholder="Enter your password"
                    value={form.password} onChange={handleChange}
                  />
                  <button type="button" className="eye-btn" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              {error && <div className="error-box">{error}</div>}

              <button type="submit" disabled={loading} className="sign-btn">
                {loading ? <span className="dots"><span/><span/><span/></span> : "Sign In"}
              </button>
            </form>

            <Link href="/" className="forgot">Forgot password?</Link>
          </div>

          <Link href="/" className="back-link">← Back to Home</Link>
        </div>
      </div>
    </>
  );
}