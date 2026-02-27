"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin/logout", {
      method: "POST",
    });

    router.push("/admin/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="w-full bg-red-600/90 hover:bg-red-500 transition-colors duration-200 text-white text-xs tracking-wider px-4 py-2 rounded-full border border-red-500/30"
    >
      Logout
    </button>
  );
}