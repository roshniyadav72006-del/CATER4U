import { NextResponse } from "next/server";
import connectDB from "../../../../lib/mongoose";
import Booking from "../../../../models/Booking";

export async function GET() {
  try {
    await connectDB();

    const today = new Date().toLocaleDateString("en-CA"); 
    const todayEvents = await Booking.find({
      eventDate: today,
    }).sort({ createdAt: -1 });

    return NextResponse.json({ todayEvents });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
}