"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Home() {
  const router = useRouter();

  const handleBooking = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Login yourself to book catering service");
      return;
    }

    router.push("/booking");
  };

  return (
    <div className="w-full bg-white">

      {/* ================= HERO SECTION ================= */}
      <div className="relative w-full h-[450px] overflow-hidden pt-[120px] md:pt-0">
        {/* 👆 yahi main fix hai */}

        <Image
          src="/home.png"
          alt="Chandani Catering Services"
          fill
          priority
          className="object-cover"
          
        />

        <div className="absolute inset-0 bg-black/50" />

        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center text-white px-6">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Welcome to{" "}
            <span className="text-yellow-400">
              Chandani Catering Services
            </span>
          </h1>

          <p className="max-w-xl mb-6 text-gray-200 text-sm md:text-base">
            Premium catering services for weddings, parties,
            corporate events, and special occasions.
          </p>

          <div className="flex gap-4">
            <Link href="/menu">
              <button className="bg-[#6B8E23] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#556B2F] transition">
                View Menu
              </button>
            </Link>

            <button
              onClick={handleBooking}
              className="border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-black transition"
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
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10 items-center">

          <div className="hidden md:flex justify-center">
            <div className="relative w-full h-[400px] md:h-[600px] lg:h-[800px]">
              <Image
                src="https://res.cloudinary.com/dpgubcyaq/image/upload/v1774555265/intro-left_qj0mrs.jpg"
                alt="Indian spices"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain"
                priority
              />
            </div>
          </div>
          <div className="text-center">
            <p className="text-yellow-500 tracking-widest mb-3">
              INTRODUCTION
            </p>

            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              Indian Vegetarian Catering
            </h2>

            <p className="text-gray-600 leading-relaxed text-sm md:text-base">
              We at CHANDANI CATERIN SERVICE pride ourselves in providing quality service and
              creating mouth-watering pure vegetarian cuisine.
              <br /><br />
              With over 30 years of experience, we specialise in marwadi and
              Gujarati vegetarian catering, delivering unforgettable flavours
              for every occasion.
            </p>
          </div>

          <div className="hidden md:flex justify-center">
            <div className="relative w-full h-[400px] md:h-[600px] lg:h-[800px]">
           </div>           
          </div>
        </div>
      </section>

    </div>
  );
}