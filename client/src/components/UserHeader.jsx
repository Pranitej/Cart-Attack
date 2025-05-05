import { useState } from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { Menu, X } from "lucide-react";
import { LuLogOut } from "react-icons/lu";
import { useContext } from "react";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const { setUser } = useContext(UserContext);

  const navigate = useNavigate();

  return (
    <header className="bg-gray-200 dark:bg-gray-900 shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo + Brand */}
        <div className="flex items-center gap-2">
          <img src="/vite.svg" alt="Logo" className="h-8 w-8" />
          <Link
            to="/products"
            className="text-xl font-bold text-blue-600 dark:text-yellow-400 dark:hover:text-yellow-400 hover:text-blue-500 transition duration-200"
          >
            CartAttack
          </Link>
        </div>
        <div className="flex items-center gap-5">
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/products"
              className="text-gray-700 dark:text-gray-300 dark:hover:text-gray-100 hover:text-gray-950"
            >
              Home
            </Link>
            <Link
              to="/profile"
              className="text-gray-700 dark:text-gray-300 dark:hover:text-gray-100 hover:text-gray-950"
            >
              Profile
            </Link>
            <Link
              to="/cart"
              className="text-gray-700 dark:text-gray-300 dark:hover:text-gray-100 hover:text-gray-950"
            >
              Cart
            </Link>

            <LuLogOut
              className="dark:text-white hover:text-red-500 text-xl cursor-pointer"
              onClick={() => {
                setUser(null);
                navigate("/login");
              }}
            />
          </nav>

          {/* Theme Toggle + Hamburger */}
          <div className="flex items-center gap-4">
            <ThemeToggle />

            <button
              className="md:hidden text-gray-700 dark:text-gray-200 focus:outline-none cursor-pointer"
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
            to="/products"
            onClick={() => setIsOpen(false)}
            className="text-gray-700 dark:text-gray-300 dark:hover:text-gray-100 hover:text-gray-950"
          >
            Home
          </Link>
          <Link
            to="/profile"
            onClick={() => setIsOpen(false)}
            className="text-gray-700 dark:text-gray-300 dark:hover:text-gray-100 hover:text-gray-950"
          >
            Profile
          </Link>
          <Link
            to="/cart"
            onClick={() => setIsOpen(false)}
            className="text-gray-700 dark:text-gray-300 dark:hover:text-gray-100 hover:text-gray-950"
          >
            Cart
          </Link>
          <span
            className="text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-500 flex items-center gap-2 cursor-pointer group"
            onClick={() => {
              setUser(null);
              navigate("/login");
            }}
          >
            Logout
            <LuLogOut className="text-inherit text-lg cursor-pointer" />
          </span>
        </div>
      </div>
    </header>
  );
}
