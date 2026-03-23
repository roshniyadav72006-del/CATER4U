"use client";

import { useState } from "react";

const MOCK = [
  {
    _id: "1",
    name: "Priya Sharma",
    email: "priya@email.com",
    eventType: "Wedding",
    rating: 5,
    title: "Outstanding Service!",
    comment: "The catering service was exceptional! Food quality was top-notch and the staff was very professional. All our guests loved the menu variety. Highly recommended for wedding events.",
    status: "published",
    helpful: 24,
    orderId: "ORD001",
    adminResponse: "",
    date: "10/2/2026",
  },
  {
    _id: "2",
    name: "Rahul Verma",
    email: "rahul@email.com",
    eventType: "Corporate Event",
    rating: 4,
    title: "Good Food, Timely Service",
    comment: "Really impressed with the punctuality and food presentation. The continental menu was delicious. Only minor issue was beverage variety could be better.",
    status: "published",
    helpful: 18,
    orderId: "ORD045",
    adminResponse: "Thank you for your feedback! We're working on expanding our beverage menu.",
    date: "12/2/2026",
  },
  {
    _id: "3",
    name: "Anjali Gupta",
    email: "anjali@email.com",
    eventType: "Birthday Party",
    rating: 3,
    title: "Average Experience",
    comment: "Food was okay but service was a bit slow. The birthday cake arrangement was good though. Price was reasonable for what we got.",
    status: "pending",
    helpful: 9,
    orderId: "ORD078",
    adminResponse: "",
    date: "14/2/2026",
  },
  {
    _id: "4",
    name: "Vikram Singh",
    email: "vikram@email.com",
    eventType: "Anniversary",
    rating: 5,
    title: "Magical Evening!",
    comment: "Everything was perfect from start to finish. The team went above and beyond to make our anniversary special. The floral arrangements and dessert bar were absolutely stunning!",
    status: "published",
    helpful: 31,
    orderId: "ORD102",
    adminResponse: "Thank you so much! It was our pleasure to be part of your special day.",
    date: "16/2/2026",
  },
  {
    _id: "5",
    name: "Meena Patel",
    email: "meena@email.com",
    eventType: "Religious Ceremony",
    rating: 2,
    title: "Below Expectations",
    comment: "The satvik menu was not as per our discussion. Some items were missing and quantity was less. Staff was polite but the food quality needs improvement for religious events.",
    status: "pending",
    helpful: 5,
    orderId: "ORD156",
    adminResponse: "",
    date: "18/2/2026",
  },
  {
    _id: "6",
    name: "Arjun Nair",
    email: "arjun@email.com",
    eventType: "Outdoor Picnic",
    rating: 4,
    title: "Great BBQ Setup!",
    comment: "Loved the outdoor arrangement. The BBQ was the highlight of the evening. Staff were very friendly and accommodating. Would definitely book again for future events!",
    status: "published",
    helpful: 14,
    orderId: "ORD189",
    adminResponse: "",
    date: "20/2/2026",
  },
  {
    _id: "7",
    name: "Deepika Rao",
    email: "deepika@email.com",
    eventType: "Wedding",
    rating: 5,
    title: "Dream Wedding Catering",
    comment: "Absolutely flawless execution. Every dish was a masterpiece. The live counters were a huge hit with 500+ guests. Best decision we made for our wedding!",
    status: "published",
    helpful: 47,
    orderId: "ORD210",
    adminResponse: "",
    date: "22/2/2026",
  },
];

const STATUS_STYLE = {
  published: { bg: "#dcfce7", color: "#16a34a", border: "#86efac" },
  pending:   { bg: "#fef9c3", color: "#a16207", border: "#fde047" },
  hidden:    { bg: "#f3f4f6", color: "#6b7280", border: "#d1d5db" },
};

const today = new Date().toLocaleDateString("en-US", {
  weekday: "long", day: "numeric", month: "long", year: "numeric",
});

