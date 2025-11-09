"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import OrderMap from "../../components/OrderMap"; // Make sure the path is correct
import { X } from "lucide-react";

export default function FarmerOngoingOrders() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null); // order for modal
  const [showModal, setShowModal] = useState(false);

  const getOrders = async () => {
    const payload = {};
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/order/get-farmer-orders`,
        payload,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      if (response.data.type === "success") {
        setOrders(response.data.orders);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  const totalOrders = orders.length;
  const deliveredOrders = orders.filter(o => o.status === "Delivered").length;
  const totalEarnings = orders
    .filter(o => o.status === "Delivered")
    .reduce((sum, o) => sum + o.totalPrice, 0);
  const pendingEarnings = orders
    .filter(o => o.status !== "Delivered")
    .reduce((sum, o) => sum + o.totalPrice, 0);

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
          Ongoing Orders 📦
        </h1>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Track your orders and view your earnings and performance stats.
        </p>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-12 max-w-6xl mx-auto"
      >
        <div className="bg-[#0a0a0a] p-6 rounded-2xl border border-green-700 shadow-[0_0_20px_rgba(22,163,74,0.3)] text-center">
          <h2 className="text-xl text-gray-300 mb-2">Total Orders</h2>
          <p className="text-3xl font-bold text-green-400">{totalOrders}</p>
        </div>

        <div className="bg-[#0a0a0a] p-6 rounded-2xl border border-green-700 shadow-[0_0_20px_rgba(22,163,74,0.3)] text-center">
          <h2 className="text-xl text-gray-300 mb-2">Delivered Orders</h2>
          <p className="text-3xl font-bold text-green-400">{deliveredOrders}</p>
        </div>

        <div className="bg-[#0a0a0a] p-6 rounded-2xl border border-green-700 shadow-[0_0_20px_rgba(22,163,74,0.3)] text-center">
          <h2 className="text-xl text-gray-300 mb-2">Total Earnings</h2>
          <p className="text-3xl font-bold text-green-400">PKR {totalEarnings.toLocaleString()}</p>
        </div>

        <div className="bg-[#0a0a0a] p-6 rounded-2xl border border-green-700 shadow-[0_0_20px_rgba(22,163,74,0.3)] text-center">
          <h2 className="text-xl text-gray-300 mb-2">Pending Earnings</h2>
          <p className="text-3xl font-bold text-yellow-400">PKR {pendingEarnings.toLocaleString()}</p>
        </div>
      </motion.div>

      {/* Orders Table */}
      <div className="overflow-x-auto max-w-6xl mx-auto">
        <table className="min-w-full border border-green-700 rounded-2xl overflow-hidden">
          <thead className="bg-[#0a0a0a] border-b border-green-700">
            <tr>
              <th className="text-left px-4 py-3 text-gray-300">ID</th>
              <th className="text-left px-4 py-3 text-gray-300">Buyer</th>
              <th className="text-left px-4 py-3 text-gray-300">Products</th>
              <th className="text-left px-4 py-3 text-gray-300">Total Price</th>
              <th className="text-left px-4 py-3 text-gray-300">Delivery Fee</th>
              <th className="text-left px-4 py-3 text-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr
                key={order._id}
                className="border-b border-green-700 hover:bg-green-900/20 transition"
              >
                <td className="px-4 py-3 text-gray-300">{order._id}</td>
                <td className="px-4 py-3 text-gray-300">{order.customerInfo.firstName} {order.customerInfo.lastName ?? ""}</td>
                <td className="px-4 py-3 text-gray-300">{order.cartItems.length} item(s)</td>
                <td className="px-4 py-3 text-gray-300">PKR {order.totalPrice.toLocaleString()}</td>
                <td className="px-4 py-3 text-gray-300">PKR {order.delivery.toLocaleString()}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => {
                      setSelectedOrder(order);
                      setShowModal(true);
                    }}
                    className="bg-green-500 hover:bg-green-600 text-black px-3 py-1 rounded-md font-medium transition"
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Details Modal */}
      {showModal && selectedOrder && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-[#0a0a0a] rounded-2xl max-w-4xl w-full p-6 relative shadow-lg"
          >
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-300 hover:text-red-500"
            >
              <X size={24} />
            </button>

            <h2 className="text-2xl font-bold text-green-400 mb-4">Order Details</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left: Order Info */}
              <div className="space-y-2 text-gray-300">
                <p><strong>Order ID:</strong> {selectedOrder._id}</p>
                <p><strong>Buyer:</strong> {selectedOrder.customerInfo.firstName} {selectedOrder.customerInfo.lastName}</p>
                <p><strong>Email:</strong> {selectedOrder.customerInfo.email}</p>
                <p><strong>Phone:</strong> {selectedOrder.customerInfo.phoneNumber}</p>
                <p><strong>Total Price:</strong> PKR {selectedOrder.totalPrice.toLocaleString()}</p>
                <p><strong>Delivery Fee:</strong> PKR {selectedOrder.delivery.toLocaleString()}</p>
                <p><strong>Status:</strong> {selectedOrder.status}</p>
                <div>
                  <strong>Cart Items:</strong>
                  <ul className="list-disc list-inside">
                    {selectedOrder.cartItems.map(item => (
                      <li key={item._id}>{item.productName || "Product"} - Qty: {item.qty}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right: Map */}
              <div>
                <OrderMap
                  latitude={selectedOrder.address.latitude}
                  longitude={selectedOrder.address.longitude}
                />
                <p className="text-gray-300 mt-2">{selectedOrder.address.address}</p>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-12 text-center"
      >
        <Link href="/farmerDashboard">
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
