const express = require("express")
const router = express.Router()
const {
  getAllOrders,
  getSingleOrder,
} = require("../controllers/orderController")
const { protect } = require("../middleware/authMiddleware")
// Routes
router.get("/", protect, getAllOrders)
router.get("/:id", protect, getSingleOrder)
module.exports = router
