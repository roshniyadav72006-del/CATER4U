import Image from "next/image";
import Chatbot from "@/components/ui/chatbot";
export default function Home() {
 
  return (
    <div className="w-full bg-white">

      {/* ================= HERO SECTION ================= */}
      <div className="relative w-full h-[450px] overflow-hidden">

        <Image
          src="/home.png"
          alt="Cater4U"
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/50" />

        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center text-white px-6">
          <h1 className="text-5xl font-bold mb-4">
            Welcome to <span className="text-yellow-400">CATER4U</span>
          </h1>

          <p className="max-w-xl mb-6 text-gray-200">
            Premium catering services for weddings, parties,
            corporate events, and special occasions.
          </p>

          <div className="flex gap-4">
            <button className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold">
              View Menu
            </button>
            <button className="border border-white px-6 py-3 rounded-lg">
              Contact Us
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

      {/* ================= INTRODUCTION SECTION ================= */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10 items-center">

          {/* LEFT IMAGE */}
          <div className="hidden md:flex justify-center">
            <div className="relative w-[400px] h-[400px]">
              <Image
                src="/intro-left.jpg"
                alt="Indian spices"
                fill
                className="object-contain"
                sizes="400px"
              />
            </div>
          </div>

          {/* CENTER TEXT */}
          <div className="text-center">
            <p className="text-yellow-500 tracking-widest mb-3">
              INTRODUCTION
            </p>

            <h2 className="text-4xl font-bold mb-6 text-gray-900">
              Indian Vegetarian Catering
            </h2>

            <p className="text-gray-600 leading-relaxed">
              We at Cater4U pride ourselves in providing quality service and
              creating mouth-watering pure vegetarian cuisine.
              <br /><br />
              With over 30 years of experience, we specialise in marwadi and
              Gujarati vegetarian catering, delivering unforgettable flavours
              for every occasion.
            </p>
          </div>

          {/* RIGHT IMAGE */}
          <div className="hidden md:flex justify-center">
            <div className="relative w-[400px] h-[400px]">
              <Image
                src="/right.png"
                alt="Indian spices"
                fill
                className="object-contain"
                sizes="400px"
              />
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
