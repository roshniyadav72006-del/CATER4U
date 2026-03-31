import { NextResponse } from "next/server";
import connectDB from "../../../lib/mongoose";
import Booking from "../../../models/Booking";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

// ================= GET BOOKINGS (filtered by userId) =================

export async function GET(req) {
  try {
    await connectDB();

    const userId = req.headers.get("userid");

    const query = userId ? { userId } : {};

    const bookings = await Booking.find(query).sort({ createdAt: -1 });

    return NextResponse.json(bookings, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error fetching bookings" },
      { status: 500 }
    );
  }
}

// ================= CREATE BOOKING =================

export async function POST(req) {
  try {
    await connectDB();

    const authHeader = req.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { message: "Unauthorized - Login required" },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];

    let decoded;

    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return NextResponse.json(
        { message: "Invalid Token" },
        { status: 401 }
      );
    }

    const body = await req.json();

    const {
      eventType,
      eventDate,
      eventTime,
      guests,
      venueType,
      venueAddress,
      specialRequests,
      selectedMenu,
      totalPrice,
      fullName,
      email,
      phone,
    } = body;

    if (
      !eventType ||
      !eventDate ||
      !eventTime ||
      !guests ||
      !venueType ||
      !venueAddress ||
      !fullName ||
      !email ||
      !phone
    ) {
      return NextResponse.json(
        { message: "All required fields must be filled" },
        { status: 400 }
      );
    }

    // ================= SAVE BOOKING =================

    const lastBooking = await Booking.findOne().sort({ createdAt: -1 }); // 👈 added
    let nextId = 1;
    if (lastBooking?.bookingId) {
      const num = parseInt(lastBooking.bookingId.replace("BKG", ""));
      nextId = num + 1;
    }
    const bookingId = "BKG" + String(nextId).padStart(3, "0"); // 👈 added
    const existingBookings = await Booking.countDocuments({
       eventDate: eventDate
    });
    if (existingBookings >= 6) {
      return NextResponse.json(
        {message:"Date full"},
        {status: 400}
      );
    }
    const newBooking = await Booking.create({

      userId: decoded.userId || decoded.id,
      eventType,
      eventDate,
      eventTime,
      guests,
      venueType,
      venueAddress,
      specialRequests,
      selectedMenu,
      totalPrice,
      fullName,
      email,
      phone,
      status: "pending",
      bookingId, // 🔥 ADD THIS
    });

    // ================= FORMAT MENU CATEGORY-WISE =================

    let menuHTML = "";

    if (selectedMenu && selectedMenu.length > 0) {
      const groupedMenu = {};

      selectedMenu.forEach((item) => {
        const category = item.category || "Others";

        if (!groupedMenu[category]) {
          groupedMenu[category] = [];
        }

        groupedMenu[category].push(item.itemName);
      });

      menuHTML = Object.keys(groupedMenu)
        .map((category) => {
          return `
            <p style="margin-top:10px;"><strong>${category}</strong></p>
            ${groupedMenu[category]
              .map((item) => `<p style="margin:3px 0;">• ${item}</p>`)
              .join("")}
          `;
        })
        .join("");
    } else {
      menuHTML = `<p>No menu selected</p>`;
    }

    // ================= EMAIL =================

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Booking Request Received ⏳",
      html: `
        <div style="font-family: Arial; padding:20px; line-height:1.6;">
          
          <h2 style="color:#f59e0b;">Booking Request Received!</h2>

          <p>Hi <strong>${fullName}</strong>,</p>

          <p>
            Thank you for choosing <strong>Chandani Caterer's</strong> 💙
          </p>

          <p>
            Your booking request has been received. 
            Our team will contact you shortly to confirm your booking.
          </p>

          <hr/>

          <h3>📋 Booking Details</h3>
          <p><strong>Event:</strong> ${eventType}</p>
          <p><strong>Date:</strong> ${eventDate}</p>
          <p><strong>Time:</strong> ${eventTime}</p>
          <p><strong>Guests:</strong> ${guests}</p>
          <p><strong>Venue:</strong> ${venueType}</p>

          <br/>

          <h3>🍽️ Your Selected Menu</h3>
          ${menuHTML}

          <br/>

          <p>📞 Our team will contact you soon.</p>

          <p style="color:gray;">Status: Waiting for Confirmation</p>

          <br/>

          <p>
            Thanks & Regards,<br/>
            <strong>Chandani Caterer's Team</strong>
          </p>

        </div>
      `,
    });

    return NextResponse.json(
      { message: "Booking saved successfully", booking: newBooking },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Server Error" },
      { status: 500 }
    );
  }
}
// ================= CANCEL BOOKING =================

