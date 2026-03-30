import mongoose from "mongoose";

const FeedbackSchema = new mongoose.Schema({
  feedbackId: String,
  name: String,
  email: String,
  phone: String,
  service: String,
  bookingId: String,
  rating: Number,
  comment: String,
}, { timestamps: true });

export default mongoose.models.Feedback || mongoose.model("Feedback", FeedbackSchema);