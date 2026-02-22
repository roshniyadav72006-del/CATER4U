import { verifyAdmin } from "../../../lib/middleware/AdminSession";
import { redirect } from "next/navigation";
import Link from "next/link";

async function getMenus() {
  const admin = verifyAdmin();
  if (!admin) redirect("/admin/login");

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/menu`, { cache: "no-store" });
  return res.ok ? res.json() : [];
}

export default async function AdminMenuPage() {
  const menus = await getMenus();

  async function handleDelete(id) {
    const confirmed = confirm("Delete this menu item?");
    if (!confirmed) return;

    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/menu`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    window.location.reload(); // refresh page after delete
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Menu Management</h1>

      <Link href="/admin/menu/create" className="bg-purple-700 text-white px-4 py-2 rounded mb-4 inline-block">
        + Add New Menu
      </Link>

      <table className="w-full bg-white shadow rounded-xl overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3">Name</th>
            <th className="p-3">Category</th>
            <th className="p-3">Price</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {menus.map((m) => (
            <tr key={m._id} className="border-t hover:bg-gray-50 transition">
              <td className="p-3">{m.name}</td>
              <td className="p-3">{m.category}</td>
              <td className="p-3">₹{m.price}</td>
              <td className="p-3 flex gap-2">
                <Link href={`/admin/menu/${m._id}`} className="text-blue-600 hover:underline">Edit</Link>
                <button onClick={() => handleDelete(m._id)} className="text-red-600 hover:underline">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
