"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function FeedbackForm() {
  const router = useRouter();

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [customService, setCustomService] = useState("");
  const [bookings, setBookings] = useState([]); // 🔥 real bookings

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    bookingId: "",
    comment: "",
  });

  // 🔐 CHECK LOGIN + FETCH BOOKINGS
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please login first ❌");
      router.push("/login");
      return;
    }

    const fetchBookings = async () => {
      try {
        const res = await fetch("/api/user/bookings", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (data.success) {
          setBookings(data.bookings); // 🔥 only completed bookings from API
        } else {
          toast.error("Failed to load bookings ❌");
        }
      } catch (error) {
        console.error(error);
        toast.error("Error fetching bookings ❌");
      }
    };

    fetchBookings();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Validation
  const isFormValid =
    form.name &&
    form.email &&
    form.phone &&
    form.service &&
    form.bookingId &&
    form.comment &&
    rating > 0 &&
    (form.service !== "Other" || customService);

  // ✅ SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid) return;

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
          bookingId: "",
          comment: "",
        });
        setRating(0);
        setCustomService("");
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

          <input
            type="text"
            name="phone"
            placeholder="+91 "
            value={form.phone}
            onChange={handleChange}
            required
            className="p-2 border rounded-md"
          />

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

          {/* 🔥 REAL BOOKINGS */}
          <select
            name="bookingId"
            value={form.bookingId}
            onChange={handleChange}
            required
            className="p-2 border rounded-md md:col-span-2"
          >
            <option value="">Select your completed event</option>

            {bookings.length === 0 ? (
              <option disabled>No completed bookings found</option>
            ) : (
              bookings.map((b) => (
                <option key={b._id} value={b._id}>
                  {b.service} - {new Date(b.date).toLocaleDateString()}
                </option>
              ))
            )}
          </select>
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