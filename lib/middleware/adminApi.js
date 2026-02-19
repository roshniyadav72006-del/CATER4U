import jwt from "jsonwebtoken";
import connectDB from "../mongoose";
import User from "../../models/User";

export async function verifyAdmin(req) {
  await connectDB();

  // 🔹 Get Authorization header
  const authHeader = req.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("No token provided");
  }

  // 🔹 Extract token
  const token = authHeader.split(" ")[1];

  try {
    // 🔹 Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded?.id) {
      throw new Error("Invalid token");
    }

    // 🔹 Find user
    const user = await User.findById(decoded.id);

    if (!user) {
      throw new Error("User not found");
    }

    if (user.role !== "admin") {
      throw new Error("Not authorized as admin");
    }

    return user; // ✅ Admin verified
  } catch (error) {
    throw new Error("Admin access denied");
  }
}
