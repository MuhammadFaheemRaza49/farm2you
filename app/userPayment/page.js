"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import QRCode from "qrcode.react";

export default function UserPayment() {
  const [cartItems, setCartItems] = useState([]);
  const [totalPKR, setTotalPKR] = useState(0);
  const [paymentDone, setPaymentDone] = useState(false);

  // Replace with your crypto wallet address
  const walletAddress = "0xd3bef23bb4f20ee60e761a4d63b29fa82628009f";

  // Example rate: 1 ETH = 50,000 PKR (you can replace with live API later)
  const cryptoRate = 50000;
  const cryptoAmount = (totalPKR / cryptoRate).toFixed(6); // ETH amount to pay

  // Load cart from localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem("userCart");
    if (storedCart) {
      const items = JSON.parse(storedCart);
      setCartItems(items);

      const total = items.reduce((sum, item) => {
        const price = parseInt(item.price.replace(/\D/g, ""));
        return sum + price;
      }, 0);
      setTotalPKR(total);
    }
  }, []);

  const handlePaymentSuccess = () => {
    alert("Payment Successful!");
    localStorage.removeItem("userCart");
    setCartItems([]);
    setPaymentDone(true);
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-12 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-green-400 mb-8 drop-shadow-[0_0_10px_rgba(22,163,74,0.5)]">
        Blockchain Payment
      </h1>

      {cartItems.length === 0 ? (
        paymentDone ? (
          <p className="text-green-400 text-xl">Payment completed! Thank you for your order.</p>
        ) : (
          <p className="text-gray-400">Your cart is empty.</p>
        )
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
                {item.product} - <span className="text-green-400">{item.price}</span>
              </div>
            </motion.div>
          ))}

          <div className="mt-6 text-gray-300 text-lg">
            Total: <span className="text-green-400 font-semibold">PKR {totalPKR}</span>
          </div>

          {/* QR Code Section */}
          <div className="flex flex-col items-center mt-6 gap-4">
            <p className="text-gray-300 text-center">
              Scan this QR code with your crypto wallet to pay <br />Amount: {cryptoAmount} ETH
            </p>
            <QRCode
              value={`ethereum:${walletAddress}?amount=${cryptoAmount}`}
              size={200}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePaymentSuccess}
              className="w-full bg-green-500 hover:bg-green-600 text-black font-semibold py-3 rounded-lg shadow-md transition-all mt-4"
            >
              I Have Paid
            </motion.button>
          </div>
        </div>
      )}
    </div>
  );
}
