"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ USER + TOKEN LOAD
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    setIsLoggedIn(!!token);

    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const textColor = scrolled
    ? "text-white"
    : isHome
    ? "text-white"
    : "text-black";

  return (
    <>
      {/* STYLE */}
      <style>{`
        .nav-link {
          position: relative;
          transition: color 0.3s ease;
          padding-bottom: 4px;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px; left: 0;
          width: 0%; height: 1.5px;
          background: linear-gradient(90deg, #f0c040, #ff6b00);
          transition: width 0.35s ease;
        }
        .nav-link:hover { 
          color: #f0c040 !important; 
        }
        .nav-link:hover::after { width: 100%; }
      `}</style>

      {/* LOGO */}
      <div
        className={`fixed z-50 transition-all duration-500 ${
        mobileOpen
          ? "opacity-0 pointer-events-none" 
          :scrolled
            ? "top-2 opacity-0 md:opacity-100 md:left-10"
            : "top-0 opacity-100 left-1/2 -translate-x-1/2 md:left-10 md:translate-x-0"
        }`}
      >
       <Link href="/">
       <Image
         src="https://res.cloudinary.com/dpgubcyaq/image/upload/v1774555385/Logo_z7wsgh.svg"
         alt="Logo"
         width={120}
          height={120}
            style={{ width: "auto", height: scrolled ? 56 : 112 }}
           className="logo-img transition-all duration-300"
           loading="eager"
           priority
          />
        </Link>
      </div>

      {/* NAVBAR */}
      <nav
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          scrolled
            ? "bg-black/80 backdrop-blur-md border-b border-white/10"
            : "bg-transparent"
        }`}
      >
        <div
          className={`max-w-7xl mx-auto px-6 flex items-center justify-end ${
            scrolled ? "py-2" : "py-4"
          }`}
        >
          {/* DESKTOP MENU */}
          <ul className={`hidden md:flex gap-12 ${textColor} text-xl font-medium`}>
            <li><Link href="/" className="nav-link">Home</Link></li>
            <li><Link href="/about" className="nav-link">About</Link></li>
            <li><Link href="/contact" className="nav-link">Contact</Link></li>
            <li><Link href="/menu" className="nav-link">Menu</Link></li>
            <li><Link href="/booking" className="nav-link">Booking</Link></li>
            <li><Link href="/feedback"className="nav-link" > Feedback</Link></li>

            {/* ✅ AVATAR (DIRECT PROFILE) */}
            <li>
              {isLoggedIn ? (
                <img
                  src={
                    user?.image ||
                    "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  }
                  alt="User"
                  onClick={() => router.push("/profile")}
                  className="w-10 h-10 rounded-full object-cover border-2 border-yellow-400 cursor-pointer hover:scale-105 transition"
                />
              ) : (
                <span
                  onClick={() => router.push("/login")}
                  className={`${textColor} text-xl cursor-pointer`}
                >
                  Profile
                </span>
              )}
            </li>
          </ul>

          {/* MOBILE MENU BUTTON */}
          <button
            className={`md:hidden ${textColor}`}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            ☰
          </button>
        </div>

        {/* MOBILE MENU */}
        {mobileOpen && (
          <div className="md:hidden bg-black/90">
            <ul className="flex flex-col items-center gap-4 py-6 text-white text-lg">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/menu">Menu</Link></li>
              <li><Link href="/booking">Booking</Link></li>

              {!isLoggedIn ? (
                <>
                  <li><Link href="/login">Login</Link></li>
                  <li><Link href="/register">Register</Link></li>
                </>
              ) : (
                <li>
                  <Link href="/profile">Profile</Link>
                </li>
              )}
            </ul>
          </div>
        )}
      </nav>
    </>
  );
}