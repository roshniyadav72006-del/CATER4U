import { NextResponse } from "next/server";
import { verifyAdmin } from "@/lib/middleware/adminApi";
import Menu from "@/models/Menu";
import connectDB from "@/lib/mongoose";

// 🔹 GET: Fetch all menu items (everyone can view)
export async function GET() {
  try {
    await connectDB();
    const menus = await Menu.find().sort({ createdAt: -1 });
    return NextResponse.json(menus);
  } catch (err) {
    console.error("GET /api/menu error:", err);
    return NextResponse.json(
      { message: "Failed to fetch menu" },
      { status: 500 }
    );
  }
}

// 🔹 POST: Create menu item (Admin only)
export async function POST(req) {
  try {
    await verifyAdmin(req); // Admin check
    await connectDB();

    const body = await req.json();
    const item = await Menu.create(body);

    return NextResponse.json(item, { status: 201 });
  } catch (err) {
    console.error("POST /api/menu error:", err);
    return NextResponse.json(
      { message: err.message || "Unauthorized" },
      { status: err.message ? 400 : 403 }
    );
  }
}

// 🔹 PUT: Update menu item (Admin only)
export async function PUT(req) {
  try {
    await verifyAdmin(req);
    await connectDB();

    const body = await req.json();
    if (!body.id) throw new Error("Menu ID is required");

    const updated = await Menu.findByIdAndUpdate(body.id, body, { new: true });
    return NextResponse.json(updated);
  } catch (err) {
    console.error("PUT /api/menu error:", err);
    return NextResponse.json(
      { message: err.message || "Failed to update menu" },
      { status: 400 }
    );
  }
}

// 🔹 DELETE: Delete menu item (Admin only)
export async function DELETE(req) {
  try {
    await verifyAdmin(req);
    await connectDB();

    const body = await req.json();
    if (!body.id) throw new Error("Menu ID is required");

    await Menu.findByIdAndDelete(body.id);
    return NextResponse.json({ message: "Menu deleted successfully" });
  } catch (err) {
    console.error("DELETE /api/menu error:", err);
    return NextResponse.json(
      { message: err.message || "Failed to delete menu" },
      { status: 400 }
    );
  }
}

