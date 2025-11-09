"use client";

import OrderMap from "../../components/OrderMap";
import axios from "axios";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function TransporterOngoingOrders() {


  const [orders, setOrders] = useState([]);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);



  const getOrders = async () => {
    const payload = {

    }
    let orders = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/order/get-transporter-orders`, payload, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });

    console.log(orders)

    if (orders.data.type == "success") {
      setOrders(orders.data.orders);
    }
  }

  const totalOrders = orders.length;
  const deliveredOrders = 0; // update if you later add status

  const totalEarnings = orders.reduce((sum, o) => sum + o.delivery, 0);
  const pendingEarnings = totalEarnings; // until delivered logic added


  useEffect(() => {
    getOrders();
  }, [])

  return (
    <>
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
                  key={order._id}
                  className="border-b border-green-700 hover:bg-green-900/20 transition"
                >
                  <td className="px-4 py-3 text-gray-300">{order._id}</td>

                  <td className="px-4 py-3 text-gray-300">
                    {order.customerInfo.firstName} {order.customerInfo.lastName ?? ""}
                  </td>

                  <td className="px-4 py-3 text-gray-300">
                    {order.cartItems.reduce((sum, item) => sum + item.qty, 0)}
                  </td>

                  <td className="px-4 py-3 text-gray-300">
                    PKR {order.totalPrice.toLocaleString()}
                  </td>

                  <td className="px-4 py-3 text-gray-300">
                    {order.km} km
                  </td>

                  <td className="px-4 py-3 text-gray-300">
                    PKR {order.delivery.toLocaleString()}
                  </td>

                  <td className="px-4 py-3">
                    <button
                      onClick={() => { setSelectedOrder(order); setShowModal(true); }}
                      className="text-sm bg-green-600 hover:bg-green-700 px-3 py-1 rounded-md"
                    >
                      Details
                    </button>
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
    {showModal && selectedOrder && (
  <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="bg-[#0a0a0a] border border-green-600 rounded-xl p-6 w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6">
      
      {/* Left Section - Details */}
      <div>
        <h2 className="text-2xl font-bold text-green-400 mb-4">Order Details</h2>

        <p><span className="text-gray-400">Customer:</span> {selectedOrder.customerInfo.firstName} {selectedOrder.customerInfo.lastName}</p>
        <p><span className="text-gray-400">Phone:</span> {selectedOrder.customerInfo.phoneNumber}</p>
        <p><span className="text-gray-400">Address:</span> {selectedOrder.address.address}</p>
        <p><span className="text-gray-400">Distance:</span> {selectedOrder.km} km</p>
        <p><span className="text-gray-400">Delivery Fee:</span> PKR {selectedOrder.delivery.toLocaleString()}</p>

        <h3 className="mt-4 text-green-300 font-semibold">Products:</h3>
        <ul className="list-disc list-inside text-gray-300">
          {selectedOrder.cartItems.map((item, index) => (
            <li key={index}>
              {item.productName} (x{item.qty}) — PKR {item.price.toLocaleString()}
            </li>
          ))}
        </ul>
      </div>

      {/* Right Section - Map */}
      <div>
        <OrderMap
          latitude={selectedOrder.address.latitude}
          longitude={selectedOrder.address.longitude}
        />
      </div>

      {/* Close Button Full Row */}
      <div className="col-span-2 text-right mt-4">
        <button
          onClick={() => setShowModal(false)}
          className="bg-green-600 hover:bg-green-700 text-black px-4 py-2 rounded-lg"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}


    </>
  );
}
