import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import Booking from "@/models/Booking";
import { verifyAdmin } from "@/lib/middleware/AdminSession";

export async function PATCH(req) {
  try {
    await verifyAdmin(req); // admin only
    await connectDB();

    const { id, status } = await req.json();

    if (!id || !status) {
      return NextResponse.json({ message: "ID and status required" }, { status: 400 });
    }

    const updated = await Booking.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    return NextResponse.json(updated);
  } catch (err) {
    console.error("PATCH /api/booking/status error:", err);
    return NextResponse.json(
      { message: err.message || "Failed to update status" },
      { status: 500 }
    );
  }
}
