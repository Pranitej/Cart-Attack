import axios from "axios";
import UserHeader from "../components/UserHeader";
import { useEffect, useState, useContext, useCallback } from "react";
import { UserContext } from "../App";
import formatToINR from "../helpers/numberToINR";

const BASE_URI = import.meta.env.VITE_BASE_URI;

export default function Products({ role = "user" }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [maxPrice, setMaxPrice] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 0]);
  const [sortOption, setSortOption] = useState("");

  const { user } = useContext(UserContext);

  async function fetchProducts() {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`${BASE_URI}/api/products`);
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      setProducts(data);
      setFilteredProducts(data);
      setPriceRange([0, Math.max(...data.map((p) => p.price))]);
      setMaxPrice(Math.max(...data.map((p) => p.price)));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  const filterAndSortProducts = useCallback(() => {
    let result = [...products];

    if (searchQuery) {
      result = result.filter((p) =>
        [p.name, p.description, p.category].some((field) =>
          field?.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    switch (sortOption) {
      case "priceLowHigh":
        result.sort((a, b) => a.price - b.price);
        break;
      case "priceHighLow":
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case "oldest":
        result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case "az":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "za":
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }

    setFilteredProducts(result);
  }, [products, searchQuery, priceRange, sortOption]);

  useEffect(() => {
    filterAndSortProducts();
  }, [filterAndSortProducts]);

  const handleAddToCart = (product) => {
    axios
      .post(`${BASE_URI}/api/cart`, {
        productId: product._id,
        userId: user._id,
        quantity: 1,
      })
      .then((response) => {
        alert(
          response.data
            ? "Product added to cart"
            : "Failed to add product to cart"
        );
      })
      .catch(console.error);
  };

  const handleDelete = (product) => {
    axios
      .delete(`${BASE_URI}/api/products/${product._id}`)
      .then((response) => {
        if (response.data) {
          fetchProducts();
        } else {
          alert("Failed to delete product");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      {role !== "admin" && <UserHeader />}
      <main className="max-w-6xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">Products</h1>

        {/* Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-7">
          <div className="w-full">
            <label className="block text-sm mb-1">Search</label>
            <input
              type="search"
              placeholder="Search by name, description..."
              className="w-full p-2 border rounded-md bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="w-full">
            <label className="block text-sm mb-1">
              Max Price: {formatToINR(priceRange[1])}
            </label>
            <input
              type="range"
              min="0"
              max={maxPrice + 1000}
              step="500"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
              className="w-full accent-blue-500"
            />
          </div>

          <div className="w-full">
            <label className="block text-sm mb-1">Sort</label>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="w-full p-2 border rounded-md bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 focus:outline-none"
            >
              <option value="">Default</option>
              <option value="priceLowHigh">Price: Low to High</option>
              <option value="priceHighLow">Price: High to Low</option>
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="az">A-Z</option>
              <option value="za">Z-A</option>
            </select>
          </div>
        </div>

        {/* Product List */}
        {loading && <p>Loading products...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.length === 0 ? (
              <p className="col-span-full text-center">No products found.</p>
            ) : (
              filteredProducts.map((product) => (
                <div
                  key={product._id}
                  className="bg-white dark:bg-gray-900 rounded-2xl shadow-md overflow-hidden flex flex-col transition hover:shadow-xl"
                >
                  {product.image && (
                    <img
                      src={`${BASE_URI}/uploads/${product.image}`}
                      alt={product.name}
                      className="h-60 w-full object-cover"
                    />
                  )}

                  <div className="p-4 flex flex-col flex-1">
                    {/* Category pill */}
                    {product.category && (
                      <span className="self-start px-3 py-1 mb-2 text-xs font-medium rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                        {product.category}
                      </span>
                    )}

                    {/* Product Name */}
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      {product.name}
                    </h2>

                    {/* Description */}
                    <p className="text-sm text-gray-600 dark:text-gray-300 flex-1">
                      {product.description}
                    </p>

                    {/* Price */}
                    <div className="mt-3 text-blue-600 dark:text-blue-400 font-bold text-base">
                      {formatToINR(product.price)}
                    </div>

                    {/* Add to Cart Button */}
                    {role !== "admin" ? (
                      <button
                        className="mt-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition duration-200"
                        onClick={() => handleAddToCart(product)}
                      >
                        Add to Cart
                      </button>
                    ) : (
                      <button
                        className="mt-4 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition duration-200"
                        onClick={() => handleDelete(product)}
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </main>
    </div>
  );
}
