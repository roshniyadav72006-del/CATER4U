"use client";

import { useState } from "react";
import { toast } from "sonner";

export default function FeedbackForm() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [customService, setCustomService] = useState("");

  const [phoneError, setPhoneError] = useState(""); // 🔥 NEW

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    comment: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const isFormValid =
    form.name &&
    form.email &&
    form.phone &&
    form.service &&
    form.comment &&
    rating > 0 &&
    (form.service !== "Other" || customService);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid) return;

    // 🔥 PHONE VALIDATION (INLINE ERROR)
    if (!/^[6-9]\d{9}$/.test(form.phone)) {
      setPhoneError("Enter valid Indian phone number");
      return;
    } else {
      setPhoneError("");
    }

    const finalService =
      form.service === "Other" ? customService : form.service;

    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          service: finalService,
          rating,
        }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Feedback submitted successfully 🎉");

        setForm({
          name: "",
          email: "",
          phone: "",
          service: "",
          comment: "",
        });
        setRating(0);
        setCustomService("");
        setPhoneError("");
      } else {
        toast.error("Failed to submit feedback ❌");
      }
    } catch (error) {
      console.error(error);
      toast.error("Server error ❌");
    }
  };

  return (
    <div className="min-h-screen bg-[#eae6df] flex flex-col items-center justify-center px-4">

      <h1 className="text-3xl font-serif text-[#2f5d34] mb-2 text-center">
        We Value Your Feedback
      </h1>

      <p className="text-sm text-gray-600 mb-6 text-center">
        Your opinion helps us serve you better.
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-xl space-y-5"
      >

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <input
            type="text"
            name="name"
            placeholder="Your name"
            value={form.name}
            onChange={handleChange}
            required
            className="p-2 border rounded-md"
          />

          <input
            type="email"
            name="email"
            placeholder="your.email@example.com"
            value={form.email}
            onChange={handleChange}
            required
            className="p-2 border rounded-md"
          />

          {/* 🔥 PHONE FIELD UPDATED */}
          <div>
            <input
              type="tel"
              name="phone"
              placeholder="Enter phone number"
              value={form.phone}
              onChange={(e) => {
                handleChange(e);
                setPhoneError(""); // typing pe error remove
              }}
              required
              maxLength="10"
              className={`p-2 border rounded-md w-full ${
                phoneError ? "border-red-500" : ""
              }`}
            />

            {phoneError && (
              <p className="text-red-500 text-sm mt-1">
                {phoneError}
              </p>
            )}
          </div>

          {/* Service */}
          <div className="md:col-span-2">
            <select
              name="service"
              value={form.service}
              onChange={handleChange}
              required
              className="p-2 border rounded-md w-full"
            >
              <option value="">Select service</option>
              <option value="Wedding">Wedding</option>
              <option value="Birthday">Birthday</option>
              <option value="Corporate">Corporate</option>
              <option value="Other">Other</option>
            </select>

            {form.service === "Other" && (
              <input
                type="text"
                placeholder="Enter your event type"
                value={customService}
                onChange={(e) => setCustomService(e.target.value)}
                required
                className="mt-2 p-2 border rounded-md w-full"
              />
            )}
          </div>
        </div>

        {/* ⭐ Rating */}
        <div className="text-center">
          <p className="text-sm mb-1">Your Feedback</p>
          <div className="flex justify-center space-x-1 text-2xl cursor-pointer">
            {[1,2,3,4,5].map((star) => (
              <span
                key={star}
                className={`${
                  star <= (hover || rating)
                    ? "text-yellow-400"
                    : "text-gray-300"
                }`}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
              >
                ★
              </span>
            ))}
          </div>
        </div>

        <textarea
          name="comment"
          placeholder="Share your thoughts..."
          value={form.comment}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded-md h-24"
        />

        <button
          type="submit"
          disabled={!isFormValid}
          className={`w-full py-3 rounded-lg text-white transition ${
            isFormValid
              ? "bg-[#1f5e2c] hover:bg-[#174a22]"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Submit Feedback
        </button>
      </form>
    </div>
  );
}