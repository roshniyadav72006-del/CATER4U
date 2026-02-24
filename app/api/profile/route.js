import connectDB from "../../../lib/mongoose";
import User from "../../../models/User";
import { NextResponse } from "next/server";
// GET PROFILE
export async function GET(req) {
  try {
    await connectDB();

    const userId = req.headers.get("userid");

    if (!userId) {
      return NextResponse.json({ error: "User ID missing" }, { status: 400 });
    }

    const user = await User.findById(userId).select("-password");

    return NextResponse.json(user);

  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// UPDATE PROFILE
export async function PUT(req) {
  try {
    await connectDB();

    const body = await req.json();

    const updatedUser = await User.findByIdAndUpdate(
      body.userId,
      {
        username: body.username,
        phone: body.phone,
        address: body.address,
        image: body.image,
      },
      { new: true }
    ).select("-password");

    return NextResponse.json(updatedUser);

  } catch (error) {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}