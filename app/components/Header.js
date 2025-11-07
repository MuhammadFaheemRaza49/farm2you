"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full bg-white shadow-md py-4 px-8 flex items-center justify-between">
      {/* Logo on Left */}
      <div className="flex items-center space-x-2">
        <img
          src="/registerPage/logocopy.jpg"
          alt="Logo"
          className="h-40 w-40 object-contain mb-[-60] mt-[-60]"
        />
        {/* <h1 className="text-xl font-bold text-green-700">Farm2You</h1> */}
      </div>

      {/* Navigation Links on Right */}
      <nav className="flex space-x-6">
        <Link
          href="/"
          className="text-gray-800 hover:text-green-700 font-medium transition-colors"
        >
          Home
        </Link>
        <Link
          href="/product"
          className="text-gray-800 hover:text-green-700 font-medium transition-colors"
        >
          Product
        </Link>
        <Link
          href="/help"
          className="text-gray-800 hover:text-green-700 font-medium transition-colors"
        >
          Help Center
        </Link>
      </nav>
    </header>
  );
}
