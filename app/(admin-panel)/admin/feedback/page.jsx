"use client";
import { useEffect, useState } from "react";
import "./feedback.css";

export default function AdminFeedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [stats, setStats] = useState(null);
  const [openResponseId, setOpenResponseId] = useState(null);
  const [responseText, setResponseText] = useState("");
  const [deleteId, setDeleteId] = useState(null);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState("");

  useEffect(() => {
    fetchFeedback();
  }, [search, statusFilter, ratingFilter]);

  const fetchFeedback = async () => {
    let url = `/api/admin/feedback?`;
    if (search) url += `search=${search}&`;
    if (statusFilter) url += `status=${statusFilter}&`;
    if (ratingFilter) url += `rating=${ratingFilter}&`;

    const res = await fetch(url);
    const data = await res.json();
    setFeedbacks(data.feedbacks);
    setStats(data.stats);
  };

  const sendResponse = async (id) => {
    await fetch(`/api/admin/feedback/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ response: responseText }),
    });
    setOpenResponseId(null);
    setResponseText("");
    fetchFeedback();
  };

  const togglePublish = async (id, currentStatus) => {
    await fetch(`/api/admin/feedback/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        status: currentStatus === "published" ? "pending" : "published",
      }),
    });
    fetchFeedback();
  };

  const deleteFeedback = async () => {
    await fetch(`/api/admin/feedback/${deleteId}`, { method: "DELETE" });
    setDeleteId(null);
    fetchFeedback();
  };

  if (!stats)
    return (
      <>
        <div className="af-loading">
          <div className="af-spinner" />
          Loading feedback…
        </div>
      </>
    );

  return (
    <>
      <div className="af-root">
        {/* Header */}
        <div className="af-header">
          <div className="af-header-icon">🌿</div>
          <div>
            <h1>Manage Feedback</h1>
            <p className="af-header-sub">Review, respond & publish customer reviews</p>
          </div>
        </div>

        {/* Stats */}
        <div className="af-stats">
          <StatCard title="Average Rating" value={stats.avgRating} />
          <StatCard title="Total Reviews" value={stats.total} />
          <StatCard title="Pending" value={stats.pending} />
          <StatCard title="Published" value={stats.published} />
        </div>

        {/* Rating Distribution */}
        <div className="af-dist">
          <h2>Rating Distribution</h2>
          {[5, 4, 3, 2, 1].map((star) => (
            <div className="af-dist-row" key={star}>
              <span className="af-dist-label">{star} ⭐</span>
              <div className="af-dist-track">
                <div
                  className="af-dist-fill"
                  style={{
                    width: `${stats.total ? (stats.distribution[star] / stats.total) * 100 : 0}%`,
                  }}
                />
              </div>
              <span className="af-dist-count">{stats.distribution[star]}</span>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="af-filters">
          <div className="af-search-wrap">
            <span className="af-search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search by name, service, rating…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="af-input"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="af-select"
          >
            <option value="">All Status</option>
            <option value="published">Published</option>
            <option value="pending">Pending</option>
          </select>
          <select
            value={ratingFilter}
            onChange={(e) => setRatingFilter(e.target.value)}
            className="af-select"
          >
            <option value="">All Ratings</option>
            <option value="5">5 ⭐</option>
            <option value="4">4 ⭐</option>
            <option value="3">3 ⭐</option>
            <option value="2">2 ⭐</option>
            <option value="1">1 ⭐</option>
          </select>
        </div>

        {/* Feedback List */}
        <div className="af-list">
          {feedbacks.map((f) => (
            <div key={f._id} className="af-item">
              <div className="af-item-header">
                <div>
                  <p className="af-item-name">{f.name}</p>
                  <p className="af-item-service">{f.service}</p>
                </div>
                <span className={`af-badge ${f.status === "published" ? "af-badge-published" : "af-badge-pending"}`}>
                  {f.status}
                </span>
              </div>

              <div className="af-item-meta">
                <span className="af-stars">{"⭐".repeat(f.rating)}</span>
                <span className="af-date">{new Date(f.createdAt).toLocaleDateString()}</span>
              </div>

              <p className="af-comment">{f.comment}</p>

              {f.adminResponse && (
                <div className="af-admin-resp">
                  <b>Admin Response: </b>{f.adminResponse}
                </div>
              )}

              <div className="af-actions">
                <button
                  onClick={() => {
                    setOpenResponseId(f._id);
                    setResponseText(f.adminResponse || "");
                  }}
                  className="af-btn af-btn-respond"
                >
                  ✏️ Respond
                </button>
                <button
                  onClick={() => togglePublish(f._id, f.status)}
                  className="af-btn af-btn-publish"
                >
                  {f.status === "published" ? "⬇ Unpublish" : "⬆ Publish"}
                </button>
                <button
                  onClick={() => setDeleteId(f._id)}
                  className="af-btn af-btn-delete"
                >
                  🗑 Delete
                </button>
              </div>

              {/* Inline Respond Box */}
              {openResponseId === f._id && (
                <div className="af-respond-box">
                  <textarea
                    className="af-textarea"
                    placeholder="Write your response…"
                    value={responseText}
                    onChange={(e) => setResponseText(e.target.value)}
                  />
                  <div className="af-respond-actions">
                    <button
                      className="af-btn-cancel-sm"
                      onClick={() => { setOpenResponseId(null); setResponseText(""); }}
                    >
                      Cancel
                    </button>
                    <button className="af-btn-send" onClick={() => sendResponse(f._id)}>
                      Send Response
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Delete Modal */}
        {deleteId && (
          <div className="af-overlay">
            <div className="af-modal">
              <div className="af-modal-icon">⚠️</div>
              <h2>Delete Feedback?</h2>
              <p>This action cannot be undone. The feedback will be permanently removed.</p>
              <div className="af-modal-btns">
                <button className="af-btn-modal-cancel" onClick={() => setDeleteId(null)}>
                  Cancel
                </button>
                <button className="af-btn-modal-delete" onClick={deleteFeedback}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="af-card">
      <p className="af-card-label">{title}</p>
      <h2 className="af-card-value">{value}</h2>
      <div className="af-card-accent" />
    </div>
  );
}