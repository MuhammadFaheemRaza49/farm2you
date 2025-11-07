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

    // Simulate login check
    setTimeout(() => {
      if (formData.username && formData.password && formData.role) {
        setMessage("🎉 Login successful!");

        // Redirect based on role
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
      className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-0 overflow-hidden"
    >
      {/* Logo */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="mb-[-60] mt-[-120]"
      >
        <img
          src="/registerPage/logocopy.jpg"
          alt="Logo"
          className="h-60 w-60 object-contain mx-auto"
        />
      </motion.div>

      {/* Login Form */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md border border-gray-200"
      >
        <h1 className="text-2xl font-bold text-center text-green-700 mb-6">
          Welcome Back
        </h1>

        {message && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={`text-center mb-4 font-medium ${
              message.startsWith("🎉") ? "text-green-600" : "text-red-600"
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
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          {/* Role Dropdown */}
          <motion.select
            whileFocus={{ scale: 1.02 }}
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
            className="p-3 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
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
            className={`mt-4 bg-green-600 text-white font-semibold py-3 rounded-lg transition-all ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-green-700"
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
        className="mt-6 text-gray-600 text-sm"
      >
        Don’t have an account?{" "}
        <a
          href="/registerPage"
          className="text-green-700 font-medium hover:underline"
        >
          Sign Up
        </a>
      </motion.p>
    </motion.div>
  );
}
