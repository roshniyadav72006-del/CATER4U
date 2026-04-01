"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const C = {
  orange:     "#f65220",
  orangeDark: "#b93921",
  red:        "#ec0704",
  olive:      "#535b1c",
  oliveDark:  "#3d4415",
  oliveMid:   "#4a521a",
  golden:     "#f7c04c",
  goldenDark: "#d4a017",
  sand:       "#c4ae8b",
  amber:      "#d0822e",
  brown:      "#7e4421",
  darkBrown:  "#483b2d",
  cream:      "#fdf6ee",
  creamDark:  "#f5eddc",
  white:      "#ffffff",
};

const galleryImages = [
  { src: "/about1.jpeg", label: "Grand Buffet" },
  { src: "/about2.jpeg", label: "Gourmet Starters" },
  { src: "https://res.cloudinary.com/dpgubcyaq/image/upload/v1775018064/about3_xmt657.jpg",  label: "Fine Dining Setup" },
  { src: "/about4.jpg",  label: "Chef's Special" },
];
const chefImage = "https://res.cloudinary.com/dpgubcyaq/image/upload/v1775018064/about3_xmt657.jpg";

const stats = [
  { number: "500+", label: "Events Catered", icon: "🎉" },
  { number: "50K+", label: "Happy Guests",   icon: "😊" },
  { number: "4.9★", label: "Avg. Rating",    icon: "⭐" },
  { number: "8+",   label: "Years Exp.",     icon: "🏆" },
];

const features = [
  { icon: "👨‍🍳", title: "Expert Chefs",       desc: "Our professional chefs bring decades of culinary expertise, crafting menus that delight every palate." },
  { icon: "🌿", title: "Fresh Ingredients",  desc: "We source only the freshest, locally-grown ingredients daily — great food starts with great produce." },
  { icon: "🎯", title: "Tailored Menus",     desc: "Every event is unique. We customize menus to your theme, dietary needs, and personal preferences." },
  { icon: "⚡", title: "Flawless Execution", desc: "From setup to service, our trained staff ensures every detail is perfect so you enjoy stress-free." },
];

function FadeIn({ children, delay = 0, direction = "up" }) {
  const variants = {
    hidden:  { opacity: 0, y: direction==="up"?30:direction==="down"?-30:0, x: direction==="left"?30:direction==="right"?-30:0 },
    visible: { opacity: 1, y: 0, x: 0 },
  };
  return (
    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }} variants={variants}>
      {children}
    </motion.div>
  );
}

// Plain div StatCard — no motion.div so layout is never broken
// Bouncy cubic-bezier gives spring feel without Framer overhead
function StatCard({ number, label, icon }) {
  const [active, setActive] = useState(false);
  return (
    <div
      className="stat-card"
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onTouchStart={() => setActive(true)}
      onTouchEnd={() => setTimeout(() => setActive(false), 380)}
      style={{
        padding: "22px 12px",
        background: active ? "rgba(247,192,76,0.20)" : "rgba(253,246,238,0.08)",
        backdropFilter: "blur(12px)",
        borderRadius: "18px",
        border: active ? "1px solid rgba(247,192,76,0.65)" : "1px solid rgba(247,192,76,0.25)",
        cursor: "pointer",
        minWidth: 0,
        transform: active ? "translateY(-6px) scale(1.05)" : "translateY(0) scale(1)",
        boxShadow: active ? "0 14px 32px rgba(61,68,21,0.25)" : "none",
        transition: "transform 0.28s cubic-bezier(.34,1.56,.64,1), background 0.22s ease, border 0.22s ease, box-shadow 0.22s ease",
      }}
    >
      <div style={{ fontSize: "22px", marginBottom: "8px" }}>{icon}</div>
      <div style={{ fontSize: "26px", fontWeight: 900, color: C.golden, lineHeight: 1 }}>{number}</div>
      <div style={{ fontSize: "11px", color: "rgba(253,246,238,0.55)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.6px", marginTop: "5px" }}>{label}</div>
    </div>
  );
}

