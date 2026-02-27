import { NextResponse } from "next/server";
import connectDB from "../../../../../lib/mongoose";
import Booking from "../../../models/Booking";

export async function PATCH(req, { params }) {
  await connectDB();
  await verifyAdmin(req);

  const { status } = await req.json();

  const updated = await Booking.findByIdAndUpdate(
    params.id,
    { status },
    { new: true }
  );

  return NextResponse.json(updated);
}
