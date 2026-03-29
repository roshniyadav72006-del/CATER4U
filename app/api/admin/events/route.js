import { NextResponse } from "next/server";
import connectDB from "../../../../lib/mongoose";
import Event from "../../../../models/Event";


// ================= GET ALL EVENTS =================
export async function GET() {
  try {
    await connectDB();

    const events = await Event.find();

    return NextResponse.json(events);
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

    const body = await req.json();

    const event = await Event.create(body);

    // ✅ FIXED
    return NextResponse.json(event, { status: 201 });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}