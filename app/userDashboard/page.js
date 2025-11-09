"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
export default function TransporterDashboard() {
  const crops = ["/homePage/wheat1.jpg", "/homePage/wheat2.jpg"];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % crops.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [crops.length]);

  // Scroll to bottom when new message is added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);
  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    // Add user message to chat
    const newUserMessage = { sender: "user", text: userInput };
    setChatMessages((prev) => [...prev, newUserMessage]);

    const currentContext = chatMessages.map((msg) => ({
      role: msg.sender === "user" ? "user" : "assistant",
      content: msg.text,
    }));

    setUserInput(""); // Clear input

    try {
      // Call your backend chat endpoint
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat/send-message`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: userInput,
          context: currentContext, // pass previous conversation
        }),
      });

      const data = await res.json();
      const botMessage = { sender: "bot", text: data.answer };

      setChatMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error(err);
      const errorMsg = { sender: "bot", text: "🤖 FarmBot: Something went wrong. Please try again." };
      setChatMessages((prev) => [...prev, errorMsg]);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center relative overflow-hidden text-white">
      {/* Header */}
      <div className="w-full"></div>

      {/* Carousel Background */}
      <div className="relative w-full h-[60vh] flex justify-center items-center overflow-hidden">
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
          onClick={() => setChatOpen((prev) => !prev)}
        >
          <span>Chat with FarmBot</span>
        </motion.button>
      </motion.div>

      {/* Chat Popup */}
      <AnimatePresence>
        {chatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: 50 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: 50, x: 50 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-20 right-6 w-96 bg-gray-900 rounded-3xl flex flex-col overflow-hidden z-50 border border-green-700 shadow-2xl"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-4 bg-green-700/20 border-b border-green-500">
              <h2 className="text-green-300 font-bold text-lg">FarmBot 🤖</h2>
              <button
                className="text-gray-300 hover:text-red-500 font-bold text-xl"
                onClick={() => setChatOpen(false)}
              >
                ×
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 max-h-80 bg-gray-800">
              {chatMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`${msg.sender === "user" ? "text-right" : "text-left"}`}
                >
                  <div
                    className={`inline-block p-3 rounded-xl break-words max-w-[80%] ${msg.sender === "user"
                        ? "bg-green-500 text-black"
                        : "bg-gray-700 text-white"
                      }`}
                  >
                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="flex p-4 border-t border-green-500 bg-gray-900">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 p-3 rounded-2xl bg-gray-800 border border-green-700 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <button
                onClick={handleSendMessage}
                className="ml-3 bg-green-500 hover:bg-green-600 text-black px-5 py-3 rounded-2xl font-medium transition"
              >
                Send
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🚚 Transporter Options */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 w-[90%] max-w-4xl z-20"
      >
        {/* New Deliveries */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-[#0a0a0a] text-white rounded-2xl shadow-[0_0_20px_rgba(22,163,74,0.3)] p-8 border border-green-700 hover:shadow-[0_0_25px_rgba(22,163,74,0.5)] transition"
        >
          <h2 className="text-2xl font-semibold text-green-400 mb-2">Make New Order</h2>
          <p className="text-gray-300 mb-4">View and accept new delivery assignments from the system.</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="bg-green-500 text-black font-medium px-5 py-2 rounded-lg shadow-md hover:bg-green-600 hover:text-white transition-all"
          >
            <Link href="/userNewOrder">New Order</Link>
          </motion.button>
        </motion.div>

        {/* Completed Deliveries */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-[#0a0a0a] text-white rounded-2xl shadow-[0_0_20px_rgba(22,163,74,0.3)] p-8 border border-green-700 hover:shadow-[0_0_25px_rgba(22,163,74,0.5)] transition"
        >
          <h2 className="text-2xl font-semibold text-green-400 mb-2">Review Orders</h2>
          <p className="text-gray-300 mb-4">Review your orders.</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="bg-green-500 text-black font-medium px-5 py-2 rounded-lg shadow-md hover:bg-green-600 hover:text-white transition-all"
          >
            <Link href="/userOngoingOrder">Review Ongoing Orders</Link>
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}
