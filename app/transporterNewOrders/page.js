"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link"; // ✅ Import Link here
import { useState } from "react";
import { User, Truck, DollarSign } from "lucide-react";

export default function TransporterNewDeliveries() {
  const [deliveries] = useState([
    {
      id: 1,
      user: "Customer A",
      product: "Wheat",
      quantity: "200 kg",
      price: "PKR 16,000",
      image: "/crops/wheat.png",
    },
    {
      id: 2,
      user: "Customer B",
      product: "Rice",
      quantity: "150 kg",
      price: "PKR 13,500",
      image: "/crops/rice.png",
    },
    {
      id: 3,
      user: "Customer C",
      product: "Vegetables",
      quantity: "100 kg",
      price: "PKR 8,000",
      image: "/crops/vegetables.png",
    },
    {
      id: 4,
      user: "Customer D",
      product: "Corn",
      quantity: "250 kg",
      price: "PKR 18,000",
      image: "/crops/corn.png",
    },
  ]);

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
          New Delivery Requests 🚚
        </h1>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          See all new delivery requests and accept assignments for delivery.
        </p>
      </motion.div>

      {/* Delivery Cards */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl"
      >
        {deliveries.map((delivery, index) => (
          <motion.div
            key={delivery.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-[#0a0a0a] border border-green-700 rounded-2xl overflow-hidden shadow-[0_0_20px_rgba(22,163,74,0.3)] hover:shadow-[0_0_25px_rgba(22,163,74,0.5)] transition-all"
          >
            {/* Image */}
            <div className="w-full h-48 relative">
              <Image
                src={delivery.image}
                alt={delivery.product}
                fill
                className="object-cover"
              />
            </div>

            {/* Card Content */}
            <div className="p-6">
              <h2 className="text-2xl font-bold text-green-400 mb-4 text-center">
                {delivery.product}
              </h2>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-gray-300">
                  <User className="text-green-400 w-5 h-5" />
                  <span>{delivery.user}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Truck className="text-green-400 w-5 h-5" />
                  <span>{delivery.quantity}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <DollarSign className="text-green-400 w-5 h-5" />
                  <span>{delivery.price}</span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  console.log(
                    `Accepted delivery of ${delivery.product} for ${delivery.user}`
                  )
                }
                className="w-full bg-green-500 hover:bg-green-600 text-black font-medium py-3 rounded-lg shadow-md transition-all"
              >
                Accept Delivery
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
        <Link href="/transporterDashboard">
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
