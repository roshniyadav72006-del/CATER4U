"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateMenuPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    category: "",
    status: "Available",
    image: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("category", form.category);
    formData.append("status", form.status);
    if (form.image) formData.append("image", form.image);

    await fetch("/api/admin/menu", {
      method: "POST",
      body: formData,
    });

    router.push("/admin/menu");
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-6">Create Menu</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          className="border p-2 w-full"
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          type="text"
          placeholder="Category"
          className="border p-2 w-full"
          onChange={(e) =>
            setForm({ ...form, category: e.target.value })
          }
        />

        <select
          className="border p-2 w-full"
          onChange={(e) =>
            setForm({ ...form, status: e.target.value })
          }
        >
          <option value="Available">Available</option>
          <option value="Out of Stock">Out of Stock</option>
        </select>

        <input
          type="file"
          onChange={(e) =>
            setForm({ ...form, image: e.target.files[0] })
          }
        />

        <button className="bg-black text-white px-6 py-2 rounded">
          Save
        </button>
      </form>
    </div>
  );
}