"use client";

import { useState } from "react";



export default function FoodMenuPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", label: "All Items" },
    { id: "appetizers", label: "Appetizers" },
    { id: "mains", label: "Main Course" },
    { id: "desserts", label: "Desserts" },
    { id: "beverages", label: "Beverages" }
  ];

  const menuItems = [
    {
      id: 1,
      name: "Bruschetta Platter",
      category: "appetizers",
      description: "Fresh tomatoes, basil, and mozzarella on toasted bread",
      price: "₹299"
    },
    {
      id: 2,
      name: "Grilled Salmon",
      category: "mains",
      description: "Salmon with lemon butter sauce and vegetables",
      price: "₹799"
    },
    {
      id: 3,
      name: "Chocolate Lava Cake",
      category: "desserts",
      description: "Warm chocolate cake with molten center",
      price: "₹249"
    },
    {
      id: 4,
      name: "Stuffed Mushrooms",
      category: "appetizers",
      description: "Mushrooms filled with herbs and cheese",
      price: "₹349"
    },
    {
      id: 5,
      name: "Fresh Juice Bar",
      category: "beverages",
      description: "Seasonal fresh juices and smoothies",
      price: "₹199"
    }
  ];

  const filteredItems =
    selectedCategory === "all"
      ? menuItems
      : menuItems.filter(item => item.category === selectedCategory);

  return (
    <div className="bg-white">

      {/* HERO */}
      <div className="bg-purple-700 text-white py-20 text-center">
        <h1 className="text-5xl font-bold mb-4">Our Menu</h1>
        <p className="text-lg max-w-2xl mx-auto">
          Explore our delicious menu crafted for every occasion
        </p>
      </div>

      {/* CATEGORY FILTER */}
      <div className="flex flex-wrap justify-center gap-4 py-8 bg-gray-50">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-6 py-2 rounded-full border transition ${
              selectedCategory === cat.id
                ? "bg-purple-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* MENU GRID */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {filteredItems.map(item => (
            <div
              key={item.id}
              className="border rounded-lg shadow hover:shadow-lg transition p-6"
            >
              <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
              <p className="text-gray-600 mb-4">{item.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-purple-600 font-bold">
                  {item.price}
                </span>
                <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
                  Add to Quote
                </button>
              </div>
            </div>
          ))}

        </div>
      </div>

      {/* CTA */}
      <div className="bg-purple-600 text-white py-16 text-center">
        <h2 className="text-4xl font-bold mb-4">
          Need a Custom Menu?
        </h2>
        <p className="max-w-xl mx-auto mb-6">
          We create custom menus tailored to your event needs.
        </p>
        <button className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100">
          Contact Us
        </button>
      </div>

      
    </div>
  );
}
