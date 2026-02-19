import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import Booking from "@/models/Booking";
import { verifyAdmin } from "@/lib/middleware/adminApi";

export async function GET(req) {
  await connectDB();
  await verifyAdmin(req);

  const bookings = await Booking.find().sort({ createdAt: -1 });

  return NextResponse.json(bookings);
}
