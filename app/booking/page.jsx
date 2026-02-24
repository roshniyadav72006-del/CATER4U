"use client";

import { useState } from "react";

export default function BookingPage() {
  const [step, setStep] = useState(1);

  return (
    <div className="pt-24 bg-[#D5FFFF] min-h-screen">

      {/* ================= HEADER ================= */}
      <div className="text-black py-14 text-center">

        <h1 className="text-4xl font-bold mb-3">
          Book Your Event
        </h1>

        <p className="text-gray-700">
          Let us make your event memorable with our catering services
        </p>

        {/* ===== STEPPER ===== */}
        <div className="flex justify-center items-center gap-10 mt-8">
          {[1, 2, 3].map((num) => (
            <div key={num} className="flex items-center gap-4">

              <div
                className={`w-11 h-11 flex items-center justify-center rounded-full font-bold transition-all
                ${
                  step === num
                    ? "bg-[#04D9FF] text-black shadow-[0_0_20px_#04D9FF]"
                    : step > num
                    ? "bg-[#04D9FF] text-black"
                    : "bg-gray-300 text-gray-700"
                }`}
              >
                {step > num ? "✓" : num}
              </div>

              {num !== 3 && (
                <div
                  className={`w-20 h-[4px] rounded-full
                  ${
                    step > num
                      ? "bg-[#04D9FF]"
                      : "bg-gray-300"
                  }`}
                ></div>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-24 mt-3 text-sm font-medium">
          <span className={step === 1 ? "text-[#04D9FF]" : "text-gray-600"}>
            Event Details
          </span>
          <span className={step === 2 ? "text-[#04D9FF]" : "text-gray-600"}>
            Menu Selection
          </span>
          <span className={step === 3 ? "text-[#04D9FF]" : "text-gray-600"}>
            Review
          </span>
        </div>
      </div>

      <div className="px-6 pb-20">

        {/* ================= STEP 1 ================= */}
        {step === 1 && (
          <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-md p-12">

            <h2 className="text-2xl font-semibold mb-8">
              Event Details
            </h2>

            <div className="grid md:grid-cols-2 gap-6">

              <div>
                <label className="block mb-2 text-gray-600">Event Type</label>
                <select className="w-full border rounded-lg p-3">
                  <option>Select event type</option>
                  <option>Wedding</option>
                  <option>Birthday</option>
                  <option>Corporate</option>
                  <option>Engagement</option>
                </select>
              </div>

              <div>
                <label className="block mb-2 text-gray-600">Event Date</label>
                <input type="date" className="w-full border rounded-lg p-3" />
              </div>

              <div>
                <label className="block mb-2 text-gray-600">Event Time</label>
                <input type="time" className="w-full border rounded-lg p-3" />
              </div>

              <div>
                <label className="block mb-2 text-gray-600">Number of Guests</label>
                <input type="number" placeholder="50" className="w-full border rounded-lg p-3" />
              </div>

              <div>
                <label className="block mb-2 text-gray-600">Venue Type</label>
                <select className="w-full border rounded-lg p-3">
                  <option>Select venue</option>
                  <option>Indoor</option>
                  <option>Outdoor</option>
                </select>
              </div>

              <div>
                <label className="block mb-2 text-gray-600">Venue Address</label>
                <input type="text" placeholder="Enter address" className="w-full border rounded-lg p-3" />
              </div>

              <div className="md:col-span-2">
                <label className="block mb-2 text-gray-600">
                  Special Requests or Dietary Requirements
                </label>
                <textarea
                  rows="4"
                  placeholder="Any allergies, dietary restrictions, or special requests..."
                  className="w-full border rounded-lg p-3 resize-none"
                ></textarea>
              </div>

            </div>

            <div className="flex justify-end mt-10">
              <button
                onClick={() => setStep(2)}
                className="bg-[#04D9FF] text-black px-10 py-3 rounded-lg shadow-[0_0_15px_#04D9FF]"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* ================= STEP 2 ================= */}
        {step === 2 && (
          <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-md p-12">

            <div className="flex justify-between items-center mb-10">
              <h2 className="text-2xl font-semibold">Menu Selection</h2>

              <button className="bg-[#04D9FF] text-black px-6 py-3 rounded-full shadow-[0_0_15px_#04D9FF]">
                + Add Menu Items
              </button>
            </div>

            <div className="text-center text-gray-500 py-16">
              No menu items selected. Click "Add Menu Items" to get started.
            </div>

            <div className="flex justify-between mt-10">
              <button
                onClick={() => setStep(1)}
                className="px-6 py-3 rounded-lg border border-gray-400"
              >
                Back
              </button>

              <button
                onClick={() => setStep(3)}
                className="bg-[#04D9FF] text-black px-10 py-3 rounded-lg shadow-[0_0_15px_#04D9FF]"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* ================= STEP 3 ================= */}
        {step === 3 && (
          <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-md p-12">

            <h2 className="text-3xl font-semibold mb-10">
              Review & Confirm
            </h2>

            {/* Event Details Summary */}
            <div className="bg-gray-50 rounded-2xl p-8 mb-10">
              <h3 className="text-xl font-semibold mb-6">Event Details</h3>

              <div className="grid md:grid-cols-2 gap-6 text-gray-700">
                <div>
                  <p className="font-medium">Event Type:</p>
                  <p>Wedding</p>

                  <p className="mt-4 font-medium">Guests:</p>
                  <p>20 people</p>

                  <p className="mt-4 font-medium">Address:</p>
                  <p>Sample address</p>
                </div>

                <div>
                  <p className="font-medium">Date & Time:</p>
                  <p>2026-01-13 at 23:09</p>

                  <p className="mt-4 font-medium">Venue:</p>
                  <p>Outdoor</p>
                </div>
              </div>
            </div>

            {/* Selected Menu */}
            <div className="bg-gray-50 rounded-2xl p-8 mb-10">
              <h3 className="text-xl font-semibold mb-6">Selected Menu</h3>
              <div className="border-t pt-6 text-gray-700">
                <p className="text-lg font-semibold">Total:</p>
                <p className="mt-2">Per Person:</p>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-gray-50 rounded-2xl p-8 mb-10">
              <h3 className="text-xl font-semibold mb-6">Contact Information</h3>

              <div className="grid md:grid-cols-2 gap-6">

                <div>
                  <label className="block mb-2 text-gray-600">Full Name</label>
                  <input type="text" className="w-full border rounded-lg p-3" />
                </div>

                <div>
                  <label className="block mb-2 text-gray-600">Email</label>
                  <input type="email" className="w-full border rounded-lg p-3" />
                </div>

                <div className="md:col-span-2">
                  <label className="block mb-2 text-gray-600">Phone Number</label>
                  <input type="text" className="w-full border rounded-lg p-3" />
                </div>

              </div>
            </div>

            <div className="flex justify-between items-center">
              <button
                onClick={() => setStep(2)}
                className="px-6 py-3 rounded-lg border border-gray-400"
              >
                Back
              </button>

              <button
                className="bg-[#04D9FF] text-black px-10 py-3 rounded-lg shadow-[0_0_20px_#04D9FF]"
              >
                Submit Booking
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}