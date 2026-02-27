import { NextResponse } from "next/server";
import Menu from "../../../../models/Menu";
import connectDB from "../../../../lib/mongoose";
import { writeFile } from "fs/promises";
import path from "path";

// GET ALL (Admin)
export async function GET() {
  await connectDB();
  const menus = await Menu.find().sort({ createdAt: -1 });
  return NextResponse.json(menus);
}

// CREATE
export async function POST(req) {
  await connectDB();

  const data = await req.formData();

  const name = data.get("name");
  const category = data.get("category");
  const status = data.get("status") || "Available";
  const file = data.get("image");

  let imagePath = "";

  if (file && file.name) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = path.join(process.cwd(), "public/uploads");
    const fileName = Date.now() + "-" + file.name;

    await writeFile(path.join(uploadDir, fileName), buffer);
    imagePath = `/uploads/${fileName}`;
  }

  const menu = await Menu.create({
    name,
    category,
    status,
    image: imagePath,
  });

  return NextResponse.json(menu, { status: 201 });
}

// DELETE
export async function DELETE(req) {
  await connectDB();

  const { id } = await req.json();
  await Menu.findByIdAndDelete(id);

  return NextResponse.json({ message: "Deleted successfully" });
}