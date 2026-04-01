"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminMenuPage() {
  const [menus, setMenus] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const fetchMenus = async () => {
    const res = await fetch("/api/admin/menu");
    const data = await res.json();
    setMenus(data);
  };

  useEffect(() => {
    fetchMenus();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this item?")) return;
    await fetch("/api/admin/menu", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchMenus();
  };

  const filteredMenus = selectedCategory
    ? menus.filter((m) => m.category === selectedCategory)
    : menus;

  return (
    <div style={{ padding: "16px", background: "#FFF8DC", minHeight: "100vh" }}>
      <style>{`
        .menu-header {
          font-size: clamp(22px, 5vw, 30px);
          font-weight: 700;
          color: #3D4F1C;
          margin-bottom: 20px;
        }

        /* ── Top bar: button + select ── */
        .menu-topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          margin-bottom: 20px;
          flex-wrap: wrap;
        }
        .menu-add-btn {
          background: #273B09;
          color: #fff;
          font-weight: 600;
          font-size: 14px;
          padding: 9px 18px;
          border-radius: 8px;
          text-decoration: none;
          white-space: nowrap;
          transition: background 0.2s;
        }
        .menu-add-btn:hover { background: #3D4F1C; }
        .menu-select {
          background: #273B09;
          color: #fff;
          font-weight: 600;
          font-size: 14px;
          padding: 9px 14px;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          flex: 1;
          min-width: 0;
          max-width: 220px;
        }

        /* ── Desktop: normal table ── */
        .menu-table-wrap {
          width: 100%;
          overflow-x: auto;
          border-radius: 12px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.08);
        }
        .menu-table {
          width: 100%;
          border-collapse: collapse;
          background: #fff;
          min-width: 480px;
        }
        .menu-table thead tr {
          background: #273B09;
          color: #fff;
        }
        .menu-table th {
          padding: 12px 14px;
          text-align: left;
          font-size: 13px;
          font-weight: 600;
          white-space: nowrap;
        }
        .menu-table td {
          padding: 12px 14px;
          border-top: 1px solid #f0e8cc;
          font-size: 13px;
          vertical-align: middle;
        }
        .menu-table tr:hover td { background: #F5E6B3; }

        /* ── Mobile: card layout ── */
        .menu-cards { display: none; flex-direction: column; gap: 12px; }

        @media (max-width: 600px) {
          .menu-table-wrap { display: none; }
          .menu-cards { display: flex; }
          .menu-select { max-width: 100%; }
        }

        .menu-card {
          background: #fff;
          border-radius: 14px;
          padding: 14px;
          box-shadow: 0 2px 10px rgba(61,79,28,0.10);
          border: 1px solid #e8ddb8;
          display: flex;
          gap: 14px;
          align-items: flex-start;
        }
        .menu-card-img {
          width: 64px;
          height: 64px;
          object-fit: cover;
          border-radius: 10px;
          flex-shrink: 0;
          background: #f5efd8;
        }
        .menu-card-img-placeholder {
          width: 64px;
          height: 64px;
          border-radius: 10px;
          background: #f0e8cc;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
        }
        .menu-card-info { flex: 1; min-width: 0; }
        .menu-card-name {
          font-size: 15px;
          font-weight: 700;
          color: #3D4F1C;
          margin-bottom: 4px;
          word-break: break-word;
        }
        .menu-card-cat {
          display: inline-block;
          font-size: 11px;
          font-weight: 600;
          color: #6b7a2a;
          background: #f0f4d8;
          border: 1px solid #c8d890;
          padding: 2px 10px;
          border-radius: 99px;
          margin-bottom: 10px;
        }
        .menu-card-delete {
          font-size: 13px;
          font-weight: 600;
          color: #dc2626;
          background: #fde8e8;
          border: 1px solid #f4a4a4;
          padding: 5px 14px;
          border-radius: 8px;
          cursor: pointer;
          transition: background 0.2s;
        }
        .menu-card-delete:hover { background: #fca5a5; }
      `}</style>

      <h1 className="menu-header">Menu Management</h1>

      {/* Top bar */}
      <div className="menu-topbar">
        <Link href="/admin/menu/create" className="menu-add-btn">
          + Add New
        </Link>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="menu-select"
        >
          <option value="">All Categories</option>
          <option value="Starter">Starter</option>
          <option value="Main Course">Main Course</option>
          <option value="Dessert">Dessert</option>
          <option value="Beverages">Beverages</option>
          <option value="Nasta">Nasta</option>
          <option value="Rajasthani Special">Rajasthani Special</option>
          <option value="Chinese">Chinese</option>
          <option value="Indian Breads">Indian Breads</option>
          <option value="Dal">Dal</option>
          <option value="Dosti">Dosti</option>
          <option value="Basmati ki Khushbu">Basmati ki Khushbu</option>
          <option value="Mumbai Favourite">Mumbai Favourite</option>
          <option value="Paneer Dishes">Paneer Dishes</option>
          <option value="Paneer Rice">Paneer Rice</option>
        </select>
      </div>

      {/* ── DESKTOP: Table ── */}
      <div className="menu-table-wrap">
        <table className="menu-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredMenus.map((m) => (
              <tr key={m._id}>
                <td>
                  {m.image ? (
                    <img src={m.image} alt={m.name} style={{ width: 56, height: 56, objectFit: "cover", borderRadius: 8 }} />
                  ) : (
                    <div style={{ width: 56, height: 56, background: "#f0e8cc", borderRadius: 8 }} />
                  )}
                </td>
                <td style={{ fontWeight: 600, color: "#3D4F1C" }}>{m.name}</td>
                <td style={{ color: "#555" }}>{m.category}</td>
                <td>
                  <button onClick={() => handleDelete(m._id)} style={{ color: "#dc2626", fontWeight: 600, background: "none", border: "none", cursor: "pointer", fontSize: 13 }}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── MOBILE: Cards ── */}
      <div className="menu-cards">
        {filteredMenus.map((m) => (
          <div key={m._id} className="menu-card">
            {m.image ? (
              <img src={m.image} alt={m.name} className="menu-card-img" />
            ) : (
              <div className="menu-card-img-placeholder">🍽️</div>
            )}
            <div className="menu-card-info">
              <div className="menu-card-name">{m.name}</div>
              <div className="menu-card-cat">{m.category}</div>
              <button onClick={() => handleDelete(m._id)} className="menu-card-delete">
                Delete
              </button>
            </div>
          </div>
        ))}

        {filteredMenus.length === 0 && (
          <div style={{ textAlign: "center", padding: "40px 0", color: "#a09060", fontSize: 14 }}>
            No items found
          </div>
        )}
      </div>
    </div>
  );
}