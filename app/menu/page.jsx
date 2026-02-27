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
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Our Menu
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {menus.map((item) => (
          <div
            key={item._id}
            className="shadow-lg rounded-xl p-4 bg-white"
          >
            <img
              src={item.image}
              className="h-40 w-full object-cover rounded-lg"
              alt={item.name}
            />

            <h2 className="text-xl font-bold mt-3">
              {item.name}
            </h2>

            <p className="text-gray-500">
              {item.category}
            </p>

            <button
              onClick={() => addToOrder(item)}
              className="mt-4 bg-purple-700 text-white px-4 py-2 rounded w-full"
            >
              Add to Order
            </button>
          </div>
        ))}
      </div>

      {/* CART SECTION */}
      {cart.length > 0 && (
        <div className="fixed bottom-0 left-0 w-full bg-white shadow-xl p-4 border-t">
          <h2 className="font-bold mb-2">
            Selected Items ({cart.length})
          </h2>

          <div className="flex flex-wrap gap-3">
            {cart.map((item) => (
              <div
                key={item._id}
                className="bg-gray-100 px-3 py-2 rounded flex items-center gap-2"
              >
                <span>
                  {item.name} x {item.quantity}
                </span>

                <button
                  onClick={() => removeItem(item._id)}
                  className="text-red-500 text-sm"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={goToBooking}
            className="mt-3 bg-black text-white px-6 py-2 rounded"
          >
            Proceed to Booking
          </button>
        </div>
      )}
    </div>
  );
}