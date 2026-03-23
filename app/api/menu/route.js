import { NextResponse } from "next/server";
import connectDB from "../../../lib/mongoose";
import Menu from "../../../models/Menu";

export async function GET() {
  try {
    await connectDB();

    const menus = await Menu.find();

    return NextResponse.json(menus);
  } catch (error) {
    console.error("Menu API Error:", error);

    return NextResponse.json(
      { message: "Failed to fetch menu" },
      { status: 500 }
    );
  }
}