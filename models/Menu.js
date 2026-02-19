import mongoose from "mongoose";

// Menu Schema
const MenuSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Menu item name is required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    category: {
      type: String,
      enum: ["veg", "non-veg", "dessert", "starter"],
      default: "starter",
    },
    image: {
      type: String,
      default: "", // Optional URL
    },
    available: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true } // automatically adds createdAt & updatedAt
);

// Hot-reload safe in Next.js dev
const Menu = mongoose.models.Menu || mongoose.model("Menu", MenuSchema);

export default Menu;
