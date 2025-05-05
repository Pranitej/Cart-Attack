import { useState } from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white dark:bg-gray-900 shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo + Brand */}
        <div className="flex items-center gap-2">
          <img src="/vite.svg" alt="Logo" className="h-8 w-8" />
          <span className="text-xl font-bold text-gray-800 dark:text-white">
            CartAttack
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="flex items-center gap-5">
          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className="text-gray-700 dark:text-gray-300 dark:hover:text-gray-100 hover:text-gray-950"
            >
              Home
            </Link>
            <Link
              to="/login"
              className="text-gray-700 dark:text-gray-300 dark:hover:text-gray-100 hover:text-gray-950"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="text-gray-700 dark:text-gray-300 dark:hover:text-gray-100 hover:text-gray-950"
            >
              Register
            </Link>
          </nav>

          {/* Theme Toggle + Hamburger */}
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <button
              className="md:hidden text-gray-700 dark:text-gray-200 focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu with Transition */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col px-4 pb-4 gap-2">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="text-gray-700 dark:text-gray-300 dark:hover:text-gray-100 hover:text-gray-950"
          >
            Home
          </Link>
          <Link
            to="/login"
            onClick={() => setIsOpen(false)}
            className="text-gray-700 dark:text-gray-300 dark:hover:text-gray-100 hover:text-gray-950"
          >
            Login
          </Link>
          <Link
            to="/register"
            onClick={() => setIsOpen(false)}
            className="text-gray-700 dark:text-gray-300 dark:hover:text-gray-100 hover:text-gray-950"
          >
            Register
          </Link>
        </div>
      </div>
    </header>
  );
}
