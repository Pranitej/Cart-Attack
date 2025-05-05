import express from "express";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
const router = express.Router();

// @route   GET /api/cart
// @desc    Get user's cart
// @access  Private
router.get("/:userId", async (req, res) => {
  try {
    const userId = req.user?.id || req.params.userId; // For now, get from query or req.user
    if (!userId) return res.status(400).json({ message: "User ID required" });
    const cart = await Cart.findOne({ user: userId }).populate("items.product");
    res.json(cart || { user: userId, items: [] });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   POST /api/cart
// @desc    Add item to cart
// @access  Private
router.post("/", async (req, res) => {
  try {
    const userId = req.user?.id || req.body.userId;
    const { productId, quantity } = req.body;
    if (!userId || !productId)
      return res
        .status(400)
        .json({ message: "User ID and Product ID required" });
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }
    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity || 1;
    } else {
      cart.items.push({ product: productId, quantity: quantity || 1 });
    }
    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   DELETE /api/cart/:itemId
// @desc    Remove item from cart
// @access  Private
router.delete("/:userId/:itemId", async (req, res) => {
  try {
    const userId = req.user?.id || req.params.userId;
    const { itemId } = req.params;
    if (!userId || !itemId)
      return res.status(400).json({ message: "User ID and Item ID required" });
    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });
    cart.items = cart.items.filter((item) => item._id.toString() !== itemId);
    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
