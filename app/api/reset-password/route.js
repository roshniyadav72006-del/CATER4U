import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import connectDB from "@/lib/mongoose";

export async function POST(req) {
  try {
    await connectDB();
    const { token, password } = await req.json();

    if (!token || !password)
      return NextResponse.json(
        { message: "Missing fields" },
        { status: 400 }
      );

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const hashed = await bcrypt.hash(password, 10);

    await User.findByIdAndUpdate(decoded.userId, { password: hashed });

    return NextResponse.json({ message: "Password updated successfully!" });

  } catch (err) {
    return NextResponse.json(
      { message: "Invalid or expired token" },
      { status: 400 }
    );
  }
}
