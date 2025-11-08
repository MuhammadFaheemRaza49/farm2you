"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import UserLocationPicker from "../../components/UserLocationPicker";
import toast from "react-hot-toast";

export default function UserCart() {
  const [cartItems, setCartItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [step, setStep] = useState(1); // step 1 = info, step 2 = location
  const [locationData, setLocationData] = useState(null);
  const [customerInfo, setCustomerInfo] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
  });

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

  const handleInputChange = (e) => {
    setCustomerInfo({
      ...customerInfo,
      [e.target.name]: e.target.value,
    });
  };

 const placeOrder = async () => {
  if (!locationData) return toast.error("Please select a location first!");
  if (!customerInfo.firstName || !customerInfo.phoneNumber){
    toast.error("Please fill all required fields!");
    return;
  }

  try {
    const token = localStorage.getItem("token");

    const payload = {
      address: locationData,
      cartItems,
      price: cartItems.reduce((sum, item) => sum + Number(item.price || 0), 0),
      delivery: 100, // example, replace with actual calculation if needed
      customerInfo, // send customer info
    };

    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/order/place-order`, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });

    toast.success("Order placed successfully!");
    setShowModal(false);
    setStep(1);
    setCartItems([]);
    localStorage.removeItem("userCart");
  } catch (err) {
    console.error(err);
    toast.error("Failed to place order");
  }
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
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 overflow-auto">
          <div className="relative bg-black p-6 rounded-xl max-w-xl w-full">
            {step === 1 && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-green-400 mb-4">Enter Your Info</h2>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={customerInfo.firstName}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded bg-gray-900 text-white border border-green-700"
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={customerInfo.lastName}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded bg-gray-900 text-white border border-green-700"
                />
                <input
                  type="text"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  value={customerInfo.phoneNumber}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded bg-gray-900 text-white border border-green-700"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email (optional)"
                  value={customerInfo.email}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded bg-gray-900 text-white border border-green-700"
                />

                <div className="flex justify-end gap-4 mt-4">
                  <button
                    onClick={() => setShowModal(false)}
                    className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setStep(2)}
                    className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded font-semibold"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 className="text-2xl font-bold text-green-400 mb-4">Select Your Location</h2>
                <UserLocationPicker setLocationData={setLocationData} />
                <div className="flex justify-between gap-4 mt-4">
                  <button
                    onClick={() => setStep(1)}
                    className="bg-gray-700 hover:bg-gray-800 px-4 py-2 rounded font-semibold"
                  >
                    Back
                  </button>
                  <button
                    onClick={placeOrder}
                    className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded font-semibold"
                  >
                    Place Order
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
