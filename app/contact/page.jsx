"use client";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-100 px-6 py-16">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">

        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-orange-500 text-white text-center py-10">
          <h1 className="text-4xl font-bold mb-2">Contact Us</h1>
          <p>We are happy to help you</p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 p-8">

          {/* Contact Form */}
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full border px-4 py-3 rounded-lg"
            />

            <input
              type="email"
              placeholder="Email Address"
              className="w-full border px-4 py-3 rounded-lg"
            />

            <input
              type="text"
              placeholder="Phone Number"
              className="w-full border px-4 py-3 rounded-lg"
            />

            <textarea
              rows="4"
              placeholder="Your Message"
              className="w-full border px-4 py-3 rounded-lg"
            ></textarea>

            <button
              type="submit"
              className="bg-gradient-to-r from-red-600 to-orange-500 text-white px-6 py-3 rounded-lg"
            >
              Send Message
            </button>
          </form>

          {/* Map */}
          <div>
            <h2 className="text-2xl font-semibold mb-3">Our Location</h2>

            <p className="text-gray-700 mb-4">
              📍 Malad West, Mumbai, Maharashtra
            </p>

            <div className="w-full h-[320px] rounded-lg overflow-hidden border">
              <iframe
                title="Malad West Map"
                src="https://www.google.com/maps?q=Malad%20West%20Mumbai&z=15&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
              ></iframe>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
