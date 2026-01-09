// lib/middleware/admin.js
import jwt from "jsonwebtoken";
import User from "@/models/User";
import connectDB from "@/lib/mongoose";

export async function verifyAdmin(req) {
  try {
    await connectDB();

    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      throw new Error("No token");
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);

    if (!user || user.role !== "admin") {
      throw new Error("Not admin");
    }

    return user; // ✅ admin verified
  } catch (err) {
    throw new Error("Admin access denied");
  }
}
