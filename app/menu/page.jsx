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
  const [showCategories, setShowCategories] = useState(false);
  const categories = ["All", "Starter","Main Course",  "Dessert","Beverages","Chinese", "Dal","Nasta",
           "Rajasthani Special",
           "Indian Breads",
           "Basmati ki Khushbu",
           "Mumbai Favourite"
           ];  // 🔥 NEW
  const [selectedIndex, setSelectedIndex] = useState(null);

  const router = useRouter();

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const res = await fetch("/api/menu");
        const data = await res.json();

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

  const handleSearch = (value) => {
    setSearch(value);
    applyFilters(activeCategory, value);
  };

  const handleCategory = (category) => {
    setActiveCategory(category);
    applyFilters(category, search);
  };

  const addToOrder = (item) => {
    const existing = cart.find((c) => c._id === item._id);
    if (existing) {
      return;
    } else {
      setCart([...cart, { ...item}]);
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

  // 🔥 NEXT / PREV
  const nextImage = () => {
    setSelectedIndex((prev) =>
      prev === filteredMenus.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setSelectedIndex((prev) =>
      prev === 0 ? filteredMenus.length - 1 : prev - 1
    );
  };

  // 🔥 KEYBOARD SUPPORT
  useEffect(() => {
    const handleKey = (e) => {
      if (selectedIndex === null) return;

      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "Escape") setSelectedIndex(null);
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedIndex, filteredMenus]);

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

        <div className="w-full max-w-xl px-4 relative">
          <span className="absolute left-6 top-1/2 transform -translate-y-1/2 text-xl">
            🔍
          </span>

          <input
            type="text"
            placeholder="Search Paneer, Biryani, Dessert..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-full border-2 border-white bg-white text-black"
          />
        </div>
      </div>

      {/* CATEGORY */}
      {/* MOBILE DROPDOWN */}
      <div className="md:hidden mt-10 px-5">
        <button
          onClick={() => setShowCategories(!showCategories)}
          className="w-full bg-[#273B09] text-[#D4AF37] px-5 py-3 rounded-xl font-semibold flex justify-between items-center"
        >
         {activeCategory}
        <span>{showCategories ? "▲" : "▼"}</span>
      </button>
      {showCategories && (
        <div className="mt-2 bg-[#273B09] rounded-xl shadow-lg overflow-hidden">
         {categories.map((cat) => (
            <div
               key={cat}
                  onClick={() => {
                 handleCategory(cat);
                 setShowCategories(false);
                }}
               className={`px-4 py-3 border-b cursor-pointer transition ${
                activeCategory === cat
                ? "bg-[#273B09] text-[#D4AF37]" 
                : "bg-white text-[#3D4F1C] hover:bg-[#273B09] hover:text-[#D4AF37]"
               }`}
              >
                {cat}
           </div>
          ))}
       </div>
      )}
   </div>
      {/* DESKTOP */}
      <div className="hidden md:flex gap-4 mt-10 px-10 overflow-x-auto whitespace-nowrap scrollbar-hide">

        {[
           "All",
           "Starter",
           "Main Course",
           "Dessert",
           "Beverages",
           "Chinese",
           "Dal",
           "Nasta",
           "Rajasthani Special",
           "Indian Breads",
           "Basmati ki Khushbu",
           "Mumbai Favourite",
           
          ].map((cat)=>(
            <button
             key={cat}
             onClick={()=>handleCategory(cat)}
             className={`px-6 py-3 rounded-xl font-semibold border transition ${
              activeCategory === cat
              ? "bg-[#273B09] text-[#D4AF37]"
              : "bg-white"
             }`}
             >
              {cat}
            </button>
             
          ))}

      </div>

      {/* MENU */}
      <div className="p-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-6">

          {filteredMenus.length > 0 ? (
            filteredMenus.map((item, index) => (
              <div
                key={item._id}
                className="shadow-md rounded-xl p-4 bg-white hover:shadow-xl transition duration-300"
              >
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    onClick={() => setSelectedIndex(index)}
                    className="h-48 w-full object-cover rounded-lg mb-3 cursor-pointer"
                  />
                )}

                <h2 className="text-lg font-bold text-[#3D4F1C]">
                  {item.name}
                </h2>

                <p className="text-gray-600 text-sm mb-3">
                  {item.category}
                </p>

                {/* ✅ ORIGINAL BUTTON (UNCHANGED) */}
                <button
                  onClick={() => addToOrder(item)}
                  className={`px-3 py-2 rounded w-full text-sm font-semibold transition ${
                    cart.find((c) => c._id === item._id)
                      ? "bg-[#3D4F1C] text-white"
                      : "bg-[#273B09] hover:bg-[#3D4F1C] text-[#D4AF37]"
                  }`}
                >
                  {cart.find((c) => c._id === item._id)
                    ? "Added"
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

      {/* CART (UNCHANGED) */}
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
                  {item.name} 
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
            className="mt-4 bg-[#556B2F] hover:bg-[#3D4F1C] text-[#D4AF37] px-6 py-3 rounded font-semibold"
          >
            Proceed to Booking →
          </button>
        </div>
      )}

      {/* 🔥 IMAGE MODAL */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50"
          onClick={() => setSelectedIndex(null)}
        >

          {/* CLOSE */}
          <button
            className="absolute top-5 right-5 text-white text-3xl"
            onClick={() => setSelectedIndex(null)}
          >
            ✕
          </button>

          {/* LEFT */}
          <button
            className="absolute left-5 text-white text-4xl"
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
          >
            ‹
          </button>

          {/* RIGHT */}
          <button
            className="absolute right-5 text-white text-4xl"
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
          >
            ›
          </button>

          {/* IMAGE */}
          <img
            src={filteredMenus[selectedIndex]?.image}
            onClick={(e) => e.stopPropagation()}
            className="max-w-[90%] max-h-[80%] rounded-xl shadow-2xl animate-zoom"
          />
        </div>
      )}

      {/* ANIMATION */}
      <style>{`
        @keyframes zoom {
          from { transform: scale(0.8); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-zoom {
          animation: zoom 0.3s ease;
        }
      `}</style>

    </div>
  );
}