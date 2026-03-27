"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateMenuPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    category: "",
    image: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("category", form.category);
      if (form.image) formData.append("image", form.image);

      const res = await fetch("/api/admin/menu", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Failed to create menu");
      }

      // reset form (optional but pro)
      setForm({ name: "", category: "", image: null });

      router.push("/admin/menu");

    } catch (error) {
      console.error(error);
      alert("Error creating menu");
    }
  };

  return (
    <div className="min-h-screen bg-[#F5E6B3] flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg">

        <h1 className="text-3xl font-bold mb-6 text-[#3D4F1C] text-center">
          Create Menu
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            type="text"
            placeholder="Menu Name"
            required
            value={form.name}
            className="border border-[#556B2F] focus:ring-2 focus:ring-[#D4AF37] outline-none p-3 w-full rounded"
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <select
            required
            value={form.category}
            className="border border-[#556B2F] focus:ring-2 focus:ring-[#D4AF37] outline-none p-3 w-full rounded bg-white"
            onChange={(e) =>
              setForm({ ...form, category: e.target.value })
            }
          >
            <option value="">Select Category</option>
            <option value="Starter">Starter</option>
            <option value="Main Course">Main Course</option>
            <option value="Dessert">Dessert</option>
            <option value="Beverages">Beverages</option>
          </select>

          <input
            type="file"
            accept="image/*"
            className="border border-[#556B2F] p-2 w-full rounded bg-white"
            onChange={(e) =>
              setForm({ ...form, image: e.target.files[0] })
            }
          />

          <div className="flex gap-4">
            <button
              type="submit"
              className="w-1/2 bg-[#556B2F] hover:bg-[#3D4F1C] text-[#D4AF37] font-semibold py-3 rounded-lg transition shadow">
              Save Menu
            </button>

            <button
              type="button"
              onClick={() => router.push("/admin/menu")}
              className="w-1/2 bg-[#556B2F] hover:bg-[#3D4F1C] text-[#D4AF37] font-semibold py-3 rounded-lg transition shadow">
              Cancel
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}