"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import UserLocationPicker from "../../components/UserLocationPicker";


// Example modal content component
function PaymentConfirmation() {
  return (
    <div className="p-6 bg-black text-white rounded-xl shadow-lg max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-green-400 mb-4">Confirm Your Payment</h2>
      <p className="text-gray-300 mb-6">Your payment details will be processed here.</p>
      {/* Add any other content like summary, forms, etc */}
    </div>
  );
}

export default function UserCart() {
  const [cartItems, setCartItems] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // Load cart from localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem("userCart");
    if (storedCart) setCartItems(JSON.parse(storedCart));
  }, []);

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
                {item.productName} - <span className="text-green-400">{item.price}</span>
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
              Proceed to Blockchain Payment
            </motion.button>
          </Link>

          {/* Next Button to open modal */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowModal(true)}
            className="w-full bg-green-700 hover:bg-green-800 text-black font-semibold py-3 rounded-lg shadow-md transition-all mt-4"
          >
            Next
          </motion.button>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="relative">
            <UserLocationPicker />
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-white bg-red-500 px-3 py-1 rounded-lg hover:bg-red-600 transition"
            >
              Close
            </button>
          </div>
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
