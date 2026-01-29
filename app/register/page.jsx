"use client";

import React, { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [checkingEmail, setCheckingEmail] = useState(false);
  const [loading, setLoading] = useState(false);

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z-]+\.[a-zA-Z]{2,}$/;
  const phoneRegex = /^[6-9]\d{9}$/;

  // 🔍 LIVE EMAIL CHECK
  const checkEmailExists = async (email) => {
    if (!emailRegex.test(email)) return;

    setCheckingEmail(true);
    setEmailError("");

    try {
      const res = await fetch("/api/check-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (data.exists) {
        setEmailError("Email already exists");
        toast.error("Email already exists. Please login.");
      }
    } catch {
    } finally {
      setCheckingEmail(false);
    }
  };

  // 🔥 REGISTER SUBMIT (OTP FLOW – SAME LOGIC)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !email || !password || !confirmPassword || !phone || !address) {
      toast.error("All fields are required");
      return;
    }

    if (!emailRegex.test(email)) {
      toast.error("Invalid email address");
      return;
    }

    if (emailError) {
      toast.error(emailError);
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!phoneRegex.test(phone)) {
      toast.error("Invalid phone number");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/register", {
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

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("verifyEmail", email.toLowerCase());

        toast.success("OTP sent to your email 📧", {
          description: "Enter OTP to verify your email",
        });

        setTimeout(() => {
          window.location.href = "/email-verify";
        }, 1500);
      } else {
        toast.error(data.error || "Registration failed");
      }
    } catch {
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };

  const isDisabled =
    !username ||
    !email ||
    !password ||
    !confirmPassword ||
    !phone ||
    !address ||
    !!emailError ||
    loading;

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-0">
      <div className="flex w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden">

        {/* LEFT FORM */}
        <div className="flex-1 p-10 relative">
          <Link href="/" className="absolute top-6 left-6 text-sm font-semibold text-accent">
            ← Back to Home
          </Link>

          {/* LOGO */}
          <div className="flex justify-center mb-2">
            <img src="/logo1.svg" alt="CATER4U Logo" className="h-16" />
          </div>

          <h1 className="text-4xl font-bold text-center mb-2">CATER4U</h1>
          <h2 className="text-3xl text-center mb-8">REGISTER</h2>

          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full py-3 px-4 border rounded-lg"
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError("");
              }}
              onBlur={() => checkEmailExists(email)}
              className="w-full py-3 px-4 border rounded-lg"
            />

            {checkingEmail && (
              <p className="text-xs text-gray-500">Checking email…</p>
            )}

            {/* PASSWORD */}
            <div className="relative">
              <input
                key={showPassword ? "text" : "password"}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full py-3 px-4 pr-14 border rounded-lg"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2"
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={showPassword ? "eye-off" : "eye"}
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="text-xl text-gray-600 hover:text-purple-700"
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </motion.span>
                </AnimatePresence>
              </button>
            </div>

            {/* CONFIRM PASSWORD */}
            <div className="relative">
              <input
                key={showConfirmPassword ? "text2" : "password2"}
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full py-3 px-4 pr-14 border rounded-lg"
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2"
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={showConfirmPassword ? "eye-off2" : "eye2"}
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="text-xl text-gray-600 hover:text-purple-700"
                  >
                    {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                  </motion.span>
                </AnimatePresence>
              </button>
            </div>

            <input
              type="tel"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full py-3 px-4 border rounded-lg"
            />

            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full py-3 px-4 border rounded-lg"
            />

            <button
              type="submit"
              disabled={isDisabled}
              className="w-full bg-accent text-white py-3 rounded-lg font-bold disabled:bg-gray-300"
            >
              {loading ? "Registering ⏳" : "Register"}
            </button>
          </form>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex-1 bg-accent text-white flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold mb-4">Welcome Back!</h1>
          <p className="mb-6">Already have an account?</p>
          <Link
            href="/login"
            className="bg-white text-accent px-6 py-2 rounded-full font-bold"
          >
            LOGIN
          </Link>
        </div>

      </div>
    </div>
  );
}
