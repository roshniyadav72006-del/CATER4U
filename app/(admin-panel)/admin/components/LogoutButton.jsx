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
      className="w-full bg-[#8B9D3A] hover:bg-[#8B9D3A] transition-colors duration-200 text-white text-xs tracking-wider px-4 py-2 rounded-full border border-[#8B9D3A]">
      Logout
    </button>
  );
}