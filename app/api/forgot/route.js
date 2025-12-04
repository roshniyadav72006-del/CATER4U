import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/models/User";
import connectDB from "@/lib/mongoose";
import { sendEmail } from "@/lib/nodemailer";

export async function POST(req) {
  try {
    await connectDB();
    const { email } = await req.json();

    const user = await User.findOne({ email });
    if (!user)
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "30m" }
    );

    const resetLink = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password/${token}`;

    await sendEmail({
      to: email,
      subject: "Reset Your Password",
      html: `
        <p>Hello,</p>
        <p>You requested to reset your Cater4U password.</p>
        <p>Click the link below:</p>
        <a href="${resetLink}" target="_blank">${resetLink}</a>
        <p>This link is valid for 30 minutes.</p>
      `,
    });

    return NextResponse.json({ message: "Reset email sent!" });

  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}
