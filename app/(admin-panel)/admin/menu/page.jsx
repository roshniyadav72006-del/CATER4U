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

  // Filtered Menus
  const filteredMenus = selectedCategory
    ? menus.filter((m) => m.category === selectedCategory)
    : menus;

  return (
    <div className="p-10 bg-[#F5E6B3] min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-[#3D4F1C]">
        Menu Management
      </h1>

      <div className="flex items-center justify-between mb-4">
        <Link
          href="/admin/menu/create"
          className="bg-[#556B2F] hover:bg-[#3D4F1C] text-[#D4AF37] font-semibold px-5 py-2 rounded shadow transition" >
          + Add New
        </Link>

        {/* ✅ Category Dropdown Filter */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="bg-[#556B2F] hover:bg-[#3D4F1C] text-[#D4AF37] font-semibold px-5 py-2 rounded shadow transition" >
          
          <option value="">All Categories</option>
          <option value="Breakfast">Welcome drink </option>
          <option value="Lunch">Starter</option>
          <option value="Dinner">Soups</option>
          <option value="Snacks">Main Course</option>
          <option value="Drinks">Dessert</option>
        </select>
      </div>

      <table className="w-full mt-6 shadow rounded overflow-hidden">
        <thead className="bg-[#556B2F] text-[#D4AF37]">
          <tr>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Category</th>
            <th className="p-3 text-left">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {filteredMenus.map((m) => (
            <tr key={m._id} className="border-t hover:bg-[#F5E6B3] transition">
              <td className="p-3 font-medium text-[#3D4F1C]">
                {m.name}
              </td>
              <td className="p-3 text-gray-700">
                {m.category}
              </td>
              <td className="p-3">
                <button
                  onClick={() => handleDelete(m._id)}
                  className="text-red-600 hover:text-red-800 font-semibold"
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