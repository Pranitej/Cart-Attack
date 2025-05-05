import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiSearch } from "react-icons/fi";
import formatToINR from "../helpers/numberToINR";

const BASE_URI = import.meta.env.VITE_BASE_URI;

export default function AllOrders() {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const getAllOrders = async () => {
    try {
      const response = await axios.get(`${BASE_URI}/api/orders/all`);
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  const filteredOrders = orders.filter((order) =>
    [
      order._id,
      order.user?.name,
      ...order.orderItems.map((item) => item.product?.name),
    ]
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <h2 className="text-2xl font-bold mb-4">All Orders</h2>

      {/* Search */}
      <div className="flex items-center mb-4 bg-white dark:bg-gray-800 rounded-lg px-3 py-2 shadow-sm">
        <FiSearch className="text-gray-400 dark:text-gray-300 mr-2" />
        <input
          type="text"
          placeholder="Search orders..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-transparent outline-none text-sm placeholder:text-gray-400 dark:placeholder:text-gray-500"
        />
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto bg-white dark:bg-gray-800 rounded-lg shadow">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="px-4 py-2 text-left">Order ID</th>
              <th className="px-4 py-2 text-left">User</th>
              <th className="px-4 py-2 text-left">No.of Items</th>
              <th className="px-4 py-2 text-left">Total</th>
              <th className="px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-400">
                  No orders found.
                </td>
              </tr>
            ) : (
              filteredOrders.map((order) => (
                <tr
                  key={order._id}
                  className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="px-4 py-2">{order._id}</td>
                  <td className="px-4 py-2">
                    {order.user?.name || "User Deleted"}
                  </td>
                  <td className="px-4 py-2">{order.orderItems.length}</td>
                  <td className="px-4 py-2 font-medium text-green-600 dark:text-green-400">
                    {formatToINR(order.totalPrice)}
                  </td>
                  <td className="px-4 py-2">
                    {order.isDelivered ? (
                      <span className="text-green-600 font-semibold">
                        Delivered
                      </span>
                    ) : (
                      <span className="text-yellow-500 font-semibold">
                        Pending
                      </span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
