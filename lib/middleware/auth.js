import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

// ✅ USER AUTH MIDDLEWARE
export function authUser(req) {
  try {
    // 1️⃣ Header se token nikaalo
    const authHeader = req.headers.get("authorization");

    // Token nahi mila
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { message: "Unauthorized - Token missing" },
        { status: 401 }
      );
    }

    // 2️⃣ "Bearer TOKEN" → TOKEN
    const token = authHeader.split(" ")[1];

    // 3️⃣ Token verify karo
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4️⃣ User info request me attach karo
    req.user = decoded;

    return null; // ✅ sab sahi hai, aage jaane do
  } catch (error) {
    return NextResponse.json(
      { message: "Invalid or Expired Token" },
      { status: 401 }
    );
  }
}

// ✅ ADMIN AUTH MIDDLEWARE
export function authAdmin(req) {
  const error = authUser(req);
  if (error) return error;

  // 5️⃣ Role check
  if (req.user.role !== "admin") {
    return NextResponse.json(
      { message: "Admin access only" },
      { status: 403 }
    );
  }

  return null;
}
