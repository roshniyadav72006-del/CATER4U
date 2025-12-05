"use client";
import { useState, useEffect } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import Image from "next/image";
export default function LoginPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!form.email || !form.password) {
      setError("All fields are required!");
      return;
    }

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Something went wrong");
        return;
      }

      console.log("LOGIN SUCCESS:", data);
      // redirect if needed
      window.location.href = "/dashboard";
    } catch (error) {
      console.log(error);
      setError("Server error");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 p-6">
      <div className="flex w-[900px] max-w-full h-[500px] bg-white shadow-xl rounded-[28px] overflow-hidden">
        {/* LEFT SIDE */}
        <div className="w-[45%] bg-gradient-to-b from-purple-700 to-purple-500 text-white flex flex-col items-center justify-center gap-3 p-10">
          <h1 className="text-4xl font-bold">Welcome Back</h1>
          <p className="opacity-95">Don't have an account?</p>

          {/* UPDATED REGISTER BUTTON */}
          <div className="bg-white px-4 py-2 rounded-xl shadow-md">
            <a
              href="/register"
              className="text-purple-700 font-bold hover:underline"
            >
              Register
            </a>
          </div>
        </div>

        {/* RIGHT SIDE FORM */}
        
        <div className="w-[55%] p-10 flex flex-col justify-center">
          <div className="flex flex-row items-center justify-center">
          <Image src="/logo.png" alt="logo" width={60} height={60}/>
          <h1 className="text-4xl font-bold">CATER4U</h1>
          </div>
          <h2 className="text-3xl font-bold text-center mb-6">LOGIN</h2>

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className="flex items-center gap-3 bg-gray-300 px-4 py-3 rounded-xl mb-4">
              <FaUser className="text-gray-700" />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                className="bg-transparent outline-none w-full"
                value={form.email}
                onChange={handleChange}
              />
            </div>

            {/* Password */}
            <div className="flex items-center gap-3 bg-gray-300 px-4 py-3 rounded-xl mb-2">
              <FaLock className="text-gray-700" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="bg-transparent outline-none w-full"
                value={form.password}
                onChange={handleChange}
              />
            </div>

            {/* Forget Password */}
            <div className="flex justify-center mb-3">
              <a
                href="/forgot"
                className="text-purple-700 text-center font-semibold hover:underline"
              >
                Forget Password?
              </a>
            </div>

            {/* Error Message */}
            {error && (
              <p className="text-red-600 text-center mb-4 font-semibold">
                {error}
              </p>
            )}

            {/* Login BTN */}
            <button
              type="submit"
              className="w-full bg-purple-700 text-white py-3 rounded-xl font-bold hover:bg-purple-600 duration-150"
            >
              LOGIN
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
