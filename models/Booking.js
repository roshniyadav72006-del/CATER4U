import mongoose from "mongoose";

// Booking Schema
const BookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
    eventDate: {
      type: Date,
      required: [true, "Event date is required"],
    },
    eventType: {
      type: String,
      required: [true, "Event type is required"],
      trim: true,
    },
    guests: {
      type: Number,
      required: [true, "Number of guests is required"],
      min: [1, "Guests must be at least 1"],
    },
    menuItems: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Menu",
      },
    ],
    totalPrice: {
      type: Number,
      min: [0, "Total price cannot be negative"],
      default: 0,
    },
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Cancelled", "Completed"],
      default: "Pending",
    },
  },
  { timestamps: true } // adds createdAt & updatedAt automatically
);

// Hot-reload safe in Next.js dev mode
const Booking = mongoose.models.Booking || mongoose.model("Booking", BookingSchema);

export default Booking;
