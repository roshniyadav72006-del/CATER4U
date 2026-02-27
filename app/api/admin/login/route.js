import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    const body = await req.json();
    const email = body.email?.trim();
    const password = body.password?.trim();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password required" },
        { status: 400 }
      );
    }

    // ENV check
    if (!process.env.ADMIN_EMAIL || 
        !process.env.ADMIN_PASSWORD || 
        !process.env.JWT_SECRET) {
      console.log("❌ ENV VARIABLES MISSING");
      return NextResponse.json(
        { message: "Server configuration error" },
        { status: 500 }
      );
    }

    // Credential match
    if (
      email !== process.env.ADMIN_EMAIL.trim() ||
      password !== process.env.ADMIN_PASSWORD.trim()
    ) {
      return NextResponse.json(
        { message: "Invalid admin credentials" },
        { status: 401 }
      );
    }

    // Generate JWT
    const token = jwt.sign(
      { role: "admin", email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    const response = NextResponse.json({
      success: true,
      message: "Admin login success",
    });

    response.cookies.set("adminToken", token, {
      httpOnly: true,
      secure: false, // keep false in dev
      sameSite: "lax",
      maxAge: 60 * 60 * 24,
      path: "/",
    });

    return response;

  } catch (error) {
    console.error("❌ SERVER ERROR:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}