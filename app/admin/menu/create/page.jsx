"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateMenuPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", category: "", price: "", description: "" });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    await fetch("/api/menu", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    router.push("/admin/menu");
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Add Menu Item</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input name="category" placeholder="Category" value={form.category} onChange={handleChange} />
        <input type="number" name="price" placeholder="Price" value={form.price} onChange={handleChange} required />
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange}></textarea>
        <button type="submit" className="bg-purple-700 text-white px-4 py-2 rounded">Add Menu</button>
      </form>
    </div>
  );
}
