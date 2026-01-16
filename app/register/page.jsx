"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Email regex (proper domain validation)
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z-]+\.[a-zA-Z]{2,}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // 1️⃣ Empty field check
    if (!username || !email || !password || !confirmPassword || !phone || !address) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }

    // 2️⃣ Email validation
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address (example: name@gmail.com)");
      setLoading(false);
      return;
    }

    // 3️⃣ Password match check
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    // 4️⃣ Password length check
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      setLoading(false);
      return;
    }

    // 5️⃣ Indian phone number validation
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phone)) {
      setError("Phone number is invalid.");
      setLoading(false);
      return;
    }

    // 6️⃣ API call
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          email,
          password,
          phone,
          address,
        }),
      });

      if (response.ok) {
        window.location.href = "/login";
      } else {
        const data = await response.json();
        setError(data.message || "Registration failed.");
      }
    } catch (err) {
      setError("Unexpected error. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-0 text-text-primary">
      <div className="flex w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden">

        {/* LEFT — FORM */}
        <div className="flex-1 p-10 flex flex-col justify-center relative">

          {/* BACK TO HOME */}
          <Link
            href="/"
            className="absolute top-6 left-6 text-sm font-semibold text-accent hover:underline"
          >
            ← Back to Home
          </Link>

          {/* LOGO */}
          <div className="flex flex-row items-center justify-center mb-6">
            <img src="/logo1.svg" alt="logo" className="h-14 w-auto" />
            <h1 className="text-4xl font-bold ml-2">CATER4U</h1>
          </div>

          <h2 className="text-3xl font text-center mb-10">REGISTER</h2>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Username */}
            <div className="relative">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-bg-2 rounded-lg bg-bg-1 focus:ring-2 focus:ring-accent outline-none"
              />
              <span className="absolute left-3 top-3 text-text-muted text-xl">👤</span>
            </div>

            {/* Email */}
            <div className="relative">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-bg-2 rounded-lg bg-bg-1 focus:ring-2 focus:ring-accent outline-none"
              />
              <span className="absolute left-3 top-3 text-text-muted text-xl">✉</span>
            </div>

            {/* Password */}
            <div className="relative">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-bg-2 rounded-lg bg-bg-1 focus:ring-2 focus:ring-accent outline-none"
              />
              <span className="absolute left-3 top-3 text-text-muted text-xl">🔒</span>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-bg-2 rounded-lg bg-bg-1 focus:ring-2 focus:ring-accent outline-none"
              />
              <span className="absolute left-3 top-3 text-text-muted text-xl">✔</span>
            </div>

            {/* Phone */}
            <div className="relative">
              <input
                type="tel"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-bg-2 rounded-lg bg-bg-1 focus:ring-2 focus:ring-accent outline-none"
              />
              <span className="absolute left-3 top-3 text-text-muted text-xl">📞</span>
            </div>

            {/* Address */}
            <div className="relative">
              <input
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-bg-2 rounded-lg bg-bg-1 focus:ring-2 focus:ring-accent outline-none"
              />
              <span className="absolute left-3 top-3 text-text-muted text-xl">🏠</span>
            </div>

            {/* Error */}
            {error && (
              <p className="text-red-600 text-sm text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-accent text-white py-3 rounded-lg font-bold uppercase tracking-wide hover:bg-opacity-90 disabled:bg-bg-2 disabled:text-text-muted disabled:cursor-not-allowed transition"
            >
              {loading ? "REGISTERING..." : "REGISTER"}
            </button>
          </form>
        </div>

        {/* RIGHT — LOGIN CTA */}
        <div className="flex flex-1 flex-col items-center justify-center bg-accent text-white p-10">
          <h1 className="text-4xl font-bold mb-4">Welcome Back!</h1>
          <p className="text-lg mb-6">Already have an account?</p>

          <Link
            href="/login"
            className="px-6 py-2 bg-white text-accent rounded-full font-bold text-lg hover:bg-bg-1 transition"
          >
            LOGIN
          </Link>
        </div>

      </div>
    </div>
  );
}
