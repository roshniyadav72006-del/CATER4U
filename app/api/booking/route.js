import { NextResponse } from "next/server";
import connectDB from "../../../lib/mongoose";
import Booking from "../../../models/Booking";
import { authUser } from "../../../lib/middleware/auth";


// 🔹 CREATE BOOKING
export async function POST(req) {
  await connectDB();

  const auth = await authUser(req);

  if (auth.error) {
    return NextResponse.json({ message: auth.error }, { status: 401 });
  }

  const body = await req.json();

  const booking = await Booking.create({
    ...body,
    userId: auth.user.id,
  });

  return NextResponse.json(booking, { status: 201 });
}


// 🔹 GET USER BOOKINGS  ✅ (NEW ADD)
export async function GET(req) {
  try {
    await connectDB();

    const userId = req.headers.get("userid");

    if (!userId) {
      return NextResponse.json([], { status: 200 });
    }

    const bookings = await Booking.find({ userId });

    return NextResponse.json(bookings);

  } catch (error) {
    return NextResponse.json([], { status: 500 });
  }
}