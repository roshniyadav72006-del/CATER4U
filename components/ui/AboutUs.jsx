"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

// ── COLOR PALETTE (from your Palette.txt + theme.png) ────────────────────────
const C = {
  orange:     "#f65220",
  orangeDark: "#b93921",
  red:        "#ec0704",
  olive:      "#535b1c",
  oliveDark:  "#3d4415",
  golden:     "#f7c04c",
  sand:       "#c4ae8b",
  amber:      "#d0822e",
  brown:      "#7e4421",
  darkBrown:  "#483b2d",
  cream:      "#fdf6ee",
  white:      "#ffffff",
};

// ── YOUR LOCAL IMAGES ─────────────────────────────────────────────────────────
// Replace with your actual image filenames if different
const galleryImages = [
  { src: "/about1.jpeg", label: "Grand Buffet" },
  { src: "/about2.jpeg", label: "Gourmet Starters" },
  { src: "/about3.jpg",  label: "Fine Dining Setup" },
  { src: "/about4.jpg",  label: "Chef's Special" },
];
const chefImage = "/about3.jpg"; // used in "Why Choose Us" section

// ── Stats ─────────────────────────────────────────────────────────────────────
const stats = [
  { number: "500+", label: "Events Catered", icon: "🎉" },
  { number: "50K+", label: "Happy Guests",   icon: "😊" },
  { number: "4.9★", label: "Avg. Rating",    icon: "⭐" },
  { number: "8+",   label: "Years Exp.",     icon: "🏆" },
];

// ── Features ──────────────────────────────────────────────────────────────────
const features = [
  { icon: "👨‍🍳", title: "Expert Chefs",       desc: "Our professional chefs bring decades of culinary expertise, crafting menus that delight every palate." },
  { icon: "🌿", title: "Fresh Ingredients",  desc: "We source only the freshest, locally-grown ingredients daily — great food starts with great produce." },
  { icon: "🎯", title: "Tailored Menus",     desc: "Every event is unique. We customize menus to your theme, dietary needs, and personal preferences." },
  { icon: "⚡", title: "Flawless Execution", desc: "From setup to service, our trained staff ensures every detail is perfect so you enjoy stress-free." },
];

// ── Testimonials ──────────────────────────────────────────────────────────────
const testimonials = [
  { name: "Priya Sharma",  role: "Bride, Mumbai",              avatar: "P", text: "Chandani Catering made our wedding unforgettable. Every dish was divine and the presentation breathtaking. Our guests are still talking about the food!" },
  { name: "Rahul Mehta",   role: "Corporate Event Manager",    avatar: "R", text: "We've partnered with Chandani Catering for all our corporate events. Their professionalism, punctuality, and quality are simply unmatched!" },
  { name: "Sneha Patel",   role: "Birthday Celebration, Pune", avatar: "S", text: "The live counter setup was a huge hit! Everyone loved the fresh, hot food. Chandani Catering truly goes above and beyond every single time." },
];

