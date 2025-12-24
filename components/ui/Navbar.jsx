"use client";

import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">

        {/* Logo + Name */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="CATER4U Logo"
            width={40}
            height={40}
            className="object-contain"
          />
          <span className="text-xl font-bold text-purple-700">
            CATER4U
          </span>
        </Link>

        {/* Menu Links */}
        <div className="flex gap-6 text-gray-700 font-medium">
          <Link href="/" className="hover:text-purple-600">
            Home
          </Link>
          <Link href="/about" className="hover:text-purple-600">
            About
          </Link>
          <Link href="/menu" className="hover:text-purple-600">
            Menu
          </Link>
          <Link href="/contact" className="hover:text-purple-600">
            Contact
          </Link>
        </div>

        {/* Auth Buttons */}
        <div className="flex gap-3">
          <Link
            href="/login"
            className="px-4 py-2 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Register
          </Link>
        </div>

      </div>
    </nav>
  );
}
