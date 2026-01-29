"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
    }
  }, []);

  return (
    <div style={{ padding: "40px" }}>
      <h1>My Profile</h1>
      <p>Profile page is working ✅</p>
    </div>
  );
}
