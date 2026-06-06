"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const specialties = [
  {
    icon: "🍛",
    title: "Marwadi Cuisine",
    desc: "Authentic dal baati churma, gatte ki sabzi, ker sangri and more — straight from Rajasthan's rich culinary tradition.",
  },
  {
    icon: "",
    title: "Gujarati Thali",
    desc: "Complete shaadi thali with undhiyu, kadhi, dal dhokli, farsan, and the perfect balance of sweet and savory.",
  },
  {
    icon: "🪔",
    title: "Wedding Feasts",
    desc: "Full-scale wedding catering with live counters, welcome drinks, starters, main course, and mithai corners.",
  },
  {
    icon: "🍱",
    title: "Corporate Events",
    desc: "Professional buffet and box meal services for conferences, office parties, and corporate gatherings.",
  },
  {
    icon: "🎉",
    title: "Birthday & Parties",
    desc: "Fun and flavourful menus for birthdays, anniversaries, baby showers, and all personal celebrations.",
  },
  {
    icon: "🌿",
    title: "Pure Vegetarian",
    desc: "100% pure veg kitchen — no eggs, no meat, no cross-contamination. Trusted by the most traditional families.",
  },
];


export default function Home() {
  const router = useRouter();

  const handleBooking = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to book catering service", {
        action: {
          label: "Login",
          onClick: () => router.push("/login"),
        },
      });
      setTimeout(() => router.push("/login"), 1500);
      return;
    }
    router.push("/booking");
  };

  return (
    <div className="w-full bg-white">

      {/* ================= HERO SECTION ================= */}
      <div className="relative w-full h-[500px] overflow-hidden">
        <Image
          src="/home.png"
          alt="Chandani Catering Services"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center text-white px-6">
          <p className="text-yellow-400 tracking-[0.3em] text-sm font-medium mb-3 uppercase">
            Pure Vegetarian · Since 2016
          </p>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            Welcome to{" "}
            <span className="text-yellow-400">Chandani Catering Services</span>
          </h1>
          <p className="max-w-xl mb-8 text-gray-200 text-sm md:text-base">
            Premium catering services for weddings, parties, corporate events,
            and special occasions.
          </p>
          <div className="flex gap-4">
            <Link href="/menu">
              <button className="bg-[#273B07] text-white px-7 py-3 rounded-lg font-semibold hover:bg-[#3a5510] transition-all duration-200 shadow-lg">
                View Menu
              </button>
            </Link>
            <button
              onClick={handleBooking}
              className="border-2 border-white text-white px-7 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#273B07] transition-all duration-200"
            >
              Book Now
            </button>
          </div>
        </div>
        <svg
          className="absolute bottom-0 left-0 w-full"
          viewBox="0 0 1440 90"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0 C480,90 960,90 1440,0 L1440,90 L0,90 Z"
            fill="white"
          />
        </svg>
      </div>

      {/* ================= INTRO SECTION ================= */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center">

          {/* Centered text */}
          <p className="text-yellow-500 tracking-widest text-base font-semibold mb-3 uppercase">
            Introduction
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-5 text-gray-900 leading-tight">
            Indian Vegetarian Catering
          </h2>
          <div className="w-20 h-1 bg-yellow-400 rounded mb-8 mx-auto" />
          <p className="text-gray-600 leading-relaxed text-xl md:text-2xl mb-4 max-w-3xl">
            We at <strong>Chandani Catering Service</strong> pride ourselves
            in providing quality service and creating mouth-watering pure
            vegetarian cuisine.
          </p>
          <p className="text-gray-600 leading-relaxed text-xl md:text-2xl mb-10 max-w-3xl">
            Catering since <strong>2016</strong>, we specialise in Marwadi and
            Gujarati vegetarian catering, delivering unforgettable flavours
            for every occasion — from intimate family gatherings to grand
            wedding banquets.
          </p>

          {/* Feature pills */}
          <div className="flex flex-wrap gap-4 justify-center mb-14">
            {["100% Pure Veg", "Home-Style Taste", "On-Time Delivery", "Hygiene Certified"].map(
              (tag) => (
                <span
                  key={tag}
                  className="bg-[#f0f5e8] text-[#273B07] text-base font-semibold px-6 py-3 rounded-full border border-[#c8d9a0]"
                >
                  ✓ {tag}
                </span>
              )
            )}
          </div>

          {/* Big centered image */}
          <div className="relative w-full max-w-3xl h-[480px] rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src="https://res.cloudinary.com/dpgubcyaq/image/upload/v1775017656/homepage_u2iwvs.jpg"
              alt="Indian spices"
              fill
              sizes="(max-width: 768px) 100vw, 800px"
              className="object-cover"
              priority
            />
            {/* Badge on image */}
            <div className="absolute bottom-6 left-6 bg-[#273B07] text-white rounded-2xl px-6 py-4 shadow-xl">
              <p className="text-yellow-400 font-bold text-3xl">Since 2016</p>
              <p className="text-sm opacity-90 mt-1">Years of Culinary Excellence</p>
            </div>
          </div>

        </div>
      </section>

      {/* ================= SPECIALTIES SECTION ================= */}
      <section className="py-20 px-6 bg-[#fafaf5]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-yellow-500 tracking-widest text-sm font-semibold mb-2 uppercase">
              What We Offer
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Our Specialties
            </h2>
            <div className="w-16 h-1 bg-yellow-400 rounded mx-auto mt-4" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {specialties.map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-200"
              >
                <div className="text-5xl mb-5">{item.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-base leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="py-20 px-6 bg-[#273B07] text-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center">
          <div>
            <p className="text-yellow-400 tracking-widest text-sm font-semibold mb-3 uppercase">
              Why Choose Us
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
              Taste the Difference of Authentic Indian Cooking
            </h2>
            <p className="text-gray-300 text-sm leading-relaxed mb-8">
              Our chefs are trained in traditional Marwadi and Gujarati cooking
              methods — using fresh ingredients, hand-ground spices, and recipes
              passed down through generations. We don't just serve food; we
              create memories.
            </p>
            <ul className="space-y-4">
              {[
                "Fresh ingredients sourced daily",
                "Traditional recipes, authentic taste",
                "Experienced team of 50+ chefs",
                "Customizable menus for every budget",
                "Full event setup and cleanup included",
              ].map((point) => (
                <li key={point} className="flex items-center gap-3 text-sm text-gray-200">
                  <span className="w-5 h-5 rounded-full bg-yellow-400 flex items-center justify-center text-[#273B07] font-bold text-xs flex-shrink-0">
                    ✓
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: "🧑‍🍳", title: "Expert Chefs", sub: "Trained in traditional cooking" },
              { icon: "🌿", title: "100% Pure Veg", sub: "No eggs, no compromise" },
              { icon: "⏰", title: "Always On Time", sub: "Punctuality guaranteed" },
              { icon: "❤️", title: "Made with Love", sub: "Every dish, every time" },
            ].map((card) => (
              <div
                key={card.title}
                className="bg-white/10 backdrop-blur rounded-2xl p-5 border border-white/10 hover:bg-white/15 transition"
              >
                <div className="text-3xl mb-3">{card.icon}</div>
                <h4 className="font-bold text-white text-sm">{card.title}</h4>
                <p className="text-gray-400 text-xs mt-1">{card.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ================= CTA SECTION ================= */}
      <section className="py-20 px-6 bg-[#fafaf5]">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-yellow-500 tracking-widest text-sm font-semibold mb-3 uppercase">
            Ready to Celebrate?
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-5">
            Book Your Catering Today
          </h2>
          <p className="text-gray-500 text-sm md:text-base mb-8 leading-relaxed">
            Whether it's a grand wedding, a corporate lunch, or an intimate
            family function — we bring the best of Indian vegetarian cuisine
            right to your event.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleBooking}
              className="bg-[#273B07] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#3a5510] transition-all duration-200 shadow-lg text-sm"
            >
              Book Catering Now
            </button>
            <Link href="/menu">
              <button className="border-2 border-[#273B07] text-[#273B07] px-8 py-4 rounded-xl font-semibold hover:bg-[#273B07] hover:text-white transition-all duration-200 text-sm">
                Explore Our Menu
              </button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}