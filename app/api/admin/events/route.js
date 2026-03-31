import { NextResponse } from "next/server";
import connectDB from "../../../../lib/mongoose";
import Event from "../../../../models/Event";
import Booking from "../../../../models/Booking"; // ✅ ADD

// ================= GET ALL EVENTS =================
// ================= GET ALL EVENTS =================
export async function GET() {
  try {
    await connectDB();
    const events = await Event.find();

    const eventsWithBookings = await Promise.all(
      events.map(async (event) => {

        // 👇 clean keyword (first word only)
        const keyword = event.name.toLowerCase().split(" ")[0];

        const count = await Booking.countDocuments({
          $or: [
            { eventId: event._id }, // ✅ exact match (new data)
            {
              eventType: {
                $regex: `^${keyword}$`, // ✅ STRICT match (fix 50 bug)
                $options: "i",
              },
            },
          ],
        });

        return {
          ...event.toObject(),
          totalBookings: count,
        };
      })
    );

    return NextResponse.json(eventsWithBookings);

  } catch (error) {
    console.error("REAL ERROR:", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

// ================= CREATE EVENT =================
export async function POST(req) {
  try {
    await connectDB();

    const data = await req.json();

    const newEvent = await Event.create({
      name: data.name.trim(),
      eventType: data.eventType,        // old (keep for backup)
      eventId: data.eventId,            // ✅ NEW ADD
      description: data.description,
      emoji: data.emoji,
      totalBookings: 0,
      status: "active",
    });

    return NextResponse.json(newEvent, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Failed to create" }, { status: 500 });
  }
}