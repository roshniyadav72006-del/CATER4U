import { NextResponse } from "next/server";
import connectDB from "../../../../lib/mongoose";
import Event from "../../../../models/Event";
// ✅ Update Event (Status change or any field)
export async function PUT(req, { params }) {
  try {
    await connectDB();
    const body = await req.json();

    const updatedEvent = await Event.findByIdAndUpdate(
      params.id,
      body,
      { new: true }
    );

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

// ✅ Delete Event
export async function DELETE(req, { params }) {
  try {
    await connectDB();

    const deletedEvent = await Event.findByIdAndDelete(params.id);

    if (!deletedEvent) {
      return NextResponse.json(
        { error: "Event not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete event" },
      { status: 500 }
    );
  }
}