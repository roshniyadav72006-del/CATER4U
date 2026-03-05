import { NextResponse } from "next/server";
import connectDB from "../../../../lib/mongoose";
import Menu from "../../../../models/Event";
import path from "path";
import fs from "fs";
// ================= GET ALL EVENTS =================
export async function GET() {
  try {
    await connectDB();
    const events = await Event.find();
    return NextResponse.json(events);
  } catch (error) {
    console.error("REAL ERROR:", error);  // 👈 ADD THIS
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

// ================= CREATE EVENT =================
export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    const event = await Event.create(body);

    return Response.json(event, { status: 201 });
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}