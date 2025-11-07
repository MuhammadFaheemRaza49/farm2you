"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function RegisterPage() {
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

    // Simulate registration process
    setTimeout(() => {
      console.log("✅ Registered:", formData);
      setLoading(false);
      setMessage("🎉 Registration successful!");

      // Reset form
      setFormData({ username: "", password: "", role: "" });

      // Redirect to login after short delay
      setTimeout(() => router.push("/loginPage"), 1500);
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-screen flex flex-col items-center justify-center bg-gray-100 overflow-hidden"
    >
      {/* Logo */}
      <motion.div
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="mb-[-60] mt-[-120]"
      >
        <img
          src="/registerPage/logocopy.jpg"
          alt="Logo"
          className="h-60 w-60 object-contain"
        />
      </motion.div>

      {/* Form */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md border border-gray-200"
      >
        <h1 className="text-2xl font-bold text-center text-green-700 mb-6">
          Create Your Account
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

        <motion.input
          whileFocus={{ scale: 1.02 }}
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <motion.input
          whileFocus={{ scale: 1.02 }}
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <motion.select
          whileFocus={{ scale: 1.02 }}
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
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
          className={`mt-6 w-full text-white font-semibold py-3 rounded-lg transition-all ${
            loading ? "bg-green-700" : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {loading ? "Registering..." : "Sign Up"}
        </motion.button>
      </motion.form>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-6 text-gray-600 text-sm"
      >
        Already have an account?{" "}
        <a
          href="/loginPage"
          className="text-green-700 font-medium hover:underline"
        >
          Log In
        </a>
      </motion.p>
    </motion.div>
  );
}
