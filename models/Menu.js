import mongoose from "mongoose";

const MenuSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,   // from first schema
    },
    category: {
      type: String,
      required: true,   // from first schema
    },
    image: {
      type: String,
    },
    status: {
      type: String,
      enum: ["Available", "Out of Stock"],  // from first schema
      default: "Available",                 // from both schemas
    },
  },
  { timestamps: true }
);

export default mongoose.models.Menu ||
  mongoose.model("Menu", MenuSchema);