import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import Booking from "@/models/Booking";
import { authUser } from "@/lib/middleware/auth";

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
