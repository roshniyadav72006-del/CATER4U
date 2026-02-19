import { NextResponse } from "next/server";
import Booking from "@/models/Booking";
import { authUser } from "@/lib/middleware/auth";
import { verifyAdmin } from "@/app/lib/middleware/adminAuth";

// 🔴 ADMIN: all bookings dekh sakta hai
export async function GET() {
  const admin = verifyAdmin();
  if (!admin) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 403 }
    );
  }

  const bookings = await Booking.find().sort({ createdAt: -1 });
  return NextResponse.json(bookings);
}

// 🟢 USER: booking create karta hai
export async function POST(req) {
  const auth = authUser(req);
  if (auth.error) {
    return NextResponse.json(
      { message: auth.error },
      { status: 401 }
    );
  }

  const body = await req.json();

  const booking = await Booking.create({
    ...body,
    userId: auth.user.id
  });

  return NextResponse.json(booking, { status: 201 });
}
