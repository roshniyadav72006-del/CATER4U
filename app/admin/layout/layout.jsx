import Link from "next/link";
import { usePathname } from "next/navigation";
import { redirect } from "next/navigation";
import { verifyAdmin } from "@/lib/middleware/AdminSession";
import {
  LayoutDashboard,
  ChefHat,
  FolderKanban,
  CheckSquare,
  MessageSquare,
} from "lucide-react";

export default function AdminLayout({ children }) {
  const admin = verifyAdmin();

  if (!admin) {
    redirect("/admin/login");
  }

  const navItems = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Menu", href: "/admin/menu", icon: ChefHat },
    { name: "Categories", href: "/admin/categories", icon: FolderKanban },
    { name: "Bookings", href: "/admin/bookings", icon: CheckSquare },
    { name: "Feedback", href: "/admin/feedback", icon: MessageSquare },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-sm border-r p-6 flex flex-col">
        <h1 className="text-xl font-bold mb-10 text-orange-600">
          Catering Admin
        </h1>

        <nav className="space-y-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-orange-50 hover:text-orange-600 transition"
              >
                <Icon size={18} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto pt-10 text-sm text-gray-500">
          Logged in as <br />
          <span className="font-semibold">{admin.email}</span>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 overflow-auto">
        {children}
      </main>
    </div>
  );
}
