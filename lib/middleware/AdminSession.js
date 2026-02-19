import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export function verifyAdmin() {
  const token = cookies().get("adminToken")?.value;
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "admin") return null;
    return decoded;
  } catch {
    return null;
  }
}
