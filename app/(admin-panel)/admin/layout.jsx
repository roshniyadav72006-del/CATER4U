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
    <div className="flex h-screen bg-white text-[#8B9D3A]">

      {/* Sidebar */}
      <aside
        className={`${
          isOpen ? "w-64" : "w-20"
        } bg-white border-r border-[#8B9D3A]/30 flex flex-col shadow-md transition-all duration-300`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-[#8B9D3A]/30">
          <h1 className="text-xl font-bold tracking-wide">
            {isOpen ? (
              <>
                <span className="text-[#8B9D3A]">Chandani</span>{" "}
                <span className="text-[#8B9D3A]">Catering</span>
              </>
            ) : (
              <span className="text-[#8B9D3A]">CC</span>
            )}
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
        <div className="p-4 border-t border-[#8B9D3A]/30 text-sm">
          {isOpen && (
            <>
              <div className="text-[#D4AF37]">
                Logged in as
                <div className="font-semibold text-[#8B9D3A] mt-1">
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
        <div className="h-16 flex items-center px-6 border-b border-[#8B9D3A]/30 bg-white">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-2xl text-[#8B9D3A] hover:text-[#8B9D3A] transition-colors duration-300"
          >
            ☰
          </button>
        </div>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-8 bg-white">
          {children}
        </main>

      </div>
    </div>
  );
}