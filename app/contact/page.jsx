"use client";

import { Phone, Mail, MapPin, Clock } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-100 px-6 py-16">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-8">

        <div className="grid md:grid-cols-2 gap-10">

          {/* LEFT SIDE - CONTACT INFO */}
          <div>
            <h2 className="text-3xl font-bold mb-4">Contact Information</h2>
            <p className="text-gray-600 mb-6">
              We'd love to hear from you! Reach out to us for any catering inquiries.
            </p>

            <div className="space-y-6">

              {/* Phone */}
              <div className="flex items-start gap-4">
                <Phone className="text-[#556B2F]" />
                <div>
                  <p className="text-gray-500">Phone</p>
                  <a href="tel:+919876543210" className="font-medium">
                    +91 98765 43210
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <Mail className="text-[#556B2F]" />
                <div>
                  <p className="text-gray-500">Email</p>
                  <a href="mailto:info@chandanicateringservices.com" className="font-medium">
                    info@chandanicateringservices.com
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-4">
                <MapPin className="text-[#556B2F]" />
                <div>
                  <p className="text-gray-500">Location</p>
                  <p className="font-medium">Malad West, Mumbai</p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-4">
                <Clock className="text-[#556B2F]" />
                <div>
                  <p className="text-gray-500">Business Hours</p>
                  <p className="font-medium">Mon - Sat: 9AM - 7PM</p>
                </div>
              </div>

            </div>

            {/* ACTION BUTTONS */}
            <div className="flex gap-4 mt-8">
              <a
                href="tel:+919876543210"
                className="bg-[#556B2F] text-white px-5 py-2 rounded-lg"
              >
                Call Now
              </a>

              <a
                href="https://wa.me/919876543210"
                className="bg-green-500 text-white px-5 py-2 rounded-lg"
              >
                WhatsApp
              </a>
            </div>

            {/* WHY CHOOSE US */}
            <div className="mt-10">
              <h3 className="text-xl font-semibold mb-3">Why Choose Us?</h3>
              <ul className="text-gray-600 space-y-2">
                <li>✔ Fresh & Hygienic Food</li>
                <li>✔ Customizable Menus</li>
                <li>✔ On-time Service</li>
                <li>✔ Affordable Packages</li>
              </ul>
            </div>

            {/* BOOK BUTTON */}
            <a
              href="/booking"
              className="inline-block mt-8 bg-[#556B2F] text-white px-6 py-3 rounded-lg"
            >
              Go to Booking Page →
            </a>

          </div>

          {/* RIGHT SIDE - MAP + GALLERY */}
          <div>

            <h2 className="text-2xl font-semibold mb-3">Our Location</h2>

            <div className="w-full h-[250px] rounded-lg overflow-hidden border mb-4">
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

            <a
              href="https://maps.google.com?q=Malad West Mumbai"
              target="_blank"
              className="text-blue-600 underline"
            >
              Open in Google Maps
            </a>

            {/* MINI GALLERY */}
            <div className="grid grid-cols-3 gap-3 mt-6">
              <img src="/food1.jpg" className="rounded-lg object-cover h-24 w-full"/>
              <img src="/food2.jpg" className="rounded-lg object-cover h-24 w-full"/>
              <img src="/food3.jpg" className="rounded-lg object-cover h-24 w-full"/>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}