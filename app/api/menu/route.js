import { NextResponse } from "next/server";
import Menu from "../../../models/Menu";
import connectDB from "../../../lib/mongoose";

export async function GET() {
  await connectDB();

  const menus = await Menu.find({ status: "Available" })
    .sort({ createdAt: -1 });

  return NextResponse.json(menus);
}