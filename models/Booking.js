import mongoose from "mongoose";

import "./User";


const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Step 1 - Event Details
    eventType: {
      type: String,
      required: true,
    },
    eventDate: {
      type: String,
      required: true,
    },
    eventTime: {
      type: String,
      required: true,
    },
    guests: {
      type: Number,
      required: true,
    },
    venueType: {
      type: String,
      required: true,
    },
    venueAddress: {
      type: String,
      required: true,
    },
    specialRequests: {
      type: String,
    },

    // Step 2 - Menu
    selectedMenu: [
      {
        itemName: String,
        price: Number,
        quantity: Number,
      },
    ],

    totalPrice: {
      type: Number,
      required: true,
    },

    // Step 3 - Contact
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    status:{
      type: String,
      default: "pending"
      
    },
  },
  { timestamps: true }
);

export default mongoose.models.Booking ||
  mongoose.model("Booking", bookingSchema);