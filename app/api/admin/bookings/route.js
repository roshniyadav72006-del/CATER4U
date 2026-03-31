import { NextResponse } from "next/server";
import connectDB from "../../../../lib/mongoose";
import Booking from "../../../../models/Booking";

export async function GET(req) {
  try {
    await connectDB();

    const bookings = await Booking.find()
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    // ✅ FIX: _id ko string me convert karna
    const formattedBookings = bookings.map((b) => ({
      ...b.toObject(),
      _id: b._id.toString(), // ⭐ MOST IMPORTANT LINE
    }));

    return NextResponse.json(formattedBookings);

  } catch (error) {
    console.error("Fetch Error:", error);

    return NextResponse.json(
      { error: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}