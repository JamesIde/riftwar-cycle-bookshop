const express = require("express")
const router = express.Router()
const { createOrder, getAllOrders } = require("../controllers/orderController")
const { create } = require("../models/orderModel")
const { protect } = require("../middleware/authMiddleware")
// Routes
router.post("/", protect, createOrder)
router.get("/", protect, getAllOrders)
module.exports = router
