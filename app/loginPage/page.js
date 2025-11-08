"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function LoginPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    setTimeout(() => {
      if (formData.username && formData.password && formData.role) {
        setMessage("🎉 Login successful!");

        setTimeout(() => {
          if (formData.role === "farmer") {
            router.push("/farmerDashboard");
          } else if (formData.role === "user") {
            router.push("/userDashboard");
          } else if (formData.role === "transporter") {
            router.push("/transporterDashboard");
          } else {
            router.push("/homePage");
          }
        }, 1000);
      } else {
        setMessage("❌ Please fill in all fields.");
      }

      setLoading(false);
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-screen flex flex-col items-center justify-center bg-black overflow-hidden px-4"
    >
      {/* Logo */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="mb-[-60] mt-[-120]"
      >
        <img
          src="/registerPage/logo.png"
          alt="Logo"
          className="h-70 w-70 object-contain drop-shadow-[0_0_20px_rgba(34,197,94,0.6)]"
        />
      </motion.div>

      {/* Login Form */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="bg-[#0a0a0a] shadow-[0_0_25px_rgba(22,163,74,0.4)] rounded-2xl p-8 w-full max-w-md border border-green-600/40"
      >
        <h1 className="text-3xl font-extrabold text-center text-green-500 mb-6 tracking-wide">
          Welcome Back
        </h1>

        {message && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={`text-center mb-4 font-medium ${
              message.startsWith("🎉") ? "text-green-400" : "text-red-500"
            }`}
          >
            {message}
          </motion.p>
        )}

        <motion.div
          className="flex flex-col gap-4"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
            className="p-3 bg-black border border-green-700 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="p-3 bg-black border border-green-700 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          {/* Role Dropdown */}
          <motion.select
            whileFocus={{ scale: 1.02 }}
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
            className="p-3 bg-black text-white border border-green-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Select Role</option>
            <option value="farmer">Farmer</option>
            <option value="user">User</option>
            <option value="transporter">Transporter</option>
          </motion.select>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
            className={`mt-4 font-semibold py-3 rounded-lg transition-all duration-300 ${
              loading
                ? "bg-green-800 text-white"
                : "bg-green-500 text-black hover:bg-green-600 hover:text-white"
            }`}
          >
            {loading ? "Logging in..." : "Log In"}
          </motion.button>
        </motion.div>
      </motion.form>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-6 text-gray-400 text-sm"
      >
        Don’t have an account?{" "}
        <a
          href="/registerPage"
          className="text-green-500 font-medium hover:underline hover:text-green-400"
        >
          Sign Up
        </a>
      </motion.p>
    </motion.div>
  );
}
