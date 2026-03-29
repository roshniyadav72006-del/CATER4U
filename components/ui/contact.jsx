"use client";

import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventDate: "",
    guestCount: "",
    eventType: "",
    message: "",
  });

  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setSuccess(true);

    setFormData({
      name: "",
      email: "",
      phone: "",
      eventDate: "",
      guestCount: "",
      eventType: "",
      message: "",
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="py-20 bg-[#F8F5F0] text-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Book Your Catering Consultation
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Ready to plan your event? Contact us for a free consultation and quote.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-xl shadow-lg">

            {success && (
              <div className="mb-6 text-green-600 font-medium">
                Thank you! We will contact you within 24 hours.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Name */}
              <div>
                <label className="block mb-2 font-medium">Name *</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:border-[#556B2F] focus:outline-none"
                />
              </div>

              {/* Email + Phone */}
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 font-medium">Email *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:border-[#556B2F] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:border-[#556B2F] focus:outline-none"
                  />
                </div>
              </div>

              {/* Event Date + Guest Count */}
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 font-medium">Event Date</label>
                  <input
                    type="date"
                    name="eventDate"
                    value={formData.eventDate}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:border-[#556B2F] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium">Number of Guests</label>
                  <input
                    type="number"
                    name="guestCount"
                    value={formData.guestCount}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:border-[#556B2F] focus:outline-none"
                  />
                </div>
              </div>

              {/* Event Type */}
              <div>
                <label className="block mb-2 font-medium">Event Type</label>
                <select
                  name="eventType"
                  value={formData.eventType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:border-[#556B2F] focus:outline-none"
                >
                  <option value="">Select Event</option>
                  <option>Wedding</option>
                  <option>Birthday</option>
                  <option>Corporate Event</option>
                  <option>Private Party</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="block mb-2 font-medium">Tell us about your event</label>
                <textarea
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:border-[#556B2F] focus:outline-none resize-none"
                />
              </div>

              {/* Button */}
              <button
                type="submit"
                className="w-full bg-[#556B2F] hover:bg-[#6B8E23] text-white px-8 py-4 rounded-lg transition-colors font-medium"
              >
                Send Inquiry
              </button>

            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold">Contact Information</h3>

            <div className="space-y-6">

              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 text-[#556B2F] mt-1" />
                <div>
                  <p className="text-gray-500">Phone</p>
                  <a href="tel:+917977419874" className="text-xl hover:text-[#6B8E23]">
                    +91 98765 43210
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-[#556B2F] mt-1" />
                <div>
                  <p className="text-gray-500">Email</p>
                  <a
                    href="mailto:info@chandanicateringservices.com"
                    className="text-xl hover:text-[#6B8E23]"
                  >
                    info@chandanicateringservices.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-[#556B2F] mt-1" />
                <div>
                  <p className="text-gray-500">Location</p>
                  <p className="text-xl">Malad West, Mumbai, Maharashtra</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock className="w-6 h-6 text-[#556B2F] mt-1" />
                <div>
                  <p className="text-gray-500">Business Hours</p>
                  <p className="text-xl">Mon - Sat: 9AM - 7PM</p>
                </div>
              </div>

              <a
                href="https://wa.me/919876543210"
                className="inline-block bg-[#556B2F] hover:bg-[#6B8E23] text-white px-6 py-3 rounded-lg transition-colors"
              >
                Chat on WhatsApp
              </a>

              <iframe
                className="w-full h-64 rounded-lg mt-6"
                src="https://maps.google.com/maps?q=malad%20west%20mumbai&t=&z=13&ie=UTF8&iwloc=&output=embed"
              ></iframe>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}