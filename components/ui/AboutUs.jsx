"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

// ── Stats Data ────────────────────────────────────────────────────────────────
const stats = [
  { number: "500+", label: "Events Catered", icon: "🎉" },
  { number: "50K+", label: "Happy Guests", icon: "😊" },
  { number: "4.9★", label: "Average Rating", icon: "⭐" },
  { number: "8+", label: "Years Experience", icon: "🏆" },
];

// ── Why Choose Us ─────────────────────────────────────────────────────────────
const features = [
  {
    icon: "👨‍🍳",
    title: "Expert Chefs",
    desc: "Our team of professional chefs brings decades of culinary expertise, crafting menus that delight every palate.",
  },
  {
    icon: "🌿",
    title: "Fresh Ingredients",
    desc: "We source only the freshest, locally-grown ingredients daily — because great food starts with great produce.",
  },
  {
    icon: "🎯",
    title: "Tailored Menus",
    desc: "Every event is unique. We customize menus to match your theme, dietary needs, and personal preferences.",
  },
  {
    icon: "⚡",
    title: "Flawless Execution",
    desc: "From setup to service, our trained staff ensures every detail is perfect so you can enjoy your event stress-free.",
  },
];

// ── Gallery Images (using Unsplash) ──────────────────────────────────────────
const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1555244162-803834f70033?w=800&q=85&fit=crop",
    label: "Grand Buffet",
    span: "col-span-2 row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&q=85&fit=crop",
    label: "Gourmet Starters",
    span: "",
  },
  {
    src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=85&fit=crop",
    label: "Fine Dining Setup",
    span: "",
  },
  {
    src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=85&fit=crop",
    label: "Chef's Special",
    span: "",
  },
  {
    src: "https://images.unsplash.com/photo-1571805529673-0f56b922b359?w=600&q=85&fit=crop",
    label: "Wedding Spread",
    span: "",
  },
];

// ── Testimonials ──────────────────────────────────────────────────────────────
const testimonials = [
  {
    name: "Priya Sharma",
    role: "Bride, Mumbai",
    avatar: "P",
    color: "#8b5cf6",
    text: "CATER4U made our wedding unforgettable. Every dish was absolutely divine and the presentation was breathtaking. Our guests are still talking about the food!",
  },
  {
    name: "Rahul Mehta",
    role: "Corporate Event Manager",
    avatar: "R",
    color: "#6366f1",
    text: "We've partnered with CATER4U for all our corporate events. Their professionalism, punctuality, and quality are unmatched. Highly recommended!",
  },
  {
    name: "Sneha Patel",
    role: "Birthday Celebration, Pune",
    avatar: "S",
    color: "#a78bfa",
    text: "The live counter setup was a huge hit! Everyone loved the fresh, hot food. CATER4U truly goes above and beyond expectations every single time.",
  },
];

