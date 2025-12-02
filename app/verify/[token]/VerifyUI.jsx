"use client";

import { useState, useEffect } from "react";

export default function VerifyUI({ token }) {
  const [status, setStatus] = useState("Verifying...");

  useEffect(() => {
    async function verify() {
      try {
        const res = await fetch(`/api/verify-email?token=${token}`, {
          cache: "no-store",
        });

        const data = await res.json();
        setStatus(data.message);
      } catch {
        setStatus("Server error");
      }
    }

    verify();
  }, [token]);

  return (
    <div className="flex items-center justify-center h-screen text-xl">
      {status}
    </div>
  );
}
