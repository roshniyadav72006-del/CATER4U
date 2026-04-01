"use client";

import { useState, useEffect } from "react";

export default function FeedbackForm() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [customService, setCustomService] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [recommend, setRecommend] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    comment: "",
  });

  useEffect(() => {
    setTimeout(() => setMounted(true), 80);
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const isFormValid =
    form.name && form.email && form.phone && form.service &&
    form.comment && rating > 0 && recommend &&
    (form.service !== "Other" || customService);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    if (!/^[6-9]\d{9}$/.test(form.phone)) {
      setPhoneError("Enter a valid 10-digit Indian number");
      return;
    }
    setPhoneError("");
    const finalService = form.service === "Other" ? customService : form.service;
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, service: finalService, rating, recommend }),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          setForm({ name: "", email: "", phone: "", service: "", comment: "" });
          setRating(0); setCustomService(""); setPhoneError(""); setRecommend("");
        }, 3500);
      }
    } catch (err) { console.error(err); }
  };

  const ratingLabels = ["", "Poor", "Fair", "Good", "Great", "Excellent"];

  return (
    <>
      <div className="fb-root">
        {/* Watermark leaves */}
        <div className="leaf-deco left">🌿</div>
        <div className="leaf-deco right">🌿</div>

        <div className="fb-inner" style={{ padding: "120px 1rem 4rem" }}>

          {/* ── Hero ── */}
          <div className={`anim d1 ${mounted ? "go" : ""}`}>
            <div className="hero">
              <div className="hero-icons">
                <span>🌿</span>
                <div className="hero-icon-chat">💬</div>
                <span>🌿</span>
              </div>
              <h1 className="heading">We Value Your Feedback</h1>
              <p className="hero-sub">
                Your opinion helps us serve you better. Share your experience with our pure vegetarian catering services.
              </p>
              <div className="hero-divider" />
            </div>
          </div>

          {/* ── Star Rating Section (above card) ── */}
          <div className={`anim d2 ${mounted ? "go" : ""}`} style={{ maxWidth: "720px", margin: "0 auto 1.5rem" }}>
            <div className="form-card" style={{ textAlign: "center", padding: "2rem 1.5rem 1.8rem" }}>
              <p className="rating-question">How would you rate your overall experience?</p>
              <div className="star-row">
                {[1,2,3,4,5].map((star) => {
                  const lit = star <= (hover || rating);
                  return (
                    <button
                      key={star} type="button"
                      className={`star-btn${lit ? " lit" : ""}`}
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHover(star)}
                      onMouseLeave={() => setHover(0)}
                    >☆</button>
                  );
                })}
              </div>
              {(hover || rating) ? (
                <div className="star-label">{ratingLabels[hover || rating]}</div>
              ) : (
                <div className="star-hint">Click to rate</div>
              )}
            </div>
          </div>

          {/* ── Main Form Card ── */}
          <div className={`anim d3 ${mounted ? "go" : ""}`} style={{ maxWidth: "720px", margin: "0 auto 1.5rem" }}>
            <div className="form-card">
              {submitted ? (
                <div className="success-box">
                  <div className="success-icon">🎉</div>
                  <div className="success-title">Thank You!</div>
                  <p className="success-sub">Your feedback has been submitted. We truly appreciate your time.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>

                  {/* Your Information */}
                  <h2 className="section-title">Your Information</h2>

                  {/* Name + Email */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <div>
                      <label className="field-label">Full Name <span className="req">*</span></label>
                      <input
                        type="text" name="name"
                        placeholder="Your name"
                        value={form.name} onChange={handleChange} required
                        className="fb-input"
                      />
                    </div>
                    <div>
                      <label className="field-label">Email Address <span className="req">*</span></label>
                      <input
                        type="email" name="email"
                        placeholder="your.email@example.com"
                        value={form.email} onChange={handleChange} required
                        className="fb-input"
                      />
                    </div>
                  </div>

                  {/* Phone + Service */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <div>
                      <label className="field-label">Phone Number</label>
                      <div className="phone-wrap">
                        <span className="phone-prefix">+91</span>
                        <input
                          type="tel" name="phone"
                          placeholder="9876543210"
                          value={form.phone}
                          onChange={(e) => { handleChange(e); setPhoneError(""); }}
                          required maxLength="10"
                          className={`fb-input${phoneError ? " has-error" : ""}`}
                        />
                      </div>
                      {phoneError && <p className="err-text">⚠ {phoneError}</p>}
                    </div>
                    <div>
                      <label className="field-label">Service Type <span className="req">*</span></label>
                      <div className="select-wrap">
                        <select
                          name="service" value={form.service}
                          onChange={handleChange} required
                          className="fb-input"
                        >
                          <option value="" disabled>Select service</option>
                          {["Wedding", "Birthday", "Corporate", "Other"].map(s => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                        <span className="select-chevron">▼</span>
                      </div>
                    </div>
                  </div>

                  {form.service === "Other" && (
                    <div>
                      <label className="field-label">Describe your event</label>
                      <input
                        type="text" placeholder="Describe your event…"
                        value={customService}
                        onChange={(e) => setCustomService(e.target.value)}
                        required className="fb-input"
                      />
                    </div>
                  )}

                  <div className="divider" />

                  {/* Your Feedback */}
                  <h2 className="section-title">Your Feedback</h2>

                  <div>
                    <label className="field-label">Tell us about your experience <span className="req">*</span></label>
                    <textarea
                      name="comment"
                      placeholder="Share your thoughts about the food quality, service, presentation, staff behavior, etc."
                      value={form.comment} onChange={handleChange}
                      required rows={5} maxLength={500}
                      className="fb-input" style={{ resize: "none" }}
                    />
                    <p className="char-count">{form.comment.length} / 500</p>
                  </div>

                  <div>
                    <label className="field-label">Would you recommend Chandani Caterer's to friends and family? <span className="req">*</span></label>
                    <div className="radio-group">
                      {[
                        { value: "yes", label: "Yes, Definitely!" },
                        { value: "maybe", label: "Maybe" },
                        { value: "no", label: "No" },
                      ].map(opt => (
                        <label key={opt.value} className="radio-label">
                          <input
                            type="radio" name="recommend"
                            value={opt.value}
                            checked={recommend === opt.value}
                            onChange={() => setRecommend(opt.value)}
                          />
                          <span className="radio-dot" />
                          {opt.label}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="divider" />

                  {/* Submit */}
                  <div>
                    <button
                      type="submit"
                      className={`btn-submit ${isFormValid ? "active" : "inactive"}`}
                      disabled={!isFormValid}
                    >
                      <span className="btn-icon">➤</span>
                      Submit Feedback
                    </button>
                    {!isFormValid && (
                      <p className="btn-hint">Please fill all fields before submitting</p>
                    )}
                  </div>

                </form>
              )}
            </div>
          </div>

          {/* ── Info Cards ── */}
          <div
            className={`anim d4 ${mounted ? "go" : ""}`}
            style={{
              maxWidth: "720px", margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
              gap: "1rem"
            }}
          >
            {[
              { icon: "🌿", title: "Improve Quality", desc: "Your feedback helps us maintain the highest standards in vegetarian catering" },
              { icon: "💬", title: "Better Service",  desc: "We listen to your suggestions to enhance our services and menu offerings" },
              { icon: "⭐", title: "Build Trust",     desc: "Honest reviews help other families make informed decisions for their events" },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="info-card">
                <div className="info-icon">{icon}</div>
                <div className="info-title">{title}</div>
                <p className="info-desc">{desc}</p>
              </div>
            ))}
          </div>

          {/* Footer */}
          <p style={{ textAlign: "center", color: "var(--dim)", fontSize: "15px", letterSpacing: "0.12em", textTransform: "uppercase", marginTop: "3rem" }}>
            Pure Vegetarian · Est. 2018 · Made with 💚
          </p>

        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; }

        :root {
          --bg:        #f0eed6;
          --bg2:       #ecebd0;
          --card:      #ffffff;
          --green:     #1e4d2b;
          --green-md:  #2d6a3f;
          --green-lt:  #4a7c59;
          --green-pale:#e8f0ea;
          --gold:      #d4a017;
          --gold-lt:   #e8c060;
          --text:      #1e4d2b;
          --card-text: #111111;
          --muted:     #6b7a6e;
          --dim:       #8a9a8e;
          --border:    #dde5d8;
          --border-f:  #4a7c59;
          --red:       #c0392b;
          --white:     #ffffff;
        }

        html, body { background: var(--bg); }

        .fb-root {
          font-family: 'Playfair Display', serif;
          font-style: normal;
          font-size: 18px;
          min-height: 100vh;
          background: var(--bg);
          color: var(--text);
          position: relative;
          overflow-x: hidden;
        }

        .leaf-deco {
          position: fixed;
          pointer-events: none;
          z-index: 0;
          opacity: 0.07;
          font-size: 220px;
          line-height: 1;
          user-select: none;
        }
        .leaf-deco.left  { left: -60px; top: 60px; transform: rotate(-20deg); }
        .leaf-deco.right { right: -60px; bottom: 80px; transform: rotate(20deg) scaleX(-1); }

        .fb-inner { position: relative; z-index: 2; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .anim { opacity: 0; }
        .anim.go { animation: fadeUp 0.65s cubic-bezier(.22,.68,0,1.1) forwards; }
        .d1 { animation-delay: 0.05s !important; }
        .d2 { animation-delay: 0.2s  !important; }
        .d3 { animation-delay: 0.35s !important; }
        .d4 { animation-delay: 0.5s  !important; }

        @keyframes starPop {
          0%   { transform: scale(1); }
          45%  { transform: scale(1.45) rotate(12deg); }
          100% { transform: scale(1) rotate(0deg); }
        }

        @keyframes successPop {
          0%   { opacity: 0; transform: scale(0.72) translateY(12px); }
          65%  { transform: scale(1.04) translateY(-2px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }

        .top-strip {
          background: var(--green);
          padding: 10px 0;
          text-align: center;
        }
        .top-strip-inner {
          display: flex; align-items: center; justify-content: center; gap: 12px;
        }
        .strip-logo {
          width: 36px; height: 36px; border-radius: 50%;
          background: rgba(255,255,255,0.15);
          border: 2px solid rgba(255,255,255,0.3);
          display: flex; align-items: center; justify-content: center;
          font-size: 1rem;
        }
        .strip-name {
          color: white; font-size: 1rem; font-weight: 600; letter-spacing: 0.08em;
          text-transform: uppercase; font-family: 'Playfair Display', serif;
        }

        .hero {
          text-align: center;
          padding: 3.5rem 1rem 2rem;
          position: relative;
        }
        .hero-icons {
          display: flex; align-items: center; justify-content: center; gap: 12px;
          margin-bottom: 1rem;
          font-size: 1.6rem;
        }
        .hero-icon-chat {
          width: 52px; height: 52px; border-radius: 14px;
          background: var(--gold);
          display: flex; align-items: center; justify-content: center;
          font-size: 1.5rem;
          box-shadow: 0 4px 16px rgba(212,160,23,0.35);
        }
        .heading {
          font-family: 'Playfair Display', serif;
          font-style: normal;
          font-size: clamp(2.4rem, 5.5vw, 3.8rem);
          font-weight: 700; line-height: 1.1;
          color: var(--green);
          margin-bottom: 0.9rem;
        }
        .hero-sub {
          color: var(--muted);
          font-size: 1.15rem; max-width: 480px;
          margin: 0 auto 1.2rem;
          line-height: 1.7;
          font-family: 'Playfair Display', serif;
          font-style: normal;
        }
        .hero-divider {
          width: 60px; height: 3px; border-radius: 99px;
          background: var(--green);
          margin: 0 auto;
        }

        /* ── Form card ── */
        .form-card {
          background: var(--card);
          border-radius: 24px;
          padding: 2.4rem 2rem;
          box-shadow: 0 4px 40px rgba(30,77,43,0.10), 0 1px 4px rgba(30,77,43,0.06);
          color: var(--card-text);
          font-style: normal;
        }

        /* All text inside form-card is black and non-italic */
        .form-card * {
          color: inherit;
          font-style: normal;
        }

        .section-title {
          font-family: 'Playfair Display', serif;
          font-style: normal;
          font-size: 1.6rem; font-weight: 600;
          color: #111111;
          margin-bottom: 1.2rem;
        }

        .field-label {
          display: block;
          font-family: 'Playfair Display', serif;
          font-style: normal;
          font-size: 1rem; font-weight: 600;
          color: #111111;
          margin-bottom: 7px;
        }
        .field-label .req { color: #111111; margin-left: 2px; }

        .fb-input {
          width: 100%;
          background: var(--white);
          border: 1.5px solid var(--border);
          border-radius: 12px;
          padding: 14px 16px;
          font-family: 'Playfair Display', serif;
          font-style: normal;
          font-size: 1rem;
          color: var(--card-text);
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          -webkit-appearance: none;
        }
        .fb-input::placeholder { color: #888; opacity: 1; font-style: normal; }
        .fb-input:focus {
          border-color: var(--border-f);
          box-shadow: 0 0 0 3px rgba(74,124,89,0.15);
        }
        .fb-input.has-error { border-color: var(--red); }
        .fb-input.has-error:focus { box-shadow: 0 0 0 3px rgba(192,57,43,0.15); }

        select.fb-input { cursor: pointer; }

        .select-wrap { position: relative; }
        .select-chevron {
          position: absolute; right: 14px; top: 50%; transform: translateY(-50%);
          color: var(--muted); font-size: 0.65rem; pointer-events: none;
        }

        .phone-wrap { position: relative; }
        .phone-prefix {
          position: absolute; left: 14px; top: 50%; transform: translateY(-50%);
          color: #111111; font-size: 0.88rem; font-weight: 600;
          pointer-events: none;
        }
        .phone-wrap .fb-input { padding-left: 44px; }

        .err-text { color: var(--red); font-size: 0.9rem; margin-top: 5px; font-family: 'Playfair Display', serif; font-style: normal; }

        .divider {
          height: 1px;
          background: var(--border);
          margin: 0.5rem 0;
        }

        .rating-question {
          font-family: 'Playfair Display', serif;
          font-style: normal;
          font-size: 1.3rem; font-weight: 600;
          color: #111111; text-align: center;
          margin-bottom: 1rem;
        }
        .star-row { display: flex; justify-content: center; gap: 10px; }
        .star-btn {
          background: none; border: none; cursor: pointer;
          font-size: 2.2rem; line-height: 1; padding: 4px;
          color: #d0cfc8;
          transition: color 0.12s, filter 0.12s, transform 0.12s;
        }
        .star-btn.lit {
          color: var(--gold);
          filter: drop-shadow(0 0 5px rgba(212,160,23,0.5));
          animation: starPop 0.25s ease;
        }
        .star-btn:hover:not(.lit) { color: var(--gold-lt); transform: scale(1.15); }
        .star-label {
          text-align: center; font-size: 1rem; font-weight: 600;
          color: var(--gold); letter-spacing: 0.05em;
          min-height: 1.2em; margin-top: 8px;
          font-family: 'Playfair Display', serif;
          font-style: normal;
        }
        .star-hint {
          text-align: center; font-size: 0.95rem;
          color: var(--dim); margin-top: 6px;
          font-family: 'Playfair Display', serif;
          font-style: normal;
        }

        .radio-group { display: flex; gap: 1.2rem; flex-wrap: wrap; margin-top: 4px; }
        .radio-label {
          display: flex; align-items: center; gap: 8px;
          cursor: pointer; font-size: 1rem; color: #111111;
          font-family: 'Playfair Display', serif;
          font-style: normal;
          font-weight: 500;
        }
        .radio-label input[type="radio"] { display: none; }
        .radio-dot {
          width: 20px; height: 20px; border-radius: 50%;
          border: 2px solid var(--border);
          background: white;
          display: flex; align-items: center; justify-content: center;
          transition: border-color 0.2s, background 0.2s;
          flex-shrink: 0;
        }
        .radio-label input[type="radio"]:checked + .radio-dot {
          border-color: var(--green);
          background: var(--green);
        }
        .radio-label input[type="radio"]:checked + .radio-dot::after {
          content: '';
          width: 7px; height: 7px; border-radius: 50%;
          background: white;
        }

        .char-count { text-align: right; font-size: 0.85rem; color: var(--dim); margin-top: 5px; font-family: 'Playfair Display', serif; font-style: normal; }

        .btn-submit {
          width: auto; padding: 15px 40px; border-radius: 12px; border: none;
          font-family: 'Playfair Display', serif; font-style: normal; font-size: 1.05rem;
          font-weight: 600; letter-spacing: 0.04em; cursor: pointer;
          display: flex; align-items: center; gap: 10px; justify-content: center;
          margin: 0 auto;
          transition: transform 0.2s, box-shadow 0.2s, opacity 0.2s;
          min-width: 240px;
        }
        .btn-submit.active {
          background: var(--green-md);
          color: white;
          box-shadow: 0 6px 24px rgba(30,77,43,0.28);
        }
        .btn-submit.active:hover  { transform: translateY(-2px); box-shadow: 0 10px 32px rgba(30,77,43,0.36); }
        .btn-submit.active:active { transform: scale(0.98); }
        .btn-submit.inactive {
          background: var(--border);
          color: var(--dim); cursor: not-allowed;
        }
        .btn-icon { font-size: 1rem; }
        .btn-hint { text-align: center; font-size: 0.9rem; color: var(--dim); margin-top: 8px; font-family: 'Playfair Display', serif; font-style: normal; }

        .success-box {
          animation: successPop 0.55s cubic-bezier(.22,.68,0,1.2) forwards;
          display: flex; flex-direction: column; align-items: center;
          justify-content: center; padding: 4rem 2rem; gap: 14px; text-align: center;
        }
        .success-icon {
          width: 80px; height: 80px; border-radius: 50%;
          background: var(--green-pale);
          border: 2px solid rgba(30,77,43,0.25);
          display: flex; align-items: center; justify-content: center;
          font-size: 2.5rem;
        }
        .success-title {
          font-family: 'Playfair Display', serif;
          font-style: normal;
          font-size: 1.8rem; font-weight: 700; color: var(--green);
        }
        .success-sub { color: var(--muted); font-size: 0.88rem; max-width: 260px; line-height: 1.7; font-style: normal; }

        .info-card {
          background: var(--card);
          border: 1.5px solid var(--border);
          border-radius: 18px; padding: 1.6rem;
          text-align: center;
          transition: transform 0.3s cubic-bezier(.22,.68,0,1.2), box-shadow 0.3s, border-color 0.3s;
        }
        .info-card:hover {
          transform: translateY(-6px);
          border-color: rgba(30,77,43,0.25);
          box-shadow: 0 12px 36px rgba(30,77,43,0.10);
        }
        .info-icon {
          width: 52px; height: 52px; border-radius: 50%;
          background: var(--green-pale);
          border: 1.5px solid rgba(74,124,89,0.2);
          display: flex; align-items: center; justify-content: center;
          font-size: 1.4rem; margin: 0 auto 12px;
        }
        .info-title {
          font-family: 'Playfair Display', serif;
          font-style: normal;
          font-size: 1.2rem; font-weight: 600;
          color: var(--green); margin-bottom: 8px;
        }
        .info-desc { color: var(--muted); font-size: 0.95rem; line-height: 1.65; font-family: 'Playfair Display', serif; font-style: normal; }

        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: var(--bg); }
        ::-webkit-scrollbar-thumb { background: var(--green-lt); border-radius: 99px; }
      `}</style>
    </>
  );
}