"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Truck, PackageCheck, Clock } from "lucide-react";

export default function UserOngoingOrder() {
  const [orders] = useState([
    {
      id: 1,
      product: "Wheat",
      farmer: "Ali Khan",
      quantity: "300 kg",
      price: "PKR 24,000",
      status: "In Transit",
      images: [
        "/homePage/wheat1.jpg",
        "/homePage/wheat2.jpg",
        "/crops/wheat3.png",
      ],
      progress: 60,
      estDelivery: "Nov 12, 2025",
    },
    {
      id: 2,
      product: "Rice",
      farmer: "Ahmed Raza",
      quantity: "200 kg",
      price: "PKR 18,000",
      status: "Awaiting Pickup",
      images: [
        "/homePage/wheat1.jpg",
        "/homePage/wheat2.jpg",
        "/crops/rice3.png",
      ],
      progress: 25,
      estDelivery: "Nov 14, 2025",
    },
    {
      id: 3,
      product: "Corn",
      farmer: "Bilal Iqbal",
      quantity: "150 kg",
      price: "PKR 10,000",
      status: "Delivered",
      images: [
        "/crops/corn.png",
        "/crops/corn2.png",
        "/crops/corn3.png",
      ],
      progress: 100,
      estDelivery: "Nov 8, 2025",
    },
  ]);

  // Track current image index per order
  const [currentImages, setCurrentImages] = useState(
    orders.map(() => 0)
  );

  // Auto-slide images every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImages((prev) =>
        prev.map((imgIndex, i) => (imgIndex + 1) % orders[i].images.length)
      );
    }, 3000);
    return () => clearInterval(interval);
  }, [orders]);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center px-6 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl font-bold text-green-400 drop-shadow-[0_0_15px_rgba(22,163,74,0.6)] mb-4">
          Your Ongoing Orders 🚚
        </h1>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Track your active and completed orders in real-time.
        </p>
      </motion.div>

      {/* Orders Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl"
      >
        {orders.map((order, index) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-[#0a0a0a] border border-green-700 rounded-2xl overflow-hidden shadow-[0_0_20px_rgba(22,163,74,0.3)] hover:shadow-[0_0_25px_rgba(22,163,74,0.5)] transition-all"
          >
            {/* Image Carousel */}
            <div className="w-full h-48 relative overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImages[index]}
                  src={order.images[currentImages[index]]}
                  alt={order.product}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  className="absolute w-full h-full object-cover"
                />
              </AnimatePresence>
            </div>

            {/* Order Info */}
            <div className="p-6">
              <h2 className="text-2xl font-bold text-green-400 mb-4 text-center">
                {order.product}
              </h2>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-gray-300">
                  <PackageCheck className="text-green-400 w-5 h-5" />
                  <span>Farmer: {order.farmer}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Truck className="text-green-400 w-5 h-5" />
                  <span>Quantity: {order.quantity}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Clock className="text-green-400 w-5 h-5" />
                  <span>Est. Delivery: {order.estDelivery}</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-800 h-2 rounded-full mb-3">
                <div
                  className={`h-2 rounded-full ${
                    order.progress === 100 ? "bg-green-500" : "bg-yellow-500"
                  }`}
                  style={{ width: `${order.progress}%` }}
                ></div>
              </div>

              <div className="flex justify-between text-sm text-gray-400 mb-4">
                <span>Status: {order.status}</span>
                <span>Price: {order.price}</span>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  console.log(`Checked order progress for ${order.product}`)
                }
                className="w-full bg-green-500 hover:bg-green-600 text-black font-medium py-3 rounded-lg shadow-md transition-all"
              >
                View Details
              </motion.button>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-12"
      >
        <Link href="/userDashboard">
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="bg-green-500 text-black font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-green-600 hover:text-white transition"
          >
            ← Back to Dashboard
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
}
