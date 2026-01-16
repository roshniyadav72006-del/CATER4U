"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // close menus on page change
  useEffect(() => {
    setOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300
        ${scrolled ? "bg-black/80 backdrop-blur-md border-b border-white/10" : "bg-transparent"}
      `}
    >
      <div
        className={`max-w-7xl mx-auto px-6 flex items-center justify-between
        ${scrolled ? "py-3" : "py-6"} transition-all`}
      >
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-4">
         <img
         src="/logo1.svg"
         alt="Cater4U Logo"
         className={`transition-all ${scrolled ? "h-12 w-auto" : "h-20 w-auto"}`}
         />

          <span className={`font-bold text-white ${scrolled ? "text-lg" : "text-2xl"}`}>
            CATER4U
          </span>
        </Link>

        {/* DESKTOP MENU */}
        <ul className="hidden md:flex gap-12 text-white text-lg font-medium">
          <li className="hover:text-yellow-400">
            <Link href="/">Home</Link>
          </li>
          <li className="hover:text-yellow-400">
            <Link href="/about">About</Link>
          </li>
          <li className="hover:text-yellow-400">
            <Link href="/contact">Contact</Link>
          </li>

          {/* PROFILE */}
          <li className="relative">
            <button onClick={() => setOpen(!open)} className="hover:text-yellow-400">
              Profile
            </button>

            {open && (
              <div className="absolute right-0 mt-2 bg-black/90 backdrop-blur-md border border-white/20 rounded-md w-40">
                <Link
                  href="/login"
                  className="block px-4 py-2 text-white hover:bg-white/10"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="block px-4 py-2 text-white hover:bg-white/10"
                >
                  Register
                </Link>
              </div>
            )}
          </li>
        </ul>

        {/* MOBILE BUTTON */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="md:hidden bg-black/90 backdrop-blur-md">
          <ul className="flex flex-col items-center gap-6 py-6 text-white text-lg">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="/login">Login</Link></li>
            <li><Link href="/register">Register</Link></li>
          </ul>
        </div>
      )}
    </nav>
  );
}
