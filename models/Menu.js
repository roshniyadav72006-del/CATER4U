import mongoose from "mongoose";

const MenuSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Menu name is required"],
      trim: true,
      minlength: 2,
    },

    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
    },

    image: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

// Index for faster filtering (only category now)
MenuSchema.index({ category: 1 });

// Prevent model overwrite in Next.js
export default mongoose.models.Menu ||
  mongoose.model("Menu", MenuSchema);