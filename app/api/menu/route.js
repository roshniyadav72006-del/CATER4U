import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import Menu from "@/models/Menu";

export async function POST(req) {
  await connectDB();
  const data = await req.json();
  const menu = await Menu.create(data);
  return NextResponse.json(menu);
}

export async function GET() {
  await connectDB();
  const menu = await Menu.find();
  return NextResponse.json(menu);
}
