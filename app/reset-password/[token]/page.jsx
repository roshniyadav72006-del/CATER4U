"use client";
import { useState } from "react";
import { useParams } from "next/navigation";

export default function ResetPage() {
  const { token } = useParams();

  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  async function submit() {
    setError("");
    setSuccess("");

    const res = await fetch("/api/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.message);
    } else {
      setSuccess(data.message);
    }
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-100 p-4">

      {/* Round Card Like Forgot Password */}
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">

        <h1 className="text-2xl font-bold text-center mb-6 text-purple-700">
          Reset Your Password
        </h1>

        <input
          type="password"
          placeholder="Enter New Password"
          className="border w-full p-3 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={submit}
          className="w-full bg-purple-700 hover:bg-purple-600 text-white py-3 rounded-lg font-medium transition"
        >
          Update Password
        </button>

        {error && (
          <p className="text-red-600 mt-4 text-center font-medium">
            {error}
          </p>
        )}
        {success && (
          <p className="text-green-600 mt-4 text-center font-medium">
            {success}
          </p>
        )}

      </div>
    </div>
  );
}