function Stars({ rating, size = 18 }) {
  return (
    <span style={{ display: "inline-flex", gap: 2 }}>
      {[1,2,3,4,5].map((s) => (
        <span key={s} style={{ fontSize: size, color: s <= rating ? "#f59e0b" : "#d1d5db", lineHeight: 1 }}>
          {s <= rating ? "★" : "☆"}
        </span>
      ))}
    </span>
  );
}

export default function ManageFeedback() {
  const [list, setList] = useState(MOCK);
  const [search, setSearch] = useState("");
  const [ratFilter, setRatFilter] = useState("All Ratings");
  const [stFilter, setStFilter] = useState("All Status");
  const [respondId, setRespondId] = useState(null);
  const [respondText, setRespondText] = useState("");
  const [detailId, setDetailId] = useState(null);

  const avgRating = list.length
    ? (list.reduce((a, f) => a + f.rating, 0) / list.length).toFixed(1)
    : "0.0";
  const published = list.filter((f) => f.status === "published").length;
  const pending = list.filter((f) => f.status === "pending").length;

  const dist = [5, 4, 3, 2, 1].map((r) => {
    const count = list.filter((f) => f.rating === r).length;
    return { star: r, count, pct: list.length ? (count / list.length) * 100 : 0 };
  });

  const filtered = list.filter((f) => {
    const q = search.toLowerCase();
    const ms = !q || f.name.toLowerCase().includes(q) || f.title.toLowerCase().includes(q) || f.comment.toLowerCase().includes(q);
    const mr = ratFilter === "All Ratings" || f.rating === parseInt(ratFilter);
    const mst = stFilter === "All Status" || f.status === stFilter;
    return ms && mr && mst;
  });

  const saveResp = (id) => {
    setList((p) => p.map((f) => f._id === id ? { ...f, adminResponse: respondText } : f));
    setRespondId(null);
    setRespondText("");
  };

  const del = (id) => {
    setList((p) => p.filter((f) => f._id !== id));
    if (detailId === id) setDetailId(null);
  };

  const cycleStatus = (id, cur) => {
    const opts = ["published", "pending", "hidden"];
    const next = opts[(opts.indexOf(cur) + 1) % opts.length];
    setList((p) => p.map((f) => f._id === id ? { ...f, status: next } : f));
  };

  const detail = list.find((f) => f._id === detailId);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap');

        .fp{background:#f0f5fb;font-family:'Outfit',sans-serif;color:#1a2b40;}

        .fp-top{background:#fff;border-bottom:1px solid #e2eaf3;padding:14px 32px;display:flex;justify-content:space-between;align-items:center;position:sticky;top:0;z-index:20;box-shadow:0 1px 4px rgba(0,0,0,0.04);}
        .fp-ham{background:none;border:none;font-size:20px;cursor:pointer;color:#4a6080;}
        .fp-date{color:#7a93b0;font-size:14px;font-weight:500;}

        .fp-body{padding:32px 36px;max-width:1280px;margin:0 auto;}
        .fp-title{font-size:32px;font-weight:800;color:#0ea5e9;letter-spacing:-0.03em;margin-bottom:4px;}
        .fp-sub{color:#7a93b0;font-size:14px;margin-bottom:28px;}

        /* STATS */
        .fp-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:18px;margin-bottom:22px;}
        .fp-stat{background:#fff;border-radius:16px;padding:24px 26px;border:1px solid #e2eaf3;box-shadow:0 2px 8px rgba(0,0,0,0.04);transition:transform .2s,box-shadow .2s;}
        .fp-stat:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(0,0,0,0.08);}
        .fp-slabel{font-size:13px;font-weight:600;color:#4a6080;margin-bottom:16px;}
        .fp-sval{font-size:40px;font-weight:800;letter-spacing:-0.04em;}
        .fp-ssub{font-size:12px;color:#7a93b0;margin-top:6px;}

        /* SECTION */
        .fp-sec{background:#fff;border-radius:18px;border:1px solid #e2eaf3;box-shadow:0 2px 10px rgba(0,0,0,0.05);padding:26px 28px;margin-bottom:22px;}
        .fp-stitle{font-size:17px;font-weight:700;color:#1a2b40;margin-bottom:4px;}
        .fp-ssub2{font-size:13px;color:#7a93b0;margin-bottom:22px;}

        /* DIST */
        .fp-drow{display:flex;align-items:center;gap:14px;margin-bottom:13px;}
        .fp-drow:last-child{margin-bottom:0;}
        .fp-dlabel{display:flex;align-items:center;gap:5px;font-size:14px;font-weight:700;color:#1a2b40;min-width:36px;}
        .fp-dstar{color:#f59e0b;font-size:15px;}
        .fp-dtrack{flex:1;height:10px;background:#f0f5fb;border-radius:999px;overflow:hidden;}
        .fp-dbar{height:100%;background:linear-gradient(90deg,#f59e0b,#fbbf24);border-radius:999px;transition:width .8s ease;}
        .fp-dcount{font-size:13px;font-weight:700;color:#4a6080;min-width:20px;text-align:right;}

        /* FILTER BAR */
        .fp-fbar{display:flex;gap:12px;margin-bottom:18px;flex-wrap:wrap;}
        .fp-swrap{flex:1;position:relative;min-width:200px;}
        .fp-sicon{position:absolute;left:14px;top:50%;transform:translateY(-50%);color:#aabdd0;font-size:15px;pointer-events:none;}
        .fp-sinput{width:100%;background:#f7fafd;border:1.5px solid #e2eaf3;border-radius:10px;padding:11px 16px 11px 42px;font-size:14px;font-family:'Outfit',sans-serif;color:#1a2b40;outline:none;transition:all .2s;}
        .fp-sinput::placeholder{color:#aabdd0;}
        .fp-sinput:focus{border-color:#0ea5e9;box-shadow:0 0 0 3px rgba(14,165,233,.1);background:#fff;}
        .fp-selwrap{position:relative;}
        .fp-sel{appearance:none;background:#f7fafd;border:1.5px solid #e2eaf3;border-radius:10px;padding:11px 36px 11px 16px;font-size:14px;font-family:'Outfit',sans-serif;color:#4a6080;font-weight:600;cursor:pointer;outline:none;transition:all .2s;min-width:140px;}
        .fp-sel:focus{border-color:#0ea5e9;}
        .fp-sarrow{position:absolute;right:12px;top:50%;transform:translateY(-50%);color:#aabdd0;font-size:11px;pointer-events:none;}

        /* REVIEW CARD */
        .fp-card{background:#fff;border-radius:16px;border:1px solid #e8f0fa;padding:24px 28px;margin-bottom:16px;transition:all .2s;position:relative;overflow:hidden;}
        .fp-card::before{content:'';position:absolute;top:0;left:0;width:3px;height:100%;background:linear-gradient(180deg,#0ea5e9,#38bdf8);opacity:0;transition:opacity .25s;}
        .fp-card:hover{border-color:#bfdbfe;box-shadow:0 4px 20px rgba(14,165,233,.1);}
        .fp-card:hover::before{opacity:1;}

        .fp-ctop{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:14px;}
        .fp-cuser{display:flex;align-items:center;gap:14px;}
        .fp-av{width:46px;height:46px;border-radius:50%;background:linear-gradient(135deg,#fed7aa,#fb923c);display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0;}
        .fp-cname{font-size:16px;font-weight:700;color:#1a2b40;}
        .fp-cmeta{display:flex;align-items:center;gap:8px;margin-top:4px;font-size:13px;color:#7a93b0;flex-wrap:wrap;}
        .fp-dot{width:4px;height:4px;border-radius:50%;background:#cbd5e1;}
        .fp-etag{display:inline-block;padding:3px 12px;border-radius:20px;font-size:12px;font-weight:600;background:#f1f5f9;color:#475569;border:1px solid #e2e8f0;}

        .fp-badge{display:inline-flex;align-items:center;gap:5px;padding:5px 14px;border-radius:20px;font-size:12px;font-weight:700;border:1px solid;cursor:pointer;user-select:none;transition:opacity .15s;}
        .fp-badge:hover{opacity:.78;}
        .fp-bdot{width:5px;height:5px;border-radius:50%;background:currentColor;}

        .fp-crating{display:flex;align-items:center;gap:8px;margin-bottom:8px;}
        .fp-rnum{font-size:15px;font-weight:800;color:#f59e0b;}
        .fp-ctitle{font-size:16px;font-weight:800;color:#1a2b40;margin-bottom:10px;}
        .fp-ctext{font-size:14px;color:#4a6080;line-height:1.7;margin-bottom:16px;}

        /* Admin Response */
        .fp-aresp{background:linear-gradient(135deg,#eff6ff,#dbeafe);border:1px solid #bfdbfe;border-left:4px solid #0ea5e9;border-radius:10px;padding:14px 18px;margin-bottom:16px;}
        .fp-arlab{font-size:13px;font-weight:700;color:#0ea5e9;margin-bottom:6px;}
        .fp-artxt{font-size:13.5px;color:#1e40af;line-height:1.6;}

        /* Respond Box */
        .fp-rbox{background:#f7fafd;border:1.5px solid #e2eaf3;border-radius:10px;padding:14px 16px;margin-bottom:16px;}
        .fp-rlab{font-size:12px;font-weight:700;color:#7a93b0;text-transform:uppercase;letter-spacing:.05em;margin-bottom:8px;}
        .fp-rta{width:100%;min-height:80px;resize:none;border:1.5px solid #e2eaf3;border-radius:8px;padding:10px 14px;font-size:13.5px;font-family:'Outfit',sans-serif;color:#1a2b40;outline:none;background:#fff;transition:border .2s;}
        .fp-rta:focus{border-color:#0ea5e9;}
        .fp-racts{display:flex;justify-content:flex-end;gap:10px;margin-top:10px;}
        .fp-bcancel{padding:8px 18px;border-radius:8px;border:1.5px solid #e2eaf3;background:#fff;color:#7a93b0;font-size:13px;font-weight:600;font-family:'Outfit',sans-serif;cursor:pointer;transition:all .15s;}
        .fp-bcancel:hover{background:#f7fafd;}
        .fp-bsave{padding:8px 18px;border-radius:8px;border:none;background:linear-gradient(135deg,#0ea5e9,#0077cc);color:#fff;font-size:13px;font-weight:700;font-family:'Outfit',sans-serif;cursor:pointer;box-shadow:0 3px 10px rgba(14,165,233,.3);transition:all .2s;}
        .fp-bsave:hover{transform:translateY(-1px);}

        /* Footer */
        .fp-cfoot{display:flex;justify-content:space-between;align-items:center;padding-top:14px;border-top:1px solid #f0f5fb;flex-wrap:wrap;gap:10px;}
        .fp-cfl{display:flex;align-items:center;gap:18px;font-size:13px;color:#7a93b0;}
        .fp-cfr{display:flex;gap:8px;flex-wrap:wrap;}
        .fp-abtn{display:flex;align-items:center;gap:7px;padding:8px 16px;border-radius:9px;border:1.5px solid #e2eaf3;background:#fff;font-size:13px;font-weight:700;color:#4a6080;font-family:'Outfit',sans-serif;cursor:pointer;transition:all .15s;}
        .fp-abtn:hover{border-color:#93c5fd;color:#0ea5e9;background:#f0f9ff;}
        .fp-abtn.g:hover{border-color:#6ee7b7;color:#059669;background:#f0fdf4;}
        .fp-abtn.r:hover{border-color:#fca5a5;color:#dc2626;background:#fef2f2;}

        /* EMPTY */
        .fp-empty{text-align:center;padding:60px 20px;color:#7a93b0;}
        .fp-eicon{font-size:52px;margin-bottom:14px;opacity:.5;}

        /* MODAL */
        .fp-ov{position:fixed;inset:0;background:rgba(15,30,50,.55);backdrop-filter:blur(6px);display:flex;align-items:center;justify-content:center;z-index:100;animation:fpFadeIn .2s;}
        @keyframes fpFadeIn{from{opacity:0}to{opacity:1}}
        .fp-modal{background:#fff;border-radius:20px;width:100%;max-width:560px;max-height:88vh;overflow-y:auto;box-shadow:0 24px 64px rgba(0,0,0,.18);animation:fpSlide .25s ease;position:relative;}
        .fp-modal::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,#0ea5e9,#38bdf8,#0077cc);border-radius:20px 20px 0 0;}
        @keyframes fpSlide{from{transform:translateY(20px);opacity:0}to{transform:translateY(0);opacity:1}}
        .fp-mhead{padding:22px 26px 16px;border-bottom:1px solid #f0f5fb;display:flex;justify-content:space-between;align-items:center;}
        .fp-mtitle{font-size:18px;font-weight:800;color:#0ea5e9;}
        .fp-mclose{background:#f0f5fb;border:none;width:30px;height:30px;border-radius:50%;font-size:15px;cursor:pointer;color:#7a93b0;display:flex;align-items:center;justify-content:center;}
        .fp-mclose:hover{background:#e2eaf3;}
        .fp-mbody{padding:22px 26px;}
        .fp-drow{display:flex;justify-content:space-between;align-items:flex-start;padding:12px 0;border-bottom:1px solid #f7fafd;font-size:14px;}
        .fp-drow:last-child{border-bottom:none;}
        .fp-dkey{color:#7a93b0;font-weight:600;flex-shrink:0;margin-right:16px;}
        .fp-dval{color:#1a2b40;font-weight:700;text-align:right;}

        .fp-cinfo{font-size:13px;color:#7a93b0;margin-bottom:14px;}
        .fp-cinfo span{color:#0ea5e9;font-weight:700;}

        @media(max-width:900px){
          .fp-stats{grid-template-columns:repeat(2,1fr);}
          .fp-body{padding:20px 16px;}
          .fp-title{font-size:24px;}
        }
      `}</style>

      <div className="fp">
        {/* Topbar */}
        <div className="fp-top">
          <span className="fp-date">{today}</span>
        </div>
        <div className="fp-body">
          <h1 className="fp-title">Manage Feedback & Reviews</h1>
          <p className="fp-sub">Monitor and respond to customer reviews</p>

          {/* ── STATS ── */}
          <div className="fp-stats">
            <div className="fp-stat">
              <div className="fp-slabel">Average Rating</div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span className="fp-sval" style={{ color: "#0ea5e9" }}>{avgRating}</span>
                <span style={{ fontSize: 28, color: "#f59e0b" }}>★</span>
              </div>
              <div className="fp-ssub">Out of 5 stars</div>
            </div>
            <div className="fp-stat">
              <div className="fp-slabel">Total Reviews</div>
              <div className="fp-sval" style={{ color: "#0ea5e9" }}>{list.length}</div>
              <div className="fp-ssub">All time feedback</div>
            </div>
            <div className="fp-stat">
              <div className="fp-slabel">Pending Review</div>
              <div className="fp-sval" style={{ color: "#ca8a04" }}>{pending}</div>
              <div className="fp-ssub">Awaiting response</div>
            </div>
            <div className="fp-stat">
              <div className="fp-slabel">Published</div>
              <div className="fp-sval" style={{ color: "#16a34a" }}>{published}</div>
              <div className="fp-ssub">Live on website</div>
            </div>
          </div>

          {/* ── RATING DISTRIBUTION ── */}
          <div className="fp-sec">
            <div className="fp-stitle">Rating Distribution</div>
            <div className="fp-ssub2">Breakdown of customer ratings</div>
            {dist.map((d) => (
              <div key={d.star} className="fp-drow">
                <div className="fp-dlabel">{d.star} <span className="fp-dstar">★</span></div>
                <div className="fp-dtrack">
                  <div className="fp-dbar" style={{ width: `${d.pct}%` }} />
                </div>
                <div className="fp-dcount">{d.count}</div>
              </div>
            ))}
          </div>

          {/* ── CUSTOMER REVIEWS ── */}
          <div className="fp-sec">
            <div className="fp-stitle">Customer Reviews</div>
            <div className="fp-ssub2">All feedback and testimonials from customers</div>

            {/* Filter Bar */}
            <div className="fp-fbar">
              <div className="fp-swrap">
                <span className="fp-sicon">🔍</span>
                <input
                  className="fp-sinput"
                  placeholder="Search by customer name or review title..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="fp-selwrap">
                <select className="fp-sel" value={ratFilter} onChange={(e) => setRatFilter(e.target.value)}>
                  <option>All Ratings</option>
                  {[5,4,3,2,1].map((r) => <option key={r} value={r}>{r} Star{r > 1 ? "s" : ""}</option>)}
                </select>
                <span className="fp-sarrow">▼</span>
              </div>
              <div className="fp-selwrap">
                <select className="fp-sel" value={stFilter} onChange={(e) => setStFilter(e.target.value)}>
                  <option>All Status</option>
                  <option value="published">Published</option>
                  <option value="pending">Pending</option>
                  <option value="hidden">Hidden</option>
                </select>
                <span className="fp-sarrow">▼</span>
              </div>
            </div>

            <div className="fp-cinfo">
              Showing <span>{filtered.length}</span> of <span>{list.length}</span> reviews
            </div>

            {/* Review Cards */}
            {filtered.length === 0 ? (
              <div className="fp-empty">
                <div className="fp-eicon">💬</div>
                <div style={{ fontSize: 16, fontWeight: 600 }}>No reviews found.</div>
              </div>
            ) : filtered.map((fb) => {
              const st = STATUS_STYLE[fb.status];
              const isResp = respondId === fb._id;
              return (
                <div key={fb._id} className="fp-card">
                  {/* Top */}
                  <div className="fp-ctop">
                    <div className="fp-cuser">
                      <div className="fp-av">👤</div>
                      <div>
                        <div className="fp-cname">{fb.name}</div>
                        <div className="fp-cmeta">
                          <span>📅 {fb.date}</span>
                          <span className="fp-dot" />
                          <span className="fp-etag">{fb.eventType}</span>
                        </div>
                      </div>
                    </div>
                    <span
                      className="fp-badge"
                      style={{ background: st.bg, color: st.color, borderColor: st.border }}
                      onClick={() => cycleStatus(fb._id, fb.status)}
                      title="Click to change status"
                    >
                      <span className="fp-bdot" />
                      {fb.status}
                    </span>
                  </div>

                  {/* Rating */}
                  <div className="fp-crating">
                    <Stars rating={fb.rating} size={18} />
                    <span className="fp-rnum">{fb.rating}.0</span>
                  </div>

                  {/* Title + Comment */}
                  <div className="fp-ctitle">{fb.title}</div>
                  <div className="fp-ctext">{fb.comment}</div>

                  {/* Admin Response */}
                  {fb.adminResponse && (
                    <div className="fp-aresp">
                      <div className="fp-arlab">Admin Response:</div>
                      <div className="fp-artxt">{fb.adminResponse}</div>
                    </div>
                  )}

                  {/* Respond textarea */}
                  {isResp && (
                    <div className="fp-rbox">
                      <div className="fp-rlab">Write your response</div>
                      <textarea
                        className="fp-rta"
                        placeholder="Type your response to this review..."
                        value={respondText}
                        onChange={(e) => setRespondText(e.target.value)}
                        autoFocus
                      />
                      <div className="fp-racts">
                        <button className="fp-bcancel" onClick={() => { setRespondId(null); setRespondText(""); }}>Cancel</button>
                        <button className="fp-bsave" onClick={() => saveResp(fb._id)}>Post Response</button>
                      </div>
                    </div>
                  )}

                  {/* Footer */}
                  <div className="fp-cfoot">
                    <div className="fp-cfl">
                      <span>👍 {fb.helpful} helpful</span>
                      <span>Order ID: <strong style={{ color: "#4a6080" }}>{fb.orderId}</strong></span>
                    </div>
                    <div className="fp-cfr">
                      <button className="fp-abtn" onClick={() => setDetailId(fb._id)}>
                        👁️ View Details
                      </button>
                      {!isResp && (
                        <button
                          className="fp-abtn g"
                          onClick={() => { setRespondId(fb._id); setRespondText(fb.adminResponse || ""); }}
                        >
                          💬 {fb.adminResponse ? "Edit Response" : "Respond"}
                        </button>
                      )}
                      <button className="fp-abtn r" onClick={() => del(fb._id)}>🗑️</button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── VIEW DETAIL MODAL ── */}
        {detailId && detail && (
          <div className="fp-ov" onClick={() => setDetailId(null)}>
            <div className="fp-modal" onClick={(e) => e.stopPropagation()}>
              <div className="fp-mhead">
                <span className="fp-mtitle">Review Details</span>
                <button className="fp-mclose" onClick={() => setDetailId(null)}>✕</button>
              </div>
              <div className="fp-mbody">
                {[
                  ["Customer", detail.name],
                  ["Email", detail.email],
                  ["Event Type", detail.eventType],
                  ["Order ID", detail.orderId],
                  ["Date", detail.date],
                  ["Helpful", `👍 ${detail.helpful} people`],
                ].map(([k, v]) => (
                  <div key={k} className="fp-drow">
                    <span className="fp-dkey">{k}</span>
                    <span className="fp-dval">{v}</span>
                  </div>
                ))}
                <div className="fp-drow">
                  <span className="fp-dkey">Rating</span>
                  <span className="fp-dval" style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "flex-end" }}>
                    <Stars rating={detail.rating} size={15} />
                    <strong style={{ color: "#f59e0b" }}>{detail.rating}.0</strong>
                  </span>
                </div>
                <div className="fp-drow">
                  <span className="fp-dkey">Status</span>
                  <span className="fp-dval">
                    <span className="fp-badge" style={{ background: STATUS_STYLE[detail.status].bg, color: STATUS_STYLE[detail.status].color, borderColor: STATUS_STYLE[detail.status].border, cursor: "default" }}>
                      <span className="fp-bdot" />{detail.status}
                    </span>
                  </span>
                </div>
                <div style={{ marginTop: 18 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#7a93b0", textTransform: "uppercase", letterSpacing: ".05em", marginBottom: 6 }}>Review Title</div>
                  <div style={{ fontSize: 16, fontWeight: 800, color: "#1a2b40", marginBottom: 14 }}>{detail.title}</div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#7a93b0", textTransform: "uppercase", letterSpacing: ".05em", marginBottom: 8 }}>Comment</div>
                  <div style={{ fontSize: 14, color: "#4a6080", lineHeight: 1.7, background: "#f7fafd", padding: "14px 16px", borderRadius: 10, border: "1px solid #e2eaf3" }}>
                    {detail.comment}
                  </div>
                  {detail.adminResponse && (
                    <div style={{ marginTop: 16 }}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: "#7a93b0", textTransform: "uppercase", letterSpacing: ".05em", marginBottom: 8 }}>Admin Response</div>
                      <div className="fp-aresp" style={{ margin: 0 }}>
                        <div className="fp-artxt">{detail.adminResponse}</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}