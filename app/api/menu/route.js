import { NextResponse } from "next/server";
import connectDB from "../../../lib/mongoose";
import Menu from "../../../models/Menu";
export async function GET() {
  await connectDB();
  const menus = await Menu.find({ status: "Available" });
  return NextResponse.json(menus);
}