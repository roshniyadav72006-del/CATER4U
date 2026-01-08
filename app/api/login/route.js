import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/mongoose";
import User from "@/models/User";
import jwt from "jsonwebtoken"; // ✅ STEP 1: JWT import

export async function POST(req) {
  try {
    await connectDB();

    const { identifier, password } = await req.json();

    if (!identifier || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // ✅ User can login using EMAIL or USERNAME
    const user = await User.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    });

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return NextResponse.json(
        { message: "Invalid Password" },
        { status: 401 }
      );
    }

    // 🔐 STEP 1.3 START — JWT TOKEN CREATE
    const token = jwt.sign(
      {
        userId: user._id,   // user ki id
        role: user.role    // user ya admin
      },
      process.env.JWT_SECRET, // secret key (.env)
      {
        expiresIn: "1d" // token valid for 1 day
      }
    );
    // 🔐 STEP 1.3 END

    // ✅ SUCCESS RESPONSE (token ke sath)
    return NextResponse.json(
      {
        message: "Login Successful",
        token,              // frontend / thunder client ko milega
        role: user.role     // admin ya user
      },
      { status: 200 }
    );

  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Server Error" },
      { status: 500 }
    );
  }
}
