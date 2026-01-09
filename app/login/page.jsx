"use client";

import { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!form.email || !form.password) {
      setError("All fields are required!");
      return;
    }

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          identifier: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Invalid credentials");
        return;
      }

      window.location.href = "/";
    } catch (err) {
      setError("Server error");
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

          {/* BACK TO HOME */}
          <Link
            href="/"
            className="absolute top-6 left-6 text-sm font-semibold text-purple-700 hover:underline"
          >
            ← Back to Home
          </Link>

          {/* LOGO + TITLE */}
          <div className="flex flex-col items-center mb-4">
            <Image
              src="/logo1.svg"
              alt="CATER4U Logo"
              width={240}
              height={240}
              className="mb-1"
            />
            <h1 className="text-4xl font-bold leading-tight">CATER4U</h1>
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

            {/* Forgot */}
            <div className="text-center mb-3">
              <Link
                href="/forgot"
                className="text-purple-700 font-semibold hover:underline"
              >
                Forget Password?
              </Link>
            </div>

            {/* Error */}
            {error && (
              <p className="text-red-600 text-center mb-4 font-semibold">
                {error}
              </p>
            )}

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-purple-700 text-white py-3 rounded-xl font-bold hover:bg-purple-600 transition"
            >
              LOGIN
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
