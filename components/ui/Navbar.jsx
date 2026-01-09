"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300
        ${scrolled ? "bg-black/80 backdrop-blur-md" : "bg-transparent"}
      `}
    >
      <div
        className={`max-w-7xl mx-auto px-6 relative flex items-center justify-between
          transition-all duration-300 ${scrolled ? "py-3" : "py-6"}
        `}
      >
        {/* LOGO */}
        <div className="flex items-center gap-4">
          <Image
            src="/logo1.svg"
            alt="Cater4U Logo"
            width={scrolled ? 60 : 90}
            height={scrolled ? 60 : 90}
            className="object-contain transition-all duration-300"
          />
          <div className="leading-tight hidden sm:block">
            <span
              className={`block font-bold tracking-wide text-white transition-all duration-300
                ${scrolled ? "text-lg" : "text-2xl"}
              `}
            >
              CATER4U
            </span>
            {!scrolled && (
              <span className="block text-sm text-white/70">
                Catering Services
              </span>
            )}
          </div>
        </div>

        {/* DESKTOP MENU (TEXT ONLY) */}
        <ul className="hidden md:flex absolute left-1/2 -translate-x-1/2 gap-12 text-white text-lg font-medium">
          <li className="hover:text-yellow-400 transition">
            <Link href="/">Home</Link>
          </li>
          <li className="hover:text-yellow-400 transition">
            <Link href="/about">About</Link>
          </li>
          <li className="hover:text-yellow-400 transition">
            <Link href="/contact">Contact</Link>
          </li>

          {/* PROFILE TEXT */}
          <li className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="hover:text-yellow-400 transition"
            >
              Profile
            </button>

            {open && (
              <div className="absolute top-10 left-0 bg-black/80 backdrop-blur-md
                              border border-white/20 rounded-md w-36">
                <Link
                  href="/login"
                  className="block px-4 py-2 text-sm text-white hover:bg-white/10"
                  onClick={() => setOpen(false)}
                >
                  Login
                </Link>
              </div>
            )}
          </li>
        </ul>

        {/* HAMBURGER (TEXT MENU FOR MOBILE) */}
        <button
          className="md:hidden relative w-8 h-8 text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <span
            className={`absolute h-0.5 w-8 bg-white transition-all duration-300
              ${mobileOpen ? "rotate-45 top-4" : "top-2"}
            `}
          />
          <span
            className={`absolute h-0.5 w-8 bg-white transition-all duration-300 top-4
              ${mobileOpen ? "opacity-0" : "opacity-100"}
            `}
          />
          <span
            className={`absolute h-0.5 w-8 bg-white transition-all duration-300
              ${mobileOpen ? "-rotate-45 top-4" : "top-6"}
            `}
          />
        </button>
      </div>

      {/* MOBILE MENU (TEXT ONLY) */}
      <div
        className={`md:hidden bg-black/90 backdrop-blur-md
          transition-all duration-300 overflow-hidden
          ${mobileOpen ? "max-h-96" : "max-h-0"}
        `}
      >
        <ul className="flex flex-col items-center gap-6 py-6 text-white text-lg">
          <li onClick={() => setMobileOpen(false)}>
            <Link href="/">Home</Link>
          </li>
          <li onClick={() => setMobileOpen(false)}>
            <Link href="/about">About</Link>
          </li>
          <li onClick={() => setMobileOpen(false)}>
            <Link href="/contact">Contact</Link>
          </li>
          <li onClick={() => setMobileOpen(false)}>
            <Link href="/login">Profile</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
