"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/ui/Navbar";
import Footer from "../components/ui/Footer";
import AIChatbot from "../components/ui/AIChatbot";
import { usePathname } from "next/navigation";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const pathname = usePathname();

  // 🔹 Navbar hide logic (same as before)
  const hideLayout =
    pathname === "/login" ||
    pathname === "/register" ||
    pathname.startsWith("/admin") ||    
    pathname === "/booking-success" || 
    pathname.startsWith("/admin_login");
   

  // 🔹 ONLY footer hide on profile
  const hideFooter = pathname === "/profile";

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        {!hideLayout && <Navbar />}

        <main className="flex-grow">
          {children}
        </main>

        
        {!hideFooter && !hideLayout && <Footer />}

        
        {!hideLayout && <AIChatbot />}

        <Toaster position="top-right" richColors expand closeButton />
      </body>
    </html>
  );
}