// ── FadeIn Wrapper ────────────────────────────────────────────────────────────
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

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────
export default function AboutUs() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActiveTestimonial(p => (p + 1) % testimonials.length), 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", background: C.cream, overflow: "hidden" }}>
      <style>{css}</style>

      {/* ══════════════════════════════════════════════════════
          SECTION 1 — HERO
      ══════════════════════════════════════════════════════ */}
      <section style={{
        background: `linear-gradient(140deg, ${C.darkBrown} 0%, ${C.brown} 55%, ${C.darkBrown} 100%)`,
        padding: "100px 24px 80px",
        position: "relative", overflow: "hidden",
      }}>
        {/* Glow orbs */}
        <div style={{ position:"absolute", top:"-100px", left:"-80px", width:"420px", height:"420px", borderRadius:"50%", background:"radial-gradient(circle, rgba(246,82,32,0.2), transparent 70%)", pointerEvents:"none" }} />
        <div style={{ position:"absolute", bottom:"-80px", right:"-60px", width:"360px", height:"360px", borderRadius:"50%", background:"radial-gradient(circle, rgba(247,192,76,0.15), transparent 70%)", pointerEvents:"none" }} />
        {/* Top stripe */}
        <div style={{ position:"absolute", top:0, left:0, right:0, height:"5px", background:`linear-gradient(90deg, ${C.orange}, ${C.golden}, ${C.olive}, ${C.golden}, ${C.orange})`, backgroundSize:"200% 100%", animation:"shimmer 4s linear infinite" }} />

        <div style={{ maxWidth:"800px", margin:"0 auto", textAlign:"center", position:"relative", zIndex:1 }}>
          <FadeIn>
            <span style={{
              display:"inline-block", padding:"6px 20px", borderRadius:"99px",
              background:"rgba(247,192,76,0.18)", border:"1px solid rgba(247,192,76,0.4)",
              fontSize:"12px", fontWeight:700, color:C.golden,
              letterSpacing:"1.2px", textTransform:"uppercase", marginBottom:"20px",
            }}>🍽️ Our Story</span>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h1 style={{ fontSize:"clamp(36px,6vw,58px)", fontWeight:900, color:C.white, margin:"0 0 20px", letterSpacing:"-1px", lineHeight:1.1 }}>
              We Don't Just Cook —{" "}
              <span style={{ background:`linear-gradient(90deg, ${C.golden}, ${C.orange})`, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
                We Create Memories
              </span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p style={{ fontSize:"17px", color:"rgba(255,255,255,0.65)", lineHeight:1.8, maxWidth:"600px", margin:"0 auto 44px" }}>
              Born from a passion for authentic flavors and flawless hospitality,{" "}
              <strong style={{ color:C.golden }}>Chandani Catering Services</strong> has been transforming ordinary events into extraordinary experiences since 2016.
            </p>
          </FadeIn>

          {/* Stats */}
          <FadeIn delay={0.3}>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"14px" }} className="stats-grid">
              {stats.map(({ number, label, icon }) => (
                <div key={label} className="stat-card" style={{
                  padding:"22px 12px",
                  background:"rgba(255,255,255,0.07)",
                  backdropFilter:"blur(12px)",
                  borderRadius:"18px",
                  border:"1px solid rgba(247,192,76,0.2)",
                  transition:"transform 0.25s ease",
                }}>
                  <div style={{ fontSize:"22px", marginBottom:"8px" }}>{icon}</div>
                  <div style={{ fontSize:"26px", fontWeight:900, color:C.golden, lineHeight:1 }}>{number}</div>
                  <div style={{ fontSize:"11px", color:"rgba(255,255,255,0.5)", fontWeight:600, textTransform:"uppercase", letterSpacing:"0.6px", marginTop:"5px" }}>{label}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 2 — GALLERY (your local images)
      ══════════════════════════════════════════════════════ */}
      <section style={{ padding:"80px 24px", background:C.cream }}>
        <div style={{ maxWidth:"1100px", margin:"0 auto" }}>
          <FadeIn>
            <div style={{ textAlign:"center", marginBottom:"48px" }}>
              <span style={{ fontSize:"12px", fontWeight:700, color:C.orange, letterSpacing:"1.2px", textTransform:"uppercase" }}>Our Work</span>
              <h2 style={{ fontSize:"clamp(28px,4vw,42px)", fontWeight:900, color:C.darkBrown, margin:"8px 0 12px", letterSpacing:"-0.5px" }}>
                A Feast for the Eyes
              </h2>
              <p style={{ color:C.brown, fontSize:"15px", maxWidth:"480px", margin:"0 auto" }}>
                Every dish is a masterpiece. Every presentation, a work of art.
              </p>
            </div>
          </FadeIn>

          {/* Layout: 1 big left (spans 2 rows) + 3 small right */}
          <div style={{ display:"grid", gridTemplateColumns:"1.1fr 1fr", gap:"16px", gridTemplateRows:"auto auto" }} className="gallery-grid">

            {/* Big image — left, 2 rows */}
            <FadeIn delay={0} direction="right">
              <div className="gallery-item" style={{ gridRow:"1/3", position:"relative", borderRadius:"24px", overflow:"hidden", height:"400px" }}>
                <Image src={galleryImages[0].src} alt={galleryImages[0].label} fill sizes="600px" style={{ objectFit:"cover", transition:"transform 0.5s ease" }} className="gallery-img" />
                <div className="gallery-overlay">
                  <span className="gallery-tag">{galleryImages[0].label}</span>
                </div>
              </div>
            </FadeIn>

            {/* Top right */}
            <FadeIn delay={0.1}>
              <div className="gallery-item" style={{ position:"relative", borderRadius:"24px", overflow:"hidden", height:"190px" }}>
                <Image src={galleryImages[1].src} alt={galleryImages[1].label} fill sizes="400px" style={{ objectFit:"cover", transition:"transform 0.5s ease" }} className="gallery-img" />
                <div className="gallery-overlay">
                  <span className="gallery-tag">{galleryImages[1].label}</span>
                </div>
              </div>
            </FadeIn>

            {/* Bottom right — 2 cols */}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"16px" }}>
              <FadeIn delay={0.15}>
                <div className="gallery-item" style={{ position:"relative", borderRadius:"24px", overflow:"hidden", height:"190px" }}>
                  <Image src={galleryImages[2].src} alt={galleryImages[2].label} fill sizes="300px" style={{ objectFit:"cover", transition:"transform 0.5s ease" }} className="gallery-img" />
                  <div className="gallery-overlay">
                    <span className="gallery-tag">{galleryImages[2].label}</span>
                  </div>
                </div>
              </FadeIn>
              <FadeIn delay={0.2}>
                <div className="gallery-item" style={{ position:"relative", borderRadius:"24px", overflow:"hidden", height:"190px" }}>
                  <Image src={galleryImages[3].src} alt={galleryImages[3].label} fill sizes="300px" style={{ objectFit:"cover", transition:"transform 0.5s ease" }} className="gallery-img" />
                  <div className="gallery-overlay">
                    <span className="gallery-tag">{galleryImages[3].label}</span>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 3 — WHY CHOOSE US
      ══════════════════════════════════════════════════════ */}
      <section style={{ padding:"80px 24px", background:C.white }}>
        <div style={{ maxWidth:"1100px", margin:"0 auto" }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"60px", alignItems:"center" }} className="why-grid">

            {/* Left */}
            <div>
              <FadeIn direction="right">
                <span style={{ fontSize:"12px", fontWeight:700, color:C.orange, letterSpacing:"1.2px", textTransform:"uppercase" }}>Why Choose Us</span>
                <h2 style={{ fontSize:"clamp(28px,3.5vw,40px)", fontWeight:900, color:C.darkBrown, margin:"10px 0 16px", letterSpacing:"-0.5px", lineHeight:1.2 }}>
                  Taste the Difference.<br />
                  <span style={{ color:C.olive }}>Feel the Excellence.</span>
                </h2>
                <p style={{ color:C.brown, fontSize:"15px", lineHeight:1.8, marginBottom:"32px" }}>
                  Great catering is about more than food — it's about moments that stay in your heart. Here's what sets us apart.
                </p>
              </FadeIn>

              <div style={{ display:"flex", flexDirection:"column", gap:"14px" }}>
                {features.map((f, i) => (
                  <FadeIn key={f.title} delay={i * 0.08} direction="right">
                    <div className="feature-card" style={{
                      display:"flex", gap:"14px", alignItems:"flex-start",
                      padding:"16px", borderRadius:"16px",
                      background:C.cream, border:`1px solid rgba(83,91,28,0.12)`,
                      transition:"all 0.2s ease",
                    }}>
                      <div style={{
                        width:"46px", height:"46px", borderRadius:"14px", flexShrink:0,
                        background:`linear-gradient(135deg, rgba(246,82,32,0.12), rgba(247,192,76,0.1))`,
                        border:`1px solid rgba(246,82,32,0.2)`,
                        display:"flex", alignItems:"center", justifyContent:"center", fontSize:"22px",
                      }}>{f.icon}</div>
                      <div>
                        <h4 style={{ margin:"0 0 3px", fontSize:"14px", fontWeight:800, color:C.darkBrown }}>{f.title}</h4>
                        <p style={{ margin:0, fontSize:"13px", color:C.brown, lineHeight:1.7 }}>{f.desc}</p>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>

            {/* Right image */}
            <FadeIn direction="left" delay={0.1}>
              <div style={{ position:"relative" }}>
                <div style={{ borderRadius:"24px", overflow:"hidden", boxShadow:`0 30px 80px rgba(72,59,45,0.2)` }}>
                  <Image src={chefImage} alt="Our team at work" width={600} height={480}
                    style={{ width:"100%", height:"480px", objectFit:"cover", display:"block" }} />
                </div>
                {/* Bottom-left floating badge */}
                <div style={{
                  position:"absolute", bottom:"-20px", left:"-20px",
                  background:`linear-gradient(135deg, ${C.orange}, ${C.orangeDark})`,
                  borderRadius:"20px", padding:"20px 24px",
                  boxShadow:`0 12px 40px rgba(9, 42, 12, 0.4)`,
                  color:C.white,
                }}>
                  <div style={{ fontSize:"30px", fontWeight:900, lineHeight:1 }}>8+</div>
                  <div style={{ fontSize:"12px", fontWeight:600, opacity:0.9, marginTop:"4px" }}>Years of Culinary<br />Excellence</div>
                </div>
                {/* Top-right floating badge */}
                <div style={{
                  position:"absolute", top:"20px", right:"-16px",
                  background:C.white, borderRadius:"14px", padding:"12px 16px",
                  boxShadow:`0 8px 30px rgba(72,59,45,0.15)`,
                  display:"flex", alignItems:"center", gap:"10px",
                  border:`1px solid rgba(247,192,76,0.35)`,
                }}>
                  <div style={{ fontSize:"22px" }}>⭐</div>
                  <div>
                    <div style={{ fontSize:"16px", fontWeight:900, color:C.darkBrown, lineHeight:1 }}>4.9/5</div>
                    <div style={{ fontSize:"11px", color:C.brown, fontWeight:600 }}>Customer Rating</div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 4 — TESTIMONIALS (olive bg)
      ══════════════════════════════════════════════════════ */}
      <section style={{
        padding:"80px 24px",
        background:`linear-gradient(135deg, ${C.oliveDark} 0%, ${C.olive} 55%, ${C.oliveDark} 100%)`,
        position:"relative", overflow:"hidden",
      }}>
        <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse at 50% 50%, rgba(247,192,76,0.1), transparent 70%)", pointerEvents:"none" }} />

        <div style={{ maxWidth:"720px", margin:"0 auto", textAlign:"center", position:"relative", zIndex:1 }}>
          <FadeIn>
            <span style={{ fontSize:"12px", fontWeight:700, color:C.golden, letterSpacing:"1.2px", textTransform:"uppercase" }}>Testimonials</span>
            <h2 style={{ fontSize:"clamp(28px,4vw,40px)", fontWeight:900, color:C.white, margin:"10px 0 48px", letterSpacing:"-0.5px" }}>
              What Our Clients Say
            </h2>
          </FadeIn>

          <div style={{ position:"relative", minHeight:"220px" }}>
            {testimonials.map((t, i) => (
              <motion.div key={i}
                initial={{ opacity:0, y:20 }}
                animate={{ opacity: i===activeTestimonial?1:0, y: i===activeTestimonial?0:20 }}
                transition={{ duration:0.5 }}
                style={{
                  position: i===0?"relative":"absolute",
                  top:0, left:0, right:0,
                  background:"rgba(255,255,255,0.09)",
                  backdropFilter:"blur(20px)",
                  borderRadius:"24px",
                  border:"1px solid rgba(247,192,76,0.2)",
                  padding:"36px 40px",
                  pointerEvents: i===activeTestimonial?"auto":"none",
                }}>
                <p style={{ fontSize:"16px", color:"rgba(255,255,255,0.85)", lineHeight:1.8, marginBottom:"28px", fontStyle:"italic" }}>
                  "{t.text}"
                </p>
                <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"12px" }}>
                  <div style={{
                    width:"44px", height:"44px", borderRadius:"50%",
                    background:`linear-gradient(135deg, ${C.orange}, ${C.amber})`,
                    display:"flex", alignItems:"center", justifyContent:"center",
                    fontSize:"18px", fontWeight:800, color:C.white,
                  }}>{t.avatar}</div>
                  <div style={{ textAlign:"left" }}>
                    <div style={{ fontSize:"14px", fontWeight:800, color:C.white }}>{t.name}</div>
                    <div style={{ fontSize:"12px", color:"rgba(255,255,255,0.5)" }}>{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div style={{ display:"flex", gap:"8px", justifyContent:"center", marginTop:"28px" }}>
            {testimonials.map((_, i) => (
              <button key={i} onClick={() => setActiveTestimonial(i)} style={{
                width: i===activeTestimonial?"28px":"8px",
                height:"8px", borderRadius:"99px", border:"none",
                background: i===activeTestimonial?C.golden:"rgba(255,255,255,0.25)",
                cursor:"pointer", transition:"all 0.3s ease", padding:0,
              }} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 5 — CTA
      ══════════════════════════════════════════════════════ */}
      <section style={{ padding:"80px 24px", background:C.cream }}>
        <div style={{ maxWidth:"880px", margin:"0 auto" }}>
          <FadeIn>
            <div style={{
              background:`linear-gradient(135deg, ${C.orange} 0%, ${C.orangeDark} 100%)`,
              borderRadius:"28px", padding:"56px 48px", textAlign:"center",
              position:"relative", overflow:"hidden",
              boxShadow:`0 24px 80px rgba(246,82,32,0.35)`,
            }}>
              <div style={{ position:"absolute", top:"-60px", right:"-60px", width:"240px", height:"240px", borderRadius:"50%", background:"rgba(255,255,255,0.08)", pointerEvents:"none" }} />
              <div style={{ position:"absolute", bottom:"-40px", left:"-40px", width:"180px", height:"180px", borderRadius:"50%", background:`rgba(247,192,76,0.12)`, pointerEvents:"none" }} />
              <div style={{ position:"relative", zIndex:1 }}>
                <div style={{ fontSize:"40px", marginBottom:"16px" }}>🎊</div>
                <h2 style={{ fontSize:"clamp(26px,4vw,38px)", fontWeight:900, color:C.white, margin:"0 0 14px", letterSpacing:"-0.5px" }}>
                  Ready to Make Your Event Unforgettable?
                </h2>
                <p style={{ color:"rgba(255,255,255,0.8)", fontSize:"16px", maxWidth:"500px", margin:"0 auto 32px", lineHeight:1.7 }}>
                  Let's plan the perfect menu together. Our team is ready to bring your vision to life.
                </p>
                <div style={{ display:"flex", gap:"14px", justifyContent:"center", flexWrap:"wrap" }}>
                  <a href="/contact" className="cta-primary" style={{
                    padding:"14px 32px", borderRadius:"12px", background:C.white,
                    color:C.orange, fontWeight:800, fontSize:"15px", textDecoration:"none",
                    boxShadow:"0 4px 20px rgba(0,0,0,0.15)", display:"inline-block",
                  }}>Book a Consultation</a>
                  <a href="/menu" className="cta-secondary" style={{
                    padding:"14px 32px", borderRadius:"12px",
                    background:"rgba(255,255,255,0.15)",
                    border:"2px solid rgba(255,255,255,0.45)",
                    color:C.white, fontWeight:800, fontSize:"15px",
                    textDecoration:"none", display:"inline-block",
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
  * { box-sizing: border-box; }

  @keyframes shimmer {
    0%   { background-position: 200% center; }
    100% { background-position: -200% center; }
  }

  .stat-card:hover { transform: translateY(-4px); }

  .gallery-item { cursor: pointer; }
  .gallery-item:hover .gallery-img { transform: scale(1.06); }
  .gallery-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(to top, rgba(72,59,45,0.72), transparent 55%);
    display: flex; align-items: flex-end; padding: 18px;
    opacity: 0; transition: opacity 0.3s ease;
  }
  .gallery-item:hover .gallery-overlay { opacity: 1; }
  .gallery-tag {
    color: #fff; font-weight: 700; font-size: 13px;
    background: rgba(246,82,32,0.88);
    padding: 5px 14px; border-radius: 99px;
  }

  .feature-card:hover {
    background: #fff5ed !important;
    border-color: rgba(246,82,32,0.28) !important;
    transform: translateX(5px);
  }

  .cta-primary  { transition: transform 0.2s ease; }
  .cta-primary:hover  { transform: translateY(-2px) scale(1.02); }
  .cta-secondary { transition: all 0.2s ease; }
  .cta-secondary:hover { background: rgba(255,255,255,0.24) !important; }

  @media (max-width: 768px) {
    .stats-grid   { grid-template-columns: repeat(2,1fr) !important; }
    .why-grid     { grid-template-columns: 1fr !important; }
    .gallery-grid { grid-template-columns: 1fr !important; }
  }
  @media (max-width: 480px) {
    .stats-grid { grid-template-columns: repeat(2,1fr) !important; }
  }
`;