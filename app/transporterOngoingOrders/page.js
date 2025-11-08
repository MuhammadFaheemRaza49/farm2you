"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export default function TransporterOngoingOrders() {
  const [orders] = useState([
    { id: 1, user: "Customer A", product: "Wheat", quantity: "200 kg", price: 16000, status: "In Transit" },
    { id: 2, user: "Customer B", product: "Rice", quantity: "150 kg", price: 13500, status: "In Transit" },
    { id: 3, user: "Customer C", product: "Vegetables", quantity: "100 kg", price: 8000, status: "Delivered" },
    { id: 4, user: "Customer D", product: "Corn", quantity: "250 kg", price: 18000, status: "Delivered" },
  ]);

  const totalOrders = orders.length;
  const deliveredOrders = orders.filter(o => o.status === "Delivered").length;
  const totalEarnings = orders
    .filter(o => o.status === "Delivered")
    .reduce((sum, o) => sum + o.price, 0);
  const pendingEarnings = orders
    .filter(o => o.status !== "Delivered")
    .reduce((sum, o) => sum + o.price, 0);

  return (
    <div className="min-h-screen bg-black text-white px-6 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl font-bold text-green-400 drop-shadow-[0_0_15px_rgba(22,163,74,0.6)] mb-4">
          Ongoing Deliveries 🚚
        </h1>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Track deliveries and view your performance stats.
        </p>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-12 max-w-6xl mx-auto"
      >
        {/* Total Orders */}
        <div className="bg-[#0a0a0a] p-6 rounded-2xl border border-green-700 shadow-[0_0_20px_rgba(22,163,74,0.3)] text-center">
          <h2 className="text-xl text-gray-300 mb-2">Total Orders</h2>
          <p className="text-3xl font-bold text-green-400">{totalOrders}</p>
        </div>

        {/* Delivered Orders */}
        <div className="bg-[#0a0a0a] p-6 rounded-2xl border border-green-700 shadow-[0_0_20px_rgba(22,163,74,0.3)] text-center">
          <h2 className="text-xl text-gray-300 mb-2">Delivered Orders</h2>
          <p className="text-3xl font-bold text-green-400">{deliveredOrders}</p>
        </div>

        {/* Total Earnings */}
        <div className="bg-[#0a0a0a] p-6 rounded-2xl border border-green-700 shadow-[0_0_20px_rgba(22,163,74,0.3)] text-center">
          <h2 className="text-xl text-gray-300 mb-2">Total Earnings</h2>
          <p className="text-3xl font-bold text-green-400">PKR {totalEarnings.toLocaleString()}</p>
        </div>

        {/* Pending Earnings */}
        <div className="bg-[#0a0a0a] p-6 rounded-2xl border border-green-700 shadow-[0_0_20px_rgba(22,163,74,0.3)] text-center">
          <h2 className="text-xl text-gray-300 mb-2">Pending Earnings</h2>
          <p className="text-3xl font-bold text-yellow-400">PKR {pendingEarnings.toLocaleString()}</p>
        </div>
      </motion.div>

      {/* Ongoing Orders Table */}
      <div className="overflow-x-auto max-w-6xl mx-auto">
        <table className="min-w-full border border-green-700 rounded-2xl overflow-hidden">
          <thead className="bg-[#0a0a0a] border-b border-green-700">
            <tr>
              <th className="text-left px-4 py-3 text-gray-300">ID</th>
              <th className="text-left px-4 py-3 text-gray-300">User</th>
              <th className="text-left px-4 py-3 text-gray-300">Product</th>
              <th className="text-left px-4 py-3 text-gray-300">Quantity</th>
              <th className="text-left px-4 py-3 text-gray-300">Price</th>
              <th className="text-left px-4 py-3 text-gray-300">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr
                key={order.id}
                className="border-b border-green-700 hover:bg-green-900/20 transition"
              >
                <td className="px-4 py-3 text-gray-300">{order.id}</td>
                <td className="px-4 py-3 text-gray-300">{order.user}</td>
                <td className="px-4 py-3 text-gray-300">{order.product}</td>
                <td className="px-4 py-3 text-gray-300">{order.quantity}</td>
                <td className="px-4 py-3 text-gray-300">PKR {order.price.toLocaleString()}</td>
                <td
                  className={`px-4 py-3 font-semibold ${
                    order.status === "Delivered" ? "text-green-400" : "text-yellow-400"
                  }`}
                >
                  {order.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-12 text-center"
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
