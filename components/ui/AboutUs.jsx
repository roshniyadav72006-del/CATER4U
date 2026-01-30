"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

const images = [
  "/about1.jpeg",
  "/about2.jpeg",
  "/about3.jpg",
  "/about4.jpg",
];

export default function AboutUs() {
  const [current, setCurrent] = useState(0);

  // Auto slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 bg-white px-6">
      <div className="max-w-5xl mx-auto text-center">

        <h2 className="text-4xl font-bold mb-6 text-gray-900">
          Who We Are
        </h2>

        <p className="text-gray-600 leading-relaxed mb-10">
          At <span className="font-semibold">CATER4U</span>, we deliver
          exceptional catering experiences for every occasion.
        </p>

        {/* 🔁 IMAGE SLIDER */}
        <div className="relative w-full h-[300px] overflow-hidden rounded-2xl shadow-lg">

          {images.map((img, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-700 ${
                index === current ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={img}
                alt="Catering Service"
                fill
                className="object-cover"
              />
            </div>
          ))}

          {/* ⬅️ ➡️ Buttons */}
          <button
            onClick={() =>
              setCurrent((current - 1 + images.length) % images.length)
            }
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white px-3 py-1 rounded-full"
          >
            ‹
          </button>

          <button
            onClick={() => setCurrent((current + 1) % images.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white px-3 py-1 rounded-full"
          >
            ›
          </button>
        </div>

      </div>
    </section>
  );
}
