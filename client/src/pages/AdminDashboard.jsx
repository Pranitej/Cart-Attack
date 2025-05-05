import React, { useState, useContext } from "react";
import {
  FiHome,
  FiUsers,
  FiSettings,
  FiMail,
  FiMenu,
  FiX,
  FiChevronDown,
} from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { AiFillProduct } from "react-icons/ai";
import { IoMdAddCircleOutline } from "react-icons/io";
import { PiListMagnifyingGlassBold } from "react-icons/pi";

import ThemeToggle from "../components/ThemeToggle";
import AdminHome from "./AdminHome";
import AdminUserList from "./ViewAllUsers";
import AdminProfile from "./AdminProfile";
import ProductUploadForm from "../components/ProductUploadForm";
import Products from "./Products";
import AllOrders from "./ViewAllOrders";

import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../App";

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [_, setDate] = useState(new Date());
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [navItems, setNavItems] = useState([
    {
      id: 1,
      icon: <FiHome className="text-lg" />,
      label: "Dashboard",
      component: <AdminHome />,
      active: true,
    },
    {
      id: 2,
      icon: <CgProfile className="text-lg" />,
      label: "Profile",
      component: <AdminProfile />,
      active: false,
    },
    {
      id: 3,
      icon: <FiUsers className="text-lg" />,
      label: "Users",
      component: <AdminUserList />,
      active: false,
    },
    {
      id: 4,
      icon: <IoMdAddCircleOutline className="text-lg" />,
      label: "Add Product",
      component: <ProductUploadForm />,
      active: false,
    },
    {
      id: 5,
      icon: <AiFillProduct className="text-lg" />,
      label: "Products",
      component: <Products role="admin" />,
      active: false,
    },
    {
      id: 6,
      icon: <PiListMagnifyingGlassBold className="text-lg" />,
      label: "All Orders",
      component: <AllOrders />,
      active: false,
    },
  ]);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleMobileSidebar = () => setMobileSidebarOpen(!mobileSidebarOpen);
  const toggleUserDropdown = () => setUserDropdownOpen(!userDropdownOpen);

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 font-sans text-gray-900 dark:text-gray-100">
      {/* Sidebar - Desktop */}
      <div
        className={`hidden md:flex flex-col bg-indigo-700 text-white transition-all duration-300 ${
          sidebarOpen ? "w-64" : "w-15"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-indigo-600">
          {sidebarOpen && (
            <h1 className="text-xl font-bold whitespace-nowrap">Admin Panel</h1>
          )}
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-indigo-600"
          >
            {sidebarOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto">
          <ul className="space-y-1 p-2">
            {navItems.map((item, index) => (
              <li key={index}>
                <Link
                  to="#"
                  className={`flex items-center p-3 rounded-lg ${
                    item.active ? "bg-indigo-800" : "hover:bg-indigo-600"
                  }`}
                  onClick={() => {
                    const newNavItems = navItems.map((nav) => ({
                      ...nav,
                      active: nav.id === item.id,
                    }));
                    setNavItems(newNavItems);
                    setDate(new Date());
                  }}
                >
                  <span className="flex-shrink-0">{item.icon}</span>
                  {sidebarOpen && (
                    <span className="ml-3 whitespace-nowrap">{item.label}</span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={toggleMobileSidebar}
        ></div>
      )}

      {/* Sidebar - Mobile */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-indigo-700 text-white transform transition-transform md:hidden ${
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-indigo-600">
          <h1 className="text-xl font-bold">Admin Panel</h1>
          <button
            onClick={toggleMobileSidebar}
            className="p-2 rounded-lg hover:bg-indigo-600"
          >
            <FiX />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto">
          <ul className="space-y-1 p-2">
            {navItems.map((item, index) => (
              <li
                key={index}
                onClick={() => {
                  const newNavItems = navItems.map((nav) => ({
                    ...nav,
                    active: nav.id === item.id,
                  }));
                  setNavItems(newNavItems);
                  setDate(new Date());
                }}
              >
                <Link
                  to="#"
                  className={`flex items-center p-3 rounded-lg ${
                    item.active ? "bg-indigo-800" : "hover:bg-indigo-600"
                  }`}
                >
                  <span className="flex-shrink-0">{item.icon}</span>
                  <span className="ml-3">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow-sm z-10">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <button
                onClick={toggleMobileSidebar}
                className="p-2 mr-2 text-gray-600 dark:text-gray-300 rounded-lg md:hidden hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <FiMenu />
              </button>
              <ThemeToggle />
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                Dashboard
              </h2>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <button
                  onClick={toggleUserDropdown}
                  className="flex items-center space-x-2 focus:outline-none cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-medium">
                    {user?.name ? user.name.charAt(0).toUpperCase() : "A"}
                  </div>
                  <span className="hidden md:inline-block font-medium text-gray-700 dark:text-gray-200">
                    {user?.name || "Admin"}
                  </span>
                  <FiChevronDown
                    className={`transition-transform ${
                      userDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {userDropdownOpen && (
                  <div className="absolute border-indigo-500 border-2 right-0 cursor-pointer mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-20">
                    <span
                      onClick={() => {
                        setUser(null);
                        navigate("/login");
                      }}
                      className="block px-4 py-2 text-sm text-red-400 hover:text-red-500"
                    >
                      <b>Log out</b>
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-0 bg-gray-50 dark:bg-gray-900">
          {navItems.map((item, index) => (
            <div key={index}>{item.active && item.component}</div>
          ))}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
