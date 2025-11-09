"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Truck, PackageCheck, Clock } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function UserOngoingOrder() {

  const router = useRouter();

    const [orders, setOrders] = useState([]);


   const getOrders = async () => {
    const payload = {

    }
      let orders = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/order/get-orders`, payload, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      console.log(orders)

      if (orders.data.type == "success") {
        setOrders(orders.data.orders);
      }
  }

  // Track current image index per order
  const [currentImages, setCurrentImages] = useState(
    orders.map(() => 0)
  );

  useEffect(() => {
    getOrders();

  }, [])

 useEffect(() => {
  if (orders.length > 0) {
    setCurrentImages(orders.map(() => 0));
  }
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
{orders.map((order, index) => {
  const firstItem = order.cartItems[0]; // display first product
  const images = firstItem?.images || [];

  return (
    <motion.div
      key={order._id}
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
            src={firstItem?.images[0]}
            alt={firstItem?.productName}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute w-full h-full object-cover"
          />
        </AnimatePresence>
      </div>

      <div className="p-6">
        {/* Product Name */}
        <h2 className="text-2xl font-bold text-green-400 mb-4 text-center">
          {firstItem?.productName}
        </h2>

        {/* Order Details */}
        <div className="space-y-2 mb-4 text-gray-300">
          <div className="flex items-center gap-2">
            <PackageCheck className="text-green-400 w-5 h-5" />
            <span>Qty: {firstItem?.qty}</span>
          </div>

          <div className="flex items-center gap-2">
            <Truck className="text-green-400 w-5 h-5" />
            <span>Transporter: {order.transporter?.username}</span>
          </div>

          <div className="flex items-center gap-2">
            <Clock className="text-green-400 w-5 h-5" />
            <span>Distance: {order.km.toFixed(1)} km</span>
          </div>
        </div>

        {/* Status & Price */}
        <div className="flex justify-between text-sm text-gray-400 mb-4">
          <span>Status: {order.status}</span>
          <span>Total: Rs. {order.totalPrice}</span>
        </div>

      </div>
    </motion.div>
  );
})}

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
