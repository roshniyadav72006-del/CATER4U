import { NextResponse } from "next/server";
import connectDB from "../../../lib/mongoose";
import Feedback from "../../../models/Feedback";

export async function POST(req) {
  try {
    await connectDB();

    const data = await req.json();

    const newFeedback = await Feedback.create(data);

    return NextResponse.json({
      success: true,
      message: "Feedback saved",
      data: newFeedback,
    });

  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error saving feedback" },
      { status: 500 }
    );
  }
}