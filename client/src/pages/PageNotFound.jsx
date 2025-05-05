import React from "react";
import { FaRocket, FaUserAstronaut } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 px-6">
      <div className="text-center max-w-lg">
        <div className="text-9xl font-extrabold text-indigo-500 mb-4 animate-pulse">
          404
        </div>
        <h1 className="text-3xl font-bold mb-2">
          Oops! Looks like you're lost in space. 🚀
        </h1>
        <p className="mb-6 text-gray-500 dark:text-gray-400">
          We can’t find the page you’re looking for. Maybe aliens abducted it?
        </p>

        <div className="flex justify-center gap-4 mb-8 text-6xl">
          <FaRocket className="animate-bounce" />
          <FaUserAstronaut className="animate-spin-slow" />
        </div>

        <Link
          to="/"
          className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
