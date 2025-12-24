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
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for your inquiry! We will contact you soon.");
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="py-20 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl mb-4">Get in Touch</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Ready to plan your event? Contact us for a free consultation and quote
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block mb-2">Name *</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2">Event Date</label>
                  <input
                    type="date"
                    name="eventDate"
                    value={formData.eventDate}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block mb-2">Number of Guests</label>
                  <input
                    type="number"
                    name="guestCount"
                    value={formData.guestCount}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2">Tell us about your event</label>
                <textarea
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:border-amber-500 focus:outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-lg transition-colors"
              >
                Send Inquiry
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl mb-6">Contact Information</h3>

              <div className="space-y-4">
                {/* Phone */}
                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 text-amber-500 mt-1" />
                  <div>
                    <p className="text-gray-300">Phone</p>
                    <a href="tel:+15551234567" className="text-xl hover:text-amber-400">
                      (555) 123-4567
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-amber-500 mt-1" />
                  <div>
                    <p className="text-gray-300">Email</p>
                    <a href="mailto:info@cater4u.com" className="text-xl hover:text-amber-400">
                      info@cater4u.com
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-amber-500 mt-1" />
                  <div>
                    <p className="text-gray-300">Location</p>
                    <p className="text-xl">
                      123 Culinary Lane <br /> New York, NY 10001
                    </p>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="flex items-start gap-4">
                  <Clock className="w-6 h-6 text-amber-500 mt-1" />
                  <div>
                    <p className="text-gray-300">Business Hours</p>
                    <p className="text-xl">
                      Mon - Fri: 9AM - 6PM <br />
                      Sat: 10AM - 4PM <br />
                      Sun: By Appointment
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
