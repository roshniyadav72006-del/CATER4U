"use client";
import { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  async function submit() {
    setMsg("");
    setError("");

    const res = await fetch("/api/forgot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    

    const data = await res.json();

    if (!res.ok) return setError(data.message);

    setMsg("Reset link sent to your email!");
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-[90%] max-w-md">

        <h1 className="text-3xl font-bold text-center text-purple-700 mb-6">
          Forgot Password
        </h1>

        <p className="text-center text-gray-600 mb-4">
          Enter your email to receive the reset link
        </p>

        <input
          type="email"
          placeholder="Enter your email"
          className="border w-full p-3 rounded-lg mb-4 focus:outline-purple-600"
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          onClick={submit}
          className="bg-purple-700 hover:bg-purple-600 text-white w-full py-3 rounded-lg text-lg"
        >
          Send Reset Link
        </button>

        {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
        {msg && <p className="text-green-600 mt-4 text-center">{msg}</p>}
      </div>
    </div>
  );
}
