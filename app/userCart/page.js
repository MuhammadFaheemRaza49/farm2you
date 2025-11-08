"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function UserCart() {
  const [cartItems, setCartItems] = useState([]);

  // Load cart from localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem("userCart");
    if (storedCart) setCartItems(JSON.parse(storedCart));
  }, []);

  // Remove item from cart
  const removeFromCart = (index) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
    localStorage.setItem("userCart", JSON.stringify(updatedCart));
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-12 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-green-400 mb-8 drop-shadow-[0_0_10px_rgba(22,163,74,0.5)]">
        My Cart
      </h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-400">Your cart is empty.</p>
      ) : (
        <div className="w-full max-w-4xl space-y-4">
          {cartItems.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-[#0a0a0a] border border-green-700 rounded-2xl p-4 flex justify-between items-center shadow-[0_0_20px_rgba(22,163,74,0.3)]"
            >
              <div className="text-lg font-medium text-gray-300">
                {item.product} - <span className="text-green-400">{item.price}</span>
              </div>
              <button
                onClick={() => removeFromCart(idx)}
                className="bg-red-500 hover:bg-red-600 text-black font-semibold px-4 py-1 rounded-lg transition"
              >
                Remove
              </button>
            </motion.div>
          ))}

          {/* Proceed to Blockchain Payment */}
          <Link href="/userPayment">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-green-500 hover:bg-green-600 text-black font-semibold py-3 rounded-lg shadow-md transition-all mt-6"
            >
              Proceed to Payment
            </motion.button>
          </Link>
        </div>
      )}

      {/* Back Button */}
      <Link href="/userNewOrder">
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="bg-green-500 text-black font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-green-600 hover:text-white transition mt-12"
        >
          ← Back
        </motion.button>
      </Link>
    </div>
  );
}
