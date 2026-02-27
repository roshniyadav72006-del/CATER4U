import { NextResponse } from "next/server";
import connectDB from "../../../../lib/mongoose";
import Event from "../../../../models/Event";

// ✅ GET - All Events
export async function GET() {
  try {
    await connectDB();
    const events = await Event.find().sort({ createdAt: -1 });
    return NextResponse.json(events);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    );
  }
}

// ✅ POST - Create Event Booking
export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    // 🔥 1️⃣ Past Date Validation
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const selectedDate = new Date(body.eventDate);

    if (selectedDate < today) {
      return NextResponse.json(
        { error: "Past dates are not allowed" },
        { status: 400 }
      );
    }

    // 🔥 2️⃣ Create Event (Sequential ID auto model me generate hoga)
    const newEvent = await Event.create(body);

    return NextResponse.json(newEvent, { status: 201 });

  } catch (error) {

    // 🔥 3️⃣ Duplicate Phone Error Handling
    if (error.code === 11000) {
      return NextResponse.json(
        { error: "Phone number already used for booking" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: error.message || "Failed to create event" },
      { status: 500 }
    );
  }
}