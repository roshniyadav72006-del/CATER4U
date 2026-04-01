"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function BookingSuccessPage() {
  const router = useRouter();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Jost:wght@300;400;500&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .success-page {
          min-height: 100vh;
          background-color: #F5F0DC;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Jost', sans-serif;
          overflow: hidden;
          position: relative;
        }

        /* Floating leaf particles */
        .leaf {
          position: absolute;
          width: 8px;
          height: 8px;
          border-radius: 50% 0 50% 0;
          opacity: 0;
          animation: floatLeaf linear infinite;
        }
        @keyframes floatLeaf {
          0%   { transform: translateY(110vh) rotate(0deg); opacity: 0; }
          10%  { opacity: 0.6; }
          90%  { opacity: 0.4; }
          100% { transform: translateY(-10vh) rotate(360deg); opacity: 0; }
        }

        /* Main card */
        .card {
          position: relative;
          z-index: 10;
          background: #fff;
          border-radius: 32px;
          padding: 10px 10px;
          max-width: 560px;
          width: 90%;
          text-align: center;
          box-shadow: 0 32px 80px rgba(45,80,22,0.12), 0 8px 24px rgba(45,80,22,0.08);
          opacity: 0;
          transform: translateY(40px) scale(0.96);
          transition: opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1);
        }
        .card.visible {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        /* Check circle */
        .check-wrap {
          width: 88px;
          height: 88px;
          border-radius: 50%;
          background: #2D5016;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
          opacity: 0;
          transform: scale(0.4);
          transition: opacity 0.5s 0.4s ease, transform 0.6s 0.4s cubic-bezier(0.34,1.56,0.64,1);
        }
        .card.visible .check-wrap {
          opacity: 1;
          transform: scale(1);
        }

        .checkmark path {
          stroke: #C9A84C;
          stroke-width: 3;
          stroke-linecap: round;
          stroke-linejoin: round;
          fill: none;
          stroke-dasharray: 60;
          stroke-dashoffset: 60;
          animation: drawCheck 0.6s 1s cubic-bezier(0.65,0,0.35,1) forwards;
        }
        @keyframes drawCheck {
          to { stroke-dashoffset: 0; }
        }

        /* Gold divider */
        .divider {
          width: 0;
          height: 2px;
          background: #C9A84C;
          border-radius: 2px;
          margin: 24px auto;
          transition: width 0.7s 0.8s cubic-bezier(0.22,1,0.36,1);
        }
        .card.visible .divider { width: 64px; }

        /* Text animations */
        .thank-you {
          font-family: 'Cormorant Garamond', serif;
          font-size: 3rem;
          font-weight: 600;
          color: #2D5016;
          line-height: 1.1;
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.6s 0.6s ease, transform 0.6s 0.6s ease;
        }
        .card.visible .thank-you { opacity: 1; transform: translateY(0); }

        .subtitle {
          font-size: 0.95rem;
          color: #7a7a6a;
          font-weight: 300;
          line-height: 1.7;
          margin-top: 12px;
          opacity: 0;
          transform: translateY(12px);
          transition: opacity 0.6s 0.85s ease, transform 0.6s 0.85s ease;
        }
        .card.visible .subtitle { opacity: 1; transform: translateY(0); }

        /* Confirmation badge */
        .badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #edf5e1;
          border: 1px solid #b5c4a1;
          border-radius: 100px;
          padding: 8px 20px;
          font-size: 0.82rem;
          color: #2D5016;
          font-weight: 500;
          margin-top: 28px;
          opacity: 0;
          transform: translateY(10px);
          transition: opacity 0.6s 1.05s ease, transform 0.6s 1.05s ease;
        }
        .card.visible .badge { opacity: 1; transform: translateY(0); }

        .badge-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #2D5016;
          animation: pulse 1.5s 1.5s ease-in-out infinite;
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50%       { transform: scale(1.4); opacity: 0.6; }
        }

        /* Home button */
        .home-btn {
          display: inline-block;
          margin-top: 36px;
          padding: 14px 44px;
          border-radius: 100px;
          background: #2D5016;
          color: #fff;
          font-family: 'Jost', sans-serif;
          font-size: 0.92rem;
          font-weight: 500;
          letter-spacing: 0.05em;
          cursor: pointer;
          border: none;
          opacity: 0;
          transform: translateY(10px);
          transition: opacity 0.6s 1.2s ease, transform 0.6s 1.2s ease, background 0.2s, box-shadow 0.2s;
        }
        .card.visible .home-btn { opacity: 1; transform: translateY(0); }
        .home-btn:hover {
          background: #22420c;
          box-shadow: 0 8px 24px rgba(45,80,22,0.25);
        }

        /* Corner decorations */
        .corner {
          position: absolute;
          width: 60px;
          height: 60px;
          opacity: 0.18;
        }
        .corner-tl { top: 20px; left: 20px; border-top: 2px solid #2D5016; border-left: 2px solid #2D5016; border-radius: 8px 0 0 0; }
        .corner-br { bottom: 20px; right: 20px; border-bottom: 2px solid #2D5016; border-right: 2px solid #2D5016; border-radius: 0 0 8px 0; }
      `}</style>

      <div className="success-page">
        {/* Floating leaves */}
        {[...Array(14)].map((_, i) => {
          const colors = ["#2D5016", "#C9A84C", "#5a8a2a", "#a07830"];
          const size = 6 + (i * 1.3) % 10;
          return (
            <div
              key={i}
              className="leaf"
              style={{
                left: `${(i * 7.3) % 100}%`,
                width: size,
                height: size,
                backgroundColor: colors[i % colors.length],
                animationDuration: `${5 + (i * 0.9) % 8}s`,
                animationDelay: `${(i * 0.45) % 6}s`,
              }}
            />
          );
        })}

        <div className={`card ${visible ? "visible" : ""}`}>
          <div className="corner corner-tl" />
          <div className="corner corner-br" />

          {/* Check circle */}
          <div className="check-wrap">
            <svg width="36" height="36" viewBox="0 0 36 36">
              <path d="M8 18 L15 25 L28 11" />
            </svg>
          </div>

          {/* Gold divider */}
          <div className="divider" />

          {/* Text */}
          <h1 className="thank-you">Thank You!</h1>
          <p className="subtitle">
            Your booking has been submitted successfully.<br />
            Our team will reach out to confirm your event details shortly.
          </p>

          {/* Status badge */}
          <div className="badge">
            <span className="badge-dot" />
            Awaiting Confirmation
          </div>

          {/* Return to Home button — user clicks manually */}
          <button className="home-btn" onClick={() => router.push("/")}>
            Return to Home
          </button>
        </div>
      </div>
    </>
  );
}