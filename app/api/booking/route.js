import { NextResponse } from "next/server";
import connectDB from "../../../lib/mongoose";
import Booking from "../../../models/Booking";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    await connectDB();

    // 🔹 Check Authorization Header
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

    // 🔹 Basic validation
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

    // 🔹 Create Booking
    const newBooking = await Booking.create({
      userId: decoded.userId || decoded.id, // safe handling
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
    });

    // ================= EMAIL SENDING =================

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
      subject: "Cater4U Booking Confirmation 🎉",
      html: `
        <h2>Booking Confirmed!</h2>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Event:</strong> ${eventType}</p>
        <p><strong>Date:</strong> ${eventDate}</p>
        <p><strong>Time:</strong> ${eventTime}</p>
        <p><strong>Guests:</strong> ${guests}</p>
        <p><strong>Venue:</strong> ${venueType}</p>
        <p><strong>Total Amount:</strong> ₹${totalPrice}</p>
        <br/>
        <p>Status: Pending</p>
        <br/>
        <p>Thank you for choosing Cater4U 💙</p>
      `,
    });

    // =================================================

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