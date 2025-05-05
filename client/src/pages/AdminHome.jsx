import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { FiPieChart, FiUsers, FiTrendingUp } from "react-icons/fi";
import formatToINR from "../helpers/numberToINR";

const BASE_URI = import.meta.env.VITE_BASE_URI;

export default function AdminHome() {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [revenue, setRevenue] = useState(0);

  const getAllUsers = () => {
    axios
      .get(`${BASE_URI}/api/users`)
      .then((response) => setUsers(response.data || []))
      .catch((error) => console.error("Error fetching users data:", error));
  };

  const getAllOrders = async () => {
    try {
      const response = await axios.get(`${BASE_URI}/api/orders/all`);
      const data = response.data;
      let totalRevenue = data.reduce((acc, order) => acc + order.totalPrice, 0);
      setRevenue(totalRevenue);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const getAllProducts = () => {
    axios
      .get(`${BASE_URI}/api/products`)
      .then((response) => setProducts(response.data || []))
      .catch((error) => console.error("Error fetching products data:", error));
  };

  useEffect(() => {
    getAllUsers();
    getAllProducts();
    getAllOrders();
  }, []);

  return (
    <main className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Stats Cards */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400">Total Users</p>
              <h3 className="text-2xl font-bold">{users.length}</h3>
            </div>
            <div className="p-3 rounded-full bg-indigo-100 dark:bg-indigo-700/30 text-indigo-600 dark:text-indigo-300">
              <FiUsers className="text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400">Revenue</p>
              <h3 className="text-2xl font-bold">{formatToINR(revenue)}</h3>
            </div>
            <div className="p-3 rounded-full bg-green-100 dark:bg-green-700/30 text-green-600 dark:text-green-300">
              <FiPieChart className="text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400">Products</p>
              <h3 className="text-2xl font-bold">{products.length}</h3>
            </div>
            <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-700/30 text-blue-600 dark:text-blue-300">
              <FaCartShopping className="text-xl" />
            </div>
          </div>
        </div>

        {/* Top Selling Products */}
        <div className="md:col-span-2 lg:col-span-3 bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <FiTrendingUp className="text-indigo-500" /> Top Selling Products
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                <tr>
                  <th className="px-4 py-3 font-medium text-sm uppercase">
                    Product
                  </th>
                  <th className="px-4 py-3 font-medium text-sm uppercase">
                    Name
                  </th>
                  <th className="px-4 py-3 font-medium text-sm uppercase">
                    Category
                  </th>
                  <th className="px-4 py-3 font-medium text-sm uppercase">
                    Price
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.slice(0, 5).map((product) => (
                  <tr
                    key={product._id}
                    className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <td className="px-4 py-3 flex items-center space-x-3">
                      <img
                        src={`${BASE_URI}/uploads/${product.image}`}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded-md"
                      />
                    </td>
                    <td className="px-4 py-3">{product.name || "N/A"}</td>
                    <td className="px-4 py-3">{product.category || "N/A"}</td>
                    <td className="px-4 py-3">{formatToINR(product.price)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
