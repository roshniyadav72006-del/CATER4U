import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
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

    // ⭐ Reset Password Fields
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

    // 🖼 Profile Image (NEW FIELD)
    image: {
      type: String,      // base64 or image URL
      default: "",
    },
  },
  { timestamps: true }
);

const User =
  mongoose.models.User || mongoose.model("User", userSchema);

export default User;