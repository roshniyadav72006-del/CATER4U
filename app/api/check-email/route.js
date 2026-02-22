import { NextResponse } from "next/server";
import connectDB from "../../../lib/mongoose"
import User from "../../../models/User";
export async function POST(req) {
  try {
    await connectDB();
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { exists: false },
        { status: 200 }
      );
    }

    const user = await User.findOne({ email });

    return NextResponse.json({
      exists: !!user,
    });
  } catch (error) {
    return NextResponse.json(
      { exists: false },
      { status: 500 }
    );
  }
}
