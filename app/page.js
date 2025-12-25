import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full bg-white">

      {/* HERO */}
      <div className="relative w-full h-[450px] overflow-hidden">

        {/* Image */}
        <Image
          src="/home.png"
          alt="Cater4U"
          fill
          priority
          className="object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Content */}
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

        {/* CLEAN CURVE */}
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

    </div>
  );
}
