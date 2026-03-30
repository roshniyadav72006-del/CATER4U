import { NextResponse } from "next/server";
import connectDB from "../../../lib/mongoose";
import Feedback from "../../../models/Feedback";

export async function POST(req) {
  try {
    await connectDB();

    const data = await req.json();

    // 🔥 NEW: count existing feedbacks
    const count = await Feedback.countDocuments(); // 👈 added

    // 🔥 NEW: generate custom feedback ID (FID001, FID002...)
    const feedbackId = "FID" + String(count + 1).padStart(3, "0"); // 👈 added

    // 🔥 UPDATED: include feedbackId
    const newFeedback = await Feedback.create({
      ...data,
      feedbackId, // 👈 added
    });

    return NextResponse.json({
      success: true,
      message: "Feedback saved",
      data: newFeedback,
    });

  } catch (error) {
    console.error(error); // 👈 added for debugging

    return NextResponse.json(
      { success: false, message: "Error saving feedback" },
      { status: 500 }
    );
  }
}