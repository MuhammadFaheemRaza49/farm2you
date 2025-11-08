"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useUserStore } from "../../store/store";

export default function LoginPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const {setUsername, setRole, setIsLogin} = useUserStore();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: formData.username,
        password: formData.password
      })
    })
    const res = await req.json();
    if (res.type == "success") {
      toast.success(res.message);
      console.log(res)
      localStorage.setItem("token", res.token);
      let role = res.user.role;
      setUsername(res.user.username);
      setRole(role);
      setIsLogin(true)

      if (role == "user") {
        router.push("/userDashboard");
      }
      else if (role == "farmer") {
        router.push("/farmerDashboard");
      }
      else {
        router.push("/transporterDashboard");
      }
    
    }
    else {
      toast.error(res.message);
    }

    setLoading(false);

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
            className={`text-center mb-4 font-medium ${message.startsWith("🎉") ? "text-green-600" : "text-red-600"
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


          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
            className={`mt-4 bg-green-600 text-white font-semibold py-3 rounded-lg transition-all ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-green-700"
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
