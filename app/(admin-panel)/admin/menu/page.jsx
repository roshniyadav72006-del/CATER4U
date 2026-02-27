"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminMenuPage() {
  const [menus, setMenus] = useState([]);

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

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Menu Management</h1>

      <Link
        href="/admin/menu/create"
        className="bg-purple-700 text-white px-4 py-2 rounded"
      >
        + Add New
      </Link>

      <table className="w-full bg-white mt-6 shadow rounded">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3">Name</th>
            <th className="p-3">Category</th>
            <th className="p-3">Status</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {menus.map((m) => (
            <tr key={m._id} className="border-t">
              <td className="p-3">{m.name}</td>
              <td className="p-3">{m.category}</td>
              <td className="p-3">{m.status}</td>
              <td className="p-3">
                <button
                  onClick={() => handleDelete(m._id)}
                  className="text-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}