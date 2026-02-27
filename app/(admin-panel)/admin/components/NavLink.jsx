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

export default function NavLink({ href, icon, children, isOpen }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  const Icon = iconMap[icon];

  return (
    <Link
      href={href}
      className={`flex items-center ${
        isOpen ? "justify-start gap-3 px-4" : "justify-center"
      } py-3 rounded-xl transition-all duration-300 group
        ${
          isActive
            ? "bg-cyan-500/20 text-cyan-400 shadow-[0_0_15px_#06b6d4] font-semibold"
            : "text-gray-400 hover:bg-cyan-500/10 hover:text-cyan-300"
        }`}
    >
      {Icon && <Icon size={20} />}

      {/* Text Hide / Show */}
      <span
        className={`transition-all duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 w-0 overflow-hidden"
        }`}
      >
        {children}
      </span>
    </Link>
  );
}