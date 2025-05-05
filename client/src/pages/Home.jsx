import { useState, useEffect } from "react";
import {
  FiSearch,
  FiShoppingCart,
  FiUser,
  FiHeart,
  FiMenu,
  FiX,
  FiChevronRight,
  FiChevronLeft,
  FiStar,
} from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

import formatToINR from "../helpers/numberToINR";

const BASE_URI = import.meta.env.VITE_BASE_URI;

const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  async function fetchProducts() {
    try {
      const res = await fetch(`${BASE_URI}/api/products`);
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  // const featuredProducts = [
  //   {
  //     id: 1,
  //     name: "Wireless Bluetooth Headphones",
  //     price: 59.99,
  //     originalPrice: 89.99,
  //     rating: 4.5,
  //     image:
  //       "https://m.media-amazon.com/images/I/61SUj2a2IEL._AC_UL480_FMwebp_QL65_.jpg",
  //     isPrime: true,
  //   },
  //   {
  //     id: 2,
  //     name: "Smart Watch Fitness Tracker",
  //     price: 79.99,
  //     originalPrice: 99.99,
  //     rating: 4.2,
  //     image:
  //       "https://m.media-amazon.com/images/I/61GQ2H26VaL._AC_UL480_FMwebp_QL65_.jpg",
  //     isPrime: true,
  //   },
  //   {
  //     id: 3,
  //     name: "4K Ultra HD Smart TV",
  //     price: 499.99,
  //     originalPrice: 599.99,
  //     rating: 4.7,
  //     image:
  //       "https://m.media-amazon.com/images/I/71NZY2E0wYL._AC_UL480_FMwebp_QL65_.jpg",
  //     isPrime: true,
  //   },
  //   {
  //     id: 4,
  //     name: "Wireless Charging Stand",
  //     price: 24.99,
  //     originalPrice: 34.99,
  //     rating: 4.0,
  //     image:
  //       "https://m.media-amazon.com/images/I/61j6B9O9AQL._AC_UL480_FMwebp_QL65_.jpg",
  //     isPrime: true,
  //   },
  //   {
  //     id: 5,
  //     name: "Noise Cancelling Headphones",
  //     price: 129.99,
  //     originalPrice: 199.99,
  //     rating: 4.6,
  //     image:
  //       "https://m.media-amazon.com/images/I/61CGHv6kmWL._AC_UL480_FMwebp_QL65_.jpg",
  //     isPrime: true,
  //   },
  // ];

  // const dealsOfTheDay = [
  //   {
  //     id: 6,
  //     name: "Air Fryer with Digital Display",
  //     price: 89.99,
  //     originalPrice: 129.99,
  //     discount: 30,
  //     image:
  //       "https://m.media-amazon.com/images/I/71JFB+7q+aL._AC_UL480_FMwebp_QL65_.jpg",
  //   },
  //   {
  //     id: 7,
  //     name: "Robot Vacuum Cleaner",
  //     price: 199.99,
  //     originalPrice: 299.99,
  //     discount: 33,
  //     image:
  //       "https://m.media-amazon.com/images/I/61A5CR+JYJL._AC_UL480_FMwebp_QL65_.jpg",
  //   },
  //   {
  //     id: 8,
  //     name: "Electric Toothbrush Set",
  //     price: 39.99,
  //     originalPrice: 59.99,
  //     discount: 33,
  //     image:
  //       "https://m.media-amazon.com/images/I/71xJOk5xJAL._AC_UL480_FMwebp_QL65_.jpg",
  //   },
  //   {
  //     id: 9,
  //     name: "Portable Blender",
  //     price: 29.99,
  //     originalPrice: 39.99,
  //     discount: 25,
  //     image:
  //       "https://m.media-amazon.com/images/I/61I1GukD3BL._AC_UL480_FMwebp_QL65_.jpg",
  //   },
  // ];

  const categories = [
    { name: "Electronics", icon: "📱" },
    { name: "Fashion", icon: "👕" },
    { name: "Home & Kitchen", icon: "🏠" },
    { name: "Beauty", icon: "💄" },
    { name: "Toys & Games", icon: "🎮" },
    { name: "Groceries", icon: "🛒" },
    { name: "Books", icon: "📚" },
    { name: "Sports", icon: "⚽" },
  ];

  const heroSlides = [
    {
      title: "Summer Sale is Live!",
      subtitle: "Up to 50% off on selected items",
      image:
        "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      cta: "Shop Now",
    },
    {
      title: "New Arrivals",
      subtitle: "Discover the latest trends",
      image:
        "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      cta: "Explore",
    },
    {
      title: "Prime Members Get More",
      subtitle: "Exclusive deals and fast delivery",
      image:
        "https://images.unsplash.com/photo-1607082349566-0077024786f0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      cta: "Try Prime",
    },
    {
      title: "Electronics Sale",
      subtitle: "Up to 30% off on gadgets & devices",
      image:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      cta: "Shop Electronics",
    },
    {
      title: "Free Delivery Weekend",
      subtitle: "No minimum order - shop small and save",
      image:
        "https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      cta: "Start Shopping",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === heroSlides.length - 1 ? 0 : prev + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-md py-2" : "bg-blue-600 py-4"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <button
                className="mr-4 text-white md:hidden"
                onClick={() => setIsMenuOpen(true)}
              >
                <FiMenu size={24} />
              </button>
              <Link to="/login" className="text-2xl font-bold text-white">
                <span className={isScrolled ? "text-blue-500" : ""}>Cart</span>
                <span className="text-yellow-400">Attack</span>
              </Link>
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 mx-6">
              <div className="relative w-full max-w-xl">
                <input
                  type="search"
                  placeholder="Search for products..."
                  className={`w-full py-2 px-4 rounded-md focus:outline-none ${
                    isScrolled
                      ? "border border-gray-300"
                      : "border-gray-400 border text-white"
                  }`}
                />
                <button
                  className={`absolute right-0 top-0 h-full px-4 rounded-r-md ${
                    isScrolled
                      ? "bg-yellow-400 text-gray-800"
                      : "bg-yellow-500 text-white"
                  }`}
                >
                  <FiSearch size={20} />
                </button>
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link
                to="/login"
                className={`flex flex-col items-center ${
                  isScrolled ? "text-gray-800" : "text-white"
                }`}
              >
                <FiUser size={20} />
                <span className="text-xs">Account</span>
              </Link>
              <Link
                to="/login"
                className={`flex flex-col items-center ${
                  isScrolled ? "text-gray-800" : "text-white"
                }`}
              >
                <FiHeart size={20} />
                <span className="text-xs">Wishlist</span>
              </Link>
              <Link
                to="/login"
                className={`flex flex-col items-center ${
                  isScrolled ? "text-gray-800" : "text-white"
                }`}
              >
                <FiShoppingCart size={20} />
                <span className="text-xs">Cart</span>
              </Link>
            </nav>

            {/* Mobile Cart */}
            <div className="md:hidden">
              <Link to="/login" className="text-white">
                <FiShoppingCart size={24} />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50">
          <div className="w-4/5 max-w-sm h-full bg-white">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <Link to="/login" className="text-2xl font-bold text-blue-600">
                  Cart<span className="text-yellow-400">Attack</span>
                </Link>
                <button onClick={() => setIsMenuOpen(false)}>
                  <FiX size={24} />
                </button>
              </div>
              <div className="mt-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search for products..."
                    className="w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none"
                  />
                  <button className="absolute right-2 top-2 text-gray-500">
                    <FiSearch size={20} />
                  </button>
                </div>
              </div>
            </div>
            <nav className="p-4">
              <ul className="space-y-4">
                <li>
                  <Link to="/login" className="flex items-center text-gray-800">
                    <FiUser className="mr-2" /> My Account
                  </Link>
                </li>
                <li>
                  <Link to="/login" className="flex items-center text-gray-800">
                    <FiHeart className="mr-2" /> Wishlist
                  </Link>
                </li>
                <li>
                  <Link to="/login" className="flex items-center text-gray-800">
                    <FiShoppingCart className="mr-2" /> Cart
                  </Link>
                </li>
                {categories.map((category) => (
                  <li key={category.name}>
                    <Link
                      to="/login"
                      className="flex items-center text-gray-800"
                    >
                      <span className="mr-2">{category.icon}</span>{" "}
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      )}

      <main className="pt-20">
        {/* Hero Slider */}
        <section className="relative overflow-hidden">
          <div className="relative h-64 md:h-96 w-full">
            {heroSlides.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                }`}
              >
                <div
                  className="bg-[url('${slide.image}')] w-full h-full bg-cover bg-center"
                  // style={{ backgroundImage: `url(${slide.image})` }}
                >
                  <div
                    className="absolute inset-0  bg-opacity-30 flex items-center"
                    style={{ backgroundImage: `url(${slide.image})` }}
                  >
                    <div className="container mx-auto px-4 text-white">
                      <h1 className="text-3xl md:text-5xl font-bold mb-2">
                        {slide.title}
                      </h1>
                      <p className="text-lg md:text-xl mb-4">
                        {slide.subtitle}
                      </p>
                      <button className="bg-yellow-400 text-gray-900 px-6 py-2 rounded-md font-medium hover:bg-yellow-500 transition">
                        {slide.cta}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-2 shadow-md hover:bg-opacity-100"
          >
            <FiChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-2 shadow-md hover:bg-opacity-100"
          >
            <FiChevronRight size={24} />
          </button>
          <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full ${
                  index === currentSlide ? "bg-white" : "bg-white bg-opacity-50"
                }`}
              />
            ))}
          </div>
        </section>

        {/* Categories */}
        <section className="py-8 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  to="/login"
                  className="flex flex-col items-center p-4 rounded-md hover:bg-gray-100 transition"
                >
                  <span className="text-3xl mb-2">{category.icon}</span>
                  <span className="text-sm text-center">{category.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-8 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition"
                >
                  <div className="p-4">
                    <div className="h-48 flex items-center justify-center">
                      <img
                        src={`${BASE_URI}/uploads/${product.image}`}
                        alt={product.name}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    <h3 className="mt-4 text-lg font-medium line-clamp-2">
                      {product.name}
                    </h3>
                    <div className="mt-2 flex items-center">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <FiStar
                            key={i}
                            fill={i < 5 ? "currentColor" : "none"}
                            size={16}
                          />
                        ))}
                      </div>
                      <span className="ml-1 text-sm text-gray-600">
                        {product.rating}
                      </span>
                    </div>
                    <div className="mt-2">
                      <span className="text-lg font-bold">
                        {formatToINR(product.price)}
                      </span>
                      {product.originalPrice && (
                        <span className="ml-2 text-sm text-gray-500 line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>
                    {product.isPrime && (
                      <div className="mt-2">
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          Prime
                        </span>
                      </div>
                    )}
                    <button
                      onClick={() => navigate("/login")}
                      className="mt-4 w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 py-2 rounded-md font-medium transition"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Deals of the Day
        <section className="py-8 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Deals of the Day</h2>
              <a href="#" className="text-blue-600 hover:underline">
                See all deals
              </a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {dealsOfTheDay.map((deal) => (
                <div
                  key={deal.id}
                  className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition"
                >
                  <div className="p-4">
                    <div className="h-48 flex items-center justify-center">
                      <img
                        src={deal.image}
                        alt={deal.name}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    <div className="mt-4">
                      <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded">
                        {deal.discount}% off
                      </span>
                    </div>
                    <h3 className="mt-2 text-lg font-medium line-clamp-2">
                      {deal.name}
                    </h3>
                    <div className="mt-2">
                      <span className="text-lg font-bold">${deal.price}</span>
                      <span className="ml-2 text-sm text-gray-500 line-through">
                        ${deal.originalPrice}
                      </span>
                    </div>
                    <div className="mt-4 w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-yellow-400 h-2.5 rounded-full"
                        style={{ width: `${Math.random() * 60 + 20}%` }}
                      ></div>
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                      Limited time deal
                    </p>
                    <button className="mt-4 w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 py-2 rounded-md font-medium transition">
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section> */}

        {/* Banner */}
        <section className="py-8 bg-gray-100">
          <div className="container mx-auto px-4">
            <div className="bg-blue-600 rounded-lg p-6 md:p-8 text-white">
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 mb-6 md:mb-0">
                  <h2 className="text-2xl md:text-3xl font-bold mb-2">
                    Become a Prime Member
                  </h2>
                  <p className="mb-4">
                    Get free delivery, exclusive deals, and more for just
                    ₹999/month.
                  </p>
                  <button
                    onClick={() => navigate("/login")}
                    className="bg-yellow-400 text-gray-900 px-6 py-2 rounded-md font-medium hover:bg-yellow-500 transition"
                  >
                    Try Prime
                  </button>
                </div>
                <div className="md:w-1/2 flex justify-center">
                  <img
                    src="https://m.media-amazon.com/images/G/31/prime/NavFlyout/TryPrime/2018/Apr/IN-Prime-PIN-TryPrime-MultiBen-Apr18-400x400._CB442254244_.jpg"
                    alt="Prime Benefits"
                    className="h-48 object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">Get to Know Us</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:underline">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Press Releases
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Cart Attack Science
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Connect with Us</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:underline">
                    Facebook
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Make Money with Us</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:underline">
                    Sell on Cart Attack
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Sell under Cart Attack Accelerator
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Become an Affiliate
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Advertise Your Products
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Let Us Help You</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:underline">
                    Your Account
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Returns Centre
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    100% Purchase Protection
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Help
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-4 md:mb-0">
                <Link to="/" className="text-2xl font-bold">
                  Cart<span className="text-yellow-400">Attack</span>
                </Link>
              </div>
              <div className="flex space-x-4">
                <a href="#" className="hover:underline">
                  Conditions of Use
                </a>
                <a href="#" className="hover:underline">
                  Privacy Notice
                </a>
                <a href="#" className="hover:underline">
                  Interest-Based Ads
                </a>
              </div>
            </div>
            <div className="mt-4 text-center md:text-left text-sm text-gray-400">
              © 2025 CartAttack.com, Inc. or its affiliates
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
