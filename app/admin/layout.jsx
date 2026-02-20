import { redirect } from "next/navigation";
import { verifyAdmin } from "../../lib/middleware/AdminSession";
import NavLink from "./NavLink";

export default async function AdminLayout({ children }) {
  const admin = await verifyAdmin();

  if (!admin) {
    redirect("/admin/login");
  }

  const navItems = [
    { name: "Dashboard", href: "/admin/dashboard", icon: "dashboard" },
    { name: "Menu", href: "/admin/menu", icon: "menu" },
    { name: "Categories", href: "/admin/categories", icon: "categories" },
    { name: "Bookings", href: "/admin/bookings", icon: "bookings" },
    { name: "Feedback", href: "/admin/feedback", icon: "feedback" },
  ];

  return (
    <div className="flex h-screen bg-slate-100">

      {/* Sidebar */}
      <aside className="w-64 bg-white border-r shadow-sm flex flex-col">
        
        <div className="p-6 border-b">
          <h1 className="text-xl font-bold text-orange-600">
            Catering Admin
          </h1>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              href={item.href}
              icon={item.icon}
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t text-sm text-gray-500">
          Logged in as
          <div className="font-semibold text-gray-700">
            {admin.email}
          </div>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto p-8">
        {children}
      </main>
    </div>
  );
}