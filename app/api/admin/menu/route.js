import { NextResponse } from "next/server";
import connectDB from "../../../../lib/mongoose";
import Menu from "../../../../models/Menu";
import path from "path";
import fs from "fs";

export async function GET() {
  try {
    await connectDB();

    const menus = await Menu.find().sort({ createdAt: -1 });

    return NextResponse.json(menus);

  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    await connectDB();

    const formData = await req.formData();
    const name = formData.get("name");
    const category = formData.get("category");
    const file = formData.get("image");

    let imagePath = "";

    // If image exists
    if (file && file.name) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadDir = path.join(process.cwd(), "public/uploads");

      // Create uploads folder if not exists
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      // Unique file name (prevent overwrite)
      const uniqueName = Date.now() + "-" + file.name;
      const filePath = path.join(uploadDir, uniqueName);

      fs.writeFileSync(filePath, buffer);

      imagePath = `/uploads/${uniqueName}`;
    }

    const menu = await Menu.create({
      name,
      category,
      image: imagePath,
    });

    return NextResponse.json(menu, { status: 201 });

  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    await connectDB();

    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { error: "ID is required" },
        { status: 400 }
      );
    }

    await Menu.findByIdAndDelete(id);

    return NextResponse.json({ message: "Deleted successfully" });

  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}