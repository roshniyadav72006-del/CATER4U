import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import User from "@/models/User";

export async function GET(req) {
  try {
    await connectDB();

    const token = req.nextUrl.searchParams.get("token");
    if (!token) return NextResponse.json({ error: "Invalid token" });

    const user = await User.findOne({ verifyToken: token });
    if (!user) return NextResponse.json({ error: "Invalid or expired token" });

    user.isVerified = true;
    user.verifyToken = null;
    await user.save();

    return NextResponse.json({ message: "Email verified successfully!" });
  } catch (error) {
    return NextResponse.json({ error: "Server error" });
  }
}
