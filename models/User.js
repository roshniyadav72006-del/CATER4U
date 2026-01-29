import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      // ❌ unique hata diya (tum pehle hi drop kar chuki ho)
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

    // 🔐 EMAIL VERIFICATION (OTP BASED)
    isVerified: {
      type: Boolean,
      default: false,
    },

    otp: {
      type: String,
    },

    otpExpiry: {
      type: Date,
    },

    // ⭐ Reset Password Fields (unchanged)
    resetToken: {
      type: String,
    },

    resetTokenExpire: {
      type: Date,
    },

    // 📞 Phone
    phone: {
      type: String,
      required: true,
    },

    // 🏠 Address
    address: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User =
  mongoose.models.User || mongoose.model("User", userSchema);

export default User;
