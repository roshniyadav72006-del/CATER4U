import Link from "next/link";
import { Facebook, Instagram, Twitter, Linkedin, MapPin, Phone, Mail, ArrowUpRight, ChefHat } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{
      background: "linear-gradient(160deg, #0f172a 0%, #1e1b4b 60%, #0f172a 100%)",
      color: "#e2e8f0",
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      position: "relative",
      overflow: "hidden",
      marginTop: "64px",
    }}>
      <style>{css}</style>

      {/* Background glow orbs */}
      <div style={{
        position: "absolute", top: "-80px", left: "-60px",
        width: "320px", height: "320px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(99,102,241,0.12), transparent 70%)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: "-60px", right: "-40px",
        width: "280px", height: "280px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(139,92,246,0.1), transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* Top accent stripe */}
      <div style={{
        height: "3px",
        background: "linear-gradient(90deg, #6366f1, #8b5cf6, #a78bfa, #8b5cf6, #6366f1)",
        backgroundSize: "200% 100%",
        animation: "shimmer 4s linear infinite",
      }} />

      {/* Main Grid */}
      <div style={{
        maxWidth: "1200px", margin: "0 auto",
        padding: "56px 32px 40px",
        display: "grid",
        gridTemplateColumns: "1.8fr 1fr 1fr 1.4fr",
        gap: "40px",
      }} className="footer-grid">

        {/* ── Brand Column ── */}
        <div>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
            <div style={{
              width: "42px", height: "42px", borderRadius: "12px",
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.15)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <ChefHat size={22} color="#a78bfa" />
            </div>
            <span style={{ fontSize: "22px", fontWeight: 900, color: "#fff", letterSpacing: "-0.5px" }}>
              CATER4U
            </span>
          </div>

          <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)", lineHeight: 1.7, marginBottom: "24px", maxWidth: "260px" }}>
            Premium catering for weddings, corporate events & every occasion. Bringing restaurant-quality food to your doorstep.
          </p>

          {/* Social icons */}
          <div style={{ display: "flex", gap: "10px" }}>
            {[
              { icon: <Facebook size={16} />, color: "#60a5fa", href: "#" },
              { icon: <Instagram size={16} />, color: "#f472b6", href: "#" },
              { icon: <Twitter size={16} />, color: "#38bdf8", href: "#" },
              { icon: <Linkedin size={16} />, color: "#818cf8", href: "#" },
            ].map(({ icon, color, href }, i) => (
              <a key={i} href={href} className="social-btn" style={{
                width: "38px", height: "38px", borderRadius: "10px",
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.12)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color, transition: "all 0.2s ease", textDecoration: "none",
              }}>
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* ── Quick Links ── */}
        <div>
          <h3 style={{ fontSize: "12px", fontWeight: 800, color: "rgba(255,255,255,0.4)", letterSpacing: "1.2px", textTransform: "uppercase", marginBottom: "20px", margin: "0 0 20px" }}>
            Navigation
          </h3>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
            {[
              { label: "Home", href: "/" },
              { label: "About Us", href: "/about" },
              { label: "Our Menu", href: "/menu" },
              { label: "Gallery", href: "/gallery" },
              { label: "Contact", href: "/contact" },
            ].map(({ label, href }) => (
              <li key={label}>
                <Link href={href} className="footer-link" style={{
                  fontSize: "14px", color: "rgba(255,255,255,0.55)", textDecoration: "none",
                  display: "flex", alignItems: "center", gap: "4px",
                  transition: "all 0.2s ease", fontWeight: 500,
                }}>
                  <span>{label}</span>
                  <ArrowUpRight size={12} style={{ opacity: 0, transition: "all 0.2s" }} className="link-arrow" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Services ── */}
        <div>
          <h3 style={{ fontSize: "12px", fontWeight: 800, color: "rgba(255,255,255,0.4)", letterSpacing: "1.2px", textTransform: "uppercase", marginBottom: "20px", margin: "0 0 20px" }}>
            Services
          </h3>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
            {["Wedding Catering", "Corporate Events", "Birthday Parties", "Live Counters", "Home Delivery"].map((s) => (
              <li key={s}>
                <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.55)", fontWeight: 500, display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#8b5cf6", display: "inline-block", flexShrink: 0 }} />
                  {s}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Contact + Newsletter ── */}
        <div>
          <h3 style={{ fontSize: "12px", fontWeight: 800, color: "rgba(255,255,255,0.4)", letterSpacing: "1.2px", textTransform: "uppercase", marginBottom: "20px", margin: "0 0 20px" }}>
            Get In Touch
          </h3>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "28px" }}>
            {[
              { icon: <Phone size={14} />, text: "+91 98765 43210" },
              { icon: <Mail size={14} />, text: "info@cater4u.com" },
              { icon: <MapPin size={14} />, text: "Mumbai, Maharashtra" },
            ].map(({ icon, text }) => (
              <div key={text} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{
                  width: "30px", height: "30px", borderRadius: "8px",
                  background: "rgba(139,92,246,0.15)",
                  border: "1px solid rgba(139,92,246,0.25)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#a78bfa", flexShrink: 0,
                }}>
                  {icon}
                </div>
                <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.6)" }}>{text}</span>
              </div>
            ))}
          </div>

          {/* Newsletter */}
          <div style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "14px", padding: "16px",
          }}>
            <p style={{ margin: "0 0 10px", fontSize: "12px", fontWeight: 700, color: "rgba(255,255,255,0.6)", textTransform: "uppercase", letterSpacing: "0.8px" }}>
              Stay Updated
            </p>
            <div style={{ display: "flex", gap: "8px" }}>
              <input
                type="email"
                placeholder="Your email"
                style={{
                  flex: 1, background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: "8px", padding: "8px 12px",
                  fontSize: "13px", color: "#fff", outline: "none",
                  fontFamily: "inherit",
                }}
                className="newsletter-input"
              />
              <button style={{
                padding: "8px 14px", borderRadius: "8px", border: "none",
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                color: "#fff", fontSize: "12px", fontWeight: 700,
                cursor: "pointer", whiteSpace: "nowrap",
                transition: "opacity 0.2s",
              }}
                className="newsletter-btn"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div style={{
        borderTop: "1px solid rgba(255,255,255,0.08)",
        maxWidth: "1200px", margin: "0 auto",
        padding: "20px 32px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        flexWrap: "wrap", gap: "12px",
      }}>
        <p style={{ margin: 0, fontSize: "12px", color: "rgba(255,255,255,0.35)" }}>
          © {year} <span style={{ color: "rgba(255,255,255,0.55)", fontWeight: 700 }}>CATER4U</span>. All rights reserved.
        </p>

        <div style={{ display: "flex", gap: "20px" }}>
          {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
            <Link key={item} href="#" style={{
              fontSize: "12px", color: "rgba(255,255,255,0.35)",
              textDecoration: "none", transition: "color 0.2s",
            }} className="bottom-link">
              {item}
            </Link>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#22c55e", animation: "pulse 2s infinite" }} />
          <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.35)" }}>All systems operational</span>
        </div>
      </div>
    </footer>
  );
}

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');

  @keyframes shimmer {
    0% { background-position: 200% center; }
    100% { background-position: -200% center; }
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(0.85); }
  }

  .social-btn:hover {
    transform: translateY(-3px) scale(1.1) !important;
    background: rgba(255,255,255,0.14) !important;
    border-color: rgba(255,255,255,0.25) !important;
  }

  .footer-link:hover {
    color: #fff !important;
    transform: translateX(4px);
  }

  .footer-link:hover .link-arrow {
    opacity: 1 !important;
    transform: translateX(2px) translateY(-2px);
  }

  .bottom-link:hover {
    color: rgba(255,255,255,0.7) !important;
  }

  .newsletter-input:focus {
    border-color: rgba(139,92,246,0.6) !important;
    box-shadow: 0 0 0 3px rgba(139,92,246,0.12);
  }

  .newsletter-input::placeholder { color: rgba(255,255,255,0.3); }

  .newsletter-btn:hover { opacity: 0.85; }

  @media (max-width: 900px) {
    .footer-grid {
      grid-template-columns: 1fr 1fr !important;
    }
  }

  @media (max-width: 560px) {
    .footer-grid {
      grid-template-columns: 1fr !important;
    }
  }
`;