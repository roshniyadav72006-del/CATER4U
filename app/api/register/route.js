import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import User from "@/models/User";
import { sendEmail } from "@/lib/nodemailer";
import crypto from "crypto";

export async function POST(req) {
  try {
    await connectDB();
    const { username, email, password, phone, address } = await req.json();

    if (!username || !email || !password || !phone || !address) {
      return NextResponse.json({ error: "All fields required" }, { status: 400 });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return NextResponse.json({ error: "Email already registered" }, { status: 400 });
    }

    const verifyToken = crypto.randomBytes(32).toString("hex");

    const user = await User.create({
      username,
      email,
      password,
      phone,
      address,
      verifyToken,
    });

    // Send verification email
    const link = `${process.env.BASE_URL}/verify/${verifyToken}`;

    await sendEmail({
      to: email,
      subject: "Verify your Cater4U Account",
      html: `<p>Click the link to verify your account:</p><a href="${link}">Verify Account</a>`,
    });

    return NextResponse.json({ message: "Registered! Check your email." });
  } catch (error) {
    console.log("Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
