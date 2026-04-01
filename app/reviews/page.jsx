"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function ReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const router = useRouter();

  const handleWriteReview = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to write a review", {
        action: {
          label: "Login",
          onClick: () => router.push("/login"),
        },
      });
      setTimeout(() => router.push("/login"), 1500);
      return;
    }
    router.push("/feedback");
  };

  useEffect(() => {
    fetch("/api/feedback")
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
        setLoading(false);
        setTimeout(() => setVisible(true), 100);
      })
      .catch((err) => {
        console.error("Error fetching reviews:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-white text-black">


      {/* ── PAGE HEADING ── */}
     <div className="pt-36 pb-4 px-4 md:px-6 text-center">
        <p className="text-yellow-500 tracking-widest text-sm font-semibold uppercase mb-2">
          What People Are Saying
        </p>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 mt-2">
          Customer Reviews
        </h1>
        <div className="w-20 h-1 bg-yellow-400 rounded mx-auto mb-5" />
        <p className="text-gray-500 text-base max-w-xl mx-auto">
          Real experiences from our valued guests — every event catered with love and authenticity.
        </p>
      </div>

      {/* ── REVIEWS GRID ── */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">

          {/* Loading */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <div className="w-12 h-12 border-4 border-[#273B07] border-t-yellow-400 rounded-full animate-spin" />
              <p className="text-gray-400 text-base">Loading reviews...</p>
            </div>
          )}

          {/* Empty state */}
          {!loading && reviews.length === 0 && (
            <div className="text-center py-24">
              <p className="text-6xl mb-4">🍽️</p>
              <p className="text-gray-400 text-xl font-medium">No reviews yet</p>
              <p className="text-gray-400 text-base mt-2">Be the first to share your experience!</p>
            </div>
          )}

          {/* Cards grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((item, index) => (
              <div
                key={item._id}
                className="group bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(30px)",
                  transition: `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s, box-shadow 0.3s, translate 0.3s`,
                }}
              >
                {/* Top accent bar */}
                <div className="h-1.5 w-full bg-gradient-to-r from-[#273B07] to-yellow-400" />

                <div className="p-7">
                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`text-xl ${i < item.rating ? "text-yellow-400" : "text-gray-200"}`}
                      >
                        ★
                      </span>
                    ))}
                  </div>

                  {/* Comment */}
                  <p className="text-gray-700 text-base leading-relaxed mb-5 italic">
                    "{item.comment}"
                  </p>

                  {/* Reviewer name */}
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                    <div className="w-10 h-10 rounded-full bg-[#273B07] text-yellow-400 font-bold flex items-center justify-center text-base flex-shrink-0">
                      {item.name?.charAt(0).toUpperCase()}
                    </div>
                    <p className="text-gray-800 font-semibold text-base">
                      {item.name}
                    </p>
                  </div>

                  {/* Admin response */}
                  {item.adminResponse && item.adminResponse.trim() !== "" && (
                    <div className="mt-5 p-4 bg-[#f0f5e8] border border-[#c8d9a0] rounded-xl">
                      <p className="text-xs font-bold text-[#273B07] uppercase tracking-wider mb-1">
                        🌿 Our Response
                      </p>
                      <p className="text-[#273B07] text-sm leading-relaxed">
                        {item.adminResponse}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA STRIP ── */}
      <section className="bg-[#fafaf5] py-14 px-6 text-center border-t border-gray-100">
        <p className="text-yellow-500 tracking-widest text-sm font-semibold uppercase mb-2">
          Loved Our Food?
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          Share Your Experience With Us
        </h2>
        <p className="text-gray-500 text-base mb-7 max-w-lg mx-auto">
          Your feedback helps us serve better — and inspires others to taste the difference.
        </p>
        <button
          onClick={handleWriteReview}
          className="bg-[#273B07] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#3a5510] transition-all duration-200 shadow-md text-base"
        >
          Write a Review
        </button>
      </section>

    </div>
  );
}