export default function AboutUs() {
  const [, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", background: C.cream, overflow: "hidden" }}>
      <style>{css}</style>

      {/* ══ SECTION 1 — HERO ══ */}
      <section className="hero-section" style={{
        background: `linear-gradient(140deg, ${C.oliveDark} 0%, ${C.oliveMid} 50%, ${C.oliveDark} 100%)`,
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ position:"absolute", top:"-100px", left:"-80px", width:"420px", height:"420px", borderRadius:"50%", background:"radial-gradient(circle, rgba(247,192,76,0.18), transparent 70%)", pointerEvents:"none" }} />
        <div style={{ position:"absolute", bottom:"-80px", right:"-60px", width:"360px", height:"360px", borderRadius:"50%", background:"radial-gradient(circle, rgba(247,192,76,0.12), transparent 70%)", pointerEvents:"none" }} />
        <div style={{ position:"absolute", top:0, left:0, right:0, height:"5px", background:`linear-gradient(90deg, ${C.golden}, ${C.goldenDark}, ${C.olive}, ${C.goldenDark}, ${C.golden})`, backgroundSize:"200% 100%", animation:"shimmer 4s linear infinite" }} />

        <div style={{ maxWidth:"800px", margin:"0 auto", padding:"0 16px",marginTop: "40px",textAlign:"center", textAlign:"center", position:"relative", zIndex:1  }}>
          

          <FadeIn delay={0.1}>
            <h1 style={{ fontSize:"clamp(30px,6vw,58px)", fontWeight:900, color:C.cream, margin:"0 0 20px", letterSpacing:"-1px", lineHeight:1.15 }}>
              We Don't Just Cook —{" "}
              <span style={{ color: C.golden }}>We Create Memories</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p style={{ fontSize:"16px", color:"rgba(253,246,238,0.7)", lineHeight:1.8, maxWidth:"600px", margin:"0 auto 44px" }}>
              Born from a passion for authentic flavors and flawless hospitality,{" "}
              <strong style={{ color:C.golden }}>Chandani Catering Services</strong> has been transforming ordinary events into extraordinary experiences since 2016.
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="stats-grid">
              {stats.map((s) => <StatCard key={s.label} {...s} />)}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ══ SECTION 2 — GALLERY ══ */}
      <section style={{ padding:"60px 20px", background:C.cream }}>
        <div style={{ maxWidth:"1100px", margin:"0 auto" }}>
          <FadeIn>
            <div style={{ textAlign:"center", marginBottom:"40px" }}>
              <span style={{ fontSize:"12px", fontWeight:700, color:C.olive, letterSpacing:"1.2px", textTransform:"uppercase" }}>Our Work</span>
              <h2 style={{ fontSize:"clamp(24px,4vw,42px)", fontWeight:900, color:C.oliveDark, margin:"8px 0 10px", letterSpacing:"-0.5px" }}>
                A Feast for the Eyes
              </h2>
              <p style={{ color:C.amber, fontSize:"15px", maxWidth:"480px", margin:"0 auto" }}>
                Every dish is a masterpiece. Every presentation, a work of art.
              </p>
            </div>
          </FadeIn>

          <div className="gallery-grid">
            <FadeIn delay={0} direction="right">
              <div className="gallery-item gallery-tall" style={{ position:"relative", borderRadius:"20px", overflow:"hidden" }}>
                <Image src={galleryImages[0].src} alt={galleryImages[0].label} fill sizes="600px" style={{ objectFit:"cover", transition:"transform 0.5s ease" }} className="gallery-img" />
                <div className="gallery-overlay"><span className="gallery-tag">{galleryImages[0].label}</span></div>
              </div>
            </FadeIn>

            <div className="gallery-right-col">
              <FadeIn delay={0.1}>
                <div className="gallery-item gallery-sm" style={{ position:"relative", borderRadius:"20px", overflow:"hidden" }}>
                  <Image src={galleryImages[1].src} alt={galleryImages[1].label} fill sizes="400px" style={{ objectFit:"cover", transition:"transform 0.5s ease" }} className="gallery-img" />
                  <div className="gallery-overlay"><span className="gallery-tag">{galleryImages[1].label}</span></div>
                </div>
              </FadeIn>
              <div className="gallery-bottom-row">
                <FadeIn delay={0.15}>
                  <div className="gallery-item gallery-sm" style={{ position:"relative", borderRadius:"20px", overflow:"hidden" }}>
                    <Image src={galleryImages[2].src} alt={galleryImages[2].label} fill sizes="300px" style={{ objectFit:"cover", transition:"transform 0.5s ease" }} className="gallery-img" />
                    <div className="gallery-overlay"><span className="gallery-tag">{galleryImages[2].label}</span></div>
                  </div>
                </FadeIn>
                <FadeIn delay={0.2}>
                  <div className="gallery-item gallery-sm" style={{ position:"relative", borderRadius:"20px", overflow:"hidden" }}>
                    <Image src={galleryImages[3].src} alt={galleryImages[3].label} fill sizes="300px" style={{ objectFit:"cover", transition:"transform 0.5s ease" }} className="gallery-img" />
                    <div className="gallery-overlay"><span className="gallery-tag">{galleryImages[3].label}</span></div>
                  </div>
                </FadeIn>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ SECTION 3 — WHY CHOOSE US ══ */}
      <section style={{ padding:"60px 20px", background:C.creamDark }}>
        <div style={{ maxWidth:"1100px", margin:"0 auto" }}>
          <div className="why-grid">

            <div>
              <FadeIn direction="right">
                <span style={{ fontSize:"12px", fontWeight:700, color:C.olive, letterSpacing:"1.2px", textTransform:"uppercase" }}>Why Choose Us</span>
                <h2 style={{ fontSize:"clamp(24px,3.5vw,40px)", fontWeight:900, color:C.oliveDark, margin:"10px 0 14px", letterSpacing:"-0.5px", lineHeight:1.2 }}>
                  Taste the Difference.<br />
                  <span style={{ color:C.goldenDark }}>Feel the Excellence.</span>
                </h2>
                <p style={{ color:C.darkBrown, fontSize:"15px", lineHeight:1.8, marginBottom:"24px" }}>
                  Great catering is about more than food — it's about moments that stay in your heart. Here's what sets us apart.
                </p>
              </FadeIn>

              <div style={{ display:"flex", flexDirection:"column", gap:"12px" }}>
                {features.map((f, i) => (
                  <FadeIn key={f.title} delay={i * 0.08} direction="right">
                    <div className="feature-card" style={{
                      display:"flex", gap:"12px", alignItems:"flex-start",
                      padding:"14px 16px", borderRadius:"16px",
                      background:C.cream, border:`1px solid rgba(83,91,28,0.15)`,
                      transition:"all 0.22s ease",
                      width:"100%", boxSizing:"border-box",
                    }}>
                      <div style={{
                        width:"44px", height:"44px", borderRadius:"13px", flexShrink:0,
                        background:`linear-gradient(135deg, rgba(83,91,28,0.12), rgba(247,192,76,0.15))`,
                        border:`1px solid rgba(83,91,28,0.2)`,
                        display:"flex", alignItems:"center", justifyContent:"center", fontSize:"20px",
                      }}>{f.icon}</div>
                      <div style={{ flex:1, minWidth:0 }}>
                        <h4 style={{ margin:"0 0 3px", fontSize:"14px", fontWeight:800, color:C.oliveDark }}>{f.title}</h4>
                        <p style={{ margin:0, color:C.darkBrown, lineHeight:1.65, fontSize:"13px", wordBreak:"break-word" }}>{f.desc}</p>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>

            {/* Right — chef image */}
            <FadeIn direction="left" delay={0.1}>
              <div className="chef-img-wrap" style={{ position:"relative" }}>
                <div style={{
                  borderRadius:"22px", overflow:"hidden",
                  boxShadow:`0 24px 60px rgba(61,68,21,0.22)`,
                  position:"relative", width:"100%", height:"460px",
                }}>
                  <Image
                    src={chefImage}
                    alt="Our team at work"
                    fill
                    sizes="(max-width:768px) 100vw, 50vw"
                    style={{ objectFit:"cover" }}
                    priority
                  />
                </div>

                {/* Bottom-left badge */}
                <div style={{
                  position:"absolute", bottom:"-16px", left:"-12px", zIndex:2,
                  background:`linear-gradient(135deg, ${C.olive}, ${C.oliveDark})`,
                  borderRadius:"18px", padding:"14px 12px", margin:"0 4px",
                  boxShadow:`0 10px 32px rgba(61,68,21,0.4)`,
                  color:C.cream,
                }}>
                  <div style={{ fontSize:"26px", fontWeight:900, lineHeight:1, color:C.golden }}>8+</div>
                  <div style={{ fontSize:"11px", fontWeight:600, opacity:0.9, marginTop:"3px" }}>Years of Culinary<br />Excellence</div>
                </div>

                {/* Top-right badge */}
                <div style={{
                  position:"absolute", top:"16px", right:"-10px", zIndex:2,
                  background:C.cream, borderRadius:"13px", padding:"10px 14px",
                  boxShadow:`0 6px 24px rgba(61,68,21,0.15)`,
                  display:"flex", alignItems:"center", gap:"8px",
                  border:`1px solid rgba(247,192,76,0.45)`,
                }}>
                  <div style={{ fontSize:"20px" }}>⭐</div>
                  <div>
                    <div style={{ fontSize:"15px", fontWeight:900, color:C.oliveDark, lineHeight:1 }}>4.9/5</div>
                    <div style={{ fontSize:"10px", color:C.olive, fontWeight:600 }}>Customer Rating</div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ══ SECTION 4 — CTA ══ */}
      <section style={{ padding:"60px 20px", background:C.cream }}>
        <div style={{ maxWidth:"880px", margin:"0 auto" }}>
          <FadeIn>
            <div className="cta-box" style={{
              background:`linear-gradient(135deg, ${C.oliveDark} 0%, ${C.olive} 100%)`,
              borderRadius:"24px", padding:"48px 40px",
              textAlign:"center", position:"relative", overflow:"hidden",
              boxShadow:`0 20px 60px rgba(61,68,21,0.35)`,
            }}>
              <div style={{ position:"absolute", top:"-60px", right:"-60px", width:"240px", height:"240px", borderRadius:"50%", background:"rgba(247,192,76,0.10)", pointerEvents:"none" }} />
              <div style={{ position:"absolute", bottom:"-40px", left:"-40px", width:"180px", height:"180px", borderRadius:"50%", background:"rgba(247,192,76,0.08)", pointerEvents:"none" }} />
              <div style={{ position:"absolute", top:0, left:0, right:0, height:"4px", background:`linear-gradient(90deg, ${C.golden}, ${C.goldenDark}, ${C.golden})`, backgroundSize:"200% 100%", animation:"shimmer 4s linear infinite", borderRadius:"24px 24px 0 0" }} />

              <div style={{ position:"relative", zIndex:1 }}>
                <div style={{ fontSize:"36px", marginBottom:"14px" }}>🎊</div>
                <h2 style={{ fontSize:"clamp(22px,4vw,36px)", fontWeight:900, color:C.golden, margin:"0 0 12px", letterSpacing:"-0.5px", lineHeight:1.2 }}>
                  Ready to Make Your Event Unforgettable?
                </h2>
                <p style={{ color:"rgba(253,246,238,0.78)", fontSize:"15px", maxWidth:"500px", margin:"0 auto 28px", lineHeight:1.7 }}>
                  Let's plan the perfect menu together. Our team is ready to bring your vision to life.
                </p>
                <div className="cta-buttons">
                  <a href="/contact" className="cta-primary" style={{
                    padding:"14px 28px", borderRadius:"12px", background:C.golden,
                    color:C.oliveDark, fontWeight:800, fontSize:"15px", textDecoration:"none",
                    boxShadow:"0 4px 20px rgba(0,0,0,0.15)", display:"inline-block", whiteSpace:"nowrap",
                  }}>Book a Consultation</a>
                  <a href="/menu" className="cta-secondary" style={{
                    padding:"14px 28px", borderRadius:"12px",
                    background:"rgba(253,246,238,0.10)",
                    border:`2px solid rgba(247,192,76,0.5)`,
                    color:C.golden, fontWeight:800, fontSize:"15px",
                    textDecoration:"none", display:"inline-block", whiteSpace:"nowrap",
                  }}>View Our Menu →</a>
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

  *, *::before, *::after { box-sizing: border-box; }
  html, body { overflow-x: hidden; max-width: 100vw; }

  @keyframes shimmer {
    0%   { background-position: 200% center; }
    100% { background-position: -200% center; }
  }

  /* ── Hero ── */
  .hero-section {
    padding: 110px 20px 70px;
  }
  @media (max-width: 768px) {
    .hero-section { padding: 80px 16px 50px; }
  }

  /* ── Stats ── */
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 14px;
  }
  @media (max-width: 640px) {
    .stats-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; }
  }

  /* ── Gallery ── */
  .gallery-grid {
    display: grid;
    grid-template-columns: 1.1fr 1fr;
    gap: 14px;
  }
  .gallery-tall { height: 400px; }
  .gallery-sm   { height: 185px; }
  .gallery-right-col { display: flex; flex-direction: column; gap: 14px; }
  .gallery-bottom-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }

  @media (max-width: 640px) {
    .gallery-grid { grid-template-columns: 1fr; }
    .gallery-tall { height: 220px; }
    .gallery-sm   { height: 170px; }
  }

  .gallery-item { cursor: pointer; }
  .gallery-item:hover .gallery-img { transform: scale(1.06); }
  .gallery-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(to top, rgba(61,68,21,0.75), transparent 55%);
    display: flex; align-items: flex-end; padding: 16px;
    opacity: 0; transition: opacity 0.3s ease;
  }
  .gallery-item:hover .gallery-overlay { opacity: 1; }
  .gallery-tag {
    color: #fdf6ee; font-weight: 700; font-size: 13px;
    background: rgba(83,91,28,0.9);
    padding: 4px 12px; border-radius: 99px;
  }

  /* ── Why grid ── */
  .why-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 52px;
    align-items: center;
  }
  @media (max-width: 768px) {
    .why-grid { grid-template-columns: 1fr; gap: 32px; }
  }

  /* ── Feature cards ── */
  .feature-card:hover {
    background: #fdf6ee !important;
    border-color: rgba(83,91,28,0.3) !important;
    transform: translateX(5px);
    box-shadow: 0 4px 20px rgba(61,68,21,0.10);
  }

  /* ── Chef image wrap ── */
  .chef-img-wrap { margin-bottom: 24px; }
  @media (max-width: 480px) {
    .chef-img-wrap { margin-top: 10px; margin-bottom: 32px; }
  }

  /* ── CTA ── */
  @media (max-width: 640px) {
    .cta-box { padding: 36px 20px !important; border-radius: 18px !important; }
  }

  .cta-buttons { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
  @media (max-width: 480px) {
    .cta-buttons { flex-direction: column; align-items: center; }
    .cta-buttons a { width: 100%; max-width: 280px; text-align: center; }
  }

  .cta-primary { transition: transform 0.2s ease; }
  .cta-primary:hover { transform: translateY(-2px) scale(1.02); }
  .cta-secondary { transition: all 0.2s ease; }
  .cta-secondary:hover { background: rgba(247,192,76,0.18) !important; }
`;