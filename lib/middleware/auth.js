import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export function authMiddleware(req) {
  try {
    const authHeader = req.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // request ke sath user attach kar rahe hain
    req.user = decoded;

    return null; // continue request
  } catch (err) {
    return NextResponse.json(
      { message: "Invalid token" },
      { status: 401 }
    );
  }
}
