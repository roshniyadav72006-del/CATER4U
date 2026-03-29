"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const COOKIE_MENU = "booking_menu";
const COOKIE_OPTIONS = { expires: 1 };

export default function MenuPage() {
  const [menus, setMenus] = useState([]);
  const [filteredMenus, setFilteredMenus] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const router = useRouter();

  // ✅ FETCH MENU (SAFE)
  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const res = await fetch("/api/menu");
        const data = await res.json();

        // ✅ Ensure array
        const menuArray = Array.isArray(data) ? data : [];

        setMenus(menuArray);
        setFilteredMenus(menuArray);
      } catch (error) {
        console.error("Menu fetch error:", error);
        setMenus([]);
        setFilteredMenus([]);
      }
    };

    fetchMenus();
  }, []);

  // 🔥 COMMON FILTER FUNCTION (BEST PRACTICE)
  const applyFilters = (category, searchText) => {
    let filtered = Array.isArray(menus) ? menus : [];

    if (category !== "All") {
      filtered = filtered.filter((item) => item.category === category);
    }

    if (searchText) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    setFilteredMenus(filtered);
  };

  // 🔍 SEARCH
  const handleSearch = (value) => {
    setSearch(value);
    applyFilters(activeCategory, value);
  };

  // 📂 CATEGORY
  const handleCategory = (category) => {
    setActiveCategory(category);
    applyFilters(category, search);
  };

  const addToOrder = (item) => {
    const existing = cart.find((c) => c._id === item._id);
    if (existing) {
      setCart(
        cart.map((c) =>
          c._id === item._id ? { ...c, quantity: c.quantity + 1 } : c
        )
      );
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const removeItem = (id) => {
    setCart(cart.filter((item) => item._id !== id));
  };

  const goToBooking = () => {
    const existingMenu = JSON.parse(Cookies.get(COOKIE_MENU) || "[]");

    const newItems = cart.map((item) => ({
      itemName: item.name || item.title || "Item",
      _id: item._id,
      quantity: item.quantity,
    }));

    const mergedMenu = [...existingMenu];

    newItems.forEach((newItem) => {
      const idx = mergedMenu.findIndex((e) => e._id === newItem._id);
      if (idx !== -1) {
        mergedMenu[idx] = {
          ...mergedMenu[idx],
          quantity:
            (mergedMenu[idx].quantity || 1) + newItem.quantity,
        };
      } else {
        mergedMenu.push(newItem);
      }
    });

    Cookies.set(COOKIE_MENU, JSON.stringify(mergedMenu), COOKIE_OPTIONS);
    router.push("/booking");
  };

  return (
    <div className="min-h-screen bg-[#F5E6B3] pb-40">

      {/* HERO */}
      <div
        className="relative h-[400px] w-full flex flex-col items-center justify-center text-center gap-4"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('/bann.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-white">
          Our Menu
        </h1>

        {/* SEARCH */}
        <div className="w-full max-w-xl px-4 relative">
          <span className="absolute left-6 top-1/2 transform -translate-y-1/2 text-xl">
            🔍
          </span>

          <input
            type="text"
            placeholder="Search Paneer, Biryani, Dessert..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-full border-2 border-white bg-white text-black focus:outline-none"
          />
        </div>
      </div>

      {/* CATEGORY */}
      <div className="flex flex-wrap justify-center gap-4 mt-10 px-5">
        {["All", "Starter", "Main Course", "Dessert"].map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategory(cat)}
            className={`px-5 py-2 rounded-full font-semibold transition ${
              activeCategory === cat
                ? "bg-[#556B2F] text-[#D4AF37]"
                : "bg-white text-[#3D4F1C] border"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* MENU GRID */}
      <div className="p-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-6 pl-4 pr-2">

          {filteredMenus.length > 0 ? (
            filteredMenus.map((item) => (
              <div
                key={item._id}
                className="shadow-md rounded-xl p-4 bg-white hover:shadow-xl transition duration-300 w-full"
              >
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-48 w-full object-cover rounded-lg mb-3"
                  />
                )}

                <h2 className="text-lg font-bold text-[#3D4F1C]">
                  {item.name}
                </h2>
                <p className="text-gray-600 text-sm mb-3">
                  {item.category}
                </p>

                <button
                  onClick={() => addToOrder(item)}
                  className={`px-3 py-2 rounded w-full text-sm font-semibold transition ${
                    cart.find((c) => c._id === item._id)
                      ? "bg-[#3D4F1C] text-white"
                      : "bg-[#556B2F] hover:bg-[#3D4F1C] text-[#D4AF37]"
                  }`}
                >
                  {cart.find((c) => c._id === item._id)
                    ? `Added (${
                        cart.find((c) => c._id === item._id).quantity
                      })`
                    : "Add to Order"}
                </button>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-600">
              No items found 😔
            </p>
          )}

        </div>
      </div>

      {/* CART */}
      {cart.length > 0 && (
        <div className="fixed bottom-0 left-0 w-full bg-white shadow-2xl p-6 border-t border-[#556B2F]">
          <h2 className="font-bold mb-3 text-[#3D4F1C]">
            Selected Items ({cart.length})
          </h2>

          <div className="flex flex-wrap gap-3">
            {cart.map((item) => (
              <div
                key={item._id}
                className="bg-[#F5E6B3] px-4 py-2 rounded flex items-center gap-3"
              >
                <span className="font-medium text-[#3D4F1C]">
                  {item.name} x {item.quantity}
                </span>
                <button
                  onClick={() => removeItem(item._id)}
                  className="text-red-500 font-bold"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={goToBooking}
            className="mt-4 bg-[#556B2F] hover:bg-[#3D4F1C] text-[#D4AF37] px-6 py-3 rounded font-semibold transition"
          >
            Proceed to Booking →
          </button>
        </div>
      )}
    </div>
  );
}