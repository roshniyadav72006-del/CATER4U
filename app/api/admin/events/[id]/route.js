import { NextResponse } from "next/server";
import connectDB from "../../../../../lib/mongoose";
import Event from "../../../../../models/Event";

// ================= UPDATE EVENT =================
export async function PUT(req, { params }) {
  try {
    await connectDB();

    const { id } = params;
    const body = await req.json();

    const updatedEvent = await Event.findByIdAndUpdate(id, body, {
      new: true,
    });

    if (!updatedEvent) {
      return NextResponse.json(
        { error: "Event not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedEvent);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update event" },
      { status: 500 }
    );
  }
}

// ================= DELETE EVENT =================
export async function DELETE(req, { params }) {
  try {
    await connectDB();

    await Event.findByIdAndDelete(params.id);

    return NextResponse.json({ message: "Deleted" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete event" },
      { status: 500 }
    );
  }
}