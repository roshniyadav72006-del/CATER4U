import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/mongoose";
import User from "@/models/User";

export async function POST(request) {
  try {
    await connectDB();
    const { username, email, password, phone, address } = await request.json();

    if (!username || !email || !password || !phone || !address) {
      return NextResponse.json({ message: "All fields required" }, { status: 400 });
    }

    // ✅ Phone validation added here
    const phoneRegex = /^[6-9]\d{9}$/; 
    if (!phoneRegex.test(phone)) {
      return NextResponse.json(
        { message: "Invalid Indian phone number (10 digits required)" },
        { status: 400 }
      );
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return NextResponse.json({ message: "User already exists" }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      username,
      email,
      password: hashedPassword,
      phone,
      address,
    });

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration route error:", error);
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
