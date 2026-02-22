import connectDB from "../../../lib/mongoose";
import User from "../../../models/User";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectDB();

    const userId = req.headers.get("userid"); // temporary method

    if (!userId) {
      return NextResponse.json({ error: "User ID missing" }, { status: 400 });
    }

    const user = await User.findById(userId).select("-password");

    return NextResponse.json(user);

  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}