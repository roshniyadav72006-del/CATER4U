"use client";

import { useState, useEffect } from "react";
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

  const textColor = scrolled ? "text-white" : isHome ? "text-white" : "text-black";

  return (
    <>
      <style>{`
        /* Navbar slide-down on mount */
        @keyframes navSlideDown {
          from { transform: translateY(-100%); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
        .nav-enter {
          animation: navSlideDown 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        /* Nav links stagger in */
        @keyframes linkFadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .nav-link-item {
          opacity: 0;
          animation: linkFadeIn 0.5s ease forwards;
        }
        .nav-link-item:nth-child(1) { animation-delay: 0.2s; }
        .nav-link-item:nth-child(2) { animation-delay: 0.3s; }
        .nav-link-item:nth-child(3) { animation-delay: 0.4s; }
        .nav-link-item:nth-child(4) { animation-delay: 0.5s; }
        .nav-link-item:nth-child(5) { animation-delay: 0.6s; }

        /* Neon hover underline */
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
          transition: width 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          border-radius: 2px;
        }
        .nav-link:hover { color: #f0c040 !important; text-shadow: 0 0 10px rgba(240,192,64,0.7); }
        .nav-link:hover::after { width: 100%; }

        /* Profile button same style */
        .profile-btn {
          position: relative;
          transition: color 0.3s ease;
          padding-bottom: 4px;
          background: none; border: none; cursor: pointer;
        }
        .profile-btn::after {
          content: '';
          position: absolute;
          bottom: -2px; left: 0;
          width: 0%; height: 1.5px;
          background: linear-gradient(90deg, #f0c040, #ff6b00);
          box-shadow: 0 0 8px #f0c040;
          transition: width 0.35s ease;
          border-radius: 2px;
        }
        .profile-btn:hover { color: #f0c040 !important; text-shadow: 0 0 10px rgba(240,192,64,0.7); }
        .profile-btn:hover::after { width: 100%; }

        /* Logo hover glow */
        .logo-img {
          transition: all 0.3s ease;
        }
        .logo-img:hover {
          filter: drop-shadow(0 0 12px rgba(240,192,64,0.55));
          transform: scale(1.04);
        }

        /* Dropdown */
        .dropdown-item {
          transition: all 0.25s ease;
          position: relative;
          overflow: hidden;
        }
        .dropdown-item::before {
          content: '';
          position: absolute;
          left: 0; top: 0;
          height: 100%; width: 2px;
          background: linear-gradient(180deg, #f0c040, #ff6b00);
          box-shadow: 0 0 6px #f0c040;
          transform: scaleY(0);
          transition: transform 0.25s ease;
        }
        .dropdown-item:hover::before { transform: scaleY(1); }
        .dropdown-item:hover {
          background: rgba(240,192,64,0.08) !important;
          color: #f0c040 !important;
          padding-left: 20px;
        }

        /* Mobile menu slide + fade */
        @keyframes mobileMenuOpen {
          from { opacity: 0; transform: translateY(-16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .mobile-menu-enter {
          animation: mobileMenuOpen 0.35s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        /* Mobile links stagger */
        @keyframes mobileLinkIn {
          from { opacity: 0; transform: translateX(-20px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .mobile-link-item {
          opacity: 0;
          animation: mobileLinkIn 0.4s ease forwards;
        }
        .mobile-link-item:nth-child(1) { animation-delay: 0.05s; }
        .mobile-link-item:nth-child(2) { animation-delay: 0.1s; }
        .mobile-link-item:nth-child(3) { animation-delay: 0.15s; }
        .mobile-link-item:nth-child(4) { animation-delay: 0.2s; }
        .mobile-link-item:nth-child(5) { animation-delay: 0.25s; }
        .mobile-link-item:nth-child(6) { animation-delay: 0.3s; }

        .mobile-link {
          transition: all 0.25s ease;
          padding: 6px 20px;
          border-radius: 4px;
          display: block;
        }
        .mobile-link:hover {
          color: #f0c040;
          text-shadow: 0 0 10px rgba(240,192,64,0.7);
          background: rgba(240,192,64,0.06);
        }

        /* Hamburger animated */
        .ham-line {
          display: block;
          height: 2px;
          background: currentColor;
          border-radius: 2px;
          transition: all 0.3s ease;
          transform-origin: center;
        }
        .ham-btn:hover .ham-line {
          background: #f0c040;
          box-shadow: 0 0 6px rgba(240,192,64,0.7);
        }
      `}</style>

      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 nav-enter
          ${scrolled
            ? "bg-black/80 backdrop-blur-md border-b border-white/10"
            : "bg-transparent"
          }
        `}
      >
        <div className={`max-w-7xl mx-auto px-6 flex items-center justify-between ${scrolled ? "py-2" : "py-4"} transition-all`}>

          {/* LOGO — bigger, no "Cater4U" text */}
          <Link href="/" className="flex items-center">
            <img
              src="/Flogo.svg"
              alt="Cater4U Logo"
              className={`logo-img transition-all ${scrolled ? "h-20" : "h-28"}`}
            />
          </Link>

          {/* DESKTOP MENU */}
          <ul className={`hidden md:flex gap-12 ${textColor} text-lg font-medium`}>
            {[
              { href: "/",        label: "Home" },
              { href: "/about",   label: "About" },
              { href: "/contact", label: "Contact" },
              { href: "/booking", label: "Booking" },
            ].map(({ href, label }) => (
              <li key={href} className="nav-link-item">
                <Link href={href} className={`nav-link ${pathname === href ? "!text-yellow-400" : ""}`}>
                  {label}
                </Link>
              </li>
            ))}

            {/* PROFILE */}
            <li className="relative nav-link-item">
              <button
                onClick={() => setOpen(!open)}
                className={`profile-btn ${textColor} text-lg font-medium`}
              >
                Profile
              </button>

              {open && (
                <div className="absolute right-0 mt-2 bg-black/90 border border-white/20 rounded-md w-40 text-white overflow-hidden">
                  {!isLoggedIn ? (
                    <>
                      <Link href="/login"    className="dropdown-item block px-4 py-2">Login</Link>
                      <Link href="/register" className="dropdown-item block px-4 py-2">Register</Link>
                    </>
                  ) : (
                    <>
                      <Link href="/profile"  className="dropdown-item block px-4 py-2">My Profile</Link>
                      <button onClick={logout} className="dropdown-item w-full text-left px-4 py-2">Logout</button>
                    </>
                  )}
                </div>
              )}
            </li>
          </ul>

          {/* MOBILE HAMBURGER */}
          <button
            className={`md:hidden ham-btn ${textColor} flex flex-col justify-between w-7 h-5`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span className="ham-line" style={mobileOpen ? { transform: "rotate(45deg) translate(3px, 3px)" } : {}} />
            <span className="ham-line" style={mobileOpen ? { opacity: 0, transform: "translateX(-8px)" } : {}} />
            <span className="ham-line" style={mobileOpen ? { transform: "rotate(-45deg) translate(3px, -3px)" } : {}} />
          </button>
        </div>

        {/* MOBILE MENU — only on mobile (md:hidden) */}
        {mobileOpen && (
          <div className="md:hidden bg-black/90 mobile-menu-enter">
            <ul className="flex flex-col items-center gap-4 py-6 text-white text-lg">
              <li className="mobile-link-item w-full text-center">
                <Link href="/"        className="mobile-link">Home</Link>
              </li>
              <li className="mobile-link-item w-full text-center">
                <Link href="/about"   className="mobile-link">About</Link>
              </li>
              <li className="mobile-link-item w-full text-center">
                <Link href="/contact" className="mobile-link">Contact</Link>
              </li>
              <li className="mobile-link-item w-full text-center">
                <Link href="/booking" className="mobile-link">Booking</Link>
              </li>

              {!isLoggedIn ? (
                <>
                  <li className="mobile-link-item w-full text-center">
                    <Link href="/login"    className="mobile-link">Login</Link>
                  </li>
                  <li className="mobile-link-item w-full text-center">
                    <Link href="/register" className="mobile-link">Register</Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="mobile-link-item w-full text-center">
                    <Link href="/profile"  className="mobile-link">My Profile</Link>
                  </li>
                  <li className="mobile-link-item w-full text-center">
                    <button onClick={logout} className="mobile-link">Logout</button>
                  </li>
                </>
              )}
            </ul>
          </div>
        )}
      </nav>
    </>
  );
}