"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function TransporterDashboard() {
  const crops = [
    "/homePage/wheat1.jpg",
    "/homePage/wheat2.jpg"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % crops.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [crops.length]);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center relative overflow-hidden text-white">
      {/* Placeholder for Header */}
      <div className="w-full">{/* Header will be connected here */}</div>

      {/* 🚛 Carousel Background Section */}
      <div className="relative w-full h-[60vh] flex justify-center items-center overflow-hidden">
        {/* Animated Image Carousel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1 }}
            className="absolute w-full h-full"
          >
            <Image
              src={crops[currentIndex]}
              alt="carousel"
              fill
              className="object-cover brightness-[0.4]"
            />
          </motion.div>
        </AnimatePresence>

        {/* Overlay Text */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="relative z-10 text-center drop-shadow-[0_0_10px_rgba(22,163,74,0.6)] px-6"
        >
          <h1 className="text-5xl font-extrabold mb-4">
            Welcome, <span className="text-green-400">User</span> 🚛
          </h1>
          <p className="text-lg max-w-2xl mx-auto text-gray-300">
            Manage your assigned deliveries, track progress, and review completed shipments.
          </p>
        </motion.div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-transparent z-[5]" />
      </div>

      {/* 🌱 Chatbot Button */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <motion.button
          whileHover={{ scale: 1.1, boxShadow: "0 0 15px rgba(22,163,74,0.5)" }}
          whileTap={{ scale: 0.95 }}
          className="bg-green-600 text-white px-6 py-3 rounded-full shadow-md flex items-center gap-2 hover:bg-green-700 transition-all"
          onClick={() => alert('🤖 Chatbot feature will open here')}
        >
          <span>Chat with FarmBot</span>
        </motion.button>
      </motion.div>

      {/* 🚚 Transporter Options */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 w-[90%] max-w-4xl z-20"
      >
        {/* 🆕 New Deliveries */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-[#0a0a0a] text-white rounded-2xl shadow-[0_0_20px_rgba(22,163,74,0.3)] p-8 border border-green-700 hover:shadow-[0_0_25px_rgba(22,163,74,0.5)] transition"
        >
          <h2 className="text-2xl font-semibold text-green-400 mb-2">
            Make New Order
          </h2>
          <p className="text-gray-300 mb-4">
            View and accept new delivery assignments from the system.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="bg-green-500 text-black font-medium px-5 py-2 rounded-lg shadow-md hover:bg-green-600 hover:text-white transition-all"
          >
            Make a new order
          </motion.button>
        </motion.div>

        {/* ✅ Completed Deliveries */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-[#0a0a0a] text-white rounded-2xl shadow-[0_0_20px_rgba(22,163,74,0.3)] p-8 border border-green-700 hover:shadow-[0_0_25px_rgba(22,163,74,0.5)] transition"
        >
          <h2 className="text-2xl font-semibold text-green-400 mb-2">
            Review Orders
          </h2>
          <p className="text-gray-300 mb-4">
            Review your orders.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="bg-green-500 text-black font-medium px-5 py-2 rounded-lg shadow-md hover:bg-green-600 hover:text-white transition-all"
          >
            Review your ongoing orders.
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}
