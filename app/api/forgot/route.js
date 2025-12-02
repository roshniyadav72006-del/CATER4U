import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/models/User";
import connectDB from "@/lib/mongoose";
import { transporter } from "@/lib/nodemailer";

export async function POST(req) {
  try {
    await connectDB();
    const { email } = await req.json();

    const user = await User.findOne({ email });
    if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "30m" });

    const resetLink = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password/${token}`;

    await transporter.sendMail({
      from: `"Cater4U" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Reset Your Password",
      html: `
        <p>Click to reset your password:</p>
        <a href="${resetLink}">${resetLink}</a>
      `,
    });

    return NextResponse.json({ message: "Reset email sent!" });

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
