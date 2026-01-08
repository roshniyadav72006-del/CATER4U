import { NextResponse } from "next/server";

export function adminMiddleware(req) {
  if (req.user.role !== "admin") {
    return NextResponse.json(
      { message: "Admin access only" },
      { status: 403 }
    );
  }
  return null;
}
