import mongoose from "mongoose";
import Counter from "./Counter";
import "./User";

const bookingSchema = new mongoose.Schema(
  {
    bookingId: {
      type: String,
      unique: true,
    },
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
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event", },
    
    eventDate: {
      type: Date,
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
    
    

    selectedMenu: [
      {
        itemName: String,
        price: Number,
        quantity: Number,
      },
    ],
    totalPrice: { type: Number, required: true },

    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },

    status: {
      type: String,
      default: "pending",
    },
    bookingId: String, // 🔥 NEW FIELD
  },
  { timestamps: true }
);


// 🔥 AUTO BOOKING ID
bookingSchema.pre("save", async function (next) {
  try {
    if (!this.bookingId) {
      const counter = await Counter.findOneAndUpdate(
        { name: "bookingId" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );

      this.bookingId =
        "BKG" + String(counter.seq).padStart(4, "0");
    }

    next();
  } catch (error) {
    next(error);
  }
});

export default mongoose.models.Booking ||
  mongoose.model("Booking", bookingSchema);