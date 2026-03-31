import { NextResponse } from "next/server";
import connectDB from "../../../../lib/mongoose";
import Booking from "../../../../models/Booking";

export async function GET() {
  try {
    await connectDB();

    const today = new Date().toLocaleDateString("en-CA");

    const todayEvents = await Booking.find({
      eventDate: today,
    })
      .populate("userId", "name email")   // 👈 ADD KIYA
      .sort({ createdAt: -1 });

    // 👇 Safe formatted data (frontend ke liye)
    const formattedEvents = todayEvents.map((booking) => ({
      _id: booking._id,
      customerName: booking.userId?.name || booking.fullName,
      eventType: booking.eventType,
      venue: booking.venue,
      eventTime: booking.eventTime,
      eventDate: booking.eventDate,
      guestCount: booking.guestCount || booking.guests,
      status: booking.status,
      userId: booking.userId,
    }));

    return NextResponse.json({ todayEvents: formattedEvents });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
}