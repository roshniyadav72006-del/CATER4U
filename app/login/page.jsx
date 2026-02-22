"use client";

import { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

export default function LoginPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.email || !form.password) {
      toast.error("All fields are required");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();

      // 🔴 LOGIN FAILED
      if (!res.ok) {
        if (res.status === 403) {
          toast.error("Please verify your email using OTP");

          setTimeout(() => {
            window.location.href = "/verify-otp";
          }, 1500);
          return;
        }

        toast.error(data.error || "Invalid credentials");
        return;
      }

      // 🟢 LOGIN SUCCESS
      toast.success("Login successful 🎉");

      // ✅ Store token and userId
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.user.id);

      // Redirect to profile page
      setTimeout(() => {
        window.location.href = "/profile";
      }, 1200);

    } catch (err) {
      toast.error("Server error. Try again later.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 p-6">
      <div className="flex w-[900px] max-w-full min-h-[520px] bg-white shadow-xl rounded-[28px] overflow-hidden">

        {/* LEFT SIDE */}
        <div className="w-[45%] bg-gradient-to-b from-purple-700 to-purple-500 text-white flex flex-col items-center justify-center gap-4 p-10">
          <h1 className="text-4xl font-bold">Welcome Back</h1>
          <p className="opacity-90">Don't have an account?</p>

          <Link
            href="/register"
            className="bg-white text-purple-700 px-6 py-2 rounded-xl font-bold hover:underline"
          >
            Register
          </Link>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-[55%] p-8 flex flex-col justify-center relative">

          <Link
            href="/"
            className="absolute top-6 left-6 text-sm font-semibold text-purple-700 hover:underline"
          >
            ← Back to Home
          </Link>

          <div className="flex flex-col items-center mb-4">
            <Image
              src="/logo1.svg"
              alt="CATER4U Logo"
              width={240}
              height={240}
              className="mb-1"
            />
            <h1 className="text-4xl font-bold">CATER4U</h1>
          </div>

          <h2 className="text-2xl font-bold text-center mb-6">LOGIN</h2>

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className="flex items-center gap-3 bg-gray-300 px-4 py-3 rounded-xl mb-4">
              <FaUser className="text-gray-700" />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                className="bg-transparent outline-none w-full"
                value={form.email}
                onChange={handleChange}
              />
            </div>

            {/* Password */}
            <div className="flex items-center gap-3 bg-gray-300 px-4 py-3 rounded-xl mb-3">
              <FaLock className="text-gray-700" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="bg-transparent outline-none w-full"
                value={form.password}
                onChange={handleChange}
              />
            </div>

            <div className="text-center mb-4">
              <Link
                href="/forgot"
                className="text-purple-700 font-semibold hover:underline"
              >
                Forget Password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-700 text-white py-3 rounded-xl font-bold hover:bg-purple-600 transition disabled:opacity-60"
            >
              {loading ? "Logging in..." : "LOGIN"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}