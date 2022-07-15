const express = require("express")
const router = express.Router()
const { getAllOrders } = require("../controllers/orderController")
const { protect } = require("../middleware/authMiddleware")
// Routes
router.get("/", protect, getAllOrders)
module.exports = router
