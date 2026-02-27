import { NextResponse } from "next/server";
import connectDB from "../../../../lib/mongoose";
import Booking from "../../../models/Booking";

export async function GET(req) {
  await connectDB();

  const bookings = await Booking.find().sort({ createdAt: -1 });

  return NextResponse.json(bookings);
}
