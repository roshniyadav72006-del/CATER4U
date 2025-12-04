import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verifyToken: {
      type: String,
    },

    // ⭐ Added Fields for Reset Password
    resetToken: {
      type: String,
    },
    resetTokenExpire: {
      type: Date,
    },

    // New Field 1: Phone Number
    phone: {
      type: String, // Use String for phone numbers to handle formatting like +1-555-xxx-xxxx
      required: true,
      unique: false,
    },

    // New Field 2: Address
    address: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
