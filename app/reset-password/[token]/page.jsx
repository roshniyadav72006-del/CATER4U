"use client";
import { useState } from "react";

export default function ResetPage({ params }) {
  const { token } = params;
  const [password, setPassword] = useState("");

  async function submit() {
    const res = await fetch("/api/reset-password", {
      method: "POST",
      body: JSON.stringify({ token, password }),
    });

    const data = await res.json();
    alert(data.message);
  }

  return (
    <div className="flex flex-col items-center gap-4 mt-20">
      <h1 className="text-2xl">Reset Password</h1>

      <input
        type="password"
        placeholder="New Password"
        className="border p-2"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={submit} className="bg-blue-600 text-white px-4 py-2 rounded">
        Update
      </button>
    </div>
  );
}
