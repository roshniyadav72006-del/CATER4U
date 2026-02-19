import { NextResponse } from "next/server";
import { verifyAdmin } from "../../../lib/middleware/adminApi";
import Menu from "../../../models/Menu";
import connectDB from "../../../lib/mongoose";

// 🔹 PUBLIC GET
export async function GET() {
  try {
    await connectDB();
    const menus = await Menu.find({ isAvailable: true }).sort({ createdAt: -1 });
    return NextResponse.json(menus);
  } catch (err) {
    console.error("GET error:", err);
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

// 🔹 ADMIN ONLY POST
export async function POST(req) {
  try {
    await verifyAdmin(req);
    await connectDB();

    const body = await req.json();
    const item = await Menu.create(body);

    return NextResponse.json(item, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 403 });
  }
}

// 🔹 ADMIN ONLY PUT
export async function PUT(req) {
  try {
    await verifyAdmin(req);
    await connectDB();

    const body = await req.json();
    const updated = await Menu.findByIdAndUpdate(body.id, body, { new: true });

    return NextResponse.json(updated);
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 400 });
  }
}

// 🔹 ADMIN ONLY DELETE
export async function DELETE(req) {
  try {
    await verifyAdmin(req);
    await connectDB();

    const body = await req.json();
    await Menu.findByIdAndDelete(body.id);

    return NextResponse.json({ message: "Deleted successfully" });
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 400 });
  }
}
