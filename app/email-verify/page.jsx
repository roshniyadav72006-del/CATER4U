"use client";

import { useState } from "react";
import { toast } from "sonner";

export default function VerifyOtpPage() {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [loading, setLoading] = useState(false);

  const email =
    typeof window !== "undefined"
      ? localStorage.getItem("verifyEmail")
      : "";

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // auto focus next
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
    toast.error("Session expired. Please register again.");
    return;
 }


    const otpValue = otp.join("");

    if (otpValue.length !== 6) {
      toast.error("Please enter 6 digit OTP");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          otp: otpValue,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Email verified successfully 🎉");
        localStorage.removeItem("verifyEmail");

        setTimeout(() => {
          window.location.href = "/login";
        }, 1500);
      } else {
        toast.error(data.error || "Invalid OTP");
      }
    } catch {
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    /* 🔥 FIX: FULL SCREEN TOPMOST LAYER */
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow-lg w-[360px] text-center">

        <h2 className="text-2xl font-bold mb-2">Verify Email</h2>
        <p className="text-sm text-gray-600 mb-6">
          Enter the 6 digit OTP sent to your email
        </p>

        <form onSubmit={handleSubmit}>

          {/* OTP INPUTS */}
          <div className="flex justify-between gap-2 mb-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) =>
                  handleChange(e.target.value, index)
                }
                className="w-12 h-12 text-center text-xl border rounded-lg
                  focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-700 text-white py-3 rounded-lg font-bold disabled:opacity-60"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
      </div>
    </div>
  );
}
