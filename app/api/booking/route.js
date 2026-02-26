import { NextResponse } from "next/server";
import connectDB from "../../../lib/mongoose";
import Booking from "../../../models/Booking";
import jwt from "jsonwebtoken";

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
    console.log("TOKEN RECEIVED:", token);
    console.log("SECRET:", process.env.JWT_SECRET);   // 👈 YAHAN ADD KARO

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

    // Basic validation
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

    const newBooking = await Booking.create({
      userId: decoded.userId, // JWT se user id
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