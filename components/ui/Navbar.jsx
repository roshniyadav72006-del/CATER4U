"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    setOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    router.push("/login");
  };

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
          box-shadow: 0 0 8px #f0c040, 0 0 18px #ff6b00;
          transition: width 0.35s ease;
        }
        .nav-link:hover { 
          color: #f0c040 !important; 
          text-shadow: 0 0 10px rgba(240,192,64,0.7); 
        }
        .nav-link:hover::after { width: 100%; }

        .logo-img {
          transition: all 0.4s ease;
        }
      `}</style>

      {/* LOGO */}
      <div
        className={`fixed z-50 transition-all duration-500 ${
          scrolled
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

            {/* PROFILE */}
            <li className="relative">
              <button
                onClick={() => setOpen(!open)}
                className={`${textColor} text-xl`}
              >
                Profile
              </button>

              {open && (
                <div className="absolute right-0 mt-2 bg-black/90 border border-white/20 rounded-md w-40 text-white">
                  {!isLoggedIn ? (
                    <>
                      <Link href="/login" className="block px-4 py-2">Login</Link>
                      <Link href="/register" className="block px-4 py-2">Register</Link>
                    </>
                  ) : (
                    <>
                      <Link href="/profile" className="block px-4 py-2">My Profile</Link>
                      <button onClick={logout} className="w-full text-left px-4 py-2">Logout</button>
                    </>
                  )}
                </div>
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
                <>
                  <li><Link href="/profile">Profile</Link></li>
                  <li><button onClick={logout}>Logout</button></li>
                </>
              )}
            </ul>
          </div>
        )}
      </nav>
    </>
  );
}