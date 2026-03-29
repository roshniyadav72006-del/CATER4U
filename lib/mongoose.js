import mongoose from "mongoose";

// ✅ Support both env variable names
const MONGODB_URI =
  process.env.MONGODB_URI || process.env.MONGO_URI;

// ❌ Removed console.log for security (don't expose DB URL in logs)

// ✅ Better error message
if (!MONGODB_URI) {
  throw new Error(
    "❌ MongoDB URI missing. Please add MONGODB_URI or MONGO_URI in .env.local"
  );
}

// ✅ Use globalThis (safer in Next.js environment)
let cached = globalThis.mongoose; // 🔥 updated (global → globalThis)

if (!cached) {
  cached = globalThis.mongoose = { // 🔥 updated
    conn: null,
    promise: null,
  };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
      family: 4,
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDB;