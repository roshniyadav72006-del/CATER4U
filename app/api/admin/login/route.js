import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    // ✅ Check env
    if (
      !process.env.ADMIN_EMAIL ||
      !process.env.ADMIN_PASSWORD ||
      !process.env.JWT_SECRET
    ) {
      return NextResponse.json(
        { message: "Server configuration error" },
        { status: 500 }
      );
    }

    // ✅ Validate credentials
    if (
      email.trim() !== process.env.ADMIN_EMAIL.trim() ||
      password.trim() !== process.env.ADMIN_PASSWORD.trim()
    ) {
      return NextResponse.json(
        { message: "Invalid admin credentials" },
        { status: 401 }
      );
    }

    // ✅ Generate token
    const token = jwt.sign(
      {
        role: "admin",
        email,
        admin: true,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // ✅ Create response
    const response = NextResponse.json({
      success: true,
      message: "Admin login success",
    });

    // ✅ Set cookie
    response.cookies.set("adminToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24,
      path: "/",
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
