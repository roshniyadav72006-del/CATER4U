import mongoose from "mongoose";
import Counter from "./Counter";

const eventSchema = new mongoose.Schema(
  {
    event_id: {
      type: String,
      unique: true,
    },

    customerName: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
      unique: true, // ✅ Unique Contact
    },

    eventName: {
      type: String,
      required: true,
    },

    eventType: {
      type: String,
      required: true,
    },

    eventDate: {
      type: Date,
      required: true,
    },

    eventTime: {
      type: String,
      required: true,
    },

    venue: {
      type: String,
      required: true,
    },

    guests: {
      type: Number,
      required: true,
    },

    organizerName: {
      type: String,
      required: true,
    },

    organizerContact: {
      type: String,
      required: true,
    },

    specialNote: String,

    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Completed", "Cancelled"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

// 🔥 Sequential ID Generator
eventSchema.pre("save", async function (next) {
  if (!this.event_id) {
    const counter = await Counter.findOneAndUpdate(
      { name: "event" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    const formatted = String(counter.seq).padStart(4, "0");
    this.event_id = `EVT-${formatted}`;
  }

  next();
});

export default mongoose.models.Event ||
  mongoose.model("Event", eventSchema);