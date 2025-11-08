// components/Header.jsx
"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="bg-green-600 text-white p-4 flex justify-between items-center">
      {/* Logo / Brand */}
      <div className="text-xl font-bold">Farm2You</div>

      {/* Desktop Menu */}
      <nav className="hidden md:flex space-x-6">
        <Link href="/" className="hover:text-green-200">Home</Link>
        <Link href="/dashboard" className="hover:text-green-200">Dashboard</Link>
        <Link href="/about" className="hover:text-green-200">About</Link>
        <Link href="/contact" className="hover:text-green-200">Contact</Link>
      </nav>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button onClick={toggleMenu}>
          {menuOpen ? (
            <span className="text-2xl">&#10005;</span> // X icon
          ) : (
            <span className="text-2xl">&#9776;</span> // Hamburger icon
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <nav className="absolute top-16 left-0 w-full bg-green-600 flex flex-col items-center space-y-4 p-4 md:hidden">
          <Link href="/" onClick={toggleMenu} className="hover:text-green-200">Home</Link>
          <Link href="/dashboard" onClick={toggleMenu} className="hover:text-green-200">Dashboard</Link>
          <Link href="/about" onClick={toggleMenu} className="hover:text-green-200">About</Link>
          <Link href="/contact" onClick={toggleMenu} className="hover:text-green-200">Contact</Link>
        </nav>
      )}
    </header>
  );
}
