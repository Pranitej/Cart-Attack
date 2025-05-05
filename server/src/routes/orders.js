import express from "express";
import Order from "../models/Order.js";
const router = express.Router();

// @route   GET /api/orders
// @desc    Get all orders for a user
// @access  Private
router.get("/", async (req, res) => {
  try {
    const userId = req.user?.id || req.query.userId;
    if (!userId) return res.status(400).json({ message: "User ID required" });
    const orders = await Order.find({ user: userId }).populate(
      "orderItems.product"
    );
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   GET /api/orders/all
// @desc    Get all orders from the collection
// @access  Private/Admin
router.get("/all", async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("orderItems.product")
      .populate("user", "name email");
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   POST /api/orders
// @desc    Create a new order
// @access  Private
router.post("/", async (req, res) => {
  try {
    const userId = req.user?.id || req.body.userId;
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;
    if (!userId || !orderItems || orderItems.length === 0) {
      return res
        .status(400)
        .json({ message: "Order items and user ID are required" });
    }
    const order = new Order({
      user: userId,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   GET /api/orders/:id
// @desc    Get single order by ID
// @access  Private
router.get("/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "orderItems.product"
    );
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
