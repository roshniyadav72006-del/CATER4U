"use client";

import { useState, useEffect } from "react";
import NavLink from "./components/NavLink";
import LogoutButton from "./components/LogoutButton";

export default function AdminLayout({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // ✅ Detect mobile on mount + resize
  useEffect(() => {
    const check = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      // On mobile, sidebar closed by default
      if (mobile) setIsOpen(false);
      else setIsOpen(true);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const navItems = [
    { name: "Dashboard",               href: "/admin/dashboard", icon: "dashboard"   },
    { name: "Menu",                    href: "/admin/menu",      icon: "menu"        },
    { name: "Manage Event Categories", href: "/admin/events",    icon: "categories"  },
    { name: "Bookings",                href: "/admin/bookings",  icon: "bookings"    },
    { name: "Feedback",                href: "/admin/feedback",  icon: "feedback"    },
  ];

  // Close sidebar when a nav link is clicked on mobile
  const handleNavClick = () => {
    if (isMobile) setIsOpen(false);
  };

  return (
    <div className="flex h-screen bg-white text-[#8B9D3A] overflow-hidden">

      {/* ── MOBILE OVERLAY (dark background behind sidebar) ── */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* ── SIDEBAR ── */}
      <aside
        className={`
          bg-white border-r border-[#8B9D3A]/30 flex flex-col shadow-md
          transition-all duration-300 flex-shrink-0
          ${isMobile
            /* Mobile: fixed overlay, slides in/out */
            ? `fixed top-0 left-0 h-full z-40 w-64
               ${isOpen ? "translate-x-0" : "-translate-x-full"}`
            /* Desktop: inline sidebar, collapses to icon-only */
            : `relative ${isOpen ? "w-64" : "w-20"}`
          }
        `}
      >
        {/* Logo */}
        <div className="p-6 border-b border-[#8B9D3A]/30 flex items-center justify-between">
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
          {/* ✅ Close button inside sidebar on mobile */}
          {isMobile && isOpen && (
            <button
              onClick={() => setIsOpen(false)}
              className="text-[#8B9D3A] text-xl ml-2"
            >
              ✕
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-3 overflow-y-auto">
          {navItems.map((item) => (
            <div key={item.name} onClick={handleNavClick}>
              <NavLink
                href={item.href}
                icon={item.icon}
                isOpen={isOpen}
              >
                {isOpen && item.name}
              </NavLink>
            </div>
          ))}
        </nav>

        {/* Bottom Section */}
        <div className="p-4 border-t border-[#8B9D3A]/30 text-sm">
          {isOpen && (
            <>
              <div className="text-[#D4AF37]">
                Logged in as
                <div className="font-semibold text-[#8B9D3A] mt-1">Admin</div>
              </div>
              <div className="mt-4">
                <LogoutButton />
              </div>
            </>
          )}
        </div>
      </aside>

      {/* ── MAIN CONTENT ── */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Top Navbar */}
        <div className="h-16 flex items-center px-4 md:px-6 border-b border-[#8B9D3A]/30 bg-white flex-shrink-0">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-2xl text-[#8B9D3A] hover:text-[#8B9D3A] transition-colors duration-300"
          >
            ☰
          </button>
        </div>

        {/* Page Content — full width on mobile */}
        <main className="flex-1 overflow-y-auto bg-white">
          <div className="p-4 md:p-8">
            {children}
          </div>
        </main>

      </div>
    </div>
  );
}