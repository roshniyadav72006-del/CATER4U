import { NextResponse } from "next/server";
import connectDB from "../../../lib/mongoose";   // ✅ FIX
import Booking from "../../../models/Booking";   // ✅ FIX

export async function GET(req) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const month = searchParams.get("month"); // 2026-04

  const start = new Date(`${month}-01`);
  const end = new Date(start);
  end.setMonth(end.getMonth() + 1);

  const bookings = await Booking.aggregate([
    {
      $match: {
        eventDate: { $gte: start, $lt: end }
      }
    },
    {
      $group: {
        _id: "$eventDate",
        count: { $sum: 1 }
      }
    }
  ]);

  return NextResponse.json(bookings);
}