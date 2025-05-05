import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaTags } from "react-icons/fa";
import ThemeToggle from "../components/ThemeToggle";

export default function CartAttackHome() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50 dark:bg-gray-900 transition-colors duration-300">
      <header className="w-full px-6 py-4 bg-[#2874f0] dark:bg-[#1a202c] flex items-center justify-between shadow-md">
        <h1 className="text-3xl font-bold text-yellow-400">CartAttack</h1>
        <div className="flex items-center gap-6">
          <Link
            to="/login"
            className="text-black bg-yellow-400 hover:bg-yellow-300 dark:text-white dark:hover:bg-blue-400 px-4 py-2 rounded-md transition dark:bg-blue-500"
          >
            Shop Now
          </Link>
          <ThemeToggle />
        </div>
      </header>

      <main className="flex-1 flex flex-col lg:flex-row items-center justify-between px-6 py-12 gap-10 w-full max-w-7xl">
        <div className="text-center lg:text-left max-w-xl space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold text-blue-700 dark:text-blue-500">
            Unleash Your Inner Shopper!
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Welcome to <b>CartAttack</b> — where your cart hits back with
            amazing deals, jaw-dropping discounts, and non-stop savings!
          </p>
          <Link
            to="/login"
            className="inline-block mt-4 bg-yellow-400 hover:bg-yellow-300 text-black font-semibold px-6 py-3 rounded-md transition"
          >
            Browse Products
          </Link>
        </div>

        <div className="relative  animate-bounce">
          <FaShoppingCart className="text-[200px] text-blue-500 dark:text-yellow-400 drop-shadow-lg " />
          <FaTags className="absolute top-10 right-[-30px] text-yellow-400 text-4xl rotate-12 dark:text-blue-500" />
        </div>
      </main>

      <footer className="w-full py-4 bg-[#2874f0] dark:bg-[#1a202c] text-center text-white text-sm">
        © {new Date().getFullYear()} CartAttack. All rights reserved.
      </footer>
    </div>
  );
}
