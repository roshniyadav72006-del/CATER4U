import { NextResponse } from "next/server";
import { verifyAdmin } from "@/lib/middleware/admin";
import Menu from "@/models/Menu";
import connectDB from "@/lib/mongoose";

// GET → USER + ADMIN
export async function GET() {
  await connectDB();
  const menu = await Menu.find();
  return NextResponse.json(menu);
}

// POST → ONLY ADMIN
export async function POST(req) {
  try {
    await verifyAdmin(req); // 🔐 admin check

    await connectDB();
    const body = await req.json();

    const item = await Menu.create(body);
    return NextResponse.json(item, { status: 201 });

  } catch (err) {
    return NextResponse.json(
      { message: err.message },
      { status: 403 }
    );
  }
}
