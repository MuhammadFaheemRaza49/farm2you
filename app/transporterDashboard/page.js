"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function TransporterDashboard() {
  const crops = [
    "/homePage/bg1.jpg",
    "/crops/truck1.jpg",
    "/crops/truck2.jpg",
    "/crops/delivery.jpg",
    "/crops/road.jpg",
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
    <div className="min-h-screen bg-gradient-to-b from-emerald-900 via-emerald-800 to-black flex flex-col items-center relative overflow-hidden text-white">
      {/* Placeholder for Header */}
      <div className="w-full">{/* Header will be connected here */}</div>

      {/* 🚛 Carousel Background Section */}
      <div className="relative w-full h-[60vh] flex justify-center items-center overflow-hidden">
        {/* Animated Image Carousel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1 }}
            className="absolute w-full h-full"
          >
            <Image
              src={crops[currentIndex]}
              alt="carousel"
              fill
              className="object-cover brightness-[0.45]"
            />
          </motion.div>
        </AnimatePresence>

        {/* Overlay Text */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="relative z-10 text-center text-white drop-shadow-lg px-6"
        >
          <h1 className="text-5xl font-extrabold mb-4">
            Welcome, <span className="text-emerald-300">Transporter</span> 🚛
          </h1>
          <p className="text-lg max-w-2xl mx-auto text-gray-200">
            Manage your assigned deliveries, track progress, and review completed shipments.
          </p>
        </motion.div>

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent z-[5]" />
      </div>

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
          className="bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-8 border border-emerald-500 hover:border-emerald-300 transition"
        >
          <h2 className="text-2xl font-semibold text-emerald-300 mb-2">New Deliveries</h2>
          <p className="text-gray-200 mb-4">
            View and accept new delivery assignments from the system.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="bg-emerald-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-emerald-400 transition"
          >
            View New Deliveries
          </motion.button>
        </motion.div>

        {/* ✅ Completed Deliveries */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-8 border border-emerald-500 hover:border-emerald-300 transition"
        >
          <h2 className="text-2xl font-semibold text-emerald-300 mb-2">
            Completed Deliveries
          </h2>
          <p className="text-gray-200 mb-4">
            Review your completed deliveries and check delivery records.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="bg-emerald-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-emerald-400 transition"
          >
            View Completed Deliveries
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}
