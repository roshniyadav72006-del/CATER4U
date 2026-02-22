"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Menu", path: "/admin/menu" },
    { name: "Categories", path: "/admin/categories" },
    { name: "Bookings", path: "/admin/bookings" },
  ];

  return (
    <div className="w-64 h-screen bg-slate-900 text-white fixed">
      <div className="p-6 text-2xl font-bold border-b border-slate-700">
        Catering Pro
      </div>

      <nav className="mt-6">
        {menuItems.map((item) => (
          <Link key={item.path} href={item.path}>
            <div
              className={`px-6 py-3 cursor-pointer hover:bg-blue-600 transition ${
                pathname === item.path ? "bg-blue-600" : ""
              }`}
            >
              {item.name}
            </div>
          </Link>
        ))}
      </nav>
    </div>
  );
}
