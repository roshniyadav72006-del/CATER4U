import { NextResponse } from "next/server";
import connectDB from "../../../../../lib/mongoose";
import Booking from "../../../../../models/Booking";
import nodemailer from "nodemailer";

export async function PUT(req, context) {
  try {
    await connectDB();

    const { id } = await context.params;
    const { status } = await req.json();

    if (!id) {
      return NextResponse.json(
        { error: "Booking ID not provided" },
        { status: 400 }
      );
    }

    const booking = await Booking.findById(id);

    if (!booking) {
      return NextResponse.json(
        { error: "Booking not found" },
        { status: 404 }
      );
    }

    // ✅ STATUS UPDATE
    booking.status = status;
    await booking.save();

    // ✅ DATE FORMAT FUNCTION (⭐ NEW ADD)
    const formatDate = (date) => {
      return new Date(date).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    };

    // ✅ EMAIL SETUP
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    let subject = "";
    let message = "";

    // ✅ APPROVE EMAIL
    if (status === "approved") {
      subject = "🎉 Your Booking is Confirmed | Chandani Caterer's";

      message = `
      <div style="font-family: Arial, sans-serif; background:#f4f6f8; padding:20px;">
        
        <div style="max-width:600px; margin:auto; background:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 5px 20px rgba(0,0,0,0.1);">
          
          <div style="background:#4CAF50; color:white; padding:20px; text-align:center;">
            <h2 style="margin:0;">Chandani Caterer's</h2>
            <p style="margin:5px 0;">Booking Confirmation</p>
          </div>

          <div style="padding:20px;">
            <h3 style="color:#333;">Hello ${booking.fullName}, 👋</h3>

            <p>Your booking has been <b style="color:green;">successfully approved</b>.</p>

            <div style="background:#f9f9f9; padding:15px; border-radius:8px; margin:15px 0;">
              <p><b>📅 Event Date:</b> ${formatDate(booking.eventDate)}</p>
              <p><b>🎉 Event Type:</b> ${booking.eventType}</p>
              <p><b>👥 Guests:</b> ${booking.guests}</p>
            </div>
            <p>Our team will contact you shortly to finalize arrangements.</p>
            <p style="color:#555;">Thank you for choosing <b>Chandani Caterer's</b> 💚</p>
          </div>

          <div style="background:#f1f1f1; padding:15px; text-align:center; font-size:12px; color:#777;">
            <p>© 2026 Chandani Caterer's. All rights reserved.</p>
          </div>

        </div>
      </div>`;
    }

    // ❌ REJECT EMAIL
    if (status === "rejected") {
        subject = "Update on Your Booking Request | Chandani Caterer's";
       message = `
        <div style="font-family: Arial, sans-serif; background:#f4f6f8; padding:20px;">
    
        <div style="max-width:600px; margin:auto; background:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 5px 20px rgba(0,0,0,0.1);">
      
         <!-- Header -->
        <div style="background:#F44336; color:white; padding:20px; text-align:center;">
        <h2 style="margin:0;">Chandani Caterer's</h2>
        <p style="margin:5px 0;">Booking Update</p>
      </div>

      <!-- Body -->
      <div style="padding:20px;">
        <h3 style="color:#333;">Hi ${booking.fullName},</h3>

        <p>
          We regret to inform you that your booking request could not be approved at this time.
        </p>

        <!-- ✅ EVENT DETAILS ADDED -->
        <div style="background:#f9f9f9; padding:15px; border-radius:8px; margin:15px 0;">
          <p><b>📅 Event Date:</b> ${formatDate(booking.eventDate)}</p>
          <p><b>🎉 Event Type:</b> ${booking.eventType}</p>
          <p><b>👥 Guests:</b> ${booking.guests}</p>
        </div>

        <p>
          This may be due to availability or scheduling conflicts. You can try again with different details.
        </p>

        <!-- ✅ WORKING BUTTON -->
        <div style="text-align:center; margin:20px 0;">
          <a href="https://cater-4-u.vercel.app/booking" target="_blank"
            style="background:#F44336; color:white; padding:12px 24px; text-decoration:none; border-radius:6px; font-weight:bold;">
            Try Again
          </a>
        </div>

        <p style="color:#555;">
          We truly appreciate your interest in <b>Cater4U</b>.
        </p>
      </div>

      <!-- Footer -->
      <div style="background:#f1f1f1; padding:15px; text-align:center; font-size:12px; color:#777;">
        <p>© 2026 Chandani Caterer's. All rights reserved.</p>
        <p>Need help? Contact us anytime.</p>
      </div>
    </div>  </div>  `;}

    // ✅ SEND EMAIL
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: booking.email,
      subject,
      html: message,
    });

    return NextResponse.json(
      { message: "Status updated & email sent" },
      { status: 200 }
    );

  } catch (error) {
    console.error("ERROR:", error);
    return NextResponse.json(
      { error: "Server Error" },
      { status: 500 }
    );
  }
}