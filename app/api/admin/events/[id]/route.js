import { NextResponse } from "next/server";
import connectDB from "../../../../../lib/mongoose";
import Event from "../../../../../models/Event";

export async function PUT(req, { params }) {
  try {
    await connectDB();

    const { id } = await params; 
    const body = await req.json();

    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      {
        name: body.name,
        description: body.description,
        emoji: body.emoji,
      },
      { new: true }
    );

    return NextResponse.json(updatedEvent);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

// ================= DELETE EVENT =================
export async function DELETE(req, { params }) {
  try {
    await connectDB();

    const { id } = await params; // ✅ FIX

    await Event.findByIdAndDelete(id);

    return NextResponse.json({ message: "Deleted" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}