// ── Fade In Animation Wrapper ─────────────────────────────────────────────────
function FadeIn({ children, delay = 0, direction = "up" }) {
  const variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 30 : direction === "down" ? -30 : 0,
      x: direction === "left" ? 30 : direction === "right" ? -30 : 0,
    },
    visible: { opacity: 1, y: 0, x: 0 },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function AboutUs() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setActiveTestimonial((p) => (p + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", background: "#fff", overflow: "hidden" }}>
      <style>{css}</style>

      {/* ══════════════════════════════════════════════════════
          SECTION 1 — HERO INTRO
      ══════════════════════════════════════════════════════ */}
      <section style={{
        background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 60%, #0f172a 100%)",
        padding: "100px 24px 80px",
        position: "relative", overflow: "hidden",
      }}>
        {/* Glow orbs */}
        <div style={{ position: "absolute", top: "-100px", left: "-80px", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.2), transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-80px", right: "-60px", width: "350px", height: "350px", borderRadius: "50%", background: "radial-gradient(circle, rgba(139,92,246,0.15), transparent 70%)", pointerEvents: "none" }} />

        <div style={{ maxWidth: "780px", margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
          <FadeIn>
            <span style={{
              display: "inline-block", padding: "6px 18px", borderRadius: "99px",
              background: "rgba(139,92,246,0.2)", border: "1px solid rgba(139,92,246,0.35)",
              fontSize: "12px", fontWeight: 700, color: "#a78bfa",
              letterSpacing: "1.2px", textTransform: "uppercase", marginBottom: "20px",
            }}>
              🍽️ Our Story
            </span>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h1 style={{ fontSize: "clamp(36px, 6vw, 60px)", fontWeight: 900, color: "#fff", margin: "0 0 20px", letterSpacing: "-1px", lineHeight: 1.1 }}>
              We Don't Just Cook —{" "}
              <span style={{
                background: "linear-gradient(90deg, #a78bfa, #6366f1)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>
                We Create Memories
              </span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p style={{ fontSize: "17px", color: "rgba(255,255,255,0.6)", lineHeight: 1.8, maxWidth: "600px", margin: "0 auto 40px" }}>
              Born from a passion for authentic flavors and flawless hospitality, <strong style={{ color: "rgba(255,255,255,0.85)" }}>CATER4U</strong> has been transforming ordinary events into extraordinary experiences since 2016.
            </p>
          </FadeIn>

          {/* Stats row */}
          <FadeIn delay={0.3}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "16px" }} className="stats-grid">
              {stats.map(({ number, label, icon }) => (
                <div key={label} style={{
                  padding: "20px 12px",
                  background: "rgba(255,255,255,0.06)",
                  backdropFilter: "blur(12px)",
                  borderRadius: "16px",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}>
                  <div style={{ fontSize: "22px", marginBottom: "6px" }}>{icon}</div>
                  <div style={{ fontSize: "26px", fontWeight: 900, color: "#fff", lineHeight: 1 }}>{number}</div>
                  <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.45)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.6px", marginTop: "4px" }}>{label}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 2 — PHOTO GALLERY GRID
      ══════════════════════════════════════════════════════ */}
      <section style={{ padding: "80px 24px", background: "#fafafa" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
              <span style={{ fontSize: "12px", fontWeight: 700, color: "#8b5cf6", letterSpacing: "1.2px", textTransform: "uppercase" }}>Our Work</span>
              <h2 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 900, color: "#0f172a", margin: "8px 0 12px", letterSpacing: "-0.5px" }}>
                A Feast for the Eyes
              </h2>
              <p style={{ color: "#64748b", fontSize: "15px", maxWidth: "480px", margin: "0 auto" }}>
                Every dish is a masterpiece. Every presentation, a work of art.
              </p>
            </div>
          </FadeIn>

          {/* Masonry-style grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gridTemplateRows: "auto",
            gap: "16px",
          }} className="gallery-grid">

            {/* Large image — top left */}
            <FadeIn delay={0} direction="right">
              <div style={{ gridColumn: "1", gridRow: "1 / 3", position: "relative", borderRadius: "20px", overflow: "hidden", height: "360px" }} className="gallery-item">
                <img src={galleryImages[0].src} alt={galleryImages[0].label} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }} className="gallery-img" />
                <div className="gallery-overlay">
                  <span style={{ color: "#fff", fontWeight: 700, fontSize: "14px" }}>{galleryImages[0].label}</span>
                </div>
              </div>
            </FadeIn>

            {/* Top middle */}
            <FadeIn delay={0.1}>
              <div style={{ position: "relative", borderRadius: "20px", overflow: "hidden", height: "170px" }} className="gallery-item">
                <img src={galleryImages[1].src} alt={galleryImages[1].label} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }} className="gallery-img" />
                <div className="gallery-overlay">
                  <span style={{ color: "#fff", fontWeight: 700, fontSize: "14px" }}>{galleryImages[1].label}</span>
                </div>
              </div>
            </FadeIn>

            {/* Top right */}
            <FadeIn delay={0.15}>
              <div style={{ position: "relative", borderRadius: "20px", overflow: "hidden", height: "170px" }} className="gallery-item">
                <img src={galleryImages[2].src} alt={galleryImages[2].label} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }} className="gallery-img" />
                <div className="gallery-overlay">
                  <span style={{ color: "#fff", fontWeight: 700, fontSize: "14px" }}>{galleryImages[2].label}</span>
                </div>
              </div>
            </FadeIn>

            {/* Bottom middle */}
            <FadeIn delay={0.2}>
              <div style={{ position: "relative", borderRadius: "20px", overflow: "hidden", height: "170px" }} className="gallery-item">
                <img src={galleryImages[3].src} alt={galleryImages[3].label} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }} className="gallery-img" />
                <div className="gallery-overlay">
                  <span style={{ color: "#fff", fontWeight: 700, fontSize: "14px" }}>{galleryImages[3].label}</span>
                </div>
              </div>
            </FadeIn>

            {/* Bottom right */}
            <FadeIn delay={0.25}>
              <div style={{ position: "relative", borderRadius: "20px", overflow: "hidden", height: "170px" }} className="gallery-item">
                <img src={galleryImages[4].src} alt={galleryImages[4].label} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }} className="gallery-img" />
                <div className="gallery-overlay">
                  <span style={{ color: "#fff", fontWeight: 700, fontSize: "14px" }}>{galleryImages[4].label}</span>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 3 — WHY CHOOSE US
      ══════════════════════════════════════════════════════ */}
      <section style={{ padding: "80px 24px", background: "#fff" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "center" }} className="why-grid">

            {/* Left: text */}
            <div>
              <FadeIn direction="right">
                <span style={{ fontSize: "12px", fontWeight: 700, color: "#8b5cf6", letterSpacing: "1.2px", textTransform: "uppercase" }}>Why CATER4U</span>
                <h2 style={{ fontSize: "clamp(28px, 3.5vw, 40px)", fontWeight: 900, color: "#0f172a", margin: "10px 0 16px", letterSpacing: "-0.5px", lineHeight: 1.2 }}>
                  Taste the Difference.<br />Feel the Excellence.
                </h2>
                <p style={{ color: "#64748b", fontSize: "15px", lineHeight: 1.8, marginBottom: "32px" }}>
                  We believe great catering is about more than food — it's about creating moments that stay in your heart forever. Here's what sets us apart.
                </p>
              </FadeIn>

              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                {features.map((f, i) => (
                  <FadeIn key={f.title} delay={i * 0.08} direction="right">
                    <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }} className="feature-card">
                      <div style={{
                        width: "48px", height: "48px", borderRadius: "14px", flexShrink: 0,
                        background: "linear-gradient(135deg, rgba(99,102,241,0.12), rgba(139,92,246,0.08))",
                        border: "1px solid rgba(139,92,246,0.2)",
                        display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px",
                      }}>
                        {f.icon}
                      </div>
                      <div>
                        <h4 style={{ margin: "0 0 4px", fontSize: "15px", fontWeight: 800, color: "#0f172a" }}>{f.title}</h4>
                        <p style={{ margin: 0, fontSize: "13px", color: "#64748b", lineHeight: 1.7 }}>{f.desc}</p>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>

            {/* Right: image with badge overlay */}
            <FadeIn direction="left" delay={0.1}>
              <div style={{ position: "relative" }}>
                <div style={{ borderRadius: "24px", overflow: "hidden", boxShadow: "0 30px 80px rgba(0,0,0,0.15)" }}>
                  <img
                    src="https://images.unsplash.com/photo-1551218808-94e220e084d2?w=700&q=85&fit=crop"
                    alt="Our chef at work"
                    style={{ width: "100%", height: "480px", objectFit: "cover", display: "block" }}
                  />
                </div>

                {/* Floating badge */}
                <div style={{
                  position: "absolute", bottom: "-20px", left: "-20px",
                  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                  borderRadius: "20px", padding: "20px 24px",
                  boxShadow: "0 12px 40px rgba(99,102,241,0.4)",
                  color: "#fff",
                }}>
                  <div style={{ fontSize: "32px", fontWeight: 900, lineHeight: 1 }}>8+</div>
                  <div style={{ fontSize: "12px", fontWeight: 600, opacity: 0.85, marginTop: "4px" }}>Years of Culinary<br />Excellence</div>
                </div>

                {/* Top right badge */}
                <div style={{
                  position: "absolute", top: "20px", right: "-16px",
                  background: "#fff", borderRadius: "14px",
                  padding: "12px 16px",
                  boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
                  display: "flex", alignItems: "center", gap: "10px",
                }}>
                  <div style={{ fontSize: "24px" }}>⭐</div>
                  <div>
                    <div style={{ fontSize: "16px", fontWeight: 900, color: "#0f172a", lineHeight: 1 }}>4.9/5</div>
                    <div style={{ fontSize: "11px", color: "#64748b", fontWeight: 600 }}>Customer Rating</div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 4 — TESTIMONIALS
      ══════════════════════════════════════════════════════ */}
      <section style={{
        padding: "80px 24px",
        background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 60%, #0f172a 100%)",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 50%, rgba(99,102,241,0.1), transparent 70%)", pointerEvents: "none" }} />

        <div style={{ maxWidth: "720px", margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
          <FadeIn>
            <span style={{ fontSize: "12px", fontWeight: 700, color: "#a78bfa", letterSpacing: "1.2px", textTransform: "uppercase" }}>Testimonials</span>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 900, color: "#fff", margin: "10px 0 48px", letterSpacing: "-0.5px" }}>
              What Our Clients Say
            </h2>
          </FadeIn>

          {/* Testimonial card */}
          <div style={{ position: "relative", minHeight: "200px" }}>
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: i === activeTestimonial ? 1 : 0, y: i === activeTestimonial ? 0 : 20 }}
                transition={{ duration: 0.5 }}
                style={{
                  position: i === 0 ? "relative" : "absolute",
                  top: 0, left: 0, right: 0,
                  background: "rgba(255,255,255,0.07)",
                  backdropFilter: "blur(20px)",
                  borderRadius: "24px",
                  border: "1px solid rgba(255,255,255,0.12)",
                  padding: "36px 40px",
                  pointerEvents: i === activeTestimonial ? "auto" : "none",
                }}
              >
                <p style={{ fontSize: "17px", color: "rgba(255,255,255,0.8)", lineHeight: 1.8, marginBottom: "28px", fontStyle: "italic" }}>
                  "{t.text}"
                </p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px" }}>
                  <div style={{
                    width: "44px", height: "44px", borderRadius: "50%",
                    background: `linear-gradient(135deg, ${t.color}, ${t.color}88)`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "18px", fontWeight: 800, color: "#fff",
                  }}>{t.avatar}</div>
                  <div style={{ textAlign: "left" }}>
                    <div style={{ fontSize: "14px", fontWeight: 800, color: "#fff" }}>{t.name}</div>
                    <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)" }}>{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Dots */}
          <div style={{ display: "flex", gap: "8px", justifyContent: "center", marginTop: "28px" }}>
            {testimonials.map((_, i) => (
              <button key={i} onClick={() => setActiveTestimonial(i)} style={{
                width: i === activeTestimonial ? "24px" : "8px",
                height: "8px", borderRadius: "99px", border: "none",
                background: i === activeTestimonial ? "#8b5cf6" : "rgba(255,255,255,0.25)",
                cursor: "pointer", transition: "all 0.3s ease", padding: 0,
              }} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 5 — CTA BANNER
      ══════════════════════════════════════════════════════ */}
      <section style={{ padding: "80px 24px", background: "#fff" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          <FadeIn>
            <div style={{
              background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
              borderRadius: "28px",
              padding: "56px 48px",
              textAlign: "center",
              position: "relative", overflow: "hidden",
              boxShadow: "0 24px 80px rgba(99,102,241,0.35)",
            }}>
              {/* Background pattern */}
              <div style={{ position: "absolute", top: "-60px", right: "-60px", width: "240px", height: "240px", borderRadius: "50%", background: "rgba(255,255,255,0.08)", pointerEvents: "none" }} />
              <div style={{ position: "absolute", bottom: "-40px", left: "-40px", width: "180px", height: "180px", borderRadius: "50%", background: "rgba(255,255,255,0.06)", pointerEvents: "none" }} />

              <div style={{ position: "relative", zIndex: 1 }}>
                <div style={{ fontSize: "40px", marginBottom: "16px" }}>🎊</div>
                <h2 style={{ fontSize: "clamp(26px, 4vw, 38px)", fontWeight: 900, color: "#fff", margin: "0 0 14px", letterSpacing: "-0.5px" }}>
                  Ready to Make Your Event Unforgettable?
                </h2>
                <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "16px", maxWidth: "500px", margin: "0 auto 32px", lineHeight: 1.7 }}>
                  Let's plan the perfect menu together. Our team is ready to bring your vision to life.
                </p>
                <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
                  <a href="/contact" style={{
                    padding: "14px 32px", borderRadius: "12px", background: "#fff",
                    color: "#6366f1", fontWeight: 800, fontSize: "15px", textDecoration: "none",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                    transition: "transform 0.2s ease",
                  }} className="cta-btn-primary">
                    Book a Consultation
                  </a>
                  <a href="/menu" style={{
                    padding: "14px 32px", borderRadius: "12px",
                    background: "rgba(255,255,255,0.15)",
                    border: "2px solid rgba(255,255,255,0.4)",
                    color: "#fff", fontWeight: 800, fontSize: "15px", textDecoration: "none",
                    transition: "all 0.2s ease",
                  }} className="cta-btn-secondary">
                    View Our Menu →
                  </a>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
  * { box-sizing: border-box; }

  .gallery-item { cursor: pointer; }
  .gallery-item:hover .gallery-img { transform: scale(1.06); }
  .gallery-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(to top, rgba(0,0,0,0.6), transparent 50%);
    display: flex; align-items: flex-end; padding: 16px;
    opacity: 0; transition: opacity 0.3s ease;
  }
  .gallery-item:hover .gallery-overlay { opacity: 1; }

  .cta-btn-primary:hover { transform: translateY(-2px) scale(1.02); }
  .cta-btn-secondary:hover { background: rgba(255,255,255,0.22) !important; }

  @media (max-width: 768px) {
    .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
    .why-grid { grid-template-columns: 1fr !important; }
    .gallery-grid { grid-template-columns: 1fr 1fr !important; }
  }

  @media (max-width: 480px) {
    .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
    .gallery-grid { grid-template-columns: 1fr !important; }
  }
`;