import dotenv from "dotenv";
dotenv.config(); // load .env.local or .env

import mongoose from "mongoose";

async function testConnection() {
  const uri = process.env.MONGODB_URI;

  console.log("URI:", uri); // TEMP check

  try {
    await mongoose.connect(uri);
    console.log("✅ Connected to MongoDB!");
  } catch (err) {
    console.error("❌ Error:", err.message);
  }
}

testConnection();
