import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

// ✅ USER AUTH MIDDLEWARE
export function authUser(req) {
  try {
    const authHeader = req.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { message: "Unauthorized - Token missing" },
        { status: 401 }
      );
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    return null; 
  } catch (error) {
    return NextResponse.json(
      { message: "Invalid or Expired Token" },
      { status: 401 }
    );
  }
}
export function authAdmin(req) {
  const error = authUser(req);
  if (error) return error;

  if (req.user.role !== "admin") {
    return NextResponse.json(
      { message: "Admin access only" },
      { status: 403 }
    );
  }

  return null;
}
