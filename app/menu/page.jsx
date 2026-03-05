"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function MenuPage() {
  const [menus, setMenus] = useState([]);
  const [cart, setCart] = useState([]);
  const router = useRouter();

  // Fetch menus
  useEffect(() => {
    fetch("/api/menu")
      .then((res) => res.json())
      .then((data) => setMenus(data));
  }, []);

  // Add to cart with quantity
  const addToOrder = (item) => {
    const existing = cart.find((c) => c._id === item._id);

    if (existing) {
      setCart(
        cart.map((c) =>
          c._id === item._id
            ? { ...c, quantity: c.quantity + 1 }
            : c
        )
      );
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  // Remove item
  const removeItem = (id) => {
    setCart(cart.filter((item) => item._id !== id));
  };

  // Proceed to booking
  const goToBooking = () => {
    localStorage.setItem("cart", JSON.stringify(cart));
    router.push("/booking");
  };

  return (
    <div className="min-h-screen bg-[#F5E6B3] p-10 pb-40">
      <h1 className="text-4xl font-bold mb-10 text-center text-[#3D4F1C]">
        Our Menu
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {menus.map((item) => (
          <div
            key={item._id}
            className="shadow-lg rounded-xl p-5 bg-white hover:shadow-2xl transition"
          >
            {/* Image Safe Check Added */}
            {item.image && (
              <img
                src={item.image}
                alt={item.name}
                className="h-40 w-full object-cover rounded-lg mb-4"
              />
            )}

            <h2 className="text-xl font-bold text-[#3D4F1C]">
              {item.name}
            </h2>

            <p className="text-gray-600 mb-4">
              {item.category}
            </p>

            <button
              onClick={() => addToOrder(item)}
              className="bg-[#556B2F] hover:bg-[#3D4F1C] text-[#D4AF37] px-4 py-2 rounded w-full font-semibold transition"
            >
              Add to Order
            </button>
          </div>
        ))}
      </div>

      {/* CART SECTION */}
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
                  className="text-red-500 text-sm font-bold"
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
            Proceed to Booking
          </button>
        </div>
      )}
    </div>
  );
}