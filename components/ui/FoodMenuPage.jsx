"use client";

import { useState, useEffect } from "react";

export default function FoodMenuPage() {
  const [menuData, setMenuData] = useState([]);
  const [activeTab, setActiveTab] = useState("Appetizers");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await fetch("/api/menu");
        const data = await res.json();
        setMenuData(data);
      } catch (error) {
        console.error("Error fetching menu:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  const filteredItems = menuData.filter(
    (item) => item.category === activeTab
  );

  if (loading) {
    return <p className="text-center py-20">Loading menu...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-20">

      {/* Tabs */}
      <div className="flex gap-4 justify-center mb-10">
        {["Appetizers", "Main Course", "Desserts", "Beverages"].map(
          (tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-full ${
                activeTab === tab
                  ? "bg-purple-600 text-white"
                  : "bg-gray-200"
              }`}
            >
              {tab}
            </button>
          )
        )}
      </div>

      {/* Cards */}
      {filteredItems.length === 0 ? (
        <p className="text-center">No items available</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-60 w-full object-cover"
              />

              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">
                  {item.name}
                </h3>

                <p className="text-gray-600 mb-4">
                  {item.description}
                </p>

                <button className="w-full bg-gradient-to-r from-purple-500 to-purple-700 text-white py-2 rounded-lg">
                  Add to Quote
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
