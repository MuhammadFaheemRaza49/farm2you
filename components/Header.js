"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useUserStore } from "../store/store";
import { ShoppingCart } from "lucide-react";
import toast from "react-hot-toast";

export default function Header({ user = {}, cartCount = 0 }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);

  const { setUsername, setRole, isLogin, setIsLogin, username, role, cartItems } = useUserStore();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleDropdown = () => setOpenDropdown(!openDropdown);

  const verifyToken = async () => {
    const req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    })
    const res = await req.json();
    if (res.type == "success") {
      console.log(res);
      let role = res.user.role;
      setUsername(res.user.username);
      setRole(role);
      setIsLogin(true);
    }
  }



  const logout = () => {
    localStorage.removeItem("token");
    setUsername("");
    setIsLogin(false);
    setRole("");
    toast.success("Logout Successfully!")
  }

  useEffect(() => {
    verifyToken();
  }, [])

  return (
    <header className="z-10 bg-green-700 text-white px-6 py-4 flex justify-between items-center shadow-md relative">

      {/* Logo */}
      <Link href="/" className="text-2xl font-bold tracking-wide">Farm2You</Link>

      {/* Desktop Menu */}
      <nav className="hidden md:flex space-x-8 text-lg">
        <Link href="/" className="hover:text-green-200 transition">Home</Link>
        <Link  href={`/${role === "user"
                      ? "userDashboard"
                      : role === "transporter"
                        ? "transporterDashboard"
                        : role === "farmer"
                          ? "farmerDashboard"
                          : ""
                    }`} className="hover:text-green-200 transition">Dashboard</Link>
        <Link href="/about" className="hover:text-green-200 transition">About</Link>
        <Link href="/contact" className="hover:text-green-200 transition">Contact</Link>
      </nav>

      {/* Right Side */}
      <div className="hidden md:flex items-center space-x-5">

        {/* Cart Icon */}
        <Link href="/userCart" className="top-6 right-6">
          <div className="relative cursor-pointer">
            <ShoppingCart className="w-8 h-8 text-green-400 hover:text-green-500 transition" />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-green-500 text-black rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                {cartItems.length}
              </span>
            )}
          </div>
        </Link>

        {/* If Logged In */}
        {isLogin ? (
          <div className="relative">
            <button onClick={toggleDropdown} className="bg-green-800 px-3 py-1 rounded-lg hover:bg-green-900">
              {user?.name || "Profile"}
            </button>

            {openDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-black shadow-lg rounded-md py-2">

                {/* User Info */}
                <div className="px-4 py-2 border-b border-gray-200">
                  <p className="font-semibold">Hi, {username}</p>
                  <p className="text-sm text-gray-600 capitalize">
                    Role: {role}
                  </p>
                </div>

             
                {/* Menu Links */}
                <Link
                  href={`/${role === "user"
                      ? "userDashboard"
                      : role === "transporter"
                        ? "transporterDashboard"
                        : role === "farmer"
                          ? "farmerDashboard"
                          : ""
                    }/settings`}
                  className="block px-4 py-2 hover:bg-gray-100 transition"
                >
                  Settings
                </Link>

                <Link
                   href={`/${role === "user"
                      ? "userOngoingOrder"
                      : role === "transporter"
                        ? "transporterOngoingOrders"
                        : role === "farmer"
                          ? "farmerDashboard"
                          : "farmerOngoingOrders"
                    }`}
                  className="block px-4 py-2 hover:bg-gray-100 transition"
                >
                  My Orders
                </Link>

                <button
                  onClick={logout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 transition"
                >
                  Logout
                </button>
              </div>
            )}

          </div>
        ) : (
          <>
            <Link href="/loginPage" className="bg-white text-green-700 px-4 py-1 rounded hover:bg-gray-200">
              Login
            </Link>
            <Link href="/registerPage" className="bg-green-900 px-4 py-1 rounded hover:bg-green-950">
              Register
            </Link>
          </>
        )}
      </div>

      {/* Mobile Menu Button */}
      <button className="md:hidden text-3xl" onClick={toggleMenu}>
        {menuOpen ? "✖" : "☰"}
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <nav className="absolute top-full left-0 w-full bg-green-700 flex flex-col items-center text-lg py-4 space-y-4 md:hidden z-50">
          <Link href="/" onClick={toggleMenu}>Home</Link>
          <Link href="/dashboard" onClick={toggleMenu}>Dashboard</Link>
          <Link href="/about" onClick={toggleMenu}>About</Link>
          <Link href="/contact" onClick={toggleMenu}>Contact</Link>

          <div className="h-px bg-green-500 w-5/6"></div>

          {/* Cart */}
          <Link href="/cart" onClick={toggleMenu} className="text-xl">Cart ({cartCount})</Link>

          {/* Login / User */}
          {isLogin ? (
            <>
              <Link href="/profile" onClick={toggleMenu}>My Profile</Link>
              <button>Logout</button>
            </>
          ) : (
            <>
              <Link href="/login" onClick={toggleMenu}>Login</Link>
              <Link href="/register" onClick={toggleMenu}>Register</Link>
            </>
          )}
        </nav>
      )}
    </header>
  );
}
