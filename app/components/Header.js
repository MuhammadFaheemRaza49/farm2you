// components/Header.jsx
"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="w-full fixed top-0 left-0 z-50 border-b border-green-700 shadow-md">
      {/* Add 'group' to enable group-hover */}
      <div className="group max-w-7xl mx-auto flex justify-between items-center p-4 bg-black text-green-400 transition-colors duration-300 hover:bg-green-400">
        {/* Logo / Brand */}
        <div className="text-xl font-bold px-2 py-1 rounded transition-colors duration-300 group-hover:text-black">
          Farm2You
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-6">
          {["Home", "Dashboard", "About", "Contact"].map((item) => (
            <Link
              key={item}
              href={`/${item === "Home" ? "" : item.toLowerCase()}`}
              className="px-3 py-1 rounded font-medium transition-colors duration-300 group-hover:text-black"
            >
              {item}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="px-2 py-1 rounded transition-colors duration-300 group-hover:text-black"
          >
            {menuOpen ? "✖" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <nav className="absolute top-full left-0 w-full bg-black flex flex-col items-center space-y-4 p-4 md:hidden border-t border-green-700">
          {["Home", "Dashboard", "About", "Contact"].map((item) => (
            <Link
              key={item}
              href={`/${item === "Home" ? "" : item.toLowerCase()}`}
              onClick={toggleMenu}
              className="w-full text-center px-4 py-2 rounded font-medium text-green-400 hover:text-black hover:bg-green-400 transition-colors duration-300"
            >
              {item}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
