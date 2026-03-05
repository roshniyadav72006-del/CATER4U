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
          ? "bg-[#054b25]/15 text-[#8B9D3A] font-semibold"
          : "text-gray-600 hover:bg-[#8B9D3A]/10 hover:text-[#8B9D3A]"
        }`}
    >
      {Icon && <Icon size={20} />}

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