"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ChefHat,
  FolderKanban,
  CheckSquare,
  MessageSquare,
} from "lucide-react";

const iconMap = {
  dashboard: LayoutDashboard,
  menu: ChefHat,
  categories: FolderKanban,
  bookings: CheckSquare,
  feedback: MessageSquare,
};

export default function NavLink({ href, icon, children }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  const Icon = iconMap[icon];

  return (
    <Link
      href={href}
      className={`flex items-center gap-3 p-2 rounded-lg transition
        ${
          isActive
            ? "bg-orange-100 text-orange-600 font-semibold"
            : "hover:bg-gray-100"
        }`}
    >
      {Icon && <Icon size={18} />}
      {children}
    </Link>
  );
}