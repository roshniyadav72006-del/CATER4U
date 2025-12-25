import Link from "next/link";
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-purple-900 via-purple-800 to-purple-900 text-gray-200 mt-16">

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">
            CATER4U
          </h2>
          <p className="text-sm text-gray-300 mb-4">
            Premium catering for weddings & events.
          </p>

          {/* Social Icons */}
          <div className="flex gap-3">
            <a href="#" className="text-blue-500 hover:scale-110 transition">
              <Facebook size={20} />
            </a>
            <a href="#" className="text-pink-500 hover:scale-110 transition">
              <Instagram size={20} />
            </a>
            <a href="#" className="text-sky-400 hover:scale-110 transition">
              <Twitter size={20} />
            </a>
            <a href="#" className="text-blue-400 hover:scale-110 transition">
              <Linkedin size={20} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/" className="hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-white">
                About
              </Link>
            </li>
            <li>
              <Link href="/menu" className="hover:text-white">
                Menu
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">
            Contact
          </h3>
          <p className="text-sm">📞 +91 98765 43210</p>
          <p className="text-sm">✉️ info@cater4u.com</p>
          <p className="text-sm">📍 Mumbai</p>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/20 text-center py-3 text-xs text-gray-300">
        © {new Date().getFullYear()} CATER4U. All rights reserved.
      </div>
    </footer>
  );
}
