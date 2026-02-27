"use client";

import { useState } from "react";
import NavLink from "./components/NavLink";
import LogoutButton from "./components/LogoutButton";

export default function AdminLayout({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  const navItems = [
    { name: "Dashboard", href: "/admin/dashboard", icon: "dashboard" },
    { name: "Menu", href: "/admin/menu", icon: "menu" },
    { name: "Manage Event Categories", href: "/admin/events", icon: "categories" },
    { name: "Bookings", href: "/admin/bookings", icon: "bookings" },
    { name: "Feedback", href: "/admin/feedback", icon: "feedback" },
  ];

  return (
    <div className="flex h-screen bg-[#0f0f1b] text-white">

      {/* Sidebar */}
      <aside
        className={`${
          isOpen ? "w-64" : "w-20"
        } bg-[#151528] border-r border-[#b026ff]/30 flex flex-col shadow-lg shadow-[#b026ff]/10 transition-all duration-300`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-[#b026ff]/20">
          <h1 className="text-xl font-bold text-[#d36bff] tracking-wide">
            {isOpen ? "Chandani Catering Services" : "CA"}
          </h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-3">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              href={item.href}
              icon={item.icon}
              isOpen={isOpen}
            >
              {isOpen && item.name}
            </NavLink>
          ))}
        </nav>

        {/* Bottom Section */}
        <div className="p-4 border-t border-[#b026ff]/20 text-sm text-[#8a8aa3]">
          {isOpen && (
            <>
              <div>
                Logged in as
                <div className="font-semibold text-[#d36bff] mt-1">
                  Admin
                </div>
              </div>

              <div className="mt-4">
                <LogoutButton />
              </div>
            </>
          )}
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">

        {/* Top Navbar */}
        <div className="h-16 flex items-center px-6 border-b border-[#b026ff]/20 bg-[#151528]">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-2xl text-[#d36bff]"
          >
            ☰
          </button>
        </div>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-8 bg-[#0f0f1b]">
          {children}
        </main>

      </div>
    </div>
  );
}