export async function PATCH(req) {
  try {
    await connectDB();

    const userId = req.headers.get("userid");

    if (!userId) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { bookingId } = await req.json();

    if (!bookingId) {
      return NextResponse.json(
        { message: "Booking ID required" },
        { status: 400 }
      );
    }

    // booking find karo
    const booking = await Booking.findOne({
      _id: bookingId,
      userId,
    });

    if (!booking) {
      return NextResponse.json(
        { message: "Booking not found" },
        { status: 404 }
      );
    }

    // already cancelled ya completed hai?
    if (
      booking.status === "cancelled" ||
      booking.status === "completed"
    ) {
      return NextResponse.json(
        { message: "Cannot cancel this booking" },
        { status: 400 }
      );
    }

    // status update
    booking.status = "cancelled";
    await booking.save();
    // ================= EMAIL FOR CANCELLATION =================
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: booking.email,
      
      subject: "Booking Cancelled ❌",
      html: `
        <div style="font-family: Arial; padding:20px;">
      
          <h2 style="color:red;">Booking Cancelled</h2>
          <p>Hi <strong>${booking.fullName}</strong>,</p>
          <p>Your booking has been successfully cancelled.</p>
          <hr/>
          <h3>📋 Booking Details</h3>
          <p><strong>Event:</strong> ${booking.eventType}</p>
          <p><strong>Date:</strong> ${booking.eventDate}</p>
          <p><strong>Time:</strong> ${booking.eventTime}</p>
          <br/>
          <p>If this was a mistake, you can book again anytime.</p>
          <br/>
          <p>Thanks,<br/>
          <strong>Chandani Caterer's Team</strong></p>
        </div>
      `,
   });
   await transporter.sendMail({
      from: `"Chandani Caterers" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: "User Cancelled Booking 🚨",
      html: `
        <div style="font-family: Arial; padding:20px; line-height:1.6;">      
          <h2 style="color:red;">Booking Cancelled by User</h2>
          <hr/>
          <h3>👤 User Details</h3>
          <p><strong>Name:</strong> ${booking.fullName}</p>
          <p><strong>Email:</strong> ${booking.email}</p>
          <p><strong>Phone:</strong> ${booking.phone}</p>
          <br/>
          <h3>📋 Booking Details</h3>
          <p><strong>Event:</strong> ${booking.eventType}</p>
          <p><strong>Date:</strong> ${booking.eventDate}</p>
          <p><strong>Time:</strong> ${booking.eventTime}</p>
          <p><strong>Guests:</strong> ${booking.guests}</p>
          <p><strong>Venue:</strong> ${booking.venueType}</p>
          <br/>
          <h3>🍽️ Menu</h3>
            ${
             booking.selectedMenu?.length > 0
               ? booking.selectedMenu
                    .map((item) => `<p>• ${item.itemName}</p>`)
                    .join("")
                : "<p>No menu selected</p>"
            }
            <br/>
            <p style="color:red;"><strong>Status: Cancelled</strong></p>
          </div>
        `,
      });

    return NextResponse.json(
      { message: "Booking cancelled successfully" },
      { status: 200 }
    );

  } catch (error) {
    console.error("Cancel Error:", error);
    return NextResponse.json(
      { message: "Server Error" },
      { status: 500 }
    );
  }
}