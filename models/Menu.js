import mongoose from "mongoose";

const MenuSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    category: {
      type: String,
      enum: ["veg", "non-veg", "dessert", "starter"],
    },
    image: String,
    available: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.Menu ||
  mongoose.model("Menu", MenuSchema);
