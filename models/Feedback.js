import mongoose from "mongoose";

const FeedbackSchema = new mongoose.Schema(
  {
    feedbackId: String,

    name: String,
    email: String,
    phone: String,

    service: String,
    bookingId: String,

    rating: Number,
    title: String,        // Review title
    comment: String,

    eventDate: Date,

    status: {
      type: String,
      enum: ["pending", "published"],
      default: "pending",
    },

    adminResponse: {
      type: String,
      default: "",
    },

    helpfulCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Feedback ||
  mongoose.model("Feedback", FeedbackSchema);