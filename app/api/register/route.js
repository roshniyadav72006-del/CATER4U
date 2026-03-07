import { NextResponse } from "next/server";
import connectDB from "../../../lib/mongoose";
import User from "../../../models/User";
import { sendEmail } from "../../../lib/nodemailer";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    await connectDB();

    const { username, email, password, phone, address } = await req.json();

    // 🔴 Basic validation
    if (!username || !email || !password || !phone || !address) {
      return NextResponse.json(
        { error: "All fields required" },
        { status: 400 }
      );
    }

    // 🔴 Email already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return NextResponse.json(
        { error: "Email already exists. Please login." },
        { status: 400 }
      );
    }

    // 🔐 Generate OTP (6 digit)
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // 🔐 Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Create user with OTP
    await User.create({
      username,
      email,
      password: hashedPassword,
      phone,
      address,
      isVerified: false,
      otp,
      otpExpiry,
    });

    // 📧 Send OTP email
    await sendEmail({
      to: email,
      subject: "Chandani Catering Services Email Verification OTP",
      html: `
        <h2>Email Verification</h2>
        <p>Your OTP code is:</p>
        <h1 style="letter-spacing: 2px;">${otp}</h1>
        <p>This OTP is valid for 10 minutes.</p>
      `,
    });

    return NextResponse.json({
      message: "OTP sent to your email",
    });

  } catch (error) {
    console.log("REGISTER ERROR:", error);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
