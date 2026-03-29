import mongoose from "mongoose";

// Support both variable names
const MONGODB_URI =
  process.env.MONGODB_URI || process.env.MONGO_URI;

console.log("ENV CHECK:", MONGODB_URI);

if (!MONGODB_URI) {
  throw new Error(
    "Please define MONGODB_URI or MONGO_URI in your .env.local file"
  );
}

// Prevent multiple connections in development (Next.js hot reload fix)
let cached = global.mongoose;

if (!cached) {
  cached = globalThis.mongoose = { // 🔥 updated
    conn: null,
    promise: null,
  };
}
async function connectDB() {
  // Already connected
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}
export default connectDB;