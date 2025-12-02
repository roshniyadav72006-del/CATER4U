"use client";
import { useEffect, useState } from "react";

export default function Verify({ params }) {
  const { token } = params;
  const [status, setStatus] = useState("Verifying...");

  useEffect(() => {
    async function verify() {
      const res = await fetch("/api/verify-email", {
        method: "POST",
        body: JSON.stringify({ token })
      });

      const data = await res.json();
      setStatus(data.message);
    }
    verify();
  }, []);

  return (
    <div className="flex items-center justify-center h-screen text-xl">
      {status}
    </div>
  );
}
