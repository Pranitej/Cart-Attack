import UserHeader from "../components/UserHeader";
import { useEffect, useState, useContext } from "react";
import { Trash2 } from "lucide-react";
import { UserContext } from "../App";
import formatToINR from "../helpers/numberToINR";

const BASE_URI = import.meta.env.VITE_BASE_URI;

export default function Cart() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updating, setUpdating] = useState(false);

  const { user } = useContext(UserContext);

  async function fetchCart() {
    try {
      setLoading(true);
      setError("");
      const res = await fetch(`${BASE_URI}/api/cart/${user?._id}`);
      if (!res.ok) throw new Error("Failed to fetch cart");
      const data = await res.json();
      setCart(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (user?._id) fetchCart();
  }, [user?._id]);

  const handleRemove = async (itemId) => {
    try {
      setUpdating(true);
      setError("");
      const res = await fetch(`${BASE_URI}/api/cart/${user?._id}/${itemId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to remove item");
      const data = await res.json();
      setCart(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setUpdating(false);
    }
  };

  const handleQuantity = async (item, delta) => {
    const newQty = item.quantity + delta;
    if (newQty < 1) return;
    try {
      setUpdating(true);
      setError("");
      const res = await fetch(`${BASE_URI}/api/cart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user._id,
          productId: item.product._id,
          quantity: delta,
        }),
      });
      if (!res.ok) throw new Error("Failed to update quantity");
      const data = await res.json();
      setCart(data);
      fetchCart();
    } catch (err) {
      setError(err.message);
    } finally {
      setUpdating(false);
    }
  };

  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");
  const [orderSuccess, setOrderSuccess] = useState(false);

  const handleCheckout = async () => {
    if (!cart || !cart.items.length) return;
    setCheckoutLoading(true);
    setCheckoutError("");
    setOrderSuccess(false);
    try {
      const orderItems = cart.items.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
        price: item.product.price,
      }));
      const total = orderItems.reduce(
        (sum, item) => sum + item.quantity * item.price,
        0
      );
      const orderPayload = {
        userId: user._id,
        orderItems,
        shippingAddress: {
          address: "123 Demo St",
          city: "Demo City",
          postalCode: "123456",
          country: "India",
        },
        paymentMethod: "Cash on Delivery",
        itemsPrice: total,
        taxPrice: 0,
        shippingPrice: 0,
        totalPrice: total,
      };
      const res = await fetch(`${BASE_URI}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to place order");
      }
      setOrderSuccess(true);
      setCart({ ...cart, items: [] });
    } catch (err) {
      setCheckoutError(err.message);
    } finally {
      setCheckoutLoading(false);
    }
  };

  const total =
    cart?.items?.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    ) || 0;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <UserHeader />
      <main className="max-w-5xl mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Cart
        </h1>
        {checkoutError && <p className="text-red-500 mt-4">{checkoutError}</p>}
        {orderSuccess && (
          <p className="text-green-600 mt-4">Order placed successfully!</p>
        )}
        {loading ? (
          <p className="text-gray-700 dark:text-gray-300">Loading cart...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : !cart || cart.items.length === 0 ? (
          <p className="text-gray-700 dark:text-gray-300">
            Your shopping cart is empty.
          </p>
        ) : (
          <div className="space-y-6">
            {cart.items.map((item) => (
              <div
                key={item._id}
                className="flex flex-col sm:flex-row items-center gap-4 bg-white dark:bg-gray-900 rounded-lg shadow p-4"
              >
                {item.product.image && (
                  <img
                    src={`${BASE_URI}/uploads/${item.product.image}`}
                    alt={item.product.name}
                    className="h-24 w-24 object-cover rounded"
                  />
                )}
                <div className="flex-1 w-full">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {item.product.name}
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300">
                    {formatToINR(item.product.price)}
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <button
                      className={`px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50 dark:text-white ${
                        item.quantity <= 1
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                      disabled={updating}
                      onClick={() => {
                        handleQuantity(item, -1);
                        console.log(item);
                      }}
                    >
                      -
                    </button>
                    <span className="dark:text-white">{item.quantity}</span>
                    <button
                      className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50 dark:text-white"
                      disabled={updating}
                      onClick={() => handleQuantity(item, 1)}
                    >
                      +
                    </button>
                  </div>
                  <p className="mt-2 font-semibold text-blue-600 dark:text-blue-400">
                    Total: {formatToINR(item.product.price * item.quantity)}
                  </p>
                </div>
                <button
                  className="text-red-500 hover:text-red-600 rounded-full bg-gray-100 dark:bg-gray-700 p-3 transition duration-100 cursor-pointer"
                  disabled={updating}
                  onClick={() => handleRemove(item._id)}
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
            <div className="flex justify-between items-center bg-white dark:bg-gray-900 rounded-lg shadow p-4">
              <span className="font-semibold text-lg text-gray-900 dark:text-white">
                Total: {formatToINR(total)}
              </span>
              <button
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
                disabled={updating || checkoutLoading || !cart?.items?.length}
                onClick={handleCheckout}
              >
                {checkoutLoading ? "Placing order..." : "Checkout"